import { VideoPlayerManager } from "entities/VideoPlayer/lib/VideoPlayerManager";
import { useEffect, useState } from "react";

import {
  getFromChromeStorage,
  onChangedChromeStorage,
} from "shared/lib/helpers/chromeStorage";
import { VideoPlayerContext } from "./context";

export const VideoPlayerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [manager] = useState(() => new VideoPlayerManager());
  const slug = window.location.pathname.split("/").pop();

  useEffect(() => {
    getFromChromeStorage<boolean>("showSubtitle").then((enabled) => {
      manager.addSubtitle(Boolean(enabled), String(slug));
    });
    getFromChromeStorage<boolean>("pictureInPicture").then((enabled) => {
      manager.pictureInPicture(Boolean(enabled));
    });

    const unsub1 = onChangedChromeStorage<boolean>("showSubtitle", (newVal) =>
      manager.addSubtitle(Boolean(newVal), String(slug))
    );
    const unsub2 = onChangedChromeStorage<boolean>(
      "pictureInPicture",
      (newVal) => manager.pictureInPicture(Boolean(newVal))
    );

    return () => {
      unsub1();
      unsub2();
    };
  }, [manager, slug]);

  return (
    <VideoPlayerContext.Provider value={manager}>
      {children}
    </VideoPlayerContext.Provider>
  );
};
