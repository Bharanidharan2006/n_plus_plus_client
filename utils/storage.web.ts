export const PENDING_ACTIONS = "PENDING_ACTIONS";

export type AddItemToStorageParams = {
  source: string;
  data: any;
};

export const getStorageItemSync = () => {
  try {
    if (typeof localStorage === "undefined") return null;
    return localStorage.getItem(PENDING_ACTIONS);
  } catch {
    return null;
  }
};

export const removeItemSync = () => {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(PENDING_ACTIONS);
    }
  } catch {}
};

export const addItemToStorage = ({ source, data }: AddItemToStorageParams) => {
  try {
    const currentEntry =
      typeof localStorage !== "undefined"
        ? localStorage.getItem(PENDING_ACTIONS)
        : null;
    const existing = JSON.parse(currentEntry || "[]");
    const next = [
      {
        source,
        time: new Date().toISOString(),
        appState: "web",
        data,
      },
      ...existing,
    ];
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(PENDING_ACTIONS, JSON.stringify(next));
    }
  } catch {}
};
