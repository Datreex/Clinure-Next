import { cubeJsApi } from "@/globalConstants/cube";
import { getGeoData } from "@/app/api/list/geoDataMap";

export async function getGeoCoding(
  data: {
    city: string;
    country: string;
    name: string;
    state: string;
    zip: string;
  }[],
) {
  console.log("fetching geoCoding");

  const geoData = data.map((d) => {
    const { lat, lng } = getGeoData(d.country, d.city) as any as {
      lat: number;
      lng: number;
    };
    // add a bit of noise to the lat and lng
    const latnoise = Math.random() / 5;
    const lngnoise = Math.random() / 5;

    return {
      ...d,
      lat: lat + latnoise,
      lng: lng + lngnoise,
    };
  });
  // console.log(geoData);
  console.log("done fetching geoCoding");
  return geoData;
}
