"use client";
import Link from "next/link";
import { FilterState, useFilterFullState, toCubeFilter } from "@/lib/filters";
import { useCubeQuery } from "@cubejs-client/react";
import { Filter } from "@cubejs-client/core";
import SyntaxHighlighter from "react-syntax-highlighter";
import { DEBUGGER } from "@/components/debug";

export default function Page({ params }: { params: { lang: string } }) {
  const state = useFilterFullState();

  const { isLoading, resultSet, error } = useCubeQuery<{
    "studies.nct_id": string;
    "studies.official_title": string;
    "studies.overall_status": string;
    // "facilities.name": string;
    // "browse_conditions.mesh_term": string;
    // "browse_interventions.mesh_term": string;
  }>({
    dimensions: [
      "studies.nct_id",
      "studies.official_title",
      "studies.overall_status",
      // "facilities.name",
      // "browse_conditions.mesh_term",
      // "browse_interventions.mesh_term",
    ],
    filters: toCubeFilter(state),
    limit: 10000,
  });
  const { resultSet: rs, error: terror } = useCubeQuery(
    {
      dimensions: ["facilities.nct_id", "facilities.name"],
      filters: [
        {
          member: "facilities.nct_id",
          operator: "equals",
          values: [
            ...(resultSet?.rawData().map((row) => row["studies.nct_id"]) || []),
          ],
        },
      ],
    },
    { skip: isLoading || resultSet === null },
  );

  console.log(rs);
  const map = new Map<
    string,
    {
      title: string;
      status: string;
      facilities: string[];
      conditions: string[];
      interventions: string[];
    }
  >();

  //just for dev purposes, just set a link to the [study_id] page and let it be nice

  return (
    <div>
      <Link href={`/${params.lang}/patients`}>Home</Link>
    </div>
  );
}
