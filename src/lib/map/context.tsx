"use client";

import { createContext, useContext, useEffect, useState } from "react";
import React, { ReactNode } from "react";
import ReactDOMServer from "react-dom/server";
import MarkerInfoWindow from "@/components/map/MarkerInfoWindow";
import { set } from "date-fns";
import { useMarkers } from "./hooks";

interface LatLng {
  lat: number;
  lng: number;
}

interface Marker {
  position: LatLng;
  name: string;
  adress: string;
  phone: string;
  website: string;
  email: string;
}

interface MapContextType {
  map: google.maps.Map | null;
  loading: boolean;
  error: Error | null;
  markers: Marker[];
  bounds: google.maps.LatLngBounds | null;
  setMap: (map: google.maps.Map | null) => void;
  setLoading: (loading: boolean) => void;
  setMarkers: (markers: Marker[]) => void;
  addMarker: (marker: Marker) => void;
  removeMarker: (marker: Marker) => void;
  setBounds: (bounds: google.maps.LatLngBounds | null) => void;
}

const MapContext = createContext<MapContextType>({
  map: null,
  loading: true,
  error: null,
  markers: [],
  bounds: null,
  setMap: (map) => {},
  setLoading: (loading) => {},
  setMarkers: (markers) => {},
  addMarker: (marker) => {},
  removeMarker: (marker) => {},
  setBounds: (bounds) => {},
});

interface MapProviderProps {
  children: ReactNode;
}

export const MapProvider: React.FC<MapProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [bounds, setBounds] = useState<google.maps.LatLngBounds | null>(null);

  return (
    <MapContext.Provider
      value={{
        map,
        loading,
        error,
        markers,
        bounds,
        setMap,
        setLoading,
        setMarkers,
        addMarker: (marker) => {
          setMarkers((prevMarkers) => [...prevMarkers, marker]);
        },
        removeMarker: (marker) => {
          setMarkers((prevMarkers) => prevMarkers.filter((m) => m !== marker));
        },
        setBounds,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMap = (): MapContextType => useContext(MapContext);
