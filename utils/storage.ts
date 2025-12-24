import { Storage } from "expo-sqlite/kv-store";
import { AppState } from "react-native";

export const PENDING_ACTIONS = "PENDING_ACTIONS";

export type AddItemToStorageParams = {
  source: string;
  data: any;
};

export const getStorageItemSync = () => {
  return Storage.getItemSync(PENDING_ACTIONS);
};

export const removeItemSync = () => {
  Storage.removeItemSync(PENDING_ACTIONS);
};

export const addItemToStorage = ({ source, data }: AddItemToStorageParams) => {
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
