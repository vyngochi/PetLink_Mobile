import { buildBookingDays } from "@/features/pet-owner/booking-flow/shared/constants/booking-days";
import type {
  BookingOptions,
  BookingServiceOption,
} from "@/features/pet-owner/booking-flow/shared/types";
import { paymentCards } from "@/features/pet-owner/payment-methods/constants/paymentMethods";
import type { PaymentCard } from "@/features/pet-owner/payment-methods/types";
import { serviceService } from "@/features/pet-owner/provider-detail/shared/services/service.service";
import type {
  ApiProviderService,
  ProviderServicesResponse,
} from "@/features/pet-owner/provider-detail/services-list/types/service.type";
import type { ServiceDetailItem } from "@/features/pet-owner/provider-detail/service-detail/types/service-detail.type";
import { getServiceKind } from "@/features/pet-owner/shared/utils/booking-format";
import { unwrapData } from "@/lib/http";

const SERVICES_PAGE_SIZE = 100;

const isVisibleToCustomer = (service: ApiProviderService) =>
  service.isActive && !service.isHiddenByAdmin;

const toServiceOption = (
  service: ApiProviderService,
): BookingServiceOption => ({
  id: service.id,
  name: service.name,
  description: service.description ?? "",
  price: service.price,
  durationMinutes: service.duration,
  kind: getServiceKind(service.name),
});

export const bookingService = {
  getBookingOptions: async (serviceId: string): Promise<BookingOptions> => {
    const detailResponse = await serviceService.getServiceDetail(serviceId);
    const currentService = unwrapData<ServiceDetailItem>(detailResponse);

    const servicesResponse = await serviceService.getServicesByProvider(
      currentService.providerId,
      { pageSize: SERVICES_PAGE_SIZE },
    );
    const providerServices =
      unwrapData<ProviderServicesResponse>(servicesResponse);

    return {
      providerId: currentService.providerId,
      providerName: currentService.providerName,
      services: providerServices.data
        .filter(isVisibleToCustomer)
        .map(toServiceOption),
      days: buildBookingDays(),
    };
  },

  getPaymentCards: async (): Promise<PaymentCard[]> => {
    return paymentCards;
  },
};
