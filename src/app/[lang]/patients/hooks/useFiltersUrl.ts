import { toCubeFilter, useFilterFullState } from "@/lib/filters";
import { addFiltersToUrl } from "@/app/[lang]/patients/helpers/addFiltersToUrl";

export const useFiltersUrl = (url: URL | string) => {
  const state = useFilterFullState();
  return addFiltersToUrl(url, toCubeFilter(state));
};
