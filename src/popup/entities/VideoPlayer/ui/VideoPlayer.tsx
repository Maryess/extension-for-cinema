import { useEffect, useState } from "react";
import { VideoPlayerManager } from "../lib/VideoPlayerManager";
import {
  getFromChromeStorage,
  onChangedChromeStorage,
} from "shared/lib/helpers/chromeStorage";

export const VideoPlayer = () => {
  const [manager] = useState(() => new VideoPlayerManager());
  const slug = window.location.pathname.split("/").pop();

  useEffect(() => {
    console.log("[SubtitleToggler] SubtitleToggler mounted");

    getFromChromeStorage<boolean>("pictureInPicture").then((enabled) => {
      console.log("[PictureInPicture] From storage:", enabled);
      manager.pictureInPicture(Boolean(enabled));
    });

    getFromChromeStorage<boolean>("slowMode").then((enabled) => {
      console.log("[SLowMode] From storage:", enabled);
      manager.slowPlayback(Boolean(enabled));
    });

    const unsubscribePic = onChangedChromeStorage<boolean>(
      "pictureInPicture",
      (newValue) => {
        console.log("[SubtitleToggler] Changed:", newValue);
        manager.pictureInPicture(Boolean(newValue));
      }
    );
    const unsubscribeMode = onChangedChromeStorage<boolean>(
      "slowMode",
      (newValue) => {
        console.log("[SubtitleToggler] Changed:", newValue);
        manager.slowPlayback(Boolean(newValue));
      }
    );

    return () => {
      unsubscribePic();
      unsubscribeMode();
    };
  }, [manager, slug]);

  return null;
};
