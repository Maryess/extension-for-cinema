import { useState } from "react";

export const ToggleBtn = () => {
  const [isOn, setIsOn] = useState(false);
  const toggle = () => setIsOn(!isOn);

  return (
    <div className="relative w-12 h-7 rounded-full bg-accent-blue-300 transition-colors duration-300 overflow-visible flex items-center">
      <div
        onClick={toggle}
        className={`absolute bg-white w-5 h-5 cursor-pointer rounded-full shadow-md ${
          isOn ? "right-1" : "left-1"
        }`}
      />
    </div>
  );
};
