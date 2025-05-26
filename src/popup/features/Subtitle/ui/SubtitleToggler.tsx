import { useEffect, useState } from "react";
import { SubtitleManager } from "../lib/SubtitleManager";
import {
  getFromChromeStorage,
  onChangedChromeStorage,
} from "shared/lib/helpers/chromeStorage";

export const SubtitleToggler = () => {
  const [manager] = useState(() => new SubtitleManager());
  const slug = window.location.pathname.split("/").pop();

  useEffect(() => {
    console.log("[SubtitleToggler] SubtitleToggler mounted");

    getFromChromeStorage<boolean>("showSubtitle").then((enabled) => {
      console.log("[SubtitleToggler] From storage:", enabled);
      manager.addSubtitle(Boolean(enabled), String(slug));
    });

    const unsubscribe = onChangedChromeStorage<boolean>(
      "showSubtitle",
      (newValue) => {
        console.log("[SubtitleToggler] Changed:", newValue);
        manager.addSubtitle(Boolean(newValue), String(slug));
      }
    );

    return () => {
      unsubscribe();
    };
  }, [manager]);

  return null;
};
