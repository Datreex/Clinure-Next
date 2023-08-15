import { Filter } from "@cubejs-client/core";
import { cubeJsApi } from "@/globalConstants/cube";
import { BasicStudy, BasicStudyDBKeys } from "@/app/[lang]/patients/types";

export const listStudies = async (filters: Filter[]): Promise<BasicStudy[]> => {
  console.log("fetching studies");
  try {
    const data = await cubeJsApi.load({
      dimensions: Object.keys(BasicStudyDBKeys),
      filters: filters,
      limit: 30,
    });
    // console.log(data.rawData());
    // console.log(r);
    return data.rawData().map((d) =>
      // Map the keys from the BasicStudyDBKeys enum to their corresponding values in the rawData object.
      // This step creates an array of arrays, where each inner array contains two elements:
      // 1. The value from the BasicStudyDBKeys enum, representing the desired key for the mappedStudy object.
      // 2. The corresponding value from the rawData object, fetched using the key from the enum.
      // This mapping ensures that the structure of the mappedStudy object aligns with the BasicStudy type.
      Object.fromEntries(
        Object.entries(BasicStudyDBKeys).map(([k, v]) => [v, d[k]]),
      ),
    ) as BasicStudy[];
  } catch (e) {
    console.log(e);
    throw e;
  } finally {
    console.log("fetched studies");
  }
};
