import React from "react";
import { Link } from "react-router-dom";

const topics = [
    {
        id: 1,
        title: "Poster Presentation",
        subtitle: "PG Students • Individual",
        feeBadge: "FREE",
        description:
            "Intended for postgraduate (PG) students to communicate research questions, methods, findings, or work in progress in a concise visual format. Encourages focused academic discussion and peer feedback.",
        logo: "/activities/2.png",
        url: "/posterpresentation",
        ctaText: "Register for Poster (Free)",
        highlight: false,
    },
    {
        id: 2,
        title: "Innovative Project Showcasing",
        subtitle: "UG Students • Teams up to 3",
        feeBadge: "FREE",
        description:
            "Intended for undergraduate (UG) teams to present a project, prototype, or technical solution. Teams explain the problem addressed, design, implementation, and potential value to academic and industry judges.",
        logo: "/activities/1.png",
        url: "/ips",
        ctaText: "Register for IPS (Free)",
        highlight: false,
    },
    {
        id: 3,
        title: "Ph.D. Research Workshop",
        subtitle: "Ph.D. Scholars & Researchers",
        feeBadge: "₹800 / ₹1000",
        description:
            "A hands-on workshop focused on research problem-solving, literature synthesis, and methodology. Features an individual 30-minute one-on-one consultation with an expert matched to your research domain.",
        logo: "/activities/3.png",
        url: "/phd-workshop",
        ctaText: "Register for Workshop (Paid)",
        highlight: true,
    },
];

const FeaturedActivities = () => {
    return (
        <section id="activities" data-aos='fade-up' className="mx-auto px-6 sm:px-4 pt-24 mt-6 w-full lg:w-[85%]">
            <div className="text-center mb-12">
                <span className="text-blue-700 font-bold tracking-wider uppercase text-xs bg-blue-100 px-3.5 py-1 rounded-full">
                    Symposium Tracks
                </span>
                <h2 className="text-4xl sm:text-5xl leading-snug text-center text-black font-bold mt-3 mb-2 uppercase">
                    Featured Activities
                </h2>
                <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                    Three dedicated events designed to support academic inquiry, technical creativity, and doctoral research.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto">
                {topics.map((topic) => (
                    <div
                        key={topic.id}
                        className={`group relative justify-between backdrop-blur-md rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col p-6 duration-300 ease-in-out ${
                            topic.highlight
                                ? "bg-white/80 border-2 border-indigo-400"
                                : "bg-white/60 border border-gray-200"
                        }`}
                    >
                        {topic.highlight && (
                            <div className="absolute -top-3 right-4 bg-indigo-600 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full shadow">
                                1-on-1 Mentoring
                            </div>
                        )}

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-xl bg-white border border-gray-200 flex items-center justify-center p-2 flex-shrink-0">
                                    <img src={topic.logo} className="w-full h-full object-contain" alt={topic.title} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 leading-snug">
                                        {topic.title}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs text-gray-500 font-medium">{topic.subtitle}</span>
                                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                                            topic.feeBadge === "FREE"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-blue-100 text-blue-800"
                                        }`}>
                                            {topic.feeBadge}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm leading-relaxed text-justify">
                                {topic.description}
                            </p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-100">
                            <Link
                                to={topic.url}
                                className={`inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-bold rounded-full transition-all duration-200 shadow-sm ${
                                    topic.highlight
                                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                                        : "bg-gradient-to-r from-[#90d8f7] to-[#fcb2e7] text-black hover:opacity-90"
                                }`}
                            >
                                {topic.ctaText}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedActivities;
