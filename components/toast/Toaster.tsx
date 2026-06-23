import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ToastItem } from "@/components/toast/ToastItem";
import { useToastStore } from "@/components/toast/toast.store";

export function Toaster() {
  const toasts = useToastStore((s) => s.toasts);
  const insets = useSafeAreaInsets();

  if (toasts.length === 0) return null;

  const topToasts = toasts.filter((t) => t.position === "top");
  const bottomToasts = toasts.filter((t) => t.position === "bottom");

  return (
    <>
      {topToasts.length > 0 && (
        <View
          pointerEvents="box-none"
          className="absolute left-0 right-0 z-50 px-4"
          style={{ top: insets.top + 8 }}
        >
          {topToasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} />
          ))}
        </View>
      )}
      {bottomToasts.length > 0 && (
        <View
          pointerEvents="box-none"
          className="absolute left-0 right-0 z-50 px-4"
          style={{ bottom: insets.bottom + 8 }}
        >
          {bottomToasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} />
          ))}
        </View>
      )}
    </>
  );
}
