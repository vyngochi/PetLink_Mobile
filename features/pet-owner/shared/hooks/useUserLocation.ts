import * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";
import type { LatLng } from "../services/routing.service";

export type LocationPermissionState = "pending" | "granted" | "denied";

interface UseUserLocationOptions {
  watch?: boolean;
  enabled?: boolean;
}

const WATCH_OPTIONS: Location.LocationOptions = {
  accuracy: Location.Accuracy.Balanced,
  distanceInterval: 25,
  timeInterval: 5000,
};

const toLatLng = (location: Location.LocationObject): LatLng => ({
  lat: location.coords.latitude,
  lng: location.coords.longitude,
});

export const useUserLocation = ({
  watch = false,
  enabled = true,
}: UseUserLocationOptions = {}) => {
  const [coords, setCoords] = useState<LatLng>();
  const [permission, setPermission] =
    useState<LocationPermissionState>("pending");
  const [isLocating, setIsLocating] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    let active = true;
    let subscription: Location.LocationSubscription | undefined;

    (async () => {
      setIsLocating(true);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (!active) return;

      if (status !== "granted") {
        setPermission("denied");
        setIsLocating(false);
        return;
      }
      setPermission("granted");

      const current = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      if (!active) return;

      setCoords(toLatLng(current));
      setIsLocating(false);

      if (!watch) return;

      const watcher = await Location.watchPositionAsync(
        WATCH_OPTIONS,
        (location) => setCoords(toLatLng(location)),
      );

      if (!active) {
        watcher.remove();
        return;
      }
      subscription = watcher;
    })().catch(() => {
      if (!active) return;
      setPermission("denied");
      setIsLocating(false);
    });

    return () => {
      active = false;
      subscription?.remove();
    };
  }, [enabled, watch, attempt]);

  const request = useCallback(() => setAttempt((value) => value + 1), []);

  return { coords, permission, isLocating, request };
};
