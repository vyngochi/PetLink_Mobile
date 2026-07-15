import {
  CalendarDays,
  CheckCircle2,
  Gift,
  Syringe,
  type LucideIcon,
} from "lucide-react-native";

import type { NotificationType } from "@/features/pet-owner/notifications/types";

export const NOTIFICATION_VISUALS: Record<
  NotificationType,
  { Icon: LucideIcon; color: string }
> = {
  appointment: { Icon: CalendarDays, color: "#006E1C" },
  booking: { Icon: CheckCircle2, color: "#0288D1" },
  vaccination: { Icon: Syringe, color: "#C2410C" },
  promo: { Icon: Gift, color: "#006E1C" },
};

export function toNotificationType(type?: string | null): NotificationType {
  const value = (type ?? "").toUpperCase();

  if (value.includes("PROMO")) return "promo";
  if (value.includes("VACCIN")) return "vaccination";
  if (value.startsWith("BOOKING_")) return "booking";

  return "appointment";
}
