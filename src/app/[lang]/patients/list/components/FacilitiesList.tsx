"use client";
import {
  Facility,
  FacilityWithGeoCoding,
  FacilityWithGeoCodingAndContacts,
} from "@/app/[lang]/patients/types";
import { useState } from "react";
import { Collapse } from "@mui/material";
import { Button } from "@mui/joy";
import { CollapseWithTitle } from "@/app/[lang]/patients/list/components/CollapseWithTitle";
import { FacilityListItem } from "@/app/[lang]/patients/list/components/FacilityListItem";

export const FacilitiesList = ({
  facilities,
}: {
  facilities: FacilityWithGeoCodingAndContacts[];
}) => {
  return (
    <CollapseWithTitle title={"Facilities"}>
      <ul className={"grid grid-cols-1 auto-rows-auto"}>
        {!facilities || facilities.length === 0 ? (
          <span className={"text-neutral-400 text-xs font-semibold uppercase"}>
            No Location data
          </span>
        ) : (
          facilities.map((facility) => (
            <FacilityListItem
              facility={facility}
              key={`${facility.name},${facility.geoCoding.lng},${facility.geoCoding.lat}`}
            />
          ))
        )}
      </ul>
    </CollapseWithTitle>
  );
};
