import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { bookingKeys } from "@/features/pet-owner/shared/constants/query-keys";
import { socketService } from "@/lib/socket";

type BookingSocketPayload = {
  booking?: { id?: string };
  bookingId?: string;
};

const BOOKING_EVENTS = [
  "booking:updated",
  "payment:updated",
  "refund:updated",
] as const;

export function useBookingRealtime(bookingId?: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    socketService.connect();

    const joinRoom = () => {
      if (bookingId) {
        socketService.emit("booking:join", { bookingId });
      }
    };

    joinRoom();
    socketService.on("connect", joinRoom);

    const handleUpdate = (payload: BookingSocketPayload) => {
      const updatedId = payload?.booking?.id ?? payload?.bookingId;
      queryClient.invalidateQueries({ queryKey: bookingKeys.myBookings() });
      if (updatedId) {
        queryClient.invalidateQueries({
          queryKey: bookingKeys.detail(updatedId),
        });
      }
    };

    for (const event of BOOKING_EVENTS) {
      socketService.on(event, handleUpdate);
    }

    return () => {
      if (bookingId) {
        socketService.emit("booking:leave", { bookingId });
      }
      socketService.off("connect", joinRoom);
      for (const event of BOOKING_EVENTS) {
        socketService.off(event, handleUpdate);
      }
    };
  }, [bookingId, queryClient]);
}
