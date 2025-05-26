export class VideoPlayerManager {
  private video: HTMLVideoElement | null = null;

  constructor() {
    this.video = document.querySelector("video");
  }

  private waitForVideo(): Promise<HTMLVideoElement> {
    return new Promise((resolve) => {
      const existing = document.querySelector("video");
      if (existing) return resolve(existing);

      const observer = new MutationObserver(() => {
        const video = document.querySelector("video");
        if (video) {
          observer.disconnect();
          resolve(video);
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });
    });
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
  public async pictureInPicture(toggleState: boolean) {
    const video = this.video || (await this.waitForVideo());
    this.video = video;

    try {
      if (toggleState) {
        await video.requestPictureInPicture();
      } else if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      }
    } catch (err) {
      console.error("[PiP] Error:", err);
    }
  }

  public async slowPlayback(toggleState: boolean) {
    const video = this.video || (await this.waitForVideo());
    this.video = video;
    try {
      video.playbackRate = toggleState ? 0.5 : 1.0;
    } catch (err) {
      console.error("[SlowPlayback] Error:", err);
    }
  }
}
