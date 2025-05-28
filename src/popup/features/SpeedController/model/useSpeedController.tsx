import { useCallback, useState } from "react";

export const useSpeedController = (initialSpeed = 1.0) => {
  const [speed, setSpeed] = useState<number>(initialSpeed);

  const updateSpeed = useCallback((value: number) => {
    setSpeed(value);
    const video = document.querySelector("video");
    if (video) {
      video.playbackRate = value;
    }
  }, []);

  return {
    speed,
    setSpeed: updateSpeed,
  };
};
