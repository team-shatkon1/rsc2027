import { IoSend } from "react-icons/io5";

const SubmissionGuidelines = () => {
    const guidelines = [
        {
            title: "Adherence to Format",
            content: "All presentations (PPTs, posters, or prototypes) must strictly follow the provided format and guidelines published by the organisers."
        },
        {
            title: "Equal Contribution",
            content: "Team events (Innovative Project Showcasing) require meaningful and equal contribution from all registered members during presentations."
        },
        {
            title: "Academic Integrity & Originality",
            content: "Submissions must be original. Referenced material must be appropriately cited. Plagiarism or unauthorised use of content will result in disqualification."
        },
        {
            title: "Time Management",
            content: "Participants must adhere strictly to the allotted presentation slots and mentoring schedules communicated by the organisers."
        },
        {
            title: "Advance Abstract Submission (Ph.D. Workshop)",
            content: "Ph.D. workshop participants must submit their research abstract in advance so the organising committee can match them with a domain-appropriate mentor."
        },
        {
            title: "Basic Student / Scholar Verification",
            content: "Every participant must upload their valid College / Institute ID Card during registration to complete verification."
        }
    ];

    return (
        <section id="guidelines" data-aos='fade-up' className="mx-auto px-6 pt-24 mt-6 w-full lg:w-[85%]">
            <div className="text-center mb-10">
                <span className="text-blue-600 font-bold tracking-wider uppercase text-sm bg-blue-100 px-4 py-1 rounded-full">
                    Rules & Compliance
                </span>
                <h1 className="text-4xl sm:text-5xl leading-snug text-center text-black font-bold mt-3 mb-2 uppercase">
                    Submission Guidelines
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                    Please review the symposium criteria before submitting your forms and documents.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto max-w-5xl">
                {guidelines.map((guideline, index) => (
                    <div
                        key={index}
                        className="flex items-start bg-white/70 backdrop-blur-md rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all"
                    >
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-3 rounded-xl flex-shrink-0 mt-0.5 shadow">
                            <IoSend size={20} />
                        </div>
                        <div className="ml-4 text-sm flex flex-col">
                            <span className="font-bold text-gray-900 text-base mb-1">{guideline.title}</span>
                            <span className="text-gray-700 leading-relaxed text-justify">{guideline.content}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SubmissionGuidelines;
