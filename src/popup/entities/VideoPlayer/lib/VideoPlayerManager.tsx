import { createSubtitleTrack } from "./createSubtitleTrack";

export class VideoPlayerManager {
  private video: HTMLVideoElement | null = null;

  constructor() {
    this.video = document.querySelector("video");
  }

  private async ensureVideo(): Promise<HTMLVideoElement> {
    if (this.video) return this.video;

    const existing = document.querySelector("video");
    if (existing) {
      this.video = existing;
      return existing;
    }

    return new Promise((resolve) => {
      const observer = new MutationObserver(() => {
        const video = document.querySelector("video");
        if (video) {
          observer.disconnect();
          this.video = video;
          resolve(video);
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });
    });
  }
  public addTrack(lang: string, src: string, label: string) {
    if (!this.video) return;

    const existing = this.video.querySelector(
      `track[data-managed][data-lang="${lang}"]`
    );
    if (existing) {
      console.log(`Subtitles (${lang}) already ON`);
      return;
    }

    this.video.appendChild(createSubtitleTrack(lang, src, label));
  }

  public async toggleSubtitleByLang(
    toggleState: boolean,
    lang: string,
    subtitlePath: string
  ) {
    const video = await this.ensureVideo();

    if (!video) {
      console.warn("Video not found");
      return;
    }

    this.video = video;

    const langSuffix = lang === "en" ? "" : `.${lang}`;
    const label = `${lang.charAt(0).toUpperCase() + lang.slice(1)} Subtitles`;

    if (toggleState) {
      this.addTrack(lang, `${subtitlePath}${langSuffix}.vtt`, label);
    } else {
      this.removeTrackByLang(lang);
      console.log(`${label} OFF`);
    }
  }

  public async removeTrackByLang(lang: string) {
    await this.ensureVideo();

    if (!this.video) return;

    const track = this.video.querySelector(
      `track[data-managed][data-lang="${lang}"]`
    );
    if (track) track.remove();
  }

  public async addSubtitle(toggleState: boolean, subtitlePath: string) {
    const video = await this.ensureVideo();

    if (!video) {
      console.warn("Video not found");
      return;
    }

    this.video = video;

    if (toggleState) {
      this.addTrack("en", `${subtitlePath}.vtt`, "English Subtitles");
    } else {
      this.removeTrackByLang("en");
      console.log("English subtitles OFF");
    }
  }

  public async pictureInPicture(toggleState: boolean) {
    const video = await this.ensureVideo();

    try {
      if (toggleState) {
        if (!document.pictureInPictureElement) {
          await video.requestPictureInPicture();
        }
      } else if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      }
    } catch (err) {
      console.error("[PiP] Error:", err);
    }
  }
}
