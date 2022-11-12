import { useCallback, useEffect, useState } from "react";

import { addErrorNotification } from "@components/shared/alert";

interface Location {
  latitude: number;
  longitude: number;
}

export const useGeoLocation = () => {
  const [location, setLocation] = useState<Location | null>(null);

  const onSuccess = (position: GeolocationPosition) => {
    const { coords } = position;

    setLocation({ latitude: coords.latitude, longitude: coords.longitude });
  };

  const onError = useCallback((_: GeolocationPositionError) => {
    setLocation({ latitude: 0, longitude: 0 });
  }, []);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      addErrorNotification("Geolocation not supported in this browser.");
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, [onError]);

  return location;
};
