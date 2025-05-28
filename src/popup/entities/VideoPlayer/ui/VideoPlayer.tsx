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
    console.log("[VideoPlayer] Mounted");
  }, []);

  useEffect(() => {
    console.log("[SubtitleToggler] SubtitleToggler mounted");

    getFromChromeStorage<boolean>("showSubtitle").then((enabled) => {
      console.log("[showSubtitle] From storage:", enabled);
      manager.addSubtitle(Boolean(enabled), String(slug));
    });

    getFromChromeStorage<boolean>("pictureInPicture").then((enabled) => {
      console.log("[PictureInPicture] From storage:", enabled);
      manager.pictureInPicture(Boolean(enabled));
    });

    const unsubscribeSubtitle = onChangedChromeStorage<boolean>(
      "showSubtitle",
      (newValue) => {
        console.log("[SubtitleToggler] Changed showSubtitle:", newValue);
        manager.addSubtitle(Boolean(newValue), String(slug));
      }
    );

    const unsubscribePic = onChangedChromeStorage<boolean>(
      "pictureInPicture",
      (newValue) => {
        console.log("[SubtitleToggler] Changed:", newValue);
        manager.pictureInPicture(Boolean(newValue));
      }
    );
    return () => {
      unsubscribeSubtitle();
      unsubscribePic();
    };
  }, [manager, slug]);

  return null;
};
