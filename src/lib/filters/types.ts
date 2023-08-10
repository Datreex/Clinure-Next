import { Dispatch, SetStateAction } from "react";
import { FilterDefaults } from "./defaultValues";

export interface publisher<stateType, idType> {
  state: stateType;
  subscribers: Map<idType, (state: stateType) => void>;
  fullStateSubscribers: Map<string, (state: stateType) => void>;
  fullStateSubscribe: (
    id: string,
    notificationFunction: Dispatch<SetStateAction<stateType>>,
  ) => void;
  fullStateUnsubscribe: (id: string) => void;
  subscribe: (
    id: idType,
    notificationFunction: Dispatch<SetStateAction<stateType>>,
  ) => void;
  unsubscribe: (id: idType) => void;
  publish: (state: stateType) => void;
}
export interface FilterState {
  "studies.phase"?: (typeof FilterDefaults.phases)[number][];
  "studies.overall_status"?: (typeof FilterDefaults.status)[number][];
  "browse_conditions.mesh_terms"?: string[];
  "browse_interventions.mesh_terms"?: string[];
  "studies.start_date"?: Date;
}
export type FilterProperties = keyof FilterState;
