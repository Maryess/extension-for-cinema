import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { setToChromeStorage } from "shared/lib/helpers/chromeStorage";

export const useFileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [vttFileValue, setVttFileValue] = useState<string>("");

  const fileUpload = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.name.endsWith(".vtt") || file.type !== "text/vtt") {
        alert("Please upload a valid .vtt subtitle file.");
        return;
      }

      setFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const path = event.target.result as string;
          setVttFileValue(path);

          const fileData = {
            name: file.name,
            path: path,
          };

          if (typeof chrome !== "undefined" && chrome.storage?.local) {
            setToChromeStorage("subtitleVttFile", fileData);
          }
        }
      };
      reader.readAsText(file);
    }
  }, []);

  return useMemo(
    () => ({
      file,
      fileUpload,
      vttFileValue,
    }),
    [file, fileUpload, vttFileValue]
  );
};
