import * as Location from "expo-location";
import { useEffect } from "react";

export const useSetLocationName = (
  setLocationName: (locationName: string) => void,
) => {
  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setLocationName("Chưa cấp quyền vị trí");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        let reverseGeocode = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        if (reverseGeocode.length > 0) {
          const loc = reverseGeocode[0];
          const district = loc.district || loc.subregion;
          const city = loc.city || loc.region;

          if (district && city) {
            setLocationName(`${district}, ${city}`);
          } else if (city) {
            setLocationName(city);
          } else if (loc.name) {
            setLocationName(loc.name);
          } else {
            setLocationName("Vị trí hiện tại");
          }
        } else {
          setLocationName("Không tìm thấy vị trí");
        }
      } catch (error) {
        console.error("Error getting location:", error);
        setLocationName("Vị trí hiện tại");
      }
    })();
  }, []);
};
