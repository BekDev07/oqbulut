import { useState, useEffect } from "react";

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", updatePosition);

    return () => document.removeEventListener("mousemove", updatePosition);
  }, []);

  return (
    <div
      className="bg-white-500 fixed z-50 h-10 w-10 rounded-full border border-customBlue opacity-100"
      style={{
        left: position.x - 20, // Adjust size and offset
        top: position.y - 20, // Adjust size and offset
        // transition: "left 0.001s ease, top 0.001s ease",
      }}
    ></div>
  );
};

export default Cursor;
