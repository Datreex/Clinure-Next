"use client";
import { useMap } from "./context";
import { useEffect } from "react";
import MarkerInfoWindow from "@/components/map/MarkerInfoWindow";
import ReactDOMServer from "react-dom/server";
import { Marker } from "./context";

export const useMarkers = () => {
  const { map, markers, setCreatedMarkers } = useMap();
  const createdMarkers: google.maps.Marker[] = [];
  useEffect(() => {
    if (map) {
      const infoWindow = new google.maps.InfoWindow();
      if (markers.length > 0) {
        markers.forEach((marker) => {
          const image = "/marker.svg";

          const markerElement = new google.maps.Marker({
            position: marker.position,
            map: map,
            icon: image,
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
                position={marker.position}
              />
            );
            const contentString = ReactDOMServer.renderToString(content);
            infoWindow.setContent(contentString);
            infoWindow.open(map, markerElement);
          });
          createdMarkers.push(markerElement);
        });
        setCreatedMarkers(createdMarkers);
        console.log(createdMarkers);
      } else {
        setCreatedMarkers([]);
      }
    }
  }, [map, markers]);
};
