import * as Location from "expo-location";
import { useEffect, useState } from "react";

type UserCoors = {
  userLat: number;
  userLong: number;
};

export const useGetCoors = () => {
  const [coors, setCoors] = useState<UserCoors>();
  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setCoors({
          userLat: location.coords.latitude,
          userLong: location.coords.longitude,
        });
      } catch (error) {
        console.error("Error getting location:", error);
      }
    })();
  }, []);

  return { coors };
};
