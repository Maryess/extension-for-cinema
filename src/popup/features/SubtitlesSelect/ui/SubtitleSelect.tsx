import { Button } from "shared/ui/Button/ui/Button";
import { useSubtitleSelect } from "../model/useSubtitleSelect";

export const SubtitleSelect = () => {
  const slug = window.location.pathname.split("/").pop() || "";
  const {
    availableLangs,
    hiddenLangs,
    activeLang,
    loading,
    error,
    removeSub,
    toggleSubtitles,
  } = useSubtitleSelect(slug);

  if (loading) return <p className="text-center">Loading subtitles...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;
  return (
    <div className="flex flex-col bg-white p-2 gap-4 rounded-md">
      <h3 className="text-center text-gray-800 mb-2">Subtitles</h3>
      <div className="flex flex-wrap border-t-4 border-t-gray-400 justify-center gap-3 max-w-full">
        {availableLangs
          .filter((lang) => !hiddenLangs.includes(lang))
          .map((lang) => (
            <Button
              key={lang}
              onClick={() => toggleSubtitles(lang)}
              className={
                activeLang === lang
                  ? "bg-blue-600 text-white relative"
                  : "relative"
              }
            >
              {lang.toUpperCase()}
              <button
                className="absolute top-0 right-0  rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  removeSub(lang);
                }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </Button>
          ))}
      </div>
    </div>
  );
};
