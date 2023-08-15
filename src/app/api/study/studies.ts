import { cubeJsApi } from "@/globalConstants/cube";
import { BasicStudy, BasicStudyDBKeys } from "@/app/[lang]/patients/types";

export const getStudy = async (id: string): Promise<BasicStudy> => {
  // console.log(id);
  // console.log("abc");
  const data = await cubeJsApi.load({
    dimensions: Object.keys(BasicStudyDBKeys),
    filters: [
      {
        member: "studies.nct_id",
        operator: "equals",
        values: [id],
      },
    ],
    // limit: 100,
  });
  // console.log(data.rawData());
  if (data.rawData().length === 0) throw new Error("404");
  // console.log(data.rawData());
  // console.log(r);
  return Object.fromEntries(
    Object.entries(BasicStudyDBKeys).map(([k, v]) => [v, data.rawData()[0][k]]),
  ) as BasicStudy;
};
