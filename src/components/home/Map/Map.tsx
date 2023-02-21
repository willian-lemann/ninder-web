import "leaflet/dist/leaflet.css";

import { useGeoLocation } from "@hooks/useGeoLocation";

import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";

import { Marker } from "./Marker";
import { Loading } from "@components/shared/Loading";
import { classNames } from "@utils/classNames";
import { useUsers } from "@context/users/useUsers";
import { Popup } from "./Popup";
import { useState } from "react";
import { Location } from "@dtos/users/location";
import { useAuthContext } from "@context/auth";

interface MapProps {
  toggleMap: boolean;
}

interface MapEventHandlersProps {
  onUpdateLocation(location: Location): void;
}

const MapEventHandlers = ({ onUpdateLocation }: MapEventHandlersProps) => {
  const map = useMapEvents({
    moveend: () => {
      const { lat, lng } = map.getCenter();
      onUpdateLocation({ latitude: lat, longitude: lng });
    },
  });

  return null;
};

const Map = ({ toggleMap }: MapProps) => {
  const { user: currentUser } = useAuthContext();
  console.log(currentUser);
  const [handlerLocation, setHandlerLocation] = useState<Location | null>(null);
  const { users, isLoading } = useUsers();

  const showSearchAreaButton = !!handlerLocation;

  const handleSearchNearArea = () => {
    setHandlerLocation(null);
  };

  if (!currentUser || !users) {
    return (
      <div className="w-[53%] h-[100%] flex flex-col gap-4 items-center justify-center">
        <Loading size={8} />

        <span className="text-title-opacity">
          Setting near users on the map...
        </span>
      </div>
    );
  }

  return (
    <div
      className={classNames(
        toggleMap ? "w-0" : "w-[53%]",
        "h-[100%] transition-all duration-300"
      )}
    >
      <MapContainer
        center={[
          currentUser?.latitude as number,
          currentUser?.longitude as number,
        ]}
        zoom={13}
        maxZoom={14}
        scrollWheelZoom
        className="w-full h-full relative"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {showSearchAreaButton ? (
          <button
            onClick={handleSearchNearArea}
            className="absolute z-[9999] bg-white animate-fadeIn font-sans text-base text-black font-semibold  shadow-md rounded-full top-4 left-1/2 -translate-x-1/2 px-4 py-1 w-52"
          >
            Search in this area
          </button>
        ) : null}

        {users.map((nearUser) => {
          return (
            <Marker
              key={nearUser.id}
              iconUrl={nearUser.avatar as string}
              position={[
                Number(nearUser?.latitude),
                Number(nearUser?.longitude),
              ]}
            >
              <Popup
                userInfo={{
                  id: nearUser.id as string,
                  avatar: nearUser.avatar as string,
                  name: nearUser.name as string,
                  birthday: nearUser.birthday as Date,
                  hometown: nearUser.hometown as string,
                }}
              />
            </Marker>
          );
        })}

        <MapEventHandlers
          onUpdateLocation={(location) => {
            setHandlerLocation(location);
          }}
        />
      </MapContainer>
    </div>
  );
};

export default Map;
