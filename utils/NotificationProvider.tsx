import {
  MarkAttendanceFromNotificationMutation,
  MarkAttendanceFromNotificationMutationVariables,
} from "@/types/__generated__/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import { ReactNode, useEffect } from "react";
import { AppState, Platform } from "react-native";
import NotificationContext from "./NotificationContext";
import { registerTask } from "./registerTask";
import { addItemToStorage } from "./storage";

//[ ] - add Prop type

const MARK_ATTENDANCE_FROM_NOTIFICATION: TypedDocumentNode<
  MarkAttendanceFromNotificationMutation,
  MarkAttendanceFromNotificationMutationVariables
> = gql`
  mutation MarkAttendanceFromNotification($actionId: String!) {
    markAttendanceFromNotification(actionId: $actionId)
  }
`;

async function registerNotificationCategory() {
  if (Platform.OS === "web") return;
  await Notifications.setNotificationCategoryAsync("attendance_actions", [
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

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [markAttendanceFromNotification] = useMutation(
    MARK_ATTENDANCE_FROM_NOTIFICATION
  );
  const sendMarkAttendanceFromNotification = async (actionId: any) => {
    await markAttendanceFromNotification({
      variables: {
        actionId: actionId,
      },
    });
  };
  useEffect(() => {
    const notificationReceivedListener =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
      });

    const notificationResponseReceivedListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        try {
          if (response.actionIdentifier === "YES") {
            sendMarkAttendanceFromNotification(
              response.notification.request.content.data.actionId
            );
          } else if (
            response.actionIdentifier === "NO" &&
            AppState.currentState === "active"
          ) {
            router.navigate("/(tabs)/attendance/mark");
          }
        } catch (error) {
          addItemToStorage({
            source: "ATTENDANCE_ACTIONS_RESPONSE_RECEIVED",
            data: response,
          });
        }
        if (Platform.OS !== "web") {
          Notifications.dismissNotificationAsync(
            response.notification.request.identifier
          );
        }
      });

    if (Platform.OS !== "web") {
      registerNotificationCategory();
      registerTask();
    }

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
