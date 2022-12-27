import { geohashForLocation } from "geofire-common";

export function geohashLocation(latitude: number, longitude: number) {
  const hash = geohashForLocation([latitude, longitude]);

  return {
    geohash: hash,
    latitude,
    longitude,
  };
}
