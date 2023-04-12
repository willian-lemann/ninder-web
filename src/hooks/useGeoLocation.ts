import { useCallback, useEffect, useState } from "react";

import { addErrorNotification } from "@/components/alert";
import { Location } from "@/dtos/users/location";

export const useGeoLocation = () => {
  const [location, setLocation] = useState<Location | null>(null);

  const onSuccess = (position: GeolocationPosition) => {
    const { coords } = position;

    const location = { latitude: coords.latitude, longitude: coords.longitude };

    setLocation(location);
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
