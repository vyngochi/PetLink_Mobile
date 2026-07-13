import { create } from "zustand";

export type ToastVariant = "success" | "error" | "info";

export type ToastPosition = "top" | "bottom";

export type Toast = {
  id: number;
  message: string;
  variant: ToastVariant;
  duration: number;
  position: ToastPosition;
};

export type ToastOptions = {
  duration?: number;
  position?: ToastPosition;
};

type ShowToastInput = {
  message: string;
  variant?: ToastVariant;
  duration?: number;
  position?: ToastPosition;
};

type ToastState = {
  toasts: Toast[];
  show: (input: ShowToastInput) => void;
  dismiss: (id: number) => void;
};

const DEFAULT_DURATION = 2800;
const DEFAULT_POSITION: ToastPosition = "top";
let nextId = 0;

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  show: ({
    message,
    variant = "info",
    duration = DEFAULT_DURATION,
    position = DEFAULT_POSITION,
  }) =>
    set((state) => ({
      toasts: [
        ...state.toasts,
        { id: nextId++, message, variant, duration, position },
      ],
    })),
  dismiss: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));

export const toast = {
  success: (message: string, options?: ToastOptions) =>
    useToastStore.getState().show({ message, variant: "success", ...options }),
  error: (message: string, options?: ToastOptions) =>
    useToastStore.getState().show({ message, variant: "error", ...options }),
  info: (message: string, options?: ToastOptions) =>
    useToastStore.getState().show({ message, variant: "info", ...options }),
};
