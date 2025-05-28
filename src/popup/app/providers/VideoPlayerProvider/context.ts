import { VideoPlayerManager } from "entities/VideoPlayer/lib/VideoPlayerManager";
import { createContext } from "react";

export const VideoPlayerContext = createContext<VideoPlayerManager | null>(
  null
);
