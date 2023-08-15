"use client";
import { useQuery } from "@tanstack/react-query";
import { Study } from "@/app/[lang]/patients/types";
import { useCount } from "@/app/[lang]/patients/hooks/useCount";
import { useFiltersUrl } from "@/app/[lang]/patients/hooks/useFiltersUrl";
import { StudyItem } from "@/app/[lang]/patients/list/components/StudyItem";
import { CircularProgress, Divider, Table } from "@mui/joy";
import { useMap } from "@/lib/map/context";
import Marker = google.maps.Marker;
import { Fragment, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { toCubeFilter, useFilterFullState } from "@/lib/filters";
import { BinaryFilter, Filter, UnaryFilter } from "@cubejs-client/core";
import { CollapseWithTitle } from "@/app/[lang]/patients/list/components/CollapseWithTitle";
const MAX_COUNT = 100;
const validStudiesNumber = (count: number | string | undefined) => {
  if (typeof count === "string") {
    try {
      return parseInt(count) < MAX_COUNT;
    } catch {
      return false;
    }
  }
  if (typeof count === "number") return count < MAX_COUNT;
  return false;
};
export default function Page({ params }: { params: { lang: string } }) {
  // const {
  //   isLoading: countLoading,
  //   data: count,
  //   error: countError,
  // } = useCount();
  let url = useFiltersUrl(`/api/list/`);
  const state = useFilterFullState();
  // const [enabled, setEnabled] = useState(false);
  const { error, isLoading, data, isFetching } = useQuery<Study[]>({
    queryKey: ["list", url],
    queryFn: async () => {
      const response = await fetch(url);
      return await response.json();
    },
    refetchOnWindowFocus: false,
  });
  const { setMarkers, bounds, map } = useMap();
  // this effect is used to enable the query when the count is fetched
  useEffect(() => {
    map?.setZoom(1);
  }, [map]);
  // useEffect(() => {
  //   if (validStudiesNumber(count)) setEnabled(true);
  // }, [count]);
  // this effect is used to set the markers when the data is fetched
  useEffect(() => {
    // const time = Date.now();
    console.log("setting markers");
    if (data) {
      const markers = data
        ?.map((study) =>
          study.facilities
            .filter((facility) => facility.geoCoding !== undefined)
            .map((facility) => ({
              position: facility.geoCoding,
              name: facility.name,
            })),
        )
        .flat();
      // .splice(0, 200);
      setMarkers(markers);
    }
    // console.log("after setting markers", (Date.now() - time) / 1000);
    return () => {
      setMarkers([]);
    };
  }, [data, setMarkers]);
  // this state and effect is used to filter studies that are not visible on the screen
  // const [visibleStudies, setVisibleStudies] = useState<Study[]>([]);
  // useEffect(() => {
  //   // const time = Date.now();
  //   const filteredStudies = data?.filter((study) =>
  //     study.facilities.some(
  //       (facility) =>
  //         bounds?.contains(new google.maps.LatLng(facility.geoCoding)) ?? false,
  //     ),
  //   );
  //   setVisibleStudies(filteredStudies ?? []);
  //   // console.log("after filtering studies", (Date.now() - time) / 1000);
  // }, [bounds, data, isLoading]);
  // console.log(process.env.NEXT_PUBLIC_BASE_URL);
  // if (countLoading || (isFetching && isLoading)) return <div>Loading...</div>;
  // if (countError || error) return <div>Error</div>;
  // if (!validStudiesNumber(count)) return <div>Too many results</div>;
  if (isLoading)
    return (
      <div>
        <CircularProgress />
      </div>
    );
  if (error) return <div>Error</div>;
  if (!data || data.length === 0) return <div>No results</div>;
  return (
    <ul className={"flex flex-col gap-3"}>
      <CollapseWithTitle title={"Filters"}>
        <Table>
          <thead>
            <tr>
              <th>Member</th>
              <th>Operator</th>
              <th>Values</th>
            </tr>
          </thead>
          <tbody>
            {toCubeFilter(state).map((filter) =>
              "member" in filter && filter.member ? (
                <tr key={filter.member}>
                  <td className={"break-all"}>{filter.member}</td>
                  <td>{filter.operator}</td>
                  <td>{filter.values ? filter.values.join(", ") : null}</td>
                </tr>
              ) : (
                <></>
              ),
            )}
          </tbody>
        </Table>
      </CollapseWithTitle>
      {data?.map((study) => (
        <Fragment key={study.nct_id}>
          <StudyItem study={study} />
          <Divider />
        </Fragment>
      ))}
    </ul>
  );
}
