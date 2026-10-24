import React from "react";
import { Link } from "react-router-dom";
import { FaUserCheck, FaLayerGroup, FaUserTie, FaFileAlt, FaComments, FaRoad, FaCheckCircle } from "react-icons/fa";

const WorkshopHighlight = () => {
    const steps = [
        {
            num: "1",
            icon: <FaFileAlt className="text-blue-600" size={18} />,
            title: "Abstract Submission",
            desc: "Participants provide a concise description of their research topic, problem, objectives, current approach, progress, and the specific challenge they want to discuss.",
        },
        {
            num: "2",
            icon: <FaLayerGroup className="text-blue-600" size={18} />,
            title: "Domain Categorisation",
            desc: "Submissions are reviewed and grouped by relevant research area across computing and allied disciplines.",
        },
        {
            num: "3",
            icon: <FaUserTie className="text-blue-600" size={18} />,
            title: "Expert Matching",
            desc: "Organisers identify an available expert whose domain knowledge aligns with the participant's research topic.",
        },
        {
            num: "4",
            icon: <FaUserCheck className="text-blue-600" size={18} />,
            title: "Advance Review",
            desc: "The abstract is shared with the matched expert before the session, where scheduling arrangements permit.",
        },
        {
            num: "5",
            icon: <FaComments className="text-blue-600" size={18} />,
            title: "Individual Consultation",
            desc: "Each scheduled participant receives a dedicated 30-minute one-on-one consultation with their domain expert.",
        },
        {
            num: "6",
            icon: <FaRoad className="text-blue-600" size={18} />,
            title: "Actionable Next Steps",
            desc: "Participants use the discussion to clarify possible approaches, identify unresolved questions, and plan practical next steps.",
        },
    ];

    const discussionPoints = [
        "Whether the research problem and its contribution are sufficiently clear",
        "How to strengthen the research gap, objectives, or critical literature review",
        "Whether the selected methodology or algorithm fits the problem",
        "How to approach an unresolved technical or experimental bottleneck",
        "How to validate findings and assess the credibility of results",
        "Which next steps, alternatives, or questions deserve further investigation",
    ];

    return (
        <section id="workshop-highlight" data-aos="fade-up" className="mx-auto px-6 sm:px-4 pt-24 mt-6 w-full lg:w-[85%]">
            <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-blue-900/50 relative overflow-hidden">
                <div className="relative z-10">
                    <div className="inline-block bg-blue-500/20 border border-blue-400/30 px-3.5 py-1 rounded-full text-blue-200 text-xs font-semibold uppercase tracking-wider mb-4">
                        Day 3 Signature Feature
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-3">
                        Dedicated 30-Minute, One-on-One Mentoring
                    </h2>

                    <p className="text-xl sm:text-2xl font-medium text-blue-200 italic mb-6">
                        Your Research. Your Challenge. Your Expert.
                    </p>

                    <p className="text-base text-gray-300 max-w-3xl leading-relaxed mb-8 text-justify sm:text-left">
                        In a conventional workshop, most participants receive general advice. At RSC 2027, the mentoring model is tailored to the participant's submitted research abstract and domain. This gives participants a dedicated opportunity to discuss their own work with a domain-matched expert, rather than relying only on general examples.
                    </p>

                    {/* Core Message Callout */}
                    <div className="bg-white/10 backdrop-blur-md border-l-4 border-blue-400 rounded-r-2xl p-5 mb-10 max-w-2xl">
                        <div className="text-xs uppercase font-bold text-blue-300 tracking-wider mb-1">
                            Core Objective
                        </div>
                        <div className="text-lg sm:text-xl font-semibold text-white leading-snug">
                            "Participants do not just learn about research; they get an opportunity to receive guidance on their own research."
                        </div>
                    </div>

                    {/* Mentoring Process Grid */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
                        How the Mentoring Process Works
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                        {steps.map((st) => (
                            <div key={st.num} className="bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 rounded-xl p-5 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                                            {st.icon}
                                        </div>
                                        <span className="text-xs font-bold text-blue-300 bg-blue-500/20 px-2.5 py-0.5 rounded-full">
                                            Step {st.num}
                                        </span>
                                    </div>
                                    <h4 className="font-bold text-base text-white mb-1.5">{st.title}</h4>
                                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{st.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* What Participants Can Discuss */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
                        <h4 className="text-lg font-bold text-white mb-4">
                            What Participants Can Discuss
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {discussionPoints.map((point, idx) => (
                                <div key={idx} className="flex items-start gap-2.5 text-sm text-gray-200">
                                    <FaCheckCircle className="text-emerald-400 mt-1 flex-shrink-0" size={14} />
                                    <span>{point}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA row */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                        <div className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
                            Advance abstract submission enables domain-based expert matching and review.
                        </div>
                        <Link
                            to="/phd-workshop"
                            className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-slate-950 bg-gradient-to-r from-blue-200 via-indigo-100 to-pink-200 hover:from-blue-100 hover:to-pink-100 rounded-full shadow-md transition-all duration-200"
                        >
                            Register for Ph.D. Workshop
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WorkshopHighlight;
