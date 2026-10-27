import React from "react";
import Countdown from "./Countdown";

const Header = () => {
    return (
        <section id='hero' data-aos='fade-in' className="flex flex-col min-h-[90vh] justify-center items-center gap-6 h-auto w-full lg:w-[85%] mx-auto px-4 pb-8 pt-24 text-black">
            <div className="flex flex-col items-center text-center">
                <span className="text-xs sm:text-sm font-extrabold tracking-widest uppercase bg-white/20 text-blue-200 border border-white/30 px-4 py-1.5 rounded-full mb-3 backdrop-blur-md">
                    Walchand College of Engineering, Sangli • ACM Student Chapter
                </span>
                <span
                    id="main_title"
                    className="text-transparent flex flex-col text-center text-4xl pb-3 sm:pb-6 sm:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-[#ffc4eb] to-[#c5eeff] bg-clip-text"
                >
                    <span className="leading-snug">9th Research Symposium On</span>
                    <span className="leading-snug">Computing (RSC 2027)</span>
                </span>
                <div
                    id="year"
                    className="text-2xl font-black lg:text-4xl text-white tracking-wider"
                >
                    11 MARCH 2027
                </div>
                <div
                    id="tagline"
                    className="text-base sm:text-xl lg:text-2xl mt-3 font-extrabold text-blue-100 tracking-wide"
                >
                    INNOVATE | PRESENT | INSPIRE
                </div>
                <p className="mt-4 text-sm sm:text-base font-medium text-gray-200 text-center max-w-2xl leading-relaxed">
                    A three-day premier academic symposium combining postgraduate research posters, undergraduate innovative prototypes, and a dedicated Ph.D. Research Workshop featuring 30-minute one-on-one domain expert mentoring.
                </p>

                {/* Direct Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3 mt-6 z-10">
                    <a
                        href="#activities"
                        className="px-6 py-3 bg-gradient-to-r from-[#ffc4eb] to-[#c5eeff] text-gray-900 font-extrabold rounded-full text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                    >
                        Register for Tracks →
                    </a>
                    <a
                        href="#programme"
                        className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-bold rounded-full text-sm sm:text-base border border-white/40 backdrop-blur-md transition-all"
                    >
                        View 3-Day Programme
                    </a>
                </div>
            </div>
            <Countdown />
        </section>
    );
};

export default Header;
