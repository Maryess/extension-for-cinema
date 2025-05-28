import { AxiosError } from "axios";
import { SubtitleService } from "entities/Subtitle";

export const sendVttTrackForTranslation = async (language: string) => {
  const track = document.querySelector("track");
  if (!track) throw new Error("Track not found");

  const vttUrl = track.src;
  const response = await fetch(vttUrl);
  if (!response.ok) throw new Error("Failed to fetch VTT");

  const vttText = await response.text();
  const fileName = vttUrl.split("/").pop() || "subs.vtt";

  const vttFile = new File([vttText], fileName, { type: "text/vtt" });

  const formData = new FormData();
  formData.append("file", vttFile);

  try {
    const result = await SubtitleService.translateVttFile(language, formData);
    return result;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 409) {
      throw new Error(
        `Translation for language "${language}" already exists for file "${fileName}"`
      );
    }
    throw new Error(`Failed to translate VTT: ${axiosError.message}`);
  }
};
