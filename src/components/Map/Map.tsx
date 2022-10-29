import "leaflet/dist/leaflet.css";

import { MapContainer, Popup, TileLayer } from "react-leaflet";

import { Marker } from "./Marker";

const Map = () => {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
      className="w-[53%] h-[100%]"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker iconUrl="/icons/avatar.svg" position={[51.505, -0.09]}>
        <Popup>Wanna have a conversation with ...</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
