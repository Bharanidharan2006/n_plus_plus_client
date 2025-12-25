import { AddItemToStorageParams, PENDING_ACTIONS } from "./storage.native";

export const getStorageItemSync = () => {
  return localStorage.getItem(PENDING_ACTIONS);
};

export const removeItemSync = () => {
  localStorage.removeItem(PENDING_ACTIONS);
};

export const addItemToStorage = ({ source, data }: AddItemToStorageParams) => {
  const current = localStorage.getItem(PENDING_ACTIONS);
  const parsed = current ? JSON.parse(current) : [];

  localStorage.setItem(
    PENDING_ACTIONS,
    JSON.stringify([
      {
        source,
        time: new Date().toISOString(),
        appState: "web",
        data,
      },
      ...parsed,
    ])
  );
};
