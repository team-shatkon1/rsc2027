import React from "react";
import { Link } from "react-router-dom";
import { FaChalkboardTeacher, FaUserGraduate, FaHandshake, FaLightbulb } from "react-icons/fa";

const ThreeDayProgramme = () => {
    return (
        <section id="programme" data-aos="fade-up" className="mx-auto px-6 sm:px-4 pt-24 mt-6 w-full lg:w-[85%]">
            <div className="text-center mb-12">
                <span className="text-blue-700 font-bold tracking-wider uppercase text-xs bg-blue-100 px-3.5 py-1 rounded-full">
                    Symposium Schedule
                </span>
                <h2 className="text-4xl sm:text-5xl leading-snug text-center text-black font-bold mt-3 mb-2 uppercase">
                    Three-Day Programme at a Glance
                </h2>
                <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto">
                    The symposium connects research presentation with practical research development. The showcase allows participants to communicate work already undertaken, while the workshop and one-on-one mentoring provide targeted guidance on their own research.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Day 1 */}
                <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-gray-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold uppercase rounded-full">
                                Day 1
                            </span>
                            <span className="text-xs font-semibold text-gray-500">Showcase Track</span>
                        </div>
                        <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                            <FaUserGraduate size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Poster and Project Showcase
                        </h3>
                        <p className="text-gray-700 text-sm leading-relaxed mb-4 text-justify">
                            Postgraduate students present research in a concise visual format, while undergraduate teams present innovative projects and prototypes. The focus is on communicating ideas clearly, demonstrating work, and receiving academic feedback.
                        </p>
                        <ul className="text-sm text-gray-600 space-y-2 mb-4">
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2 font-bold">•</span>
                                <span><strong>Poster Presentation:</strong> For PG students sharing methods, findings, or work in progress.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2 font-bold">•</span>
                                <span><strong>Innovative Project Showcase:</strong> For UG teams (maximum 3 members per team).</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2 font-bold">•</span>
                                <span>Constructive feedback from evaluators and peers.</span>
                            </li>
                        </ul>
                    </div>
                    <div className="pt-3 border-t border-gray-200 flex gap-2">
                        <Link
                            to="/ips"
                            className="flex-1 text-center py-2 px-3 text-xs font-bold rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                        >
                            View IPS (UG)
                        </Link>
                        <Link
                            to="/posterpresentation"
                            className="flex-1 text-center py-2 px-3 text-xs font-bold rounded-lg bg-pink-50 text-pink-700 hover:bg-pink-100 transition-colors"
                        >
                            View Poster (PG)
                        </Link>
                    </div>
                </div>

                {/* Day 2 */}
                <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-gray-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold uppercase rounded-full">
                                Day 2
                            </span>
                            <span className="text-xs font-semibold text-gray-500">Ph.D. Workshop Track</span>
                        </div>
                        <div className="w-11 h-11 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4">
                            <FaChalkboardTeacher size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Research Problem-Solving
                        </h3>
                        <p className="text-gray-700 text-sm leading-relaxed mb-4 text-justify">
                            A structured workshop exploring research challenges. Participants examine frameworks for problem formulation, critical literature review, algorithm selection, and responsible AI-assisted research.
                        </p>
                        <ul className="text-sm text-gray-600 space-y-2 mb-4">
                            <li className="flex items-start">
                                <span className="text-indigo-500 mr-2 font-bold">•</span>
                                <span>Identifying a genuine research gap & formulating problems</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-indigo-500 mr-2 font-bold">•</span>
                                <span>Defining clear objectives & critical literature synthesis</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-indigo-500 mr-2 font-bold">•</span>
                                <span>Methodology, algorithm selection, and optimization strategies</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-indigo-500 mr-2 font-bold">•</span>
                                <span>Experimental design, validation, and credible claims</span>
                            </li>
                        </ul>
                    </div>
                    <div className="pt-3 border-t border-gray-200">
                        <Link
                            to="/phd-workshop"
                            className="block w-full text-center py-2 px-3 text-xs font-bold rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
                        >
                            Explore Workshop Curriculum
                        </Link>
                    </div>
                </div>

                {/* Day 3 */}
                <div className="bg-gradient-to-br from-indigo-50/90 via-white/80 to-purple-50/90 backdrop-blur-md rounded-2xl p-6 border-2 border-indigo-300 shadow-md flex flex-col justify-between hover:shadow-lg transition-all duration-300">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <span className="px-3 py-1 bg-indigo-700 text-white text-xs font-bold uppercase rounded-full">
                                Day 3
                            </span>
                            <span className="text-xs font-bold text-indigo-700 uppercase">Signature Feature</span>
                        </div>
                        <div className="w-11 h-11 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4">
                            <FaHandshake size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                            One-on-One Expert Mentoring
                        </h3>
                        <p className="text-xs font-semibold text-indigo-600 mb-3 uppercase tracking-wide">
                            Dedicated 30-Minute Consultation
                        </p>
                        <p className="text-gray-700 text-sm leading-relaxed mb-4 text-justify">
                            Each participant receives a dedicated 30-minute individual session with an expert matched to their research domain. Sessions focus on the scholar's submitted abstract, methodology, technical bottlenecks, and actionable next steps.
                        </p>
                        <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-100 mb-4 text-xs text-indigo-900">
                            <p className="font-bold mb-1 flex items-center gap-1.5">
                                <FaLightbulb className="text-amber-500" /> Core Message:
                            </p>
                            <p className="italic">
                                Participants do not just learn about research; they get an opportunity to receive guidance on their own research.
                            </p>
                        </div>
                    </div>
                    <div className="pt-3 border-t border-indigo-200">
                        <Link
                            to="/phd-workshop"
                            className="block w-full text-center py-2 px-3 text-xs font-bold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                        >
                            Register for Ph.D. Workshop
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ThreeDayProgramme;
