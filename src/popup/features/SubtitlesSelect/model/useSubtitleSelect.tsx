import { useEffect, useState, useCallback, useMemo } from "react";
import { AxiosError } from "axios";
import { SubtitleService } from "entities/Subtitle";
import { VideoPlayerManager } from "entities/VideoPlayer/lib/VideoPlayerManager";

function parseLangFromFileName(fileName: string): string | null {
  const match = fileName.match(/\.([a-z]{2})\.vtt$/);
  return match ? match[1] : null;
}

export function useSubtitleSelect(slug: string) {
  const [manager] = useState(() => new VideoPlayerManager());
  const [availableLangs, setAvailableLangs] = useState<string[]>([]);
  const [hiddenLangs, setHiddenLangs] = useState<string[]>([]);
  const [activeLang, setActiveLang] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubtitles = async () => {
      setLoading(true);
      setError(null);
      try {
        const files = await SubtitleService.getAllVtt(slug);
        const langs = files
          .map(parseLangFromFileName)
          .filter((lang): lang is string => !!lang);

        setAvailableLangs(langs);
      } catch (err) {
        const axiosError = err as AxiosError;
        setError(axiosError.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchSubtitles();
  }, [slug]);

  const removeSub = useCallback(
    async (lang: string) => {
      try {
        const fileName = `${slug}.${lang}.vtt`;
        await SubtitleService.removeVttFile(fileName);
        setHiddenLangs((prev) => [...prev, lang]);
        if (activeLang === lang) {
          manager.removeTrackByLang(lang);
          setActiveLang(null);
        }
      } catch (err) {
        console.error("Ошибка при удалении субтитров:", err);
      }
    },
    [slug, activeLang, manager]
  );

  const toggleSubtitles = useCallback(
    (lang: string) => {
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
    },
    [activeLang, manager, slug]
  );

  return useMemo(
    () => ({
      availableLangs,
      hiddenLangs,
      activeLang,
      loading,
      error,
      removeSub,
      toggleSubtitles,
    }),
    [
      availableLangs,
      hiddenLangs,
      activeLang,
      loading,
      error,
      removeSub,
      toggleSubtitles,
    ]
  );
}
