import { Dispatch, SetStateAction } from "react";
import { FilterDefaults } from "./defaultValues";
import { FilterProperties, FilterState, publisher } from "./types";

const DEFAULT_FILTER_STATE: FilterState = {
  "studies.phase": FilterDefaults.phases,
  "studies.status": FilterDefaults.status,
  "studies.conditions": [],
  "studies.interventions": [],
  "studies.studyStart": FilterDefaults.studyStart,
};

export class FilterSet implements publisher<FilterState, FilterProperties> {
  public state: FilterState = DEFAULT_FILTER_STATE;
  subscribers = new Map<FilterProperties, (state: FilterState) => void>();
  fullStateSubscribers = new Map<string, (state: FilterState) => void>();
  public fullStateSubscribe(
    id: string,
    notificationFunction: (state: FilterState) => void,
  ) {
    this.fullStateSubscribers.set(id, notificationFunction);
  }
  public fullStateUnsubscribe(id: string) {
    this.fullStateSubscribers.delete(id);
  }
  public subscribe(
    id: FilterProperties,
    notificationFunction: (state: FilterState) => void,
  ) {
    this.subscribers.set(id, notificationFunction);
    return this.state;
  }
  public unsubscribe(id: FilterProperties) {
    this.subscribers.delete(id);
  }
  public publish(state: FilterState) {
    this.state = state;
    this.subscribers.forEach((subscriber) => {
      subscriber(state);
    });
    this.fullStateSubscribers.forEach((subscriber) => {
      subscriber(state);
    });
  }
  public getState = () => {
    return this.state;
  };
  public getStateSlice = (id: FilterProperties) => {
    return this.state[id];
  };
  public setStateSlice = (
    id: FilterProperties,
    value: FilterState[keyof FilterState],
  ) => {
    this.publish({ ...this.state, [id]: value });
  };
}
