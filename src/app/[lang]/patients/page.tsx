/*
    This is the page where we will display the list of filters and pass it to the patient list
    this is the structure
    useContext();
    <FilterList>
        <Filter/>
        <Filter/>
        <Filter/>
        <Filter/>
        <Filter/>
        <Button/>
    </FilterList>
 */

import Link from "next/link";
import { RelativeLink } from "@/lib/RelativeLink";
import CommonLayout from "@/components/CommonLayout";
import { PhaseFilter } from "@/components/Filters/PhaseFilter";
import { FilterStateDebugger } from "@/lib/filters";
import { StatusFilter } from "@/components/Filters/StatusFilter";
import { ConditionsFilter } from "@/components/Filters/ConditionsFilter";
import { InterventionsFilter } from "@/components/Filters/InterventionsFilter";
import { StartDateFilter } from "@/components/Filters/StartDateFilter";
import { Button, Divider } from "@mui/joy";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { CountResults } from "@/app/[lang]/patients/components/Count";
export default function Patients() {
  return (
    <CommonLayout
      title={"Filters"}
      description={
        "Please set the filters and click the button to see the details"
      }
    >
      <div className={"flex flex-col gap-3"}>
        <div className={"p-2 border-[1.5px] rounded-lg flex gap-3 flex-col"}>
          <ConditionsFilter />
          <Divider orientation="horizontal">or</Divider>

          <InterventionsFilter />
        </div>
        <PhaseFilter />
        <StatusFilter />
        <StartDateFilter />
        <div
          className={
            "sticky bottom-0 w-full bg-white pt-1.5 border-t-2 border-neutral-300 flex justify-between items-center "
          }
        >
          <CountResults />
          <RelativeLink href={"list"}>
            <Button endDecorator={<DoneRoundedIcon />}>Apply</Button>
          </RelativeLink>
        </div>
      </div>
    </CommonLayout>
  );
}
