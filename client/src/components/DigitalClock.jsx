import React, { useState, useEffect } from "react";

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const formatTime = (time) => {
    return time.toLocaleTimeString();
  };

  return (
    <div className="flex items-center justify-center">
      <div className="font-mono text-4xl text-customDarkGrayish">
        {formatTime(time)}
      </div>
    </div>
  );
};

export default DigitalClock;
