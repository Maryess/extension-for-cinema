import { VideoPlayerManager } from "entities/VideoPlayer/lib/VideoPlayerManager";
import { useState } from "react";
import { langData } from "shared/lib/helpers/langData";
import { Button } from "shared/ui/Button/ui/Button";

export const SubtitleSelect = () => {
  const [manager] = useState(() => new VideoPlayerManager());

  const [activeLang, setActiveLang] = useState<string | null>(null);
  const slug = window.location.pathname.split("/").pop() || "";

  const toggleSubtitles = (lang: string) => {
    const isSameLang = activeLang === lang;

    if (isSameLang) {
      manager.removeTrackByLang(lang);
      setActiveLang(null);
    } else {
      if (activeLang) {
        manager.removeTrackByLang(activeLang);
      }
      manager.toggleSubtitleByLang(true, lang, slug);
      setActiveLang(lang);
    }
  };

  return (
    <div className="flex flex-col bg-white p-2 gap-4 rounded-md">
      <h3 className="text-center text-gray-800 mb-2">Subtitles</h3>
      <div className="flex flex-wrap border-t-4 border-t-gray-400 justify-center gap-3 max-w-full">
        {langData.map(({ title, value }) => (
          <Button
            key={value}
            onClick={() => toggleSubtitles(value)}
            className={activeLang === value ? "text-white" : ""}
          >
            {title}
          </Button>
        ))}
      </div>
    </div>
  );
};
