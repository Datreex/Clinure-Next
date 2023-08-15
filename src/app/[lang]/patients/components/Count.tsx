"use client";

import { toCubeFilter, useFilterFullState } from "@/lib/filters";
import { useCubeQuery } from "@cubejs-client/react";
import { CircularProgress } from "@mui/joy";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import { addFiltersToUrl } from "@/app/[lang]/patients/helpers/addFiltersToUrl";
import { useQuery } from "@tanstack/react-query";
import { Study } from "@/app/[lang]/patients/types";
import { useCount } from "@/app/[lang]/patients/hooks/useCount";
export const CountResults = () => {
  const { error, isLoading, data } = useCount();
  // console.log(resultSet);
  // if (resultSet)
  //   return (
  //     <div className={"font-bold text-sm"}>
  //       {resultSet?.rawData()[0]["studies.count"]} study
  //     </div>
  //   );
  if (error) return <ErrorRoundedIcon />;

  if (data)
    return (
      <div className={"font-bold text-sm flex flex-row items-center gap-2"}>
        {data} study
        {parseInt(data) > 30 ? (
          <>
            <div className={"rounded-full inline-block w-3 h-3 bg-green-500"} />
            Only 30 will be shown
          </>
        ) : null}
      </div>
    );
  return <CircularProgress size={"sm"} />;
};
