import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FileUpload, useFileUpload } from "features/FileUpload";
import { axiosDefault, SERVER_URL } from "shared/api/instance";
import toast from "react-hot-toast";

export const FileUploader = () => {
  const { fileUpload, file } = useFileUpload();
  const { handleSubmit } = useForm({ mode: "onChange" });
  const [movieTitle, setMovieTitle] = useState<string | null>(null);

  // Получение названия фильма из DOM
  useEffect(() => {
    const infoBlock = document.querySelector('[class*="infoMovie"]');
    const titleElement = infoBlock?.querySelector("h3");
    const titleText = titleElement?.textContent?.trim() || null;

    if (titleText) {
      setMovieTitle(titleText);
    } else {
      console.warn("Не удалось найти заголовок фильма");
    }
  }, []);

  const onSubmit: SubmitHandler<unknown> = async () => {
    if (!file) {
      alert("Файл не выбран");
      return;
    }

    if (movieTitle && file.name !== movieTitle + ".vtt") {
      alert("Название файла должно совпадать с названием фильма и иметь .vtt");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axiosDefault.post(
        `${SERVER_URL}/file?folder=subtitles`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Subtitle uploaded, refresh this page!");
      console.log("Upload success", response.data);
    } catch (error) {
      console.error("Upload error", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FileUpload file={file?.name} fileUpload={fileUpload} />
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Загрузить субтитры
      </button>
    </form>
  );
};
