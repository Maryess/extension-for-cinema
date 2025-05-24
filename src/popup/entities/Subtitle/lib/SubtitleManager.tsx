export class SubtitleManager {
  private video: HTMLVideoElement | null = null;
  private track: HTMLTrackElement | null = null;

  constructor() {
    this.video = document.body.querySelector("video");
    if (this.video) {
      this.track = this.video.querySelector("track");
    }
  }

  addSubtitle(toggleState: boolean, callBack: () => void) {
    if (!this.track?.track) return;

    this.track.track.mode = toggleState ? "showing" : "disabled";
    console.log(`Subtitles are now ${toggleState ? "ON" : "OFF"}`);
    callBack();
  }
}
