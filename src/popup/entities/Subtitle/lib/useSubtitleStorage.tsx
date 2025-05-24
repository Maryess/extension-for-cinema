import { useCallback, useMemo } from "react";
import {
  getFromChromeStorage,
  setToChromeStorage,
} from "shared/lib/helpers/chromeStorage";

export const useSubtitleStorage = () => {
  const setState = useCallback(async (key: string, value: string) => {
    await setToChromeStorage(key, value);
  }, []);

  const getState = useCallback(async (key: string) => {
    return await getFromChromeStorage(key);
  }, []);

  return useMemo(
    () => ({
      setState,
      getState,
    }),
    [setState, getState]
  );
};
