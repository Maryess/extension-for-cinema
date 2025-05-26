import { usePlayerSetting } from "../model/usePlayerSettings";
import { ToggleItem } from "./ToggleItem";

export const PlayerSettingsList = () => {
  const [subtitleOn, toggleSubtitle] = usePlayerSetting("showSubtitle");
  const [pipOn, togglePip] = usePlayerSetting("pictureInPicture");
  const [slowOn, toggleSlow] = usePlayerSetting("slowMode");

  const settings = [
    {
      key: "showSubtitle",
      title: "Show subtitle",
      isOn: subtitleOn,
      func: toggleSubtitle,
    },
    {
      key: "pictureInPicture",
      title: "Picture in Picture",
      isOn: pipOn,
      func: togglePip,
    },
    {
      key: "slowMode",
      title: "Slow Playback",
      isOn: slowOn,
      func: toggleSlow,
    },
  ];

  return (
    <div className="flex flex-col w-full gap-2 text-sm border-r-light-700 border">
      {settings.map(({ key, title, isOn, func }) => (
        <ToggleItem key={key} title={title} item={{ key, isOn, func }} />
      ))}
    </div>
  );
};
