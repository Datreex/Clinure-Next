import Link from "next/link";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { RelativeLink } from "@/lib/RelativeLink";
export default function CommonLayout(props: {
  title: string;
  description: string;
  backLink?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={"h-full w-full flex flex-col justify-between"}>
      <div className={"shrink-0 bg-white w-full p-2 z-20"}>
        <div className={"flex flex-row items-center gap-2"}>
          {props.backLink && (
            <RelativeLink href={props.backLink}>
              <ArrowBackRoundedIcon strokeWidth={3} />
            </RelativeLink>
          )}
          <h1 className={"text-black text-2xl font-bold"}>{props.title}</h1>
        </div>
        <p className={"text-zinc-600 text-xs font-normal"}>
          {props.description}
        </p>
      </div>
      <div
        className={`p-2 h-full grow-0 overflow-y-scroll relative cleanScrollbar`}
      >
        {props.children}
      </div>
    </div>
  );
}
