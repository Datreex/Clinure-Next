import { NextRequest } from "next/server";
import { Filter } from "@cubejs-client/core";
/*
 * This function is used to parse the filter parameter from the URL.
 * The filter parameter is a JSON string representing an array of Filter objects.
 * The Filter type is defined in the @cubejs-client/core package.
 * in the future, validation should be added to this function to ensure that the filter parameter is valid.
 */
export const getFilters = (request: NextRequest): Filter[] => {
  const query = request.url;
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const filter = params.get("filter");
  if (typeof filter !== "string") throw new Error("Invalid filter");
  return JSON.parse(filter) as Filter[];
};
