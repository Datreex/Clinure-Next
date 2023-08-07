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
  "studies.status"?: (typeof FilterDefaults.status)[number][];
  "studies.conditions"?: string[];
  "studies.interventions"?: string[];
  "studies.studyStart"?: Date;
}
export type FilterProperties = keyof FilterState;
