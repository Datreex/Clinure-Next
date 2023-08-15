import { listFacilities } from "@/app/api/list/facilities";
import { listConditions } from "@/app/api/list/conditions";

import { NextRequest } from "next/server";
import { getStudyId } from "@/app/[lang]/patients/helpers/getStudyId";
import { getStudy } from "@/app/api/study/studies";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const id = getStudyId(request);
    if (!id) return new Response("400: Bad Request", { status: 400 });
    const study = await getStudy(id);
    const [facilities, conditions] = await Promise.all([
      listFacilities([id]),
      listConditions([id]),
    ]);
    const result = {
      ...study,
      facilities: facilities.get(id) || [],
      conditions: conditions.get(id) || [],
    };
    return new Response(JSON.stringify(result));
  } catch (e: any) {
    // console.log(e);
    if (e.message === "404") return new Response("404", { status: 404 });
    throw new Error("An error occurred check the logs");
  }
}
