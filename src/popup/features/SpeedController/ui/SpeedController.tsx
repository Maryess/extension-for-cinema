import { useSpeedController } from "../model/useSpeedController";

export const SpeedController = () => {
  const { speed, setSpeed } = useSpeedController(1.0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(parseFloat(e.target.value));
  };

  return (
    <div className="flex flex-col items-center gap-2 outline-none">
      <input
        className="cursor-pointer"
        id="speedRange"
        type="range"
        min="0.5"
        max="2"
        step="0.1"
        value={speed}
        onChange={handleChange}
      />
      <label htmlFor="speedRange">Speed: {speed.toFixed(2)}x</label>
    </div>
  );
};
