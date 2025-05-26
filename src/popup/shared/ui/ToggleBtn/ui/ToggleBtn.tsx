type Props = {
  onClick: () => void;
  isOn: boolean;
};

export const ToggleBtn = ({ onClick, isOn }: Props) => {
  return (
    <div
      className={`relative w-12 h-7 rounded-full transition-all duration-200 overflow-visible flex items-center ${
        isOn ? " bg-accent-blue-300" : "bg-light-700"
      }`}
    >
      <div
        onClick={onClick}
        className={`absolute bg-white w-5 h-5 cursor-pointer rounded-full shadow-md ${
          isOn ? "right-1" : "left-1"
        }`}
      />
    </div>
  );
};
