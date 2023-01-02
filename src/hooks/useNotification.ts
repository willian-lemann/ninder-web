import { addErrorNotification } from "@components/shared/alert";
import { useEffect } from "react";

export interface NotifyParams {
  title: string;
  options?: NotificationOptions;
}

export function useNotification() {
  const notify = ({ title, options }: NotifyParams) => {
    const notification = new Notification(title, options);
    return notification;
  };

  useEffect(() => {
    if (!("Notification" in window)) {
      return addErrorNotification(
        "This browser does not support desktop notification"
      );
    }

    if (Notification.permission !== "denied") {
      Notification.requestPermission();
    }
  }, []);

  return { notify };
}
