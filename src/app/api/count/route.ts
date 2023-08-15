import { Filter } from "@cubejs-client/core";
import { cubeJsApi } from "@/globalConstants/cube";
import { NextRequest, NextResponse } from "next/server";
import { getFilters } from "@/app/[lang]/patients/helpers/getFilters";
export const dynamic = "force-dynamic";

export const GET = async (request: NextRequest) => {
  try {
    const filters = getFilters(request);
    const data = await cubeJsApi.load({
      measures: ["studies.count"],
      filters: filters,
    });

    return new NextResponse<string>(
      data.rawData()[0]["studies.count"] as string,
    );
  } catch (e) {
    console.log(e);
    throw new Error("An error occurred check the logs");
  }
};
