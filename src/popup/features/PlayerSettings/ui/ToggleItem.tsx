import { ToggleBtn } from "shared/ui/ToggleBtn";

type Props = {
  title: string;
};

export const ToggleItem = ({ title }: Props) => {
  return (
    <div className="flex gap-2 w-full">
      <ToggleBtn />
      <span className="text-dark-400">{title}</span>
    </div>
  );
};
