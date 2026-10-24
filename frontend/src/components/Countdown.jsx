import { useState, useEffect } from "react";

const Countdown = () => {
  const [days, setDays] = useState("00");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  useEffect(() => {
    const targetDate = new Date(2027, 2, 11, 0, 0, 0, 0).getTime(); // March 11, 2027
    const pad = (n) => (n < 10 ? "0" : "") + n;

    const interval = setInterval(() => {
      const currentDate = new Date().getTime();
      const secondsLeft = Math.max(0, (targetDate - currentDate) / 1000);

      setDays(pad(parseInt(secondsLeft / 86400)));
      setHours(pad(parseInt((secondsLeft % 86400) / 3600)));
      setMinutes(pad(parseInt((secondsLeft % 3600) / 60)));
      setSeconds(pad(parseInt(secondsLeft % 60)));

      if (secondsLeft === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center w-full lg:w-1/2 object-contain mx-auto mb-8 text-pink-200">
      <div className="text-center px-3 w-20 sm:w-24 bg-transparent border-r-2 border-blue-100">
        <span className="text-blue-100 font-bold text-3xl sm:text-5xl leading-none">
          {days}
        </span>
        <p className="text-blue-200 font-bold text-md sm:text-lg">DAYS</p>
      </div>
      <div className="text-center px-3 w-20 sm:w-24 bg-transparent border-r-2 border-blue-100">
        <span className="text-blue-100 font-bold text-3xl sm:text-5xl leading-none">
          {hours}
        </span>
        <p className="text-blue-200 font-bold text-md sm:text-lg">HRS</p>
      </div>
      <div className="text-center px-3 w-20 sm:w-24 bg-transparent border-r-2 border-blue-100">
        <span className="text-blue-100 font-bold text-3xl sm:text-5xl leading-none">
          {minutes}
        </span>
        <p className="text-blue-200 font-bold text-md sm:text-lg">MINS</p>
      </div>
      <div className="text-center px-3 w-20 sm:w-24 bg-transparent">
        <span className="text-blue-100 font-bold text-3xl sm:text-5xl leading-none">
          {seconds}
        </span>
        <p className="text-blue-200 font-bold text-md sm:text-lg">SECS</p>
      </div>
    </div>
  );
};

export default Countdown;
