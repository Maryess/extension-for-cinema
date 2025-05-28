import { SubtitlesForm } from "features/SubtitlesForm/ui/SubtitlesForm";
import { SpeedController } from "features/SpeedController/ui/SpeedController";
import { PlayerSettingsList } from "features/PlayerSettings";
import { SubtitleSelect } from "features/SubtitlesSelect";

export const PlayerSettingsPanel = () => {
  return (
    <div className="flex flex-col gap-4 p-4 rounded-xl w-[300px]">
      <SubtitlesForm />
      <SubtitleSelect />
      <PlayerSettingsList />
      <SpeedController />
    </div>
  );
};
