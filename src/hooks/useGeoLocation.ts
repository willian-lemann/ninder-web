import { useCallback, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";

import { addErrorNotification } from "@components/shared/alert";
import { Location } from "@dtos/users/location";
import { storage } from "firebase-admin";

const storageKey = "@ninder_current_location";

export const useGeoLocation = () => {
  const [location, setLocation] = useState<Location | null>(null);

  const onSuccess = (position: GeolocationPosition) => {
    const { coords } = position;

    const location = { latitude: coords.latitude, longitude: coords.longitude };

    setLocation(location);
    setCookie(undefined, storageKey, JSON.stringify(location));
  };

  const onError = useCallback((_: GeolocationPositionError) => {
    setLocation({ latitude: 0, longitude: 0 });
    localStorage.removeItem(storageKey);
  }, []);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      addErrorNotification("Geolocation not supported in this browser.");
    }

    // const loadFromStorage = () => {
    //   const { [storageKey]: storagedLocation } = parseCookies(undefined);

    //   if (!storagedLocation) {
    //     return navigator.geolocation.getCurrentPosition(onSuccess, onError);
    //   }

    //   const locationParsed = JSON.parse(storagedLocation);

    //   setLocation(locationParsed);
    // };

    // loadFromStorage();

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, [onError]);

  return location;
};
