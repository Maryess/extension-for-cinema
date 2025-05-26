import { ToggleBtn } from "shared/ui/ToggleBtn";
import { IToggleItem } from "../types";

export const ToggleItem = ({ title, item }: IToggleItem) => {
  return (
    <div className="flex gap-2 w-full">
      <ToggleBtn onClick={item.func} isOn={item.isOn} />
      <span className="text-dark-400">{title}</span>
    </div>
  );
};
