import { FilterState } from "@/lib/filters/types";
import { Filter } from "@cubejs-client/core";
export const toCubeFilter = (filter: FilterState): Filter[] => {
  const filters: Filter[] = [];
  if (
    filter["browse_conditions.mesh_terms"]?.length &&
    filter["browse_interventions.mesh_terms"]?.length
  )
    filters.push({
      or: [
        {
          member: "browse_conditions.mesh_term",
          operator: "equals",
          values: filter["browse_conditions.mesh_terms"],
        },
        {
          member: "browse_interventions.mesh_term",
          operator: "equals",
          values: filter["browse_interventions.mesh_terms"],
        },
      ],
    });
  else {
    if (filter["browse_conditions.mesh_terms"]?.length) {
      filters.push({
        member: "browse_conditions.mesh_term",
        operator: "equals",
        values: filter["browse_conditions.mesh_terms"],
      });
    }
    if (filter["browse_interventions.mesh_terms"]?.length) {
      filters.push({
        member: "browse_interventions.mesh_term",
        operator: "equals",
        values: filter["browse_interventions.mesh_terms"],
      });
    }
  }

  if (filter["studies.phase"]?.length) {
    filters.push({
      member: "studies.phase",
      operator: "equals",
      values: filter["studies.phase"],
    });
  }
  if (filter["studies.overall_status"]?.length) {
    filters.push({
      member: "studies.overall_status",
      operator: "equals",
      values: filter["studies.overall_status"],
    });
  }
  if (filter["studies.start_date"]) {
    filters.push({
      member: "studies.start_date",
      operator: "afterDate",
      values: [filter["studies.start_date"]?.toLocaleDateString("en-US")],
    });
  }
  filters.push({
    member: "studies.completion_date",
    operator: "afterDate",
    values: [new Date().toLocaleDateString("en-US")],
  });
  filters.push({
    member: "studies.study_type",
    operator: "equals",
    values: ["Interventional"],
  });

  // console.log(filters);
  return filters;
};
