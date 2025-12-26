import { AppState, Platform } from "react-native";

export const PENDING_ACTIONS = "PENDING_ACTIONS";

export type AddItemToStorageParams = {
  source: string;
  data: any;
};

export const getStorageItemSync = () => {
  if (Platform.OS === "web") {
    try {
      if (typeof localStorage === "undefined") return null;
      return localStorage.getItem(PENDING_ACTIONS);
    } catch {
      return null;
    }
  }
  const { Storage } = require("expo-sqlite/kv-store");
  return Storage.getItemSync(PENDING_ACTIONS);
};

export const removeItemSync = () => {
  if (Platform.OS === "web") {
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.removeItem(PENDING_ACTIONS);
      }
    } catch {}
    return;
  }
  const { Storage } = require("expo-sqlite/kv-store");
  Storage.removeItemSync(PENDING_ACTIONS);
};

export const addItemToStorage = ({ source, data }: AddItemToStorageParams) => {
  if (Platform.OS === "web") {
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
          appState: AppState.currentState,
          data,
        },
        ...existing,
      ];
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(PENDING_ACTIONS, JSON.stringify(next));
      }
    } catch {}
    return;
  }

  const { Storage } = require("expo-sqlite/kv-store");
  const currentEntry = Storage.getItemSync(PENDING_ACTIONS);
  Storage.setItemSync(
    PENDING_ACTIONS,
    JSON.stringify([
      {
        source,
        time: new Date().toISOString(),
        appState: AppState.currentState,
        data,
      },
      ...JSON.parse(currentEntry || "[]"),
    ])
  );
};
