import { useContext, useEffect, useState } from "react";
import { FilterContext } from "./context";
import { FilterProperties, FilterState } from "./types";

export const useFilterSlice = (id: FilterProperties) => {
  const filterSet = useContext(FilterContext);
  const [state, setState] = useState(filterSet.getStateSlice(id));
  useEffect(() => {
    filterSet.subscribe(id, (state) => setState(state[id]));
    return () => filterSet.unsubscribe(id);
  }, [id, filterSet]);
  return [
    state,
    (value: FilterState[keyof FilterState]) =>
      filterSet.setStateSlice(id, value),
  ] as const;
};
export const useFilterFullState = () => {
  const filterSet = useContext(FilterContext);
  const [state, setState] = useState(filterSet.getState());
  useEffect(() => {
    filterSet.fullStateSubscribe("useFilterFullState", setState);
    return () => filterSet.fullStateUnsubscribe("useFilterFullState");
  }, [filterSet]);
  return state;
};
