import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import NotificationContext from "./NotificationContext";

//[ ] - add Prop type

async function registerNotificationCategory() {
  await Notifications.setNotificationCategoryAsync("attendanceActions", [
    {
      identifier: "YES",
      buttonTitle: "Yes",
      options: {
        opensAppToForeground: false,
      },
    },
    {
      identifier: "NO",
      buttonTitle: "No",
      options: {
        opensAppToForeground: true,
      },
    },
  ]);
}

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

    registerNotificationCategory();

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
