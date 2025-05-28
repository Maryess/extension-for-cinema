import { VideoPlayerManager } from "entities/VideoPlayer/lib/VideoPlayerManager";
import { createContext, useContext } from "react";

export const VideoPlayerContext = createContext<VideoPlayerManager | null>(
  null
);

export const useVideoPlayer = () => {
  const ctx = useContext(VideoPlayerContext);
  if (!ctx)
    throw new Error("useVideoPlayer must be used within VideoPlayerProvider");
  return ctx;
};
