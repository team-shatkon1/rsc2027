import React from "react";

const Patrons = () => {
    const patronsDetails = [
        { id: 0, name: "Prof. Dr. Surendra S. Rathod", post: "Director", info: "Walchand College of Engineering, Sangli" },
        { id: 1, name: "Mr. Amol Chavan", post: "Member, Admin Council", info: "Walchand College of Engineering, Sangli" },
    ];

    return (
        <section
            data-aos='fade-up'
            className="flex flex-col items-center justify-center pt-24 mt-6 px-6 mx-auto container w-full lg:w-[85%]"
            id="patrons"
        >
            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm bg-blue-100 px-4 py-1 rounded-full mb-3">
                Leadership
            </span>
            <h1 className="text-4xl sm:text-5xl leading-none text-center text-black font-bold mb-10 uppercase">
                Patrons
            </h1>
            <div
                className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
                {patronsDetails.map((person) => (
                    <div
                        className="p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-center gap-1 text-black text-center sm:text-left"
                        key={person.id}
                        data-aos="zoom-out-up"
                    >
                        <p className="text-blue-700 text-xl font-bold leading-tight">
                            {person.name}
                        </p>
                        <p className="text-base font-semibold text-gray-800">{person.post}</p>
                        <p className="text-sm text-gray-600">{person.info}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Patrons;
