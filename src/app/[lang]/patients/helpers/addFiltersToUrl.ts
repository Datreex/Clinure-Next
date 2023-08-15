import { Filter } from "@cubejs-client/core";

export const addFiltersToUrl = (
  url: URL | string,
  filters: Filter[],
): string => {
  // const newUrl = new URL(url);
  // newUrl.searchParams.set("filter", JSON.stringify(filters));
  return `${url}?filter=${JSON.stringify(filters)}`;
  // return newUrl;
};
