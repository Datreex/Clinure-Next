"use client";

import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import React, { ReactNode } from "react";
import ReactDOMServer from "react-dom/server";
import MarkerInfoWindow from "@/components/map/MarkerInfoWindow";
import { set } from "date-fns";
import { useMarkers } from "./hooks";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

interface LatLng {
  lat: number;
  lng: number;
}

export interface Marker {
  position: LatLng;
  name: string;
  // adress?: string;
  // phone?: string;
  // website?: string;
  // email?: string;
}

interface MapContextType {
  map: google.maps.Map | null;
  loading: boolean;
  error: Error | null;
  markers: Marker[];
  cluster?: MarkerClusterer;
  createdMarkers: google.maps.Marker[];
  bounds: google.maps.LatLngBounds | null;
  setMap: (map: google.maps.Map | null) => void;
  setLoading: (loading: boolean) => void;
  setMarkers: (markers: Marker[]) => void;
  setCreatedMarkers: (
    markers: google.maps.Marker[],
    cluster?: MarkerClusterer,
  ) => void;
  addMarker: (marker: Marker) => void;
  removeMarker: (marker: Marker) => void;
  setBounds: (bounds: google.maps.LatLngBounds | null) => void;
}

const MapContext = createContext<MapContextType>({
  map: null,
  loading: true,
  error: null,
  markers: [],
  createdMarkers: [],
  bounds: null,
  setMap: (map) => {},
  setLoading: (loading) => {},
  setMarkers: (markers) => {},
  setCreatedMarkers: (markers) => {},
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
  const [createdMarkers, setCreatedMarkers] = useState<google.maps.Marker[]>(
    [],
  );
  const [cluster, setCluster] = useState<MarkerClusterer | undefined>();

  return (
    <MapContext.Provider
      value={{
        map,
        loading,
        error,
        markers,
        createdMarkers,
        bounds,
        cluster,
        setMap,
        setLoading,
        setMarkers,
        setCreatedMarkers: (markers, cluster) => {
          setCreatedMarkers((prevMarkers) => {
            prevMarkers.forEach((marker) => {
              marker.setMap(null);
            });
            return markers;
          });
          setCluster((prevState) => {
            if (prevState) {
              prevState.clearMarkers();
            }
            return cluster;
          });
        },
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
