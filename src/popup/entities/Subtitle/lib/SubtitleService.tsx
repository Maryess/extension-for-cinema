import { AxiosError, AxiosResponse } from "axios";
import { IFileResponse } from "../types";
import { axiosInstance } from "shared/api/instance";

export const SubtitleService = {
  async translateVttFile(language: string, data: FormData) {
    try {
      const response: AxiosResponse<IFileResponse> = await axiosInstance.post(
        `/file/translate-vtt?target_lang=${encodeURIComponent(language)}`,
        data
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Unknown error during VTT translation";
        throw new Error(
          `API Error: ${message} (status: ${
            error.response?.status || "unknown"
          })`
        );
      }
      throw new Error(`VTT translation error: ${(error as Error).message}`);
    }
  },

  async removeVttFile(fileName: string) {
    try {
      const response: AxiosResponse<IFileResponse> = await axiosInstance.delete(
        `/file/remove-vtt?fileName=${fileName}`
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError) {
        throw new Error(axiosError.message);
      }
    }
  },

  async getAllVtt(target: string): Promise<string[]> {
    try {
      const response = await axiosInstance.get<string[]>(
        `/file/translated-list?target=${target}`
      );
      return response.data;
    } catch (error) {
      throw new Error((error as AxiosError).message);
    }
  },
};
