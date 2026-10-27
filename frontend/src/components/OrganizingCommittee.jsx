import React from "react";

const OrganizingCommittee = () => {
    const committeeMembers = [
        { id: 1, name: "Mr. A. A. Urunkar", post: "Department of CSE", info: "WCE Sangli" },
        { id: 2, name: "Ms. A. S. Pawar", post: "Department of CSE", info: "WCE Sangli" },
        { id: 3, name: "Ms. N. L. Mudegol", post: "Department of CSE", info: "WCE Sangli" },
        { id: 4, name: "Mr. K. S. Khandagle", post: "Department of CSE", info: "WCE Sangli" },
        { id: 5, name: "Mr. H. R. Chandoba", post: "Department of CSE", info: "WCE Sangli" },
        { id: 6, name: "Mr. M. G. Rathi", post: "Department of IT", info: "WCE Sangli" },
        { id: 7, name: "Mr. S. V. Kulkarni", post: "Department of IT", info: "WCE Sangli" },
        { id: 8, name: "Ms. S. S. Solapure", post: "Department of IT", info: "WCE Sangli" },
        { id: 9, name: "Ms. A. B. Patil", post: "Department of AI&ML", info: "WCE Sangli" },
    ];

    return (
        <section
            data-aos='fade-up'
            className="flex flex-col items-center justify-center pt-24 mt-6 px-6 mx-auto container w-full lg:w-[85%]"
            id="organizing-committee"
        >
            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm bg-blue-100 px-4 py-1 rounded-full mb-3">
                Execution Team
            </span>
            <h1 className="text-4xl sm:text-5xl leading-snug text-center text-black font-bold mb-10 uppercase">
                Organizing Committee
            </h1>
            <div
                className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
                {committeeMembers.map((person) => (
                    <div
                        className="p-5 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-center gap-1 text-black text-center sm:text-left"
                        key={person.id}
                        data-aos="zoom-out-up"
                    >
                        <p className="text-blue-700 text-base font-bold leading-tight">
                            {person.name}
                        </p>
                        <p className="text-sm font-semibold text-gray-800">{person.post}</p>
                        <p className="text-xs text-gray-500">{person.info}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default OrganizingCommittee;
