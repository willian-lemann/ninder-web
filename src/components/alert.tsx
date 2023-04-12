import { Toaster, toast } from "react-hot-toast";

export const addSuccessNotification = (message: string) => {
  toast.success(message);
};

export const addErrorNotification = (message: string) => {
  toast.error(message);
};

export const AlertProvider = Toaster;
