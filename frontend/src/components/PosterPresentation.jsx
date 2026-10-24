import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Form, FloatingLabel } from "react-bootstrap";
import Swal from "sweetalert2";
import { InfinitySpin } from 'react-loader-spinner';
import Background from './Background';
import { FaIdCard, FaFileUpload, FaUserGraduate, FaCheckCircle } from 'react-icons/fa';

const PosterPresentation = () => {
    useEffect(() => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css";
        document.head.appendChild(link);

        return () => {
            document.head.removeChild(link);
        };
    }, []);

    const [step, setStep] = useState(0);
    const [translateValue, setTranslateValue] = useState(0);
    const [customCollege, setCustomCollege] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        college: "Walchand College of Engineering, Sangli",
        course: "",
        branch: "",
        year: "",
        posterTitle: "",
        researchDomain: "",
        abstractText: "",
        collegeIdCard: null,
        document: null,
    });

    const [fieldErrors, setFieldErrors] = useState({
        fullName: false,
        email: false,
        phone: false,
        customCollege: false,
        course: false,
        year: false,
        collegeIdCard: false,
        posterTitle: false,
        researchDomain: false,
        document: false,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'college') {
            setFormData({
                ...formData,
                college: value,
            });
            if (value !== 'Other') {
                setCustomCollege('');
            }
        } else if (name === 'customCollege') {
            setCustomCollege(value);
        } else {
            setFormData({
                ...formData,
                [name]: files ? files[0] : value,
            });
        }

        validateField(name, files ? files[0] : value);
    };

    const validateField = (field, value) => {
        let isInvalid = false;

        switch (field) {
            case 'fullName':
                isInvalid = !value || value.trim().length < 2;
                break;
            case 'email':
                isInvalid = !value || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
                break;
            case 'phone':
                isInvalid = !value || !/^\d{10}$/.test(value.replace(/\D/g, ''));
                break;
            case 'customCollege':
                isInvalid = formData.college === 'Other' && (!customCollege || customCollege.trim().length === 0);
                break;
            case 'course':
                isInvalid = !value || value.trim().length === 0;
                break;
            case 'year':
                isInvalid = !value || value === "";
                break;
            case 'collegeIdCard':
                isInvalid = !value;
                break;
            case 'posterTitle':
                isInvalid = !value || value.trim().length < 3;
                break;
            case 'researchDomain':
                isInvalid = !value || value.trim().length === 0;
                break;
            case 'document':
                isInvalid = !value;
                break;
            default:
                break;
        }

        setFieldErrors((prev) => ({ ...prev, [field]: isInvalid }));
        return isInvalid;
    };

    const validateStepFields = () => {
        const step0Fields = ['fullName', 'email', 'phone', 'course', 'year'];
        if (formData.college === 'Other') step0Fields.push('customCollege');
        step0Fields.push('collegeIdCard');

        const step1Fields = ['posterTitle', 'researchDomain', 'document'];

        const fieldsToValidate = step === 0 ? step0Fields : step1Fields;
        let hasError = false;
        let updatedErrors = { ...fieldErrors };

        fieldsToValidate.forEach((field) => {
            let val;
            if (field === 'customCollege') val = customCollege;
            else val = formData[field];

            const err = validateField(field, val);
            if (err) hasError = true;
            updatedErrors[field] = err;
        });

        setFieldErrors(updatedErrors);
        return hasError;
    };

    const handleNext = async () => {
        if (validateStepFields()) {
            Swal.fire({
                icon: 'error',
                title: 'Required Fields Missing',
                text: 'Please fill in all required fields and upload your college ID card for verification.',
            });
            return;
        }

        if (step === 0) {
            try {
                const res = await axios.post(`${import.meta.env.VITE_SERVER_URL || ''}/api/poster/check-email`, {
                    email: formData.email
                });
                if (res.data?.message === 'Record found') {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Email Already Registered',
                        text: 'This email is already registered for Poster Presentation.',
                    });
                    return;
                }
            } catch (err) {
                console.log("Email check skipped/offline");
            }
        }

        setStep(1);
        setTranslateValue(100);
        window.scrollTo({ top: 300, behavior: 'smooth' });
    };

    const handlePrev = () => {
        setStep(0);
        setTranslateValue(0);
        window.scrollTo({ top: 300, behavior: 'smooth' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateStepFields()) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Failed',
                text: 'Please upload the poster submission document and fill in all research details.',
            });
            return;
        }

        const submissionData = new FormData();
        submissionData.append('fullName', formData.fullName);
        submissionData.append('email', formData.email);
        submissionData.append('phone', formData.phone);
        submissionData.append('college', formData.college === 'Other' ? customCollege : formData.college);
        submissionData.append('course', formData.course);
        submissionData.append('branch', formData.branch || formData.course);
        submissionData.append('year', formData.year);
        submissionData.append('posterTitle', formData.posterTitle);
        submissionData.append('researchDomain', formData.researchDomain);
        submissionData.append('abstractText', formData.abstractText || "");

        if (formData.collegeIdCard) {
            submissionData.append('collegeIdCard', formData.collegeIdCard);
        }
        if (formData.document) {
            submissionData.append('document', formData.document);
        }

        setIsSubmitting(true);

        try {
            await axios.post(`${import.meta.env.VITE_SERVER_URL || ''}/api/poster`, submissionData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            Swal.fire({
                icon: 'success',
                title: 'Registration Successful!',
                text: 'Your registration for Poster Presentation (PG) has been submitted successfully with zero fees!',
                confirmButtonColor: '#2563eb',
            }).then(() => {
                window.location.href = "/";
            });
        } catch (error) {
            console.error("Poster registration error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Submission Notice',
                text: error.response?.data?.message || 'Server is temporarily unreachable. Please ensure the backend is running.',
                confirmButtonColor: '#d33',
            });
        }
        setIsSubmitting(false);
    };

    return (
        <>
            {isSubmitting ? (
                <div className="flex flex-col justify-center items-center h-screen">
                    <Background />
                    <InfinitySpin width="200" color="#2563eb" />
                    <p className="mt-4 text-lg font-bold text-gray-700">Submitting your registration...</p>
                </div>
            ) : (
                <div className='w-full px-6 lg:w-[85%] mt-24 lg:mx-auto flex flex-col gap-6 pb-16'>
                    {/* Event Banner */}
                    <div className='flex flex-col items-center justify-center gap-3 bg-white/70 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm'>
                        <div className='flex flex-col sm:flex-row justify-center items-center gap-3'>
                            <img src='/activities/2.png' className="w-[50px] lg:w-[45px]" alt="Poster Presentation" />
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl leading-tight text-center sm:text-left mb-0 font-extrabold text-gray-900">
                                Poster Presentation
                            </h2>
                        </div>
                        <span className='px-4 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-full text-sm border border-emerald-200'>
                            For Postgraduate (PG) Students • FREE Registration (No Charges)
                        </span>
                        <p className='w-full max-w-3xl text-sm sm:text-base leading-relaxed text-center text-gray-700 m-0'>
                            The poster presentation is intended for postgraduate (PG) students who want to communicate research questions, methods, findings, or work in progress in a concise visual format. A poster should make the research problem, motivation, approach, and contribution understandable to an academic audience, encouraging focused discussion and peer feedback.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-3 mt-2 text-xs sm:text-sm font-semibold text-gray-600">
                            <span className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-lg text-blue-800">
                                <FaCheckCircle className="text-emerald-500" /> Individual Presentation
                            </span>
                            <span className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-lg text-blue-800">
                                <FaCheckCircle className="text-emerald-500" /> Free of Cost
                            </span>
                            <span className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-lg text-blue-800">
                                <FaCheckCircle className="text-emerald-500" /> College ID Verification
                            </span>
                        </div>
                    </div>

                    {/* Step indicator */}
                    <div className="flex justify-center items-center max-w-md mx-auto w-full gap-4">
                        <div className={`flex items-center gap-2 text-sm font-bold ${step === 0 ? "text-blue-700" : "text-gray-400"}`}>
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${step === 0 ? "bg-blue-600" : "bg-gray-400"}`}>1</span>
                            <span>Student Verification</span>
                        </div>
                        <div className="h-0.5 w-12 bg-gray-300"></div>
                        <div className={`flex items-center gap-2 text-sm font-bold ${step === 1 ? "text-blue-700" : "text-gray-400"}`}>
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${step === 1 ? "bg-blue-600" : "bg-gray-400"}`}>2</span>
                            <span>Poster & Abstract</span>
                        </div>
                    </div>

                    {/* Registration Form */}
                    <Form
                        onSubmit={handleSubmit}
                        className="relative overflow-hidden w-full max-w-2xl py-6 bg-gradient-to-br from-pink-100/60 to-blue-100/60 backdrop-blur-md rounded-2xl mx-auto shadow-md border border-gray-200"
                    >
                        <div
                            className="flex transition-transform duration-300 ease-in-out"
                            style={{ transform: `translateX(-${translateValue}%)` }}
                        >
                            {/* Slide 1: Basic Verification Details */}
                            <div className="w-full sm:min-w-full flex-shrink-0 box-border px-6 sm:px-8">
                                <h4 className="text-lg font-bold text-center text-gray-900 mb-1">
                                    Participant & Verification Details
                                </h4>
                                <p className="text-xs text-gray-600 text-center mb-4">
                                    Please provide accurate details and upload your student ID card for eligibility verification.
                                </p>

                                <FloatingLabel controlId="fullName" label="Full Name *" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        name="fullName"
                                        placeholder="Full Name"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        isInvalid={fieldErrors.fullName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your full name.
                                    </Form.Control.Feedback>
                                </FloatingLabel>

                                <FloatingLabel controlId="email" label="Email Address *" className="mb-3">
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        isInvalid={fieldErrors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a valid email address.
                                    </Form.Control.Feedback>
                                </FloatingLabel>

                                <FloatingLabel controlId="phone" label="Mobile Number (10 Digits) *" className="mb-3">
                                    <Form.Control
                                        type="tel"
                                        name="phone"
                                        placeholder="Mobile Number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        maxLength={10}
                                        isInvalid={fieldErrors.phone}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a valid 10-digit mobile number.
                                    </Form.Control.Feedback>
                                </FloatingLabel>

                                <FloatingLabel controlId="college" label="College / Institution Name *" className="mb-3">
                                    <Form.Select
                                        name="college"
                                        value={formData.college}
                                        onChange={handleChange}
                                    >
                                        <option value="Walchand College of Engineering, Sangli">Walchand College of Engineering, Sangli</option>
                                        <option value="Other">Other College / University</option>
                                    </Form.Select>
                                </FloatingLabel>

                                {formData.college === "Other" && (
                                    <FloatingLabel controlId="customCollege" label="Enter College Name *" className="mb-3">
                                        <Form.Control
                                            type="text"
                                            name="customCollege"
                                            placeholder="Enter College Name"
                                            value={customCollege}
                                            onChange={handleChange}
                                            isInvalid={fieldErrors.customCollege}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter your college name.
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                                    <FloatingLabel controlId="course" label="Postgraduate Department / Course *">
                                        <Form.Control
                                            type="text"
                                            name="course"
                                            placeholder="e.g. M.Tech CSE, M.Tech IT"
                                            value={formData.course}
                                            onChange={handleChange}
                                            isInvalid={fieldErrors.course}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Course/Department is required.
                                        </Form.Control.Feedback>
                                    </FloatingLabel>

                                    <FloatingLabel controlId="year" label="Current Year of PG Study *">
                                        <Form.Select
                                            name="year"
                                            value={formData.year}
                                            onChange={handleChange}
                                            isInvalid={fieldErrors.year}
                                        >
                                            <option value="">Select Year</option>
                                            <option value="M.Tech / ME 1st Year">M.Tech / ME 1st Year</option>
                                            <option value="M.Tech / ME 2nd Year">M.Tech / ME 2nd Year</option>
                                            <option value="MCA / M.Sc 1st Year">MCA / M.Sc 1st Year</option>
                                            <option value="MCA / M.Sc 2nd Year">MCA / M.Sc 2nd Year</option>
                                            <option value="Other PG">Other PG Programme</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Please select your year of study.
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </div>

                                {/* College ID Card Upload for Basic Verification */}
                                <Form.Group controlId="collegeIdCard" className="mb-3 bg-white/70 p-3 rounded-xl border border-gray-200">
                                    <Form.Label className="font-bold text-sm text-gray-900 flex items-center gap-2">
                                        <FaIdCard className="text-blue-600" /> College ID Card Upload (JPG, PNG, PDF) *
                                    </Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="collegeIdCard"
                                        accept=".jpg,.jpeg,.png,.pdf"
                                        onChange={handleChange}
                                        isInvalid={fieldErrors.collegeIdCard}
                                    />
                                    <Form.Text className="text-xs text-gray-500">
                                        Required for student verification. Maximum file size: 5MB.
                                    </Form.Text>
                                    <Form.Control.Feedback type="invalid">
                                        Please upload your college ID card for verification.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>

                            {/* Slide 2: Poster & Research Details */}
                            <div className="w-full sm:min-w-full flex-shrink-0 box-border px-6 sm:px-8">
                                <h4 className="text-lg font-bold text-center text-gray-900 mb-1">
                                    Poster Presentation Information
                                </h4>
                                <p className="text-xs text-gray-600 text-center mb-4">
                                    Enter details regarding your PG research poster. Zero registration fees apply.
                                </p>

                                <FloatingLabel controlId="posterTitle" label="Poster / Research Title *" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        name="posterTitle"
                                        placeholder="Poster / Research Title"
                                        value={formData.posterTitle}
                                        onChange={handleChange}
                                        isInvalid={fieldErrors.posterTitle}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Poster title is required.
                                    </Form.Control.Feedback>
                                </FloatingLabel>

                                <FloatingLabel controlId="researchDomain" label="Research Domain / Specialization *" className="mb-3">
                                    <Form.Select
                                        name="researchDomain"
                                        value={formData.researchDomain}
                                        onChange={handleChange}
                                        isInvalid={fieldErrors.researchDomain}
                                    >
                                        <option value="">Select Domain</option>
                                        <option value="Artificial Intelligence & Machine Learning">Artificial Intelligence & Machine Learning</option>
                                        <option value="Deep Learning & Neural Networks">Deep Learning & Neural Networks</option>
                                        <option value="Computer Vision & Image Processing">Computer Vision & Image Processing</option>
                                        <option value="Natural Language Processing">Natural Language Processing</option>
                                        <option value="Cloud, Distributed Systems & Big Data">Cloud, Distributed Systems & Big Data</option>
                                        <option value="Cyber Security, Privacy & Cryptography">Cyber Security, Privacy & Cryptography</option>
                                        <option value="Internet of Things (IoT) & Embedded Systems">Internet of Things (IoT) & Embedded Systems</option>
                                        <option value="Software Engineering & DevOps">Software Engineering & DevOps</option>
                                        <option value="Theoretical Computing & Algorithms">Theoretical Computing & Algorithms</option>
                                        <option value="Interdisciplinary Computing">Interdisciplinary Computing</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Please select your research domain.
                                    </Form.Control.Feedback>
                                </FloatingLabel>

                                <FloatingLabel controlId="abstractText" label="Brief Research Abstract / Summary" className="mb-3">
                                    <Form.Control
                                        as="textarea"
                                        name="abstractText"
                                        placeholder="Brief Research Abstract"
                                        value={formData.abstractText}
                                        onChange={handleChange}
                                        style={{ height: '90px' }}
                                    />
                                </FloatingLabel>

                                {/* Poster Document Upload */}
                                <Form.Group controlId="document" className="mb-4 bg-white/70 p-3 rounded-xl border border-gray-200">
                                    <Form.Label className="font-bold text-sm text-gray-900 flex items-center gap-2">
                                        <FaFileUpload className="text-blue-600" /> Upload Poster Document / Abstract (PDF) *
                                    </Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="document"
                                        accept=".pdf"
                                        onChange={handleChange}
                                        isInvalid={fieldErrors.document}
                                    />
                                    <Form.Text className="text-xs text-gray-500">
                                        Upload your one-page abstract or poster outline in PDF format.
                                    </Form.Text>
                                    <Form.Control.Feedback type="invalid">
                                        Please upload your poster abstract/document.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* Free Confirmation Notice */}
                                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-center mb-2">
                                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                                        Registration Fee: Free of Cost (₹0/-)
                                    </span>
                                    <p className="text-[11px] text-emerald-700 m-0">
                                        No payment or transaction details required for Poster Presentation.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className={`flex mt-4 px-6 sm:px-8 ${step === 0 ? "justify-end" : "justify-between"}`}>
                            {step > 0 && (
                                <button
                                    type='button'
                                    className='px-5 py-2.5 text-sm font-bold text-gray-700 rounded-xl bg-white border border-gray-300 hover:bg-gray-50 transition-all'
                                    onClick={handlePrev}
                                >
                                    ← Back
                                </button>
                            )}

                            {step === 0 && (
                                <button
                                    type='button'
                                    className='px-6 py-2.5 text-sm font-bold text-white rounded-xl bg-blue-600 hover:bg-blue-700 shadow-md transition-all'
                                    onClick={handleNext}
                                >
                                    Next: Research Details
                                </button>
                            )}

                            {step === 1 && (
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 text-sm font-bold text-white rounded-xl bg-blue-600 hover:bg-blue-700 shadow-md transition-all"
                                >
                                    Submit Free Registration
                                </button>
                            )}
                        </div>
                    </Form>
                </div>
            )}
        </>
    );
};

export default PosterPresentation;
