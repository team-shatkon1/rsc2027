import React from "react";

const ChairCoordinator = () => {
    return (
        <section
            data-aos='fade-up'
            className="flex flex-col items-center justify-center pt-16 mt-4 px-6 mx-auto container w-full lg:w-[85%]"
        >
            <div className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div data-aos="zoom-out-up">
                    <h2 className="text-xl sm:text-2xl text-center text-gray-900 font-bold mb-4 uppercase tracking-wide">
                        Chair
                    </h2>
                    <div className="p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-center gap-1 text-black text-center">
                        <p className="text-blue-700 text-lg font-bold leading-tight">Dr. Medha A. Shah</p>
                        <p className="text-sm font-semibold text-gray-800">Associate Professor, Dean CAS</p>
                        <p className="text-xs text-gray-600">Walchand College of Engineering, Sangli</p>
                    </div>
                </div>
                <div data-aos="zoom-out-up">
                    <h2 className="text-xl sm:text-2xl text-center text-gray-900 font-bold mb-4 uppercase tracking-wide">
                        Coordinator
                    </h2>
                    <div className="p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-center gap-1 text-black text-center">
                        <p className="text-blue-700 text-lg font-bold leading-tight">Ms. Pooja D. Mundada</p>
                        <p className="text-sm font-semibold text-gray-800">Assistant Professor, CSE</p>
                        <p className="text-xs text-gray-600">Walchand College of Engineering, Sangli</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChairCoordinator;
