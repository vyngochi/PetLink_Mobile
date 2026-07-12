import * as Location from "expo-location";
import { useEffect, useState } from "react";

export interface Coords {
  userLat: number;
  userLng: number;
}

export const useCurrentCoords = () => {
  const [coords, setCoords] = useState<Coords>();

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const { status } =
          await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") return;

        const location = await Location.getCurrentPositionAsync({});
        if (active) {
          setCoords({
            userLat: location.coords.latitude,
            userLng: location.coords.longitude,
          });
        }
      } catch {
        if (active) setCoords(undefined);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  return coords;
};
