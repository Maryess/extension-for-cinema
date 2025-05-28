import { Settings } from "pages/Settings";
import { VideoPlayerProvider } from "./providers";

const App = () => {
  return (
    <VideoPlayerProvider>
      <div className="w-full h-full p-2 text-sm">
        <Settings />
      </div>
    </VideoPlayerProvider>
  );
};

export default App;
