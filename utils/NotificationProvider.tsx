import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import NotificationContext from "./NotificationContext";

export const NotificationProvider = ({ children }) => {
  useEffect(() => {
    const notificationReceivedListener =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
      });

    const notificationResponseReceivedListener =
      Notifications.addNotificationResponseReceivedListener((respone) => {
        console.log(respone);
      });

    return () => {
      notificationReceivedListener.remove();
      notificationResponseReceivedListener.remove();
    };
  }, []);

  return (
    <NotificationContext.Provider value={{}}>
      {children}
    </NotificationContext.Provider>
  );
};
