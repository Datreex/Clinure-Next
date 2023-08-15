import { Filter } from "@cubejs-client/core";
import { cubeJsApi } from "@/globalConstants/cube";
import {
  Facility,
  FacilityContact,
  FacilityContactDBKeys,
  FacilityDBKeys,
  FacilityWithGeoCoding,
} from "@/app/[lang]/patients/types";
export const listFacilityContact = async (
  ids: string[],
): Promise<Map<string, FacilityContact[]>> => {
  console.log("fetching contacts");

  try {
    const data = await cubeJsApi.load({
      dimensions: [
        "facility_contacts.facility_id",
        ...Object.keys(FacilityContactDBKeys),
      ],
      filters: [
        {
          member: "facility_contacts.facility_id",
          operator: "equals",
          values: ids,
        },
      ],
    });

    // console.log(data.rawData()[0]);
    const map = new Map<string, FacilityContact[]>();
    // console.log(data.rawData());
    data.rawData().forEach((d) => {
      const id = d["facility_contacts.facility_id"] as string;
      const entry = Object.fromEntries(
        Object.entries(FacilityContactDBKeys).map(([k, v]) => [v, d[k]]),
      ) as FacilityContact;

      const list = map.get(id);
      if (list) {
        list.push(entry);
      } else {
        map.set(id, [entry]);
      }
    });
    // console.log(map);
    return map;
  } catch (e) {
    console.log(e);
    throw e;
  } finally {
    console.log("done fetching contacts");
  }
};
