import { ChangeEvent } from "react";

type Props = {
  fileUpload?: (e: ChangeEvent<HTMLInputElement>) => void;
  file: string | undefined;
};

export const FileUpload = ({ fileUpload, file }: Props) => {
  return (
    <div className="relative h-32 bg-accent-blue-500">
      <input
        className="absolute inset-0 w-full h-full opacity-0 left-0 top-0 z-20"
        onChange={fileUpload}
        id="inputFile"
        type="file"
      />
      <label
        className="border-0 bg-transparent
        px-3 py-1.5
        text-[14px] text-[var(--text-border)]
        cursor-pointer text-center
        transition-shadow duration-300 ease-in-out"
        htmlFor="inputFile"
      >
        Upload vtt file
      </label>
      {file && <span>{file}</span>}
    </div>
  );
};
