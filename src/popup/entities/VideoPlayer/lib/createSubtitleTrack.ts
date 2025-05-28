export function createSubtitleTrack(
  lang: string,
  src: string,
  label: string
): HTMLTrackElement {
  const track = document.createElement("track");
  track.kind = "subtitles";
  track.label = label;
  track.srclang = lang;
  track.src = `/translated/${src}`;
  track.default = true;
  track.setAttribute("data-managed", "true");
  track.setAttribute("data-lang", lang);

  return track;
}
