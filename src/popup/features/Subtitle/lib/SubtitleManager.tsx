export class SubtitleManager {
  private video: HTMLVideoElement | null = null;

  constructor() {
    this.video = document.querySelector("video");
  }

  public addSubtitle(toggleState: boolean, subtitlePath: string) {
    if (!this.video) {
      this.video = document.querySelector("video");
      if (!this.video) {
        console.warn("Video not found");
        return;
      }
    }

    const existingTrack = this.video.querySelector("track[data-managed]");

    if (toggleState) {
      if (existingTrack) {
        console.log("Subtitles already ON");
        return;
      }

      const track = document.createElement("track");
      track.kind = "subtitles";
      track.label = "Subtitles";
      track.srclang = "en";
      track.src = `/uploads/movies/${subtitlePath}.vtt`;
      track.default = true;
      track.setAttribute("data-managed", "true");

      this.video.appendChild(track);
    } else {
      if (!existingTrack) {
        console.log("Subtitles already OFF");
        return;
      }
      existingTrack.remove();
    }
  }
}
