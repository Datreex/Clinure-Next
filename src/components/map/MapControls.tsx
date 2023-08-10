"use client";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import MyLocationRoundedIcon from "@mui/icons-material/MyLocationRounded";
import { ButtonGroup, IconButton } from "@mui/joy";
import { useMap } from "@/lib/map/context";

export default function MapControls() {
  const { map } = useMap();
  return (
    <div className={"flex flex-col gap-2 items-center"}>
      <ButtonGroup
        orientation={"vertical"}
        className={"bg-white rounded-full shadow"}
        sx={{
          borderRadius: "9999px",
        }}
        onClick={() => {
          if (map) {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position: GeolocationPosition) => {
                  const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                  };
                  const image =
                    "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
                  const locationMarker = new google.maps.Marker({
                    position: pos,
                    map,
                    icon: image,
                  });
                  // map.setZoom(3);
                  map.panTo(pos);
                  map.setZoom(6);
                }
              );
            } else {
              alert("Geolocation is not supported by this browser.");
            }
          } else {
            alert("Map is not loaded yet");
          }
        }}
      >
        <IconButton>
          <MyLocationRoundedIcon />
        </IconButton>
      </ButtonGroup>
      <ButtonGroup
        orientation={"vertical"}
        className={"bg-white rounded-full shadow"}
        sx={{
          borderRadius: "9999px",
        }}
      >
        <IconButton
          onClick={() => {
            if (map) {
              map.setZoom(map.getZoom() + 1);
            } else {
              alert("Map is not loaded yet");
            }
          }}
        >
          <AddRoundedIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            if (map) {
              map.setZoom(map.getZoom() - 1);
            } else {
              alert("Map is not loaded yet");
            }
          }}
        >
          <RemoveRoundedIcon />
        </IconButton>
      </ButtonGroup>
    </div>
  );
}
