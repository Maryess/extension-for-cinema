import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { axiosInstance } from "shared/api/instance";
import { InputSelect } from "shared/ui/InputSelect";
import { langData } from "shared/lib/helpers/langData";
import { Button } from "shared/ui/Button/ui/Button";

export const SettingsWrapper = () => {
  const { control, handleSubmit } = useForm<{ language: string }>({
    defaultValues: { language: "" },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (data: { language: string }) => {
    setIsLoading(true);
    setMessage("");
    try {
      await sendVttTrackForTranslation(data.language);
      setMessage("Translation completed");
    } catch {
      setMessage("Translation failed");
    } finally {
      setIsLoading(false);
    }
  };

  async function sendVttTrackForTranslation(language: string) {
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

    await axiosInstance.post(
      `/file/translate-vtt?target_lang=${language}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-light-100 rounded-xl shadow-sm">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-3 w-full md:w-auto"
      >
        <Controller
          name="language"
          control={control}
          render={({ field }) => (
            <InputSelect
              options={langData}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Button
          type="submit"
          children={`${isLoading ? "Translating..." : "Translate"}`}
        />
        {message && (
          <div className="text-sm mt-2 md:mt-0 text-gray-600">{message}</div>
        )}
      </form>
    </div>
  );
};
