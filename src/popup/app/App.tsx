import { VideoPlayer } from "entities/VideoPlayer";
import { SettingsWrapper } from "widgets/SettingsWrapper";

const App = () => {
  return (
    <div className="w-full h-full p-2 text-sm">
      <SettingsWrapper />
      <VideoPlayer />
    </div>
  );
};

export default App;
