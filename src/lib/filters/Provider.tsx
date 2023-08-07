import { PropsWithChildren, useMemo } from "react";
import { FilterContext } from "./context";
import { FilterSet } from "./FilterSet";

export const FilterContextProvider = (props: PropsWithChildren) => {
  const memo = useMemo(() => new FilterSet(), []);
  return (
    <FilterContext.Provider value={memo}>
      {props.children}
    </FilterContext.Provider>
  );
};
