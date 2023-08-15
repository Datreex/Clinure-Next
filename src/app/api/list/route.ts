import { cubeJsApi } from "@/globalConstants/cube";
import { listFacilities } from "@/app/api/list/facilities";
import { listConditions } from "@/app/api/list/conditions";
import { listStudies } from "@/app/api/list/studies";
import { getFilters } from "@/app/[lang]/patients/helpers/getFilters";
import { NextRequest } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const filter = getFilters(request);

    // console.log(filter);
    const studies = await listStudies(filter);
    const ids = studies.map((d) => d.nct_id as string);
    // const facilities = await listFacilities(ids);
    // const conditions = await listConditions(ids);
    const [facilities, conditions] = await Promise.all([
      listFacilities(ids),
      listConditions(ids),
    ]);
    // console.log(studies);
    const result = studies.map((d) => ({
      ...d,
      facilities: facilities.get(d.nct_id as string) || [],
      conditions: conditions.get(d.nct_id as string) || [],
    }));
    return new Response(JSON.stringify(result));
  } catch (e) {
    // console.log(e);
    throw new Error("An error occurred check the logs");
  }
}
