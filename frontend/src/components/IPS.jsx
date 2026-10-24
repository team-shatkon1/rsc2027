import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Form, FloatingLabel } from "react-bootstrap";
import Swal from "sweetalert2";
import { InfinitySpin } from 'react-loader-spinner';
import Background from './Background';
import { FaIdCard, FaUsers, FaLaptopCode, FaCheckCircle, FaTrash, FaPlus } from 'react-icons/fa';

const IPS = () => {
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
        branch: "",
        college: "Walchand College of Engineering, Sangli",
        year: "",
        collegeIdCard: null,
        projectTitle: "",
        projectDomain: "",
        projectDescription: "",
        document: null,
        team: [
            { name: "", email: "", phone: "", college: "", branch: "", year: "" },
        ],
    });

    const [hasTeamMembers, setHasTeamMembers] = useState(false);

    const [fieldErrors, setFieldErrors] = useState({
        fullName: false,
        email: false,
        phone: false,
        customCollege: false,
        branch: false,
        year: false,
        collegeIdCard: false,
        projectTitle: false,
        projectDomain: false,
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

    const handleTeamMemberChange = (index, field, value) => {
        const updatedTeam = [...formData.team];
        updatedTeam[index] = { ...updatedTeam[index], [field]: value };
        setFormData({ ...formData, team: updatedTeam });
    };

    const addTeamMember = () => {
        if (formData.team.length < 2) {
            setFormData({
                ...formData,
                team: [...formData.team, { name: "", email: "", phone: "", college: "", branch: "", year: "" }]
            });
        }
    };

    const removeTeamMember = (index) => {
        const updatedTeam = formData.team.filter((_, i) => i !== index);
        setFormData({ ...formData, team: updatedTeam });
        if (updatedTeam.length === 0) {
            setHasTeamMembers(false);
        }
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
            case 'branch':
                isInvalid = !value || value.trim().length === 0;
                break;
            case 'year':
                isInvalid = !value || value === "";
                break;
            case 'collegeIdCard':
                isInvalid = !value;
                break;
            case 'projectTitle':
                isInvalid = !value || value.trim().length < 3;
                break;
            case 'projectDomain':
                isInvalid = !value || value === "";
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

    const validateCurrentStep = () => {
        let hasError = false;
        let updatedErrors = { ...fieldErrors };

        if (step === 0) {
            const step0Fields = ['fullName', 'email', 'phone', 'branch', 'year', 'collegeIdCard'];
            if (formData.college === 'Other') step0Fields.push('customCollege');

            step0Fields.forEach((field) => {
                const val = field === 'customCollege' ? customCollege : formData[field];
                const err = validateField(field, val);
                if (err) hasError = true;
                updatedErrors[field] = err;
            });
        } else if (step === 1) {
            // Team members validation (if enabled)
            if (hasTeamMembers) {
                for (let i = 0; i < formData.team.length; i++) {
                    const m = formData.team[i];
                    if (!m.name || !m.email || !m.college) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Member Details Incomplete',
                            text: `Please fill in all details for Team Member ${i + 2}, or remove them.`,
                        });
                        return true;
                    }
                }
            }
        } else if (step === 2) {
            const step2Fields = ['projectTitle', 'projectDomain', 'document'];
            step2Fields.forEach((field) => {
                const err = validateField(field, formData[field]);
                if (err) hasError = true;
                updatedErrors[field] = err;
            });
        }

        setFieldErrors(updatedErrors);
        return hasError;
    };

    const handleNext = async () => {
        if (validateCurrentStep()) {
            if (step === 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Verification Fields Missing',
                    text: 'Please fill in all team leader details and upload your student ID card.',
                });
            } else if (step === 2) {
                Swal.fire({
                    icon: 'error',
                    title: 'Project Details Missing',
                    text: 'Please enter project details and upload your project presentation document (PDF).',
                });
            }
            return;
        }

        if (step === 0) {
            try {
                const res = await axios.post(`${import.meta.env.VITE_SERVER_URL || ''}/api/ips/check-email`, {
                    email: formData.email
                });
                if (res.data?.message === 'Record found') {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Email Already Registered',
                        text: 'This email is already registered for Innovative Project Showcasing.',
                    });
                    return;
                }
            } catch (err) {
                console.log("Check-email skipped/offline");
            }
        }

        const nextStep = Math.min(step + 1, 2);
        setStep(nextStep);
        setTranslateValue(nextStep * 100);
        window.scrollTo({ top: 300, behavior: 'smooth' });
    };

    const handlePrev = () => {
        const prevStep = Math.max(step - 1, 0);
        setStep(prevStep);
        setTranslateValue(prevStep * 100);
        window.scrollTo({ top: 300, behavior: 'smooth' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateCurrentStep()) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Failed',
                text: 'Please upload the project presentation document and complete all required fields.',
            });
            return;
        }

        const submissionData = new FormData();
        submissionData.append('fullName', formData.fullName);
        submissionData.append('email', formData.email);
        submissionData.append('phone', formData.phone);
        submissionData.append('college', formData.college === 'Other' ? customCollege : formData.college);
        submissionData.append('branch', formData.branch);
        submissionData.append('year', formData.year);
        submissionData.append('projectTitle', formData.projectTitle);
        submissionData.append('projectDomain', formData.projectDomain);
        submissionData.append('projectDescription', formData.projectDescription || "");

        if (formData.collegeIdCard) {
            submissionData.append('collegeIdCard', formData.collegeIdCard);
        }
        if (formData.document) {
            submissionData.append('document', formData.document);
        }

        const activeTeam = hasTeamMembers ? formData.team.filter(m => m.name.trim() !== "") : [];
        submissionData.append('team', JSON.stringify(activeTeam));

        setIsSubmitting(true);

        try {
            await axios.post(`${import.meta.env.VITE_SERVER_URL || ''}/api/ips`, submissionData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            Swal.fire({
                icon: 'success',
                title: 'Registration Successful!',
                text: 'Your UG team registration for Innovative Project Showcasing (IPS) has been submitted successfully with zero fees!',
                confirmButtonColor: '#2563eb',
            }).then(() => {
                window.location.href = "/";
            });
        } catch (error) {
            console.error("IPS submission error:", error);
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
                            <img src='/activities/1.png' className="w-[50px] lg:w-[45px]" alt="IPS" />
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl leading-tight text-center sm:text-left mb-0 font-extrabold text-gray-900">
                                Innovative Project Showcasing (IPS)
                            </h2>
                        </div>
                        <span className='px-4 py-1 bg-blue-100 text-blue-800 font-bold rounded-full text-sm border border-blue-200'>
                            For Undergraduate (UG) Students • Teams up to 3 Members • FREE Registration
                        </span>
                        <p className='w-full max-w-3xl text-sm sm:text-base leading-relaxed text-center text-gray-700 m-0'>
                            The innovative project showcase is intended for undergraduate (UG) teams with a maximum of three members per team. Teams can present a project, prototype, or technical solution and explain the problem it addresses, its architectural design, its implementation, and its potential real-world value.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-3 mt-2 text-xs sm:text-sm font-semibold text-gray-600">
                            <span className="flex items-center gap-1 bg-emerald-50 px-3 py-1 rounded-lg text-emerald-800">
                                <FaCheckCircle className="text-emerald-500" /> Free of Cost (₹0/-)
                            </span>
                            <span className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-lg text-blue-800">
                                <FaUsers className="text-blue-500" /> Team Size: 1 to 3 Members
                            </span>
                            <span className="flex items-center gap-1 bg-purple-50 px-3 py-1 rounded-lg text-purple-800">
                                <FaLaptopCode className="text-purple-500" /> Working Prototype or Software Demo
                            </span>
                        </div>
                    </div>

                    {/* Step indicator */}
                    <div className="flex justify-center items-center max-w-xl mx-auto w-full gap-2 sm:gap-4">
                        <div className={`flex items-center gap-2 text-xs sm:text-sm font-bold ${step === 0 ? "text-blue-700" : "text-gray-400"}`}>
                            <span className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white ${step === 0 ? "bg-blue-600" : "bg-gray-400"}`}>1</span>
                            <span>Team Leader</span>
                        </div>
                        <div className="h-0.5 w-8 sm:w-12 bg-gray-300"></div>
                        <div className={`flex items-center gap-2 text-xs sm:text-sm font-bold ${step === 1 ? "text-blue-700" : "text-gray-400"}`}>
                            <span className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white ${step === 1 ? "bg-blue-600" : "bg-gray-400"}`}>2</span>
                            <span>Members</span>
                        </div>
                        <div className="h-0.5 w-8 sm:w-12 bg-gray-300"></div>
                        <div className={`flex items-center gap-2 text-xs sm:text-sm font-bold ${step === 2 ? "text-blue-700" : "text-gray-400"}`}>
                            <span className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white ${step === 2 ? "bg-blue-600" : "bg-gray-400"}`}>3</span>
                            <span>Project</span>
                        </div>
                    </div>

                    {/* Registration Form */}
                    <Form
                        onSubmit={handleSubmit}
                        className="relative overflow-hidden w-full max-w-2xl py-6 bg-gradient-to-br from-blue-100/60 to-purple-100/60 backdrop-blur-md rounded-2xl mx-auto shadow-md border border-gray-200"
                    >
                        <div
                            className="flex transition-transform duration-300 ease-in-out"
                            style={{ transform: `translateX(-${translateValue}%)` }}
                        >
                            {/* Slide 1: Team Leader Verification */}
                            <div className="w-full sm:min-w-full flex-shrink-0 box-border px-6 sm:px-8">
                                <h4 className="text-lg font-bold text-center text-gray-900 mb-1">
                                    Team Leader (Basic Verification)
                                </h4>
                                <p className="text-xs text-gray-600 text-center mb-4">
                                    The team leader acts as primary contact. Student ID upload is mandatory for verification.
                                </p>

                                <FloatingLabel controlId="fullName" label="Leader Full Name *" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        name="fullName"
                                        placeholder="Full Name"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        isInvalid={fieldErrors.fullName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter full name.
                                    </Form.Control.Feedback>
                                </FloatingLabel>

                                <FloatingLabel controlId="email" label="Leader Email Address *" className="mb-3">
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
                                            Please enter college name.
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                                    <FloatingLabel controlId="branch" label="Branch / Department *">
                                        <Form.Control
                                            type="text"
                                            name="branch"
                                            placeholder="e.g. CSE, IT, AI&ML"
                                            value={formData.branch}
                                            onChange={handleChange}
                                            isInvalid={fieldErrors.branch}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Branch name is required.
                                        </Form.Control.Feedback>
                                    </FloatingLabel>

                                    <FloatingLabel controlId="year" label="Year of Study *">
                                        <Form.Select
                                            name="year"
                                            value={formData.year}
                                            onChange={handleChange}
                                            isInvalid={fieldErrors.year}
                                        >
                                            <option value="">Select UG Year</option>
                                            <option value="First Year (FY)">First Year (FY)</option>
                                            <option value="Second Year (SY)">Second Year (SY)</option>
                                            <option value="Third Year (TY)">Third Year (TY)</option>
                                            <option value="Final Year (B.Tech)">Final Year (B.Tech)</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Please select year of study.
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </div>

                                {/* College ID Card Upload */}
                                <Form.Group controlId="collegeIdCard" className="mb-3 bg-white/70 p-3 rounded-xl border border-gray-200">
                                    <Form.Label className="font-bold text-sm text-gray-900 flex items-center gap-2">
                                        <FaIdCard className="text-blue-600" /> Leader College ID Card (JPG, PNG, PDF) *
                                    </Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="collegeIdCard"
                                        accept=".jpg,.jpeg,.png,.pdf"
                                        onChange={handleChange}
                                        isInvalid={fieldErrors.collegeIdCard}
                                    />
                                    <Form.Text className="text-xs text-gray-500">
                                        Mandatory for student verification.
                                    </Form.Text>
                                    <Form.Control.Feedback type="invalid">
                                        Please upload your college ID card.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>

                            {/* Slide 2: Team Members (Up to 3 members total) */}
                            <div className="w-full sm:min-w-full flex-shrink-0 box-border px-6 sm:px-8">
                                <h4 className="text-lg font-bold text-center text-gray-900 mb-1">
                                    Team Members (Optional)
                                </h4>
                                <p className="text-xs text-gray-600 text-center mb-4">
                                    Max team size: 3 members. Solo participation is also permitted.
                                </p>

                                <div className="mb-4 bg-white/70 p-4 rounded-xl border border-gray-200">
                                    <Form.Check
                                        type="switch"
                                        id="hasTeamMembers"
                                        label="Our team includes additional members (up to 2 more)"
                                        checked={hasTeamMembers}
                                        onChange={(e) => setHasTeamMembers(e.target.checked)}
                                        className="font-bold text-sm text-gray-800"
                                    />
                                </div>

                                {hasTeamMembers && (
                                    <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
                                        {formData.team.map((member, index) => (
                                            <div key={index} className="p-4 bg-white/80 rounded-xl border border-gray-200 shadow-sm relative">
                                                <div className="flex justify-between items-center mb-3">
                                                    <span className="font-bold text-sm text-blue-900">
                                                        Team Member {index + 2}
                                                    </span>
                                                    {formData.team.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeTeamMember(index)}
                                                            className="text-red-500 hover:text-red-700 text-xs flex items-center gap-1 font-semibold"
                                                        >
                                                            <FaTrash size={10} /> Remove
                                                        </button>
                                                    )}
                                                </div>

                                                <FloatingLabel controlId={`team-${index}-name`} label="Member Name *" className="mb-2">
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Member Name"
                                                        value={member.name}
                                                        onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                                                    />
                                                </FloatingLabel>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                                                    <FloatingLabel controlId={`team-${index}-email`} label="Email *">
                                                        <Form.Control
                                                            type="email"
                                                            placeholder="Email"
                                                            value={member.email}
                                                            onChange={(e) => handleTeamMemberChange(index, 'email', e.target.value)}
                                                        />
                                                    </FloatingLabel>
                                                    <FloatingLabel controlId={`team-${index}-phone`} label="Mobile">
                                                        <Form.Control
                                                            type="tel"
                                                            placeholder="Mobile"
                                                            value={member.phone}
                                                            maxLength={10}
                                                            onChange={(e) => handleTeamMemberChange(index, 'phone', e.target.value)}
                                                        />
                                                    </FloatingLabel>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                    <FloatingLabel controlId={`team-${index}-college`} label="College Name *">
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="College Name"
                                                            value={member.college}
                                                            onChange={(e) => handleTeamMemberChange(index, 'college', e.target.value)}
                                                        />
                                                    </FloatingLabel>
                                                    <FloatingLabel controlId={`team-${index}-branch`} label="Branch *">
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Branch"
                                                            value={member.branch}
                                                            onChange={(e) => handleTeamMemberChange(index, 'branch', e.target.value)}
                                                        />
                                                    </FloatingLabel>
                                                </div>
                                            </div>
                                        ))}

                                        {formData.team.length < 2 && (
                                            <button
                                                type="button"
                                                onClick={addTeamMember}
                                                className="w-full py-2.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold border border-blue-200 flex items-center justify-center gap-2 transition-all"
                                            >
                                                <FaPlus size={10} /> Add Third Team Member
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Slide 3: Project Information */}
                            <div className="w-full sm:min-w-full flex-shrink-0 box-border px-6 sm:px-8">
                                <h4 className="text-lg font-bold text-center text-gray-900 mb-1">
                                    Project Information
                                </h4>
                                <p className="text-xs text-gray-600 text-center mb-4">
                                    Enter prototype details. Zero registration charges apply.
                                </p>

                                <FloatingLabel controlId="projectTitle" label="Project Title *" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        name="projectTitle"
                                        placeholder="Project Title"
                                        value={formData.projectTitle}
                                        onChange={handleChange}
                                        isInvalid={fieldErrors.projectTitle}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Project title is required.
                                    </Form.Control.Feedback>
                                </FloatingLabel>

                                <FloatingLabel controlId="projectDomain" label="Project Domain / Track *" className="mb-3">
                                    <Form.Select
                                        name="projectDomain"
                                        value={formData.projectDomain}
                                        onChange={handleChange}
                                        isInvalid={fieldErrors.projectDomain}
                                    >
                                        <option value="">Select Domain / Track</option>
                                        <option value="AI / ML & Intelligent Systems">AI / ML & Intelligent Systems</option>
                                        <option value="Web & Mobile Applications">Web & Mobile Applications</option>
                                        <option value="IoT, Hardware & Robotics">IoT, Hardware & Robotics</option>
                                        <option value="Cloud, DevOps & Distributed Computing">Cloud, DevOps & Distributed Computing</option>
                                        <option value="Cyber Security & Blockchain">Cyber Security & Blockchain</option>
                                        <option value="Healthcare, FinTech & Social Innovation">Healthcare, FinTech & Social Innovation</option>
                                        <option value="Open Category / Interdisciplinary">Open Category / Interdisciplinary</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Please select project domain.
                                    </Form.Control.Feedback>
                                </FloatingLabel>

                                <FloatingLabel controlId="projectDescription" label="Project Abstract / Problem Statement" className="mb-3">
                                    <Form.Control
                                        as="textarea"
                                        name="projectDescription"
                                        placeholder="Project Abstract"
                                        value={formData.projectDescription}
                                        onChange={handleChange}
                                        style={{ height: '90px' }}
                                    />
                                </FloatingLabel>

                                {/* Project Presentation Document Upload */}
                                <Form.Group controlId="document" className="mb-4 bg-white/70 p-3 rounded-xl border border-gray-200">
                                    <Form.Label className="font-bold text-sm text-gray-900 flex items-center gap-2">
                                        <FaLaptopCode className="text-blue-600" /> Upload Project Presentation / Synopsis (PDF) *
                                    </Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="document"
                                        accept=".pdf"
                                        onChange={handleChange}
                                        isInvalid={fieldErrors.document}
                                    />
                                    <Form.Text className="text-xs text-gray-500">
                                        Upload your PPT-converted-to-PDF or synopsis report (Max 10MB).
                                    </Form.Text>
                                    <Form.Control.Feedback type="invalid">
                                        Please upload your project document.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* Zero Fees Notice */}
                                <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-center mb-2">
                                    <span className="text-xs font-bold text-blue-900 uppercase tracking-wide">
                                        Registration Fee: Free of Cost (₹0/-)
                                    </span>
                                    <p className="text-[11px] text-blue-700 m-0">
                                        No payment or charges are applicable for Innovative Project Showcasing.
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

                            {step < 2 && (
                                <button
                                    type='button'
                                    className='px-6 py-2.5 text-sm font-bold text-white rounded-xl bg-blue-600 hover:bg-blue-700 shadow-md transition-all'
                                    onClick={handleNext}
                                >
                                    {step === 0 ? "Next: Team Members" : "Next: Project Info"}
                                </button>
                            )}

                            {step === 2 && (
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

export default IPS;
