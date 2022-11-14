import "leaflet/dist/leaflet.css";
import Image from "next/image";

import { formatAge } from "@models/user";

import { useAuthContext } from "@context/auth";
import { useUsers } from "@context/users/useUsers";
import { useGeoLocation } from "@hooks/useGeoLocation";

import { MapContainer, Popup, TileLayer } from "react-leaflet";

import { Marker } from "./Marker";
import { Loading } from "@components/shared/Loading";
import { Timestamp } from "firebase/firestore";
import { classNames } from "@utils/classNames";

interface MapProps {
  toggleMap: boolean;
}

const Map = ({ toggleMap }: MapProps) => {
  console.log(toggleMap);
  const currentLocation = useGeoLocation();
  const { user } = useAuthContext();
  const { data } = useUsers();

  if (!currentLocation) {
    return (
      <div className="w-[53%] h-[100%] flex items-center justify-center">
        <Loading size={8} />
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
        center={[currentLocation.latitude, currentLocation.longitude]}
        zoom={13}
        scrollWheelZoom
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data?.map((nearUser) => {
          if (nearUser.id === user?.id) return null;

          return (
            <Marker
              key={nearUser.id}
              iconUrl={nearUser.avatar as string}
              position={[
                Number(nearUser.location?.latitude),
                Number(nearUser.location?.longitude),
              ]}
            >
              <Popup>
                <div className="h-44 flex flex-col justify-end">
                  <div className="w-full h-[100px] absolute right-0 top-0">
                    <Image
                      src={nearUser.avatar as string}
                      className="object-cover rounded-t-md"
                      alt="user avatar"
                      fill
                    />
                  </div>

                  <div className="flex flex-col">
                    <div>
                      <strong>{nearUser.name}</strong>,
                      <span className="pl-1">
                        {formatAge(nearUser.birthday)}
                      </span>
                    </div>
                    <span>{nearUser.hometown}</span>
                  </div>

                  <button className="mt-2 border-none bg-primary rounded-md text-white px-2 py-2">
                    Start a conversation
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
