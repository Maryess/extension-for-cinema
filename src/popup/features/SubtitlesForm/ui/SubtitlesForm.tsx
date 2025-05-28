import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { langData } from "shared/lib/helpers/langData";
import { Button } from "shared/ui/Button/ui/Button";
import { InputSelect } from "shared/ui/InputSelect";
import { sendVttTrackForTranslation } from "../lib/sendVttTrackForTranslation";
import { Notification } from "shared/ui/Notification";

type SubtitlesForm = {
  language: string;
};

export const SubtitlesForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ language: string }>({
    defaultValues: { language: "" },
    mode: "onChange",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    if (notification) {
      console.log("Уведомление:", notification.message, notification.type);
    }
  }, [notification]);

  const onSubmit = async (data: { language: string }) => {
    setIsLoading(true);
    setNotification(null);
    try {
      await sendVttTrackForTranslation(data.language);
      setNotification({
        type: "success",
        message: "Translation completed!",
      });
    } catch {
      setNotification({
        type: "error",
        message: "Translation failed",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const closeNotification = () => setNotification(null);
  console.log(notification?.message, notification?.type);
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-light-300 rounded-xl shadow-sm">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-3 w-full md:w-auto"
      >
        <Controller
          name="language"
          control={control}
          rules={{ required: "Choose language" }}
          render={({ field }) => (
            <div className="w-full">
              <InputSelect
                options={langData}
                value={field.value}
                onChange={field.onChange}
                placeholder="Choose language"
                aria-describedby="language-error"
              />
              {errors.language && (
                <p
                  id="language-error"
                  className="text-accent-orange-600 text-sm mt-1"
                >
                  {errors.language.message}
                </p>
              )}
            </div>
          )}
        />
        <Button type="submit" className="w-full md:w-auto">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5 animate-spin"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  opacity="0.25"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="M12 2a10 10 0 0 1 10 10"
                  opacity="1"
                />
              </svg>
              Translating...
            </div>
          ) : (
            "Translate"
          )}
        </Button>
      </form>
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={closeNotification}
          className="w-full md:w-auto"
        />
      )}
    </div>
  );
};
