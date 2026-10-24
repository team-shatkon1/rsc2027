import React from "react";

const Organizers = () => {
    const convenors = [
        { id: 1, name: "Dr. Anil R. Surve", post: "Head, Department of CSE", info: "WCE Sangli" },
        { id: 2, name: "Dr. Umesh B. Chavan", post: "Head, Department of IT", info: "WCE Sangli" },
        { id: 3, name: "Dr. Vivek N. Waghmare", post: "Head, Department of AI&ML", info: "WCE Sangli" },
    ];

    return (
        <section
            data-aos='fade-up'
            className="flex flex-col items-center justify-center pt-24 mt-6 px-6 mx-auto container w-full lg:w-[85%]"
            id="organizers"
        >
            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm bg-blue-100 px-4 py-1 rounded-full mb-3">
                Symposium Leadership
            </span>
            <h1 className="text-4xl sm:text-5xl leading-none text-center text-black font-bold mb-10 uppercase">
                Convenors
            </h1>

            <div className="w-full lg:w-4/5 grid grid-cols-1 md:grid-cols-3 gap-6">
                {convenors.map((person) => (
                    <div
                        className="p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-center gap-1 text-black text-center"
                        key={person.id}
                        data-aos="zoom-out-up"
                    >
                        <p className="text-blue-700 text-lg font-bold leading-tight">
                            {person.name}
                        </p>
                        <p className="text-sm font-semibold text-gray-800">{person.post}</p>
                        <p className="text-xs text-gray-600">{person.info}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Organizers;
