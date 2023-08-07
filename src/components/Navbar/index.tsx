import Image from "next/image";
import Logo from "../../../public/datreex-clinure.svg";
import NavMenu from "@/components/Navbar/NavMenu";
export default function Navbar() {
  return (
    <nav
      className={
        "flex flex-row justify-between items-center px-3 py-1 border-b-2"
      }
    >
      <Image src={Logo} alt={"logo"} />
      <NavMenu />
    </nav>
  );
}
