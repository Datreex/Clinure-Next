import { Filter } from "@cubejs-client/core";
import { cubeJsApi } from "@/globalConstants/cube";

export const listConditions = async (
  ids: string[],
): Promise<Map<string, string[]>> => {
  console.log("fetching conditions");
  try {
    const data = await cubeJsApi.load({
      dimensions: ["browse_conditions.nct_id", "browse_conditions.mesh_term"],
      filters: [
        {
          member: "browse_conditions.nct_id",
          operator: "equals",
          values: ids,
        },
      ],
    });
    const map = new Map<string, string[]>();
    data.rawData().forEach((d) => {
      const nct_id = d["browse_conditions.nct_id"] as string;
      const name = d["browse_conditions.mesh_term"] as string;
      const list = map.get(nct_id);
      if (list) {
        list.push(name);
      } else {
        map.set(nct_id, [name]);
      }
    });
    return map;
  } catch (e) {
    console.log(e);
    throw e;
  } finally {
    console.log("fetched conditions");
  }
};
