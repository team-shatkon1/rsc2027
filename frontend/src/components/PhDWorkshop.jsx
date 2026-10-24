import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Form, FloatingLabel } from "react-bootstrap";
import Swal from "sweetalert2";
import { InfinitySpin } from 'react-loader-spinner';
import Background from './Background';
import { FaGraduationCap, FaUserTie, FaFilePdf, FaIdCard, FaQrcode, FaCheckCircle } from 'react-icons/fa';

const PhDWorkshop = () => {
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
        department: "",
        phdAdmissionYear: "",
        guideName: "",
        researchTopic: "",
        researchDomain: "",
        researchChallenge: "",
        abstract: null,
        collegeId: null,
        transactionId: "",
        paymentScreenshot: null,
    });

    const [fieldErrors, setFieldErrors] = useState({
        fullName: false,
        email: false,
        phone: false,
        customCollege: false,
        department: false,
        phdAdmissionYear: false,
        guideName: false,
        researchTopic: false,
        researchDomain: false,
        abstract: false,
        collegeId: false,
        transactionId: false,
        paymentScreenshot: false,
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
        validateField(name, value, files ? files[0] : value);
    };

    const validateField = (field, value, fileValue) => {
        let error = false;
        if (field === 'fullName') error = !value || value.trim().length < 2;
        if (field === 'email') error = !value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        if (field === 'phone') error = !value || !/^\d{10}$/.test(value.trim());
        if (field === 'customCollege') error = formData.college === 'Other' && (!value || value.trim().length < 2);
        if (field === 'department') error = !value || value.trim().length < 2;
        if (field === 'phdAdmissionYear') error = !value || value.trim().length < 2;
        if (field === 'guideName') error = !value || value.trim().length < 2;
        if (field === 'researchTopic') error = !value || value.trim().length < 3;
        if (field === 'researchDomain') error = !value || value.trim().length < 2;
        if (field === 'abstract') error = !fileValue && !formData.abstract;
        if (field === 'collegeId') error = !fileValue && !formData.collegeId;
        if (field === 'transactionId') error = !value || value.trim().length < 4;
        if (field === 'paymentScreenshot') error = !fileValue && !formData.paymentScreenshot;

        setFieldErrors((prev) => ({ ...prev, [field]: error }));
        return error;
    };

    const stepFields = {
        0: ['fullName', 'email', 'phone', 'customCollege', 'department', 'phdAdmissionYear', 'guideName'],
        1: ['researchTopic', 'researchDomain', 'abstract'],
        2: ['collegeId', 'transactionId', 'paymentScreenshot'],
    };

    const validateCurrentStep = () => {
        const fields = stepFields[step];
        let hasError = false;
        fields.forEach((field) => {
            let val = formData[field];
            if (field === 'customCollege' && formData.college !== 'Other') {
                return;
            }
            const err = validateField(field, val, val);
            if (err) hasError = true;
        });
        return hasError;
    };

    const handleNext = () => {
        if (validateCurrentStep()) {
            Swal.fire({
                icon: 'warning',
                title: 'Incomplete Details',
                text: 'Please fill in all required fields marked in red.',
                confirmButtonColor: '#4f46e5',
            });
            return;
        }
        setStep((prev) => {
            const next = Math.min(prev + 1, 2);
            setTranslateValue(next * 100);
            return next;
        });
    };

    const handlePrev = () => {
        setStep((prev) => {
            const next = Math.max(prev - 1, 0);
            setTranslateValue(next * 100);
            return next;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateCurrentStep()) {
            Swal.fire({
                icon: 'warning',
                title: 'Incomplete Details',
                text: 'Please verify all fields and file uploads.',
                confirmButtonColor: '#4f46e5',
            });
            return;
        }

        const resolvedCollege = formData.college === 'Other' ? customCollege : formData.college;
        const data = new FormData();
        data.append('fullName', formData.fullName);
        data.append('email', formData.email);
        data.append('phone', formData.phone);
        data.append('college', resolvedCollege);
        data.append('department', formData.department);
        data.append('phdAdmissionYear', formData.phdAdmissionYear);
        data.append('guideName', formData.guideName);
        data.append('researchTopic', formData.researchTopic);
        data.append('researchDomain', formData.researchDomain);
        data.append('researchChallenge', formData.researchChallenge || "");
        data.append('transactionId', formData.transactionId);

        if (formData.abstract) data.append('abstract', formData.abstract);
        if (formData.collegeId) data.append('collegeId', formData.collegeId);
        if (formData.paymentScreenshot) data.append('paymentScreenshot', formData.paymentScreenshot);

        setIsSubmitting(true);
        try {
            await axios.post(`${import.meta.env.VITE_SERVER_URL || ''}/api/workshop`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            Swal.fire({
                icon: 'success',
                title: 'Registration Successful!',
                html: `
                    <p>Thank you for registering for the <strong>Ph.D. Research Workshop (RSC 2027)</strong>.</p>
                    <p class="text-sm text-gray-600 mt-2">Your research abstract will be categorized by domain and matched with an expert mentor for your dedicated 30-minute 1-on-1 session.</p>
                `,
                confirmButtonColor: '#4f46e5',
            }).then(() => {
                window.location.href = "/";
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: error.response?.data?.message || 'Failed to submit registration. Please try again.',
                confirmButtonColor: '#dc2626',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {isSubmitting ? (
                <div className="flex flex-col justify-center items-center h-screen bg-white/70 backdrop-blur-sm">
                    <Background />
                    <InfinitySpin width="200" color="#4f46e5" />
                    <p className="mt-4 font-bold text-gray-700">Uploading Abstract & Confirming Registration...</p>
                </div>
            ) : (
                <div data-aos='fade-in' className='w-full px-6 lg:w-[85%] mt-24 mb-16 lg:mx-auto flex flex-col gap-4'>
                    {/* Event Banner */}
                    <div className='flex flex-col items-center justify-center gap-3 text-center'>
                        <div className='flex flex-col lg:flex-row items-center justify-center gap-3'>
                            <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center shadow-sm">
                                <FaGraduationCap size={28} />
                            </div>
                            <h2 className="text-3xl lg:text-4xl leading-tight font-black text-gray-900">
                                Ph.D. Research Workshop
                            </h2>
                        </div>

                        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 px-4 py-1 rounded-full text-indigo-900 text-sm font-semibold">
                            <span>Includes Dedicated 30-Minute 1-on-1 Expert Mentoring</span>
                        </div>

                        <p className='w-full max-w-3xl text-sm sm:text-base text-gray-700 leading-relaxed m-0 text-justify sm:text-center'>
                            Designed for recent M.Tech graduates considering doctoral study, newly admitted scholars defining a research direction, and researchers navigating algorithmic uncertainty or experimental validation. Advance abstract submission enables domain-based mentor matching.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-3 mt-1">
                            <span className="text-xs font-bold px-3 py-1 bg-green-100 text-green-800 rounded-full border border-green-200">
                                Early Bird: ₹800/-
                            </span>
                            <span className="text-xs font-bold px-3 py-1 bg-amber-100 text-amber-800 rounded-full border border-amber-200">
                                Late Registration: ₹1000/-
                            </span>
                            <span className="text-xs font-bold px-3 py-1 bg-blue-100 text-blue-800 rounded-full border border-blue-200">
                                30-Min Mentoring Included
                            </span>
                        </div>
                    </div>

                    {/* Step indicator */}
                    <div className="w-full lg:w-2/3 mx-auto flex items-center justify-between px-4 mt-2">
                        <div className={`flex items-center gap-2 text-xs font-bold ${step >= 0 ? "text-indigo-600" : "text-gray-400"}`}>
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 0 ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"}`}>1</span>
                            <span>Personal Details</span>
                        </div>
                        <div className="flex-1 h-0.5 bg-gray-200 mx-2"></div>
                        <div className={`flex items-center gap-2 text-xs font-bold ${step >= 1 ? "text-indigo-600" : "text-gray-400"}`}>
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"}`}>2</span>
                            <span>Research Abstract</span>
                        </div>
                        <div className="flex-1 h-0.5 bg-gray-200 mx-2"></div>
                        <div className={`flex items-center gap-2 text-xs font-bold ${step >= 2 ? "text-indigo-600" : "text-gray-400"}`}>
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"}`}>3</span>
                            <span>ID & Payment</span>
                        </div>
                    </div>

                    {/* Multi-step Form */}
                    <Form
                        onSubmit={handleSubmit}
                        className="relative overflow-hidden w-full lg:w-2/3 py-6 bg-gradient-to-br from-indigo-50/80 via-white/80 to-pink-50/80 backdrop-blur-md rounded-2xl mx-auto shadow-lg border border-indigo-100 space-y-4"
                    >
                        <div
                            className="flex transition-transform duration-300 ease-in-out"
                            style={{ transform: `translateX(-${translateValue}%)` }}
                        >
                            {/* Step 0: Scholar Personal Information */}
                            <div className="w-full sm:min-w-full flex-shrink-0 box-border px-6">
                                <h4 className="text-lg font-bold text-center text-gray-900 mb-1">Scholar Information</h4>
                                <p className="text-xs text-gray-500 text-center mb-4">Please provide your academic and institutional credentials.</p>

                                <FloatingLabel controlId="fullName" label="Full Name *" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        name="fullName"
                                        placeholder="Full Name"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        isInvalid={fieldErrors.fullName}
                                    />
                                    <Form.Control.Feedback type="invalid">Full name is required.</Form.Control.Feedback>
                                </FloatingLabel>

                                <FloatingLabel controlId="email" label="Official / Academic Email *" className="mb-3">
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        isInvalid={fieldErrors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">Please enter a valid email address.</Form.Control.Feedback>
                                </FloatingLabel>

                                <FloatingLabel controlId="phone" label="Mobile / WhatsApp Number (10 digits) *" className="mb-3">
                                    <Form.Control
                                        type="tel"
                                        name="phone"
                                        placeholder="10-digit Mobile Number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        isInvalid={fieldErrors.phone}
                                    />
                                    <Form.Control.Feedback type="invalid">Please enter a valid 10-digit mobile number.</Form.Control.Feedback>
                                </FloatingLabel>

                                <FloatingLabel controlId="college" label="Institution / University *" className="mb-3">
                                    <Form.Select name="college" value={formData.college} onChange={handleChange}>
                                        <option value="Walchand College of Engineering, Sangli">Walchand College of Engineering, Sangli</option>
                                        <option value="Other">Other Institute / University</option>
                                    </Form.Select>
                                </FloatingLabel>

                                {formData.college === "Other" && (
                                    <FloatingLabel controlId="customCollege" label="Enter College / University Name *" className="mb-3">
                                        <Form.Control
                                            type="text"
                                            name="customCollege"
                                            placeholder="Institution Name"
                                            value={customCollege}
                                            onChange={handleChange}
                                            isInvalid={fieldErrors.customCollege}
                                        />
                                        <Form.Control.Feedback type="invalid">Institution name is required.</Form.Control.Feedback>
                                    </FloatingLabel>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <FloatingLabel controlId="department" label="Department / Discipline *" className="mb-3">
                                        <Form.Control
                                            type="text"
                                            name="department"
                                            placeholder="e.g. CSE, IT, AI&ML"
                                            value={formData.department}
                                            onChange={handleChange}
                                            isInvalid={fieldErrors.department}
                                        />
                                        <Form.Control.Feedback type="invalid">Department is required.</Form.Control.Feedback>
                                    </FloatingLabel>

                                    <FloatingLabel controlId="phdAdmissionYear" label="Ph.D. Admission Year / Status *" className="mb-3">
                                        <Form.Control
                                            type="text"
                                            name="phdAdmissionYear"
                                            placeholder="e.g. 2023 / 2nd Year"
                                            value={formData.phdAdmissionYear}
                                            onChange={handleChange}
                                            isInvalid={fieldErrors.phdAdmissionYear}
                                        />
                                        <Form.Control.Feedback type="invalid">Admission year or status is required.</Form.Control.Feedback>
                                    </FloatingLabel>
                                </div>

                                <FloatingLabel controlId="guideName" label="Research Guide / Supervisor Name *" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        name="guideName"
                                        placeholder="Guide / Mentor Name"
                                        value={formData.guideName}
                                        onChange={handleChange}
                                        isInvalid={fieldErrors.guideName}
                                    />
                                    <Form.Control.Feedback type="invalid">Guide name is required.</Form.Control.Feedback>
                                </FloatingLabel>
                            </div>

                            {/* Step 1: Research Abstract & Domain Details */}
                            <div className="w-full sm:min-w-full flex-shrink-0 box-border px-6">
                                <h4 className="text-lg font-bold text-center text-gray-900 mb-1">Research Abstract Details</h4>
                                <p className="text-xs text-gray-500 text-center mb-4">
                                    This information is used by organizers to match you with a domain expert for your 30-minute session.
                                </p>

                                <FloatingLabel controlId="researchTopic" label="Research Topic / Working Title *" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        name="researchTopic"
                                        placeholder="Research Topic Title"
                                        value={formData.researchTopic}
                                        onChange={handleChange}
                                        isInvalid={fieldErrors.researchTopic}
                                    />
                                    <Form.Control.Feedback type="invalid">Research topic is required.</Form.Control.Feedback>
                                </FloatingLabel>

                                <FloatingLabel controlId="researchDomain" label="Primary Research Domain / Area *" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        name="researchDomain"
                                        placeholder="e.g. Deep Learning, NLP, Cloud Systems, IoT Security"
                                        value={formData.researchDomain}
                                        onChange={handleChange}
                                        isInvalid={fieldErrors.researchDomain}
                                    />
                                    <Form.Control.Feedback type="invalid">Research domain is required for expert matching.</Form.Control.Feedback>
                                </FloatingLabel>

                                <FloatingLabel controlId="researchChallenge" label="Specific Bottleneck or Question for Discussion (Optional)" className="mb-3">
                                    <Form.Control
                                        as="textarea"
                                        style={{ height: '90px' }}
                                        name="researchChallenge"
                                        placeholder="What primary problem would you like to discuss with the mentor?"
                                        value={formData.researchChallenge}
                                        onChange={handleChange}
                                    />
                                </FloatingLabel>

                                <Form.Group controlId="abstract" className="mb-3 bg-white/70 p-3 rounded-xl border border-dashed border-indigo-300">
                                    <Form.Label className="font-bold text-sm text-gray-800 flex items-center gap-2">
                                        <FaFilePdf className="text-red-500" /> Upload Research Abstract (PDF only) *
                                    </Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="abstract"
                                        accept=".pdf"
                                        onChange={handleChange}
                                        isInvalid={fieldErrors.abstract}
                                    />
                                    <Form.Control.Feedback type="invalid">Please attach your research abstract in PDF format.</Form.Control.Feedback>
                                    <p className="text-[11px] text-gray-500 mt-1">
                                        Must include: Problem statement, current methodology, progress, and key questions for mentoring.
                                    </p>
                                </Form.Group>
                            </div>

                            {/* Step 2: College ID Verification & Payment */}
                            <div className="w-full sm:min-w-full flex-shrink-0 box-border px-6">
                                <h4 className="text-lg font-bold text-center text-gray-900 mb-1">Verification & Payment</h4>
                                <p className="text-xs text-gray-500 text-center mb-4">Upload institutional ID and confirm registration fee payment.</p>

                                <Form.Group controlId="collegeId" className="mb-4 bg-white/70 p-3 rounded-xl border border-dashed border-indigo-300">
                                    <Form.Label className="font-bold text-sm text-gray-800 flex items-center gap-2">
                                        <FaIdCard className="text-indigo-600" /> Upload College / Research Scholar ID Card (JPG/PNG/PDF) *
                                    </Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="collegeId"
                                        accept=".jpg,.jpeg,.png,.pdf"
                                        onChange={handleChange}
                                        isInvalid={fieldErrors.collegeId}
                                    />
                                    <Form.Control.Feedback type="invalid">Please upload your college/university ID card.</Form.Control.Feedback>
                                </Form.Group>

                                {/* Payment QR and Instructions */}
                                <div className="bg-white/80 p-4 rounded-xl border border-gray-200 flex flex-col items-center mb-4">
                                    <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm mb-2">
                                        <FaQrcode /> Scan QR to Pay Registration Fee
                                    </div>

                                    <img
                                        src="/paymentqr3.jpg"
                                        alt="Payment QR"
                                        className="w-36 h-36 object-contain rounded-lg border border-gray-200 shadow-sm"
                                    />

                                    <div className="flex gap-2 mt-2">
                                        <span className="text-xs font-bold px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
                                            Early Bird: ₹800/-
                                        </span>
                                        <span className="text-xs font-bold px-3 py-1 bg-amber-50 text-amber-700 rounded-full border border-amber-100">
                                            Late: ₹1000/-
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-gray-500 mt-1 text-center">
                                        Scan using Google Pay, PhonePe, Paytm, or any UPI App.
                                    </p>
                                </div>

                                <FloatingLabel controlId="transactionId" label="Transaction ID / UTR Number *" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        name="transactionId"
                                        placeholder="UPI Transaction ID / Ref No."
                                        value={formData.transactionId}
                                        onChange={handleChange}
                                        isInvalid={fieldErrors.transactionId}
                                    />
                                    <Form.Control.Feedback type="invalid">Transaction ID is required for verification.</Form.Control.Feedback>
                                </FloatingLabel>

                                <Form.Group controlId="paymentScreenshot" className="mb-2 bg-white/70 p-3 rounded-xl border border-dashed border-gray-300">
                                    <Form.Label className="font-bold text-sm text-gray-800">
                                        Upload Payment Screenshot (JPG/PNG) *
                                    </Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="paymentScreenshot"
                                        accept=".jpg,.jpeg,.png"
                                        onChange={handleChange}
                                        isInvalid={fieldErrors.paymentScreenshot}
                                    />
                                    <Form.Control.Feedback type="invalid">Please attach your payment screenshot.</Form.Control.Feedback>
                                </Form.Group>
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className={`flex mt-6 px-6 ${step === 0 ? "justify-end" : "justify-between"}`}>
                            {step > 0 && (
                                <button
                                    type='button'
                                    className='inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-all'
                                    onClick={handlePrev}
                                >
                                    Previous
                                </button>
                            )}

                            {step < 2 && (
                                <button
                                    type='button'
                                    className='inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-white rounded-full bg-indigo-600 hover:bg-indigo-700 transition-all shadow-md'
                                    onClick={handleNext}
                                >
                                    Continue
                                </button>
                            )}

                            {step === 2 && (
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="inline-flex items-center justify-center px-8 py-2.5 text-sm font-bold text-white rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:opacity-95 transition-all shadow-lg"
                                >
                                    Submit Registration & Abstract
                                </button>
                            )}
                        </div>
                    </Form>
                </div>
            )}
        </>
    );
};

export default PhDWorkshop;
