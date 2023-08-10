"use client";
import { mapStyle } from "@/assets/mapStyles";
import { useMap } from "@/lib/map/context";
import { el } from "date-fns/locale";
import React, { use } from "react";
import { useEffect } from "react";
import { useMarkers } from "@/lib/map/hooks";

export default function Map() {
  const { setMap, setLoading, setBounds, setMarkers } = useMap();
  useEffect(() => {
    // Load the Google Maps API script
    const loadGoogleMapsScript = () => {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      script.addEventListener("load", () => {
        setLoading(false);
        setTimeout(() => {
          initMap();
        }, 5);
      });
    };

    const initMap = () => {
      const mapOptions = {
        center: { lat: 36.8065, lng: 10.1815 },
        zoom: 3,
        styles: mapStyle,
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        minZoom: 3,
        maxZoom: 13,
        restriction: {
          latLngBounds: {
            north: 90,
            south: -90,
            west: -180,
            east: 180,
          },
          strictBounds: false,
        },
      };

      // Create the map instance
      const mapElement = document.getElementById("map");
      let map: google.maps.Map;
      if (mapElement) {
        map = new google.maps.Map(
          mapElement as HTMLElement,
          mapOptions as google.maps.MapOptions
        );
        setMap(map);
      } else {
        throw new Error("Map element not found");
      }

      //add event listener to map to update bounds
      if (map) {
        google.maps.event.addListener(map, "dragend", () => {
          const bounds = map.getBounds();
          if (bounds) {
            setBounds(bounds);
            console.log(bounds);
          }
        });
        google.maps.event.addListener(map, "zoom_changed", () => {
          const bounds = map.getBounds();
          if (bounds) {
            setBounds(bounds);
          }
        });
      } else {
        throw new Error("Map not found");
      }
    };
    loadGoogleMapsScript();
  }, []);
  useMarkers();

  return (
    <>
      <div id="map" style={{ height: "100vh", width: "100%" }}></div>
    </>
  );
}
