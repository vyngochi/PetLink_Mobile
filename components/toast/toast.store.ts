import { create } from "zustand";

export type ToastVariant = "success" | "error" | "info";

export type Toast = {
  id: number;
  message: string;
  variant: ToastVariant;
  duration: number;
};

type ShowToastInput = {
  message: string;
  variant?: ToastVariant;
  duration?: number;
};

type ToastState = {
  toasts: Toast[];
  show: (input: ShowToastInput) => void;
  dismiss: (id: number) => void;
};

const DEFAULT_DURATION = 2800;
let nextId = 0;

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  show: ({ message, variant = "info", duration = DEFAULT_DURATION }) =>
    set((state) => ({
      toasts: [...state.toasts, { id: nextId++, message, variant, duration }],
    })),
  dismiss: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));

export const toast = {
  success: (message: string, duration?: number) =>
    useToastStore.getState().show({ message, variant: "success", duration }),
  error: (message: string, duration?: number) =>
    useToastStore.getState().show({ message, variant: "error", duration }),
  info: (message: string, duration?: number) =>
    useToastStore.getState().show({ message, variant: "info", duration }),
};
