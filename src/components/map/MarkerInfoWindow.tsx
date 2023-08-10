import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { IconButton } from "@mui/joy";
import Image from "next/image";

interface MarkerInfoWindowProps {
  name: string;
  adress: string;
  position: google.maps.LatLngLiteral;
  phone?: string;
  website?: string;
  email?: string;
}

const MarkerInfoWindow: React.FC<MarkerInfoWindowProps> = ({
  name,
  adress,
  phone,
  website,
  email,
  position,
}) => {
  const linktogooglemaps = `https://www.google.com/maps/search/?api=1&query=${position.lat},${position.lng}`;
  return (
    <div className="w-72">
      <h1 className="text-xl font-semibold w-full text-center overflow-ellipsis mb-2">
        <Image
          src="/Frame.svg"
          alt="H frame"
          width={25}
          height={25}
          className=" inline-block "
        />
        <p className="w-fit inline-block ml-1">{name}</p>
      </h1>
      <h2 className="text-md font-medium w-full text-center">{adress} </h2>
      <div className="w-full flex flex-row justify-evenly mt-4 ">
        {phone && (
          <a href={"tel:" + phone}>
            <Image
              src="/phone.svg"
              alt="phone"
              width={40}
              height={40}
              className=" inline-block "
            />
          </a>
        )}

        {website && (
          <a href={"https://" + website} target="_blank">
            <Image
              src="/website.svg"
              alt="website"
              width={40}
              height={40}
              className=" inline-block "
            />
          </a>
        )}
        {email && (
          <a href={"mailto:" + email}>
            <Image
              src="/mail.svg"
              alt="email"
              width={40}
              height={40}
              className=" inline-block "
            />
          </a>
        )}
        <a href={linktogooglemaps} target="_blank">
          <Image
            src="/Map_marker.svg"
            alt="googlemaps"
            width={40}
            height={40}
            className=" inline-block "
          />
        </a>
      </div>
    </div>
  );
};
export default MarkerInfoWindow;
