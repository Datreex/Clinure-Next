import { createContext } from "react";
import { FilterSet } from "./FilterSet";

export const FilterContext = createContext<FilterSet>(new FilterSet());
