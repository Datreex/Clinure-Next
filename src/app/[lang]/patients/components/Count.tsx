"use client";

import { toCubeFilter, useFilterFullState } from "@/lib/filters";
import { useCubeQuery } from "@cubejs-client/react";
import { CircularProgress } from "@mui/joy";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
export const CountResults = () => {
  const state = useFilterFullState();
  const { isLoading, resultSet, error } = useCubeQuery({
    measures: ["studies.count"],
    filters: toCubeFilter(state),
  });
  if (error) {
    console.log(error);
    return (
      <div className={"text-red-800"}>
        <ErrorRoundedIcon color={"error"} fontSize={"small"} />
        error check console
      </div>
    );
  }
  // console.log(resultSet);
  if (resultSet)
    return (
      <div className={"font-bold text-sm"}>
        {resultSet?.rawData()[0]["studies.count"]} study
      </div>
    );
  return <CircularProgress size={"sm"} />;
};
