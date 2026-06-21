import { toast } from "react-hot-toast";

export const toastSuccess = (message) => {
  toast.success(message);
};

export const toastError = (message) => {
  toast.error(message);
};

export const toastLoading = (message) => {
  return toast.loading(message);
};

export const dismissToast = (id) => {
  toast.dismiss(id);
};