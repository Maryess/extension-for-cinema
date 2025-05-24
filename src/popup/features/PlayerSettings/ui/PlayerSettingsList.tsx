import { ToggleItem } from "./ToggleItem";

export const PlayerSettingsList = () => {
  return (
    <div className="flex flex-col w-full gap-2 text-sm border-r-light-700 border">
      <ToggleItem title="Show subtitle" />
      <ToggleItem title="Picture in picture" />
      <ToggleItem title="Slow layer" />
    </div>
  );
};
