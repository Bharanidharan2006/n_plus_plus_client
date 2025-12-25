import * as Notifications from "expo-notifications";
import { defineTask } from "expo-task-manager";
import { AppState, Platform } from "react-native";
import { addItemToStorage } from "./storage.native";

const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND_NOTIFICATION_TASK";

export const shouldBeHandledByBGTask = (
  categoryId: string | null | unknown
): boolean => {
  return categoryId === "attendance_actions";
};

let topLevelNumber = 0;
export const registerTask = () => {
  defineTask<Notifications.NotificationTaskPayload>(
    BACKGROUND_NOTIFICATION_TASK,
    async (params) => {
      const taskPayload = params.data;
      try {
        console.log(
          `${Platform.OS} ${BACKGROUND_NOTIFICATION_TASK}: App in ${
            AppState.currentState
          } state. data: ${JSON.stringify(taskPayload, null, 2)}`
        );
        ++topLevelNumber;

        // Checking whether the task payload received is a notification or notification response

        const isNotificationResponse = "actionIdentifier" in taskPayload;

        if (isNotificationResponse) {
          if (taskPayload.actionIdentifier === "NO") return;
          addItemToStorage({
            source: "ATTENDANCE_ACTIONS_RESPONSE_RECEIVED",
            data: taskPayload,
          });
          await Notifications.dismissNotificationAsync(
            taskPayload.notification.request.identifier
          );
        } else {
          let categoryIdentifier = "attendance_actions"; // remove this
          if (taskPayload.data.categoryId) {
            categoryIdentifier = taskPayload.data.categoryId;
          }
          const expoData =
            taskPayload.data.dataString &&
            JSON.parse(taskPayload.data.dataString);

          if (shouldBeHandledByBGTask(categoryIdentifier)) {
            const id = await Notifications.scheduleNotificationAsync({
              content: {
                title: expoData?.title ?? "unknown",
                body: expoData?.body ?? "",
                categoryIdentifier: categoryIdentifier,
                data: {
                  actionId: expoData.actionId,
                  presented: true,
                },
              },
              trigger: null,
            });
            console.log("Scheduled notification with id:", id);
          }
        }
      } catch (e) {
        console.log(`Err: ${e}`);
      }
    }
  );

  Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK).catch(
    console.error
  );
};
