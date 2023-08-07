import Image from "next/image";
import map_placeholder from "./map_placeholder.png";
export default function Map() {
  return (
    <Image
      src={map_placeholder}
      alt={"map_placeholder"}
      className={"h-screen w-screen object-cover"}
      loading={"eager"}
    />
  );
}
