import { NextRequest } from "next/server";
import { Filter } from "@cubejs-client/core";
/*
 * This function is used to parse the study id parameter from the URL.
 */
export const getStudyId = (request: NextRequest): string | null => {
  const query = request.url;
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  return params.get("study_id");
};
