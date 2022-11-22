import { ReactNode } from "react";
import { geoJson, Icon, LatLngExpression } from "leaflet";
import { Marker as LMarker } from "react-leaflet";

interface MarkerProps {
  iconUrl: string;
  position: LatLngExpression;
  children?: ReactNode;
}

export const Marker = ({ iconUrl, position, children }: MarkerProps) => {
  const icon = new Icon({
    iconUrl,
    iconRetinaUrl: iconUrl,
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
