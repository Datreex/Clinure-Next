import { Filter } from "@cubejs-client/core";
import { cubeJsApi } from "@/globalConstants/cube";
import {
  Facility,
  FacilityDBKeys,
  FacilityWithGeoCoding,
  FacilityWithGeoCodingAndContacts,
} from "@/app/[lang]/patients/types";
import { listFacilityContact } from "@/app/api/list/facility_contacts";
import { getGeoCoding } from "@/app/api/list/getGeoCoding";
export const listFacilities = async (
  ids: string[],
): Promise<Map<string, FacilityWithGeoCodingAndContacts[]>> => {
  console.log("fetching facilities");
  try {
    const data = await cubeJsApi.load({
      dimensions: ["facilities.nct_id", ...Object.keys(FacilityDBKeys)],
      filters: [
        {
          member: "facilities.nct_id",
          operator: "equals",
          values: ids,
        },
      ],
    });
    const map = new Map<string, FacilityWithGeoCodingAndContacts[]>();
    const facilitiesIds = data
      .rawData()
      .map((d) => d["facilities.id"] as string);
    const facilityContacts = await listFacilityContact(facilitiesIds);
    const geoLocations = await getGeoCoding(
      data
        .rawData()
        .map(
          (d) =>
            Object.fromEntries(
              Object.entries(FacilityDBKeys).map(([k, v]) => [v, d[k]]),
            ) as Facility,
        ),
    );
    // console.log(geoLocations);
    // console.log(facilityContacts);
    data.rawData().forEach((d, index) => {
      const nct_id = d["facilities.nct_id"] as string;

      const entry = Object.fromEntries(
        Object.entries(FacilityDBKeys).map(([k, v]) => [v, d[k]]),
      ) as Facility;
      const geoCodedEntry = {
        ...entry,
        geoCoding: geoLocations[index],
        facility_contacts: facilityContacts.get(entry.id) || [],
      };

      const list = map.get(nct_id);
      if (list) {
        list.push(geoCodedEntry);
      } else {
        map.set(nct_id, [geoCodedEntry]);
      }
    });
    // console.log(
    //   Array.from(map.entries()).map(([k, v]) => v.map((d) => d.geoCoding)),
    // );
    return map;
  } catch (e) {
    console.log(e);
    throw e;
  } finally {
    console.log("done fetching facilities");
  }
};
