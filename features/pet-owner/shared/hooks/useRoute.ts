import { useQuery } from "@tanstack/react-query";
import { routeKeys } from "../constants/query-keys";
import { routingService, type LatLng } from "../services/routing.service";
import { isValidCoords, roundCoords } from "../utils/coordinates";

const ORIGIN_KEY_PRECISION = 3;

export interface DrivingRoute {
  distanceKm: number;
  durationMinutes: number;
  coordinates: LatLng[];
}

export const useRoute = (from?: LatLng, to?: LatLng) => {
  const hasEndpoints = isValidCoords(from) && isValidCoords(to);
  const originKey =
    from && hasEndpoints ? roundCoords(from, ORIGIN_KEY_PRECISION) : undefined;

  const { data, isLoading, isError, refetch, isRefetching } = useQuery({
    queryKey: routeKeys.driving(originKey, to),
    queryFn: async (): Promise<DrivingRoute | null> => {
      if (!from || !to) return null;

      const response = await routingService.getDrivingRoute(from, to);
      const route = response.data.routes?.[0];
      if (response.data.code !== "Ok" || !route) return null;

      return {
        distanceKm: Math.round((route.distance / 1000) * 10) / 10,
        durationMinutes: Math.max(1, Math.round(route.duration / 60)),
        coordinates: route.geometry.coordinates.map(([lng, lat]) => ({
          lat,
          lng,
        })),
      };
    },
    enabled: hasEndpoints,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  return {
    route: data ?? undefined,
    isLoading,
    isError,
    refetch,
    isRefetching,
  };
};
