export type ApiBookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CHECKED_IN"
  | "CHECKED_OUT"
  | "COMPLETED"
  | "CANCELLED"
  | "REJECTED"
  | "DISPUTE"
  | "NO_ARRIVAL";

export type BookingPaymentMethod = "CASH" | "ONLINE";

export interface ApiBookingService {
  id: string;
  name: string;
  price: number;
  duration: number;
  category: string;
  imageUrls: string[];
}

export interface ApiBookingProvider {
  id: string;
  userId: string;
  businessName: string;
  slug: string;
  avatarUrl: string | null;
  address: string | null;
  ward: string | null;
  district: string | null;
  province: string | null;
  phone: string | null;
}

export interface ApiBooking {
  id: string;
  customerId: string;
  providerId: string;
  serviceId: string;
  petId: string | null;
  appointmentStart: string;
  appointmentEnd: string;
  status: ApiBookingStatus;
  paymentMethod: BookingPaymentMethod;
  paymentStatus: string;
  totalAmount: number;
  currency: string;
  note: string | null;
  service: ApiBookingService;
  provider: ApiBookingProvider;
}

export interface BookingPagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface BookingListResponse {
  items: ApiBooking[];
  pagination: BookingPagination;
}

export interface GetMyBookingsParams {
  page?: number;
  pageSize?: number;
  status?: ApiBookingStatus;
}

export interface ApiAvailableSlot {
  startAt: string;
  endAt: string;
}

export interface AvailableSlotsResponse {
  providerId: string;
  serviceId: string;
  date: string;
  durationMinutes: number;
  workingHours?: {
    openTime: string;
    closeTime: string;
  };
  slots: ApiAvailableSlot[];
}

export type BookingQrAction = "CHECK_IN" | "CHECK_OUT";

export interface BookingQrResponse {
  bookingId: string;
  action: BookingQrAction;
  qrToken: string;
  expiresInSeconds: number;
}

export interface CreateBookingApiPayload {
  providerId: string;
  serviceId: string;
  petId?: string;
  appointmentStart: string;
  paymentMethod?: BookingPaymentMethod;
  note?: string;
  customerLocation?: string;
}
