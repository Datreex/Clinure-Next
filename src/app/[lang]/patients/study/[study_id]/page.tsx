"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Study } from "@/app/[lang]/patients/types";
import { useMap } from "@/lib/map/context";
import { addStudyIdToUrl } from "@/app/[lang]/patients/helpers/addStudyIdToUrl";
import { useEffect } from "react";
import { DEBUGGER } from "@/components/debug";
import { Divider } from "@mui/joy";
import Chatbot from "@/components/Chatbot";

export default function Page({
  params,
}: {
  params: { lang: string; study_id: string };
}) {
  const url = addStudyIdToUrl("/api/study", params.study_id);
  const { error, isLoading, data, isFetching } = useQuery<Study>({
    queryKey: ["study", params.study_id],
    queryFn: async () => {
      const response = await fetch(url);
      return await response.json();
    },
  });
  const { setMarkers, bounds, map } = useMap();
  // this effect is used to enable the query when the count is fetched
  useEffect(() => {
    map?.setZoom(1);
  }, [map]);
  //
  // // this effect is used to set the markers when the data is fetched
  useEffect(() => {
    // const time = Date.now();
    if (data && !error) {
      const markers = data.facilities.map((facility) => ({
        position: facility.geoCoding,
        name: facility.name,
      }));
      setMarkers(markers);
    }
    // console.log("after setting markers", (Date.now() - time) / 1000);
    return () => {
      setMarkers([]);
    };
  }, [data, setMarkers, error]);
  if (isFetching && isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!data) return <div>No results</div>;
  return (
    <div className={"h-full flex flex-col relative"}>
      <div className={"w-full shrink-0 h-fit z-30 bg-white"}>
        <a
          href={`https://clinicaltrials.gov/study/${data.nct_id}`}
          className={"text-neutral-400 text-xs font-semibold uppercase"}
        >
          #{data.nct_id}
        </a>
        <div className={"text-cyan-900 text-lg font-medium "}>
          {data.brief_title || data.official_title}
        </div>
        <div className="justify-start items-center gap-2.5 inline-flex">
          <div
            className={`text-[#6ACD5A] text-xs font-bold uppercase ${
              data.overall_status === "Recruiting"
                ? "text-[#6ACD5A]"
                : "text-red-500"
            }`}
          >
            {data.overall_status}
          </div>
          <div className="w-2 h-2  shrink-0 bg-black rounded-full" />
          <div className={"flex flex-row items-center gap-1"}>
            <span className="text-black text-xs font-bold uppercase">
              PHASE
            </span>
            <span
              className={`text-[#6ACD5A] text-xs font-bold uppercase ${
                data.overall_status === "Recruiting"
                  ? "text-[#6ACD5A]"
                  : "text-red-500"
              }`}
            >
              {data.phase.charAt(data.phase.length - 1)}
            </span>
          </div>
          <div className="w-2 h-2 shrink-0 bg-black rounded-full" />
          <div className="text-black text-xs font-bold uppercase">
            Interventional
          </div>
        </div>
        <Divider
          sx={{
            marginTop: "0.75rem",
          }}
        />
      </div>
      {/*<div className={"h-full w-full z-10"}>*/}
      <div className={"h-full overflow-hidden"}>
        <Chatbot />
      </div>
      {/*</div>*/}
    </div>
  );
}
