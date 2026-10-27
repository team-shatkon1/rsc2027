import { FaRegCalendarAlt } from "react-icons/fa";

const ImportantDates = () => {
    const dates = [
        { title: "Registration Starts on", date: "1 February 2027" },
        { title: "Last Date for Submission", date: "15 February 2027" },
        { title: "Last Date for Registration", date: "28 February 2027" },
        { title: "Symposium Date", date: "11 March 2027" },
        { title: "Results and Prize Distribution", date: "11 March 2027" },
    ];

    return (
        <div id="dates" className="mx-auto px-6 pt-24 mt-6 w-full lg:w-[85%]">
            <div data-aos='fade-up' className="text-center mb-10">
                <span className="text-blue-600 font-bold tracking-wider uppercase text-sm bg-blue-100 px-4 py-1 rounded-full">
                    Timeline
                </span>
                <h1 className="text-4xl sm:text-5xl leading-snug text-center text-black font-bold mt-3 mb-2 uppercase">
                    Important Dates
                </h1>
            </div>

            <div data-aos="zoom-out-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto max-w-5xl">
                {dates.map((event, index) => (
                    <div
                        key={index}
                        className="flex items-center bg-white/70 backdrop-blur-md rounded-2xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all"
                    >
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-3 rounded-xl flex-shrink-0 shadow">
                            <FaRegCalendarAlt size={22} />
                        </div>
                        <div className="ml-4 flex-1">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-bold text-gray-900">{event.title}</h3>
                                {event.tag && (
                                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded">
                                        {event.tag}
                                    </span>
                                )}
                            </div>
                            <p className="text-blue-700 font-semibold text-sm mt-0.5">{event.date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImportantDates;
