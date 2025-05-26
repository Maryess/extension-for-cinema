import { useEffect, useState } from "react";
import {
  getFromChromeStorage,
  setToChromeStorage,
} from "shared/lib/helpers/chromeStorage";

export const usePlayerSetting = (key: string, defaultValue = false) => {
  const [isOn, setIsOn] = useState(defaultValue);

  useEffect(() => {
    getFromChromeStorage<boolean>(key).then((val) => {
      if (val === null || val === undefined) {
        setIsOn(defaultValue);
      } else {
        setIsOn(val);
      }
    });
  }, [key, defaultValue]);

  const toggle = () => {
    const newValue = !isOn;
    setIsOn(newValue);
    setToChromeStorage(key, newValue);
  };

  return [isOn, toggle] as const;
};
