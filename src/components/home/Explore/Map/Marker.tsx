import { ReactNode } from "react";
import { geoJson, Icon, IconOptions, LatLngExpression } from "leaflet";
import { Marker as LMarker } from "react-leaflet";
import { UserCircleIcon } from "@heroicons/react/24/outline";

interface MarkerProps {
  iconUrl: string;
  position: LatLngExpression;
  children?: ReactNode;
}

export const Marker = ({ iconUrl, position, children }: MarkerProps) => {
  const icon = new Icon({
    iconUrl: iconUrl || "/icons/avatar.svg",
    iconRetinaUrl: iconUrl || "/icons/avatar.svg",
    popupAnchor: [-0, -25],
    iconSize: [80, 80],
    className: "rounded-full animate-fadeIn",
  });

  return (
    <LMarker icon={icon} position={position}>
      {children}
    </LMarker>
  );
};
