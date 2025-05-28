import { usePlayerSettingsConfig } from "../model/playerSettingsConfig";
import { ToggleItem } from "./ToggleItem";

export const PlayerSettingsList = () => {
  const settings = usePlayerSettingsConfig();

  return (
    <div className="flex flex-col w-full gap-2 text-sm border-r-light-700 border">
      {settings.map(({ key, title, isOn, onToggle }) => (
        <ToggleItem key={key} title={title} isOn={isOn} onToggle={onToggle} />
      ))}
    </div>
  );
};
