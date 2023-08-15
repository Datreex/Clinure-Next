import { Study } from "@/app/[lang]/patients/types";
import { Chip } from "@mui/joy";
import { FacilitiesList } from "@/app/[lang]/patients/list/components/FacilitiesList";
import { CollapseWithTitle } from "@/app/[lang]/patients/list/components/CollapseWithTitle";
import Link from "next/link";

export const StudyItem = ({ study }: { study: Study }) => {
  return (
    <li className={"flex flex-col gap-2"}>
      <div className={"flex flex-row justify-between items-center"}>
        <div
          className={`text-white text-xs font-bold uppercase px-1 py-px rounded-3xl ${
            study.overall_status === "Recruiting"
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        >
          {study.overall_status}
        </div>
        <a
          href={`https://clinicaltrials.gov/study/${study.nct_id}`}
          className={"text-neutral-400 text-xs font-semibold uppercase"}
        >
          #{study.nct_id}
        </a>
      </div>
      <Link
        href={`study/${study.nct_id}`}
        className={
          "text-cyan-900 text-lg font-normal leading-tight hover:underline"
        }
      >
        {study.brief_title || study.official_title}
      </Link>
      <CollapseWithTitle title={"Conditions"}>
        <div className={"flex flex-row flex-wrap gap-1"}>
          {/*  this later will only show the first 5 or 6 conditions and if there are more we show a + 4 ship and when hovered it shows all of them*/}
          {study.conditions.map((condition) => (
            <Chip key={condition} size={"sm"}>
              {condition}
            </Chip>
          ))}
        </div>
      </CollapseWithTitle>

      {/*</div>*/}

      <FacilitiesList facilities={study.facilities} />
    </li>
  );
};
