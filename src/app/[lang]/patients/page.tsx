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
import { Button } from "@mui/joy";

export default function Patients() {
  return (
    <CommonLayout
      title={"Filters"}
      description={
        "Please set the filters and click the button to see the details"
      }
    >
      <div className={"flex flex-col gap-3"}>
        <ConditionsFilter />
        <InterventionsFilter />
        <PhaseFilter />
        <StatusFilter />
        <StartDateFilter/>
        <RelativeLink href={"list"}>
        <Button>Apply</Button></RelativeLink>
      </div>
    </CommonLayout>
  );
}
