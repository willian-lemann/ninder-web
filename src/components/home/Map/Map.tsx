import "leaflet/dist/leaflet.css";

import { useAuthContext } from "@context/auth";

import { useGeoLocation } from "@hooks/useGeoLocation";

import { MapContainer, TileLayer } from "react-leaflet";

import { Marker } from "./Marker";
import { Loading } from "@components/shared/Loading";
import { classNames } from "@utils/classNames";
import { useUsers } from "@context/users/useUsers";
import { Popup } from "./Popup";

interface MapProps {
  toggleMap: boolean;
  searchFilter: string;
}

const Map = ({ toggleMap, searchFilter }: MapProps) => {
  const currentLocation = useGeoLocation();
  const { user } = useAuthContext();
  const { users, isLoading } = useUsers(searchFilter);

  if (!currentLocation || isLoading) {
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
        {users.map((nearUser) => (
          <Marker
            key={nearUser.id}
            iconUrl={nearUser.avatar as string}
            position={[
              Number(nearUser.location?.latitude),
              Number(nearUser.location?.longitude),
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
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
