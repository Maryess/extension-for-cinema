//сохранение в chrome.storage
export const setToChromeStorage = (
  key: string,
  value: unknown
): Promise<void> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ [key]: value }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve();
      }
    });
  });
};
//получение chrome.storage
export const getFromChromeStorage = <T = unknown>(
  key: string
): Promise<T | null> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(key, (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result[key] ?? null);
      }
    });
  });
};
//удаление из chrome.storage
export const removeFromChromeStorage = (key: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.remove(key, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve();
      }
    });
  });
};
//прослушивание chrome.storage
export const onChangedChromeStorage = <T>(
  storageKey: string,
  callback: (newValue: T | null) => void
): (() => void) => {
  const listener = (
    changes: { [key: string]: chrome.storage.StorageChange },
    area: string
  ) => {
    if (area === "local" && changes[storageKey]) {
      callback(changes[storageKey].newValue ?? null);
    }
  };
  chrome.storage.onChanged.addListener(listener);

  return () => chrome.storage.onChanged.removeListener(listener);
};
