import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import Link from "next/link";
export default function LinkToResearchers() {
  return (
    <Link
      href={"/en-US/researchers"}
      className="px-2 py-0.5 bg-white rounded-3xl shadow justify-start items-center gap-1 inline-flex"
    >
      <div className="text-neutral-700 text-xl font-black leading-relaxed">
        Clinure
      </div>
      <div className="text-neutral-700 text-xl font-normal leading-relaxed">
        for researchers
      </div>
      <ArrowForwardRoundedIcon />
    </Link>
  );
}
