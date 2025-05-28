import { ToggleBtn } from "shared/ui/ToggleBtn";

type Props = {
  title: string;
  isOn: boolean;
  onToggle: () => void;
};

export const ToggleItem = ({ title, isOn, onToggle }: Props) => {
  return (
    <div className="flex gap-2 w-full">
      <ToggleBtn isOn={isOn} onClick={onToggle} />
      <span className="text-dark-400">{title}</span>
    </div>
  );
};
