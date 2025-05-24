import { PlayerSettingsList } from "features/PlayerSettings";
import { InputSelect } from "shared/ui/InputSelect";

const langData = [
  {
    title: "fdfd",
    value: "gfgf",
  },
  {
    title: "fdfd",
    value: "gfgf",
  },
  {
    title: "fdfd",
    value: "gfgf",
  },
];

export const SettingsWrapper = () => {
  return (
    <div className="w-full flex justify-between gap-2">
      <PlayerSettingsList />
      <InputSelect options={langData} />
    </div>
  );
};
