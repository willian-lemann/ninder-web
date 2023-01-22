import { distanceBetween } from "geofire-common";

interface Location {
  latitude: number;
  longitude: number;
}

interface Params {
  isMiles?: boolean;
  sourceLocation: Location | null | undefined;
  targetLocation: Location | null | undefined;
}

const KM_IN_METERS = 1000;

export const getDistanceBetweenTwoCoords = ({
  isMiles = false,
  sourceLocation,
  targetLocation,
}: Params) => {
  if (!sourceLocation || !targetLocation) return null;

  const toRadius = (value: number) => {
    return (value * Math.PI) / 180;
  };

  if (!sourceLocation || !targetLocation) return null;

  const targetLatitude = targetLocation.latitude;
  const targetLongitude = targetLocation.longitude;
  const currentLatitude = sourceLocation.latitude;
  const currentLongitude = sourceLocation.longitude;

  const EARTH_RADIUS_IN_KM = 6371; // km

  const differenceBetweenLatitudes = targetLatitude - currentLatitude;
  const distanceInLatitude = toRadius(differenceBetweenLatitudes);

  const differenceBetweenLongitudes = targetLongitude - currentLongitude;
  const distancenInLongitude = toRadius(differenceBetweenLongitudes);

  const a =
    Math.sin(distanceInLatitude / 2) * Math.sin(distanceInLatitude / 2) +
    Math.cos(toRadius(currentLatitude)) *
      Math.cos(toRadius(targetLatitude)) *
      Math.sin(distancenInLongitude / 2) *
      Math.sin(distancenInLongitude / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  let distance = EARTH_RADIUS_IN_KM * c;

  if (isMiles) {
    distance /= 1.60934;
  }

  return Number(distance.toFixed(2));
};
