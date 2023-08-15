"use client";

import {
  Facility,
  FacilityWithGeoCoding,
  FacilityWithGeoCodingAndContacts,
} from "@/app/[lang]/patients/types";
import { useMap } from "@/lib/map/context";
import { createPortal } from "react-dom";
import {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import ReactDOMServer from "react-dom/server";
import { Button } from "@mui/joy";
import { useCollapseContext } from "@/components/CollapseContext";
import MarkerInfoWindow from "@/components/map/MarkerInfoWindow";
import { useIntersectionObserver } from "usehooks-ts";

export const FacilityListItem = ({
  facility,
}: {
  facility: FacilityWithGeoCodingAndContacts;
}) => {
  const [focused, setFocused] = useState(false);
  const { collapsed, setCollapsed } = useCollapseContext();
  const ref = useRef<HTMLLIElement>(null);

  const { map, createdMarkers } = useMap();

  const marker = createdMarkers.find((marker) =>
    coordsCompare(
      marker.getPosition()!,
      new google.maps.LatLng(facility.geoCoding),
    ),
  );
  const render = <MarkerInfoWindow facility={facility} />;
  const infoWindow = useInfoWindow(marker, render);

  const setFocus = (pan: boolean = true, scroll: boolean = true) => {
    setFocused(true);
    setCollapsed(true);
    if (pan) map?.panTo(facility.geoCoding);
    createdMarkers.forEach((marker) => {
      marker.setIcon("/markerDisabled.svg");
    });

    marker?.setIcon("/marker.svg");
    // map?.setZoom(3);
    if (scroll && ref && ref.current) {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  const setBlur = () => {
    setFocused(false);
    // map?.setZoom(1);
    createdMarkers.forEach((marker) => {
      marker.setIcon("/marker.svg");
    });
  };

  marker?.addListener("mouseover", () => {
    setFocus(false);
  });
  marker?.addListener("mouseout", () => {
    setBlur();
  });
  // console.log(new Error("Marker not found for faciltiy " + facility.name));
  return (
    <li
      ref={ref}
      key={facility.name}
      className={`text-neutral-400 text-sm  font-semibold flex flex-row justify-start items-center  cursor-pointer ${
        focused ? "brightness-50" : ""
      }`}
    >
      <FacilityListItemDecoration />
      <div className={"py-1"}>
        <span
          onMouseEnter={() => {
            setFocus(true, false);
          }}
          onMouseLeave={() => {
            setBlur();
          }}
          onClick={() => {
            if (marker) infoWindow.open(map!, marker);
            map?.setZoom(6);
          }}
        >
          {facility.name}, {facility.country}
        </span>
      </div>
      <div className={"hidden"}>{render}</div>
    </li>
  );
};

const FacilityListItemDecoration = () => (
  <div className={"w-[1.5rem] h-full shrink-0 relative"}>
    <div className={"w-[2px] bg-neutral-400 h-full mx-auto"} />
    <div
      className={
        "w-2 h-2 rounded-full bg-neutral-400 absolute top-[0.6rem] left-1/2 transform -translate-x-1/2"
      }
    />
  </div>
);

function coordsCompare(a: google.maps.LatLng, b: google.maps.LatLng) {
  //this approach in not working to rounding errors
  return a.equals(b);
}

const useInfoWindow = (marker?: google.maps.Marker, content?: ReactNode) => {
  const infoWindow = useMemo(() => new google.maps.InfoWindow({}), []);
  useEffect(() => {
    marker?.getMap()?.addListener("click", (e) => {
      infoWindow.open();
      // infoWindow.close();
    });
  }, [marker, infoWindow]);
  useEffect(() => {
    infoWindow.setContent(ReactDOMServer.renderToString(<div>{content}</div>));
  }, [marker, content, infoWindow]);
  return infoWindow;
};
