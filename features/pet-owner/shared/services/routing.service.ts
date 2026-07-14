import axios from "axios";

const OSRM_BASE_URL = "https://router.project-osrm.org/route/v1/driving";

export interface LatLng {
  lat: number;
  lng: number;
}

interface OsrmRoute {
  distance: number;
  duration: number;
  geometry: {
    coordinates: [number, number][];
  };
}

export interface OsrmRouteResponse {
  code: string;
  routes: OsrmRoute[];
}

export const routingService = {
  getDrivingRoute: (from: LatLng, to: LatLng) => {
    const path = `${from.lng},${from.lat};${to.lng},${to.lat}`;

    return axios.get<OsrmRouteResponse>(`${OSRM_BASE_URL}/${path}`, {
      params: {
        overview: "full",
        geometries: "geojson",
        alternatives: false,
        steps: false,
      },
      timeout: 15000,
    });
  },
};
