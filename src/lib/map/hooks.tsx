"use client";
import { useMap } from "./context";
import { useEffect } from "react";
import MarkerInfoWindow from "@/components/map/MarkerInfoWindow";
import ReactDOMServer from "react-dom/server";

export const useMarkers = () => {
  const { map, markers } = useMap();
  useEffect(() => {
    if (map) {
      const infoWindow = new google.maps.InfoWindow();
      if (markers.length > 0) {
        markers.forEach((marker) => {
          const markerElement = new google.maps.Marker({
            position: marker.position,
            map: map,
            title: marker.name,
          });
          markerElement.addListener("click", () => {
            const content = (
              <MarkerInfoWindow
                name={marker.name}
                adress={marker.adress}
                phone={marker.phone}
                website={marker.website}
                email={marker.email}
              />
            );
            const contentString = ReactDOMServer.renderToString(content);
            infoWindow.setContent(contentString);
            infoWindow.open(map, markerElement);
          });
        });
      }
    }
  }, [map, markers]);
};
