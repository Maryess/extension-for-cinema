import { usePlayerSetting } from "./usePlayerSettings";

export const usePlayerSettingsConfig = () => {
  const [subtitleOn, toggleSubtitle] = usePlayerSetting("showSubtitle");
  const [pipOn, togglePip] = usePlayerSetting("pictureInPicture");

  return [
    {
      key: "showSubtitle",
      title: "Show subtitle",
      isOn: subtitleOn,
      onToggle: toggleSubtitle,
    },
    {
      key: "pictureInPicture",
      title: "Picture in Picture",
      isOn: pipOn,
      onToggle: togglePip,
    },
  ];
};
