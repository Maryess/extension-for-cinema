import { PlayerSettingsList } from "features/PlayerSettings";
import { SettingsWrapper } from "widgets/SettingsWrapper";
import { SubtitleSelect } from "widgets/SubtitleSelect/ui/SubtitleSelect";

export const Settings = () => {
  return (
    <div className="flex flex-col gap-6">
      <SettingsWrapper />
      <SubtitleSelect />
      <PlayerSettingsList />
    </div>
  );
};
