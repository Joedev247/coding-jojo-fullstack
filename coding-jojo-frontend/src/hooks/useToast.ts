import { toast } from 'sonner';

export interface ToastOptions {
  duration?: number;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const useToast = () => {
  // Check if we're on the client side
  const isClient = typeof window !== 'undefined';

  const showToast = {
    success: (message: string, options?: ToastOptions) => {
      if (!isClient) return Promise.resolve();
      return toast.success(message, {
        duration: options?.duration || 4000,
        description: options?.description,
        action: options?.action,
      });
    },

    error: (message: string, options?: ToastOptions) => {
      if (!isClient) return Promise.resolve();
      return toast.error(message, {
        duration: options?.duration || 5000,
        description: options?.description,
        action: options?.action,
      });
    },

    warning: (message: string, options?: ToastOptions) => {
      if (!isClient) return Promise.resolve();
      return toast.warning(message, {
        duration: options?.duration || 4000,
        description: options?.description,
        action: options?.action,
      });
    },

    info: (message: string, options?: ToastOptions) => {
      if (!isClient) return Promise.resolve();
      return toast.info(message, {
        duration: options?.duration || 3000,
        description: options?.description,
        action: options?.action,
      });
    },

    loading: (message: string, options?: Omit<ToastOptions, 'action'>) => {
      if (!isClient) return Promise.resolve();
      return toast.loading(message, {
        duration: options?.duration || Infinity,
        description: options?.description,
      });    },promise: <T>(
      promise: Promise<T>,
      messages: {
        loading: string;
        success: string | ((data: T) => string);
        error: string | ((error: any) => string);
      }
    ) => {
      if (!isClient) return Promise.resolve();
      return toast.promise(promise, messages);
    },    custom: (jsx: (id: string | number) => React.ReactElement, options?: Pick<ToastOptions, 'duration'>) => {
      if (!isClient) return Promise.resolve();
      return toast.custom(jsx, {
        duration: options?.duration || 4000,
      });
    },

    dismiss: (toastId?: string | number) => {
      if (!isClient) return;
      toast.dismiss(toastId);
    },

    dismissAll: () => {
      if (!isClient) return;
      toast.dismiss();
    },
  };

  return showToast;
};
