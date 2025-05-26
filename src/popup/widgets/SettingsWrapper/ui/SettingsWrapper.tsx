import { PlayerSettingsList } from "features/PlayerSettings";
import { Controller, useForm } from "react-hook-form";
import { axiosInstance } from "shared/api/instance";
import { InputSelect } from "shared/ui/InputSelect";

const langData = [
  {
    title: "Russian",
    value: "ru",
  },
  {
    title: "French",
    value: "fr",
  },
];

export const SettingsWrapper = () => {
  const { control, handleSubmit } = useForm<{ language: string }>({
    defaultValues: { language: "" },
  });

  const onSubmit = (data: { language: string }) => {
    console.log("Selected language:", data.language);
    sendVttTrackForTranslation(data.language);
  };

  async function sendVttTrackForTranslation(language = "fr") {
    try {
      const track = document.querySelector("track");
      if (!track) {
        console.error("Track element not found");
        return;
      }

      const vttUrl = track.src;
      const response = await fetch(vttUrl);
      if (!response.ok) throw new Error("Failed to fetch VTT");

      const vttText = await response.text();
      const fileName = vttUrl.split("/").pop() || "subs.vtt";
      const vttFile = new File([vttText], fileName, { type: "text/vtt" });

      const formData = new FormData();
      formData.append("file", vttFile);

      const result = await axiosInstance.post(
        `/file/translate-vtt?lang=${language}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Translation response:", result.data);
    } catch (error) {
      console.error("Error sending VTT for translation:", error);
    }
  }

  return (
    <div className="w-full h-28 flex justify-between gap-2">
      <PlayerSettingsList />
      <div className="h-full w-1 bg-light-700"></div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
