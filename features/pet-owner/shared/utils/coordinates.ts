import type { LatLng } from "../services/routing.service";

export interface ApiCoords {
  userLat: number;
  userLng: number;
}

const EARTH_RADIUS_KM = 6371;

export const isValidCoords = (
  coords?: Partial<LatLng> | null,
): coords is LatLng => {
  if (!coords) return false;

  const { lat, lng } = coords;
  if (typeof lat !== "number" || typeof lng !== "number") return false;
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return false;
  if (lat === 0 && lng === 0) return false;

  return Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
};

export const roundCoords = (coords: LatLng, digits: number): LatLng => {
  const factor = 10 ** digits;

  return {
    lat: Math.round(coords.lat * factor) / factor,
    lng: Math.round(coords.lng * factor) / factor,
  };
};

export const toApiCoords = (coords?: LatLng): ApiCoords | undefined =>
  isValidCoords(coords)
    ? { userLat: coords.lat, userLng: coords.lng }
    : undefined;

const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;

export const haversineKm = (from: LatLng, to: LatLng): number => {
  const deltaLat = toRadians(to.lat - from.lat);
  const deltaLng = toRadians(to.lng - from.lng);

  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(toRadians(from.lat)) *
      Math.cos(toRadians(to.lat)) *
      Math.sin(deltaLng / 2) ** 2;

  return 2 * EARTH_RADIUS_KM * Math.asin(Math.min(1, Math.sqrt(a)));
};

export const resolveDistanceKm = (
  destination?: Partial<LatLng> | null,
  user?: LatLng,
  serverDistanceKm?: number,
): number | undefined => {
  if (
    typeof serverDistanceKm === "number" &&
    Number.isFinite(serverDistanceKm) &&
    serverDistanceKm > 0
  ) {
    return serverDistanceKm;
  }

  if (!isValidCoords(destination) || !isValidCoords(user)) return undefined;

  return Math.round(haversineKm(user, destination) * 10) / 10;
};

export const formatDistanceKm = (km?: number): string => {
  if (km === undefined) return "";
  if (km < 1) return `${Math.round(km * 1000)} m`;

  return `${km.toFixed(1)} km`;
};
