import * as Notifications from "expo-notifications";
import { create } from "zustand";

type NotificationStore = {
  notification: Notifications.Notification | null;
  expoPushToken: string | null;
  error: Error | null;
  setExpoPushToken: (token: string) => void;
  setNotification: (notification: Notifications.Notification) => void;
  setNotificationError: (err: Error) => void;
};

export const useNotificationStore = create<NotificationStore>((set) => ({
  notification: null,
  expoPushToken: null,
  error: null,
  setExpoPushToken: (token: string) => {
    set({ expoPushToken: token });
  },
  setNotification: (notification: Notifications.Notification) => {
    set({ notification: notification });
  },
  setNotificationError: (err: Error) => {
    set({ error: err });
  },
}));
