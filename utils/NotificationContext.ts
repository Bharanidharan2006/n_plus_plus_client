import { createContext, useContext } from "react";

type NotificationContextType = {};

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useNotificationContext = () => {
  const ctx = useContext(NotificationContext);

  if (!ctx) {
    throw new Error(
      "Use useNotificationContext inside the Notification Provider."
    );
  }
};

export default NotificationContext;
