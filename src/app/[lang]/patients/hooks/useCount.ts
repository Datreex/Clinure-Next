import { toCubeFilter, useFilterFullState } from "@/lib/filters";
import { addFiltersToUrl } from "@/app/[lang]/patients/helpers/addFiltersToUrl";
import { useQuery } from "@tanstack/react-query";

export const useCount = () => {
  const state = useFilterFullState();

  let url = addFiltersToUrl(`/api/count/`, toCubeFilter(state));
  return useQuery<string>({
    queryKey: [url],
    queryFn: async () => {
      const response = await fetch(url);
      return await response.text();
    },
  });
};
