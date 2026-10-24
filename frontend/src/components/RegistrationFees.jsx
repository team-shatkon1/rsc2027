import React from "react";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

const RegistrationFees = () => {
    const feePlans = [
        {
            title: "Poster Presentation",
            target: "Postgraduate (PG) Students",
            fee: "FREE",
            lateFee: "FREE",
            features: [
                "Individual presentation format",
                "Concise research visual presentation",
                "Constructive feedback from evaluators",
                "Certificate of presentation",
                "College ID card verification",
            ],
            link: "/posterpresentation",
            buttonText: "Register (Free)",
            popular: false,
        },
        {
            title: "Innovative Project Showcasing",
            target: "Undergraduate (UG) Teams (Max 3 Members)",
            fee: "FREE",
            lateFee: "FREE",
            features: [
                "Team participation (1 to 3 members)",
                "Prototype demonstration and solution design",
                "Certificates for contributing team members",
                "Evaluation by academic and industry judges",
                "College ID card verification",
            ],
            link: "/ips",
            buttonText: "Register (Free)",
            popular: false,
        },
        {
            title: "Ph.D. Research Workshop",
            target: "Ph.D. Scholars & Research Aspirants",
            fee: "₹800/-",
            feeNote: "Early Bird Registration",
            lateFee: "₹1000/- (Late Registration)",
            features: [
                "Two days of practical research problem-solving",
                "Dedicated 30-minute 1-on-1 expert mentoring session",
                "Advance domain-based abstract review",
                "Guidance on bottlenecks, methods, and validation",
                "Online fee payment with receipt upload",
            ],
            link: "/phd-workshop",
            buttonText: "Register (Paid)",
            popular: true,
        },
    ];

    return (
        <section id="registration-fees" data-aos="fade-up" className="mx-auto px-6 sm:px-4 pt-24 mt-6 w-full lg:w-[85%]">
            <div className="text-center mb-12">
                <span className="text-blue-700 font-bold tracking-wider uppercase text-xs bg-blue-100 px-3.5 py-1 rounded-full">
                    Registration Tracks
                </span>
                <h2 className="text-4xl sm:text-5xl leading-snug text-center text-black font-bold mt-3 mb-2 uppercase">
                    Registration Fees
                </h2>
                <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                    Three separate registration paths tailored to UG students, PG students, and Ph.D. scholars.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {feePlans.map((plan, index) => (
                    <div
                        key={index}
                        className={`relative rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between transition-all duration-300 ${
                            plan.popular
                                ? "bg-white/80 border-2 border-indigo-500 shadow-lg scale-[1.01]"
                                : "bg-white/60 border border-gray-200 shadow-sm hover:shadow-md"
                        }`}
                    >
                        {plan.popular && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[11px] font-bold uppercase tracking-wider py-1 px-3.5 rounded-full shadow">
                                Includes 1-on-1 Mentoring
                            </div>
                        )}

                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">{plan.title}</h3>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
                                {plan.target}
                            </p>

                            <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-100 mb-6 text-center">
                                <div className="text-3xl font-extrabold text-gray-900">{plan.fee}</div>
                                {plan.feeNote && (
                                    <div className="text-xs font-semibold text-indigo-700 mt-1">{plan.feeNote}</div>
                                )}
                                <div className="text-xs text-gray-500 mt-1">
                                    Late Registration: <span className="font-semibold">{plan.lateFee}</span>
                                </div>
                            </div>

                            <ul className="space-y-3 mb-6 text-sm text-gray-700">
                                {plan.features.map((feat, i) => (
                                    <li key={i} className="flex items-start gap-2.5">
                                        <FaCheck className="text-green-600 mt-1 flex-shrink-0" size={12} />
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Link
                            to={plan.link}
                            className={`w-full py-2.5 px-4 rounded-xl text-center font-bold text-sm transition-all duration-200 ${
                                plan.popular
                                    ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow"
                                    : "bg-gradient-to-r from-[#90d8f7] to-[#fcb2e7] text-gray-900 hover:opacity-90"
                            }`}
                        >
                            {plan.buttonText}
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RegistrationFees;
