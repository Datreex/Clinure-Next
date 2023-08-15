import { NextRequest, NextResponse } from "next/server";
import { cubeJsApi } from "@/globalConstants/cube";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const searchParams = new URL(request.url).searchParams;
  const filter = searchParams.get("filter");
  const dimension = searchParams.get("dimension");
  if (!filter || !dimension) {
    return new NextResponse("value and dimension are required", {
      status: 400,
    });
  }
  // console.log(filter);
  const filters = JSON.parse(filter);
  //validate filter

  try {
    const data = await cubeJsApi.load({
      dimensions: [dimension],
      filters: [filters],
    });
    const options = data.rawData().map((d) => d[dimension] as string);
    console.log(options);
    return new NextResponse(JSON.stringify(options));
  } catch (e) {
    console.log(e);
    return new NextResponse("An error occurred check the logs", {
      status: 500,
    });
  } finally {
    console.log("fetched options");
  }
}
