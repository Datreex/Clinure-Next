import GeoDataJSON from "./geoData.json";
// this geodata json file is an object that contains two porperties: format and data
//format is an object that contains keys and their index in the data array
// data is an array of arrays, each array is a row of data
// the property at index i in each row is the value of the key at index i in the format object
const GeoData = GeoDataJSON as {
  format: { [key: string]: number };
  data: (string | number)[][];
};
const format = {
  city: 0,
  city_ascii: 1,
  lat: 2,
  lng: 3,
  country: 4,
  iso2: 5,
  iso3: 6,
  admin_name: 7,
  capital: 8,
  population: 9,
  id: 10,
  downcase_city: 11,
  downcase_country: 12,
};
// first let's define a function that given a key : string, and an entry from data (string|number)[] will return the value of that key in that entry
const getValue = (key: string, entry: (string | number)[]): string => {
  // @ts-ignore
  const index = format[key] as number;
  return entry[index] as string;
};
const formatArray = (entry: (string | number)[]) => {
  const result: { [key: string]: string | number } = {};
  ["lat", "lng"].forEach((key) => {
    result[key] = parseFloat(getValue(key, entry));
  });
  return result;
};
// now we're going to loop through the data in GeoData and create a map of country names and a map of city names, we're going to store
// the arrays and export only functions that do the searching
const countryMap = new Map<string, Map<string, (string | number)[]>>();
GeoData.data.forEach((entry) => {
  const country = getValue("downcase_country", entry);
  const city = getValue("downcase_city", entry);
  const countryCities = countryMap.get(country);
  if (countryCities) {
    countryCities.set(city, entry);
  } else {
    countryMap.set(country, new Map([[city, entry]]));
  }
});
console.log(
  Array.from(countryMap.get("united states")?.values() as any)
    .map((d) => getValue("capital", d as any) as string)
    .filter((s) => s === "primary"),
);
// now we're going to create a function that given a country name and a city name will return the entry from GeoData
export const getGeoData = (country: string, city: string) => {
  const countryCities = countryMap.get(country.toLowerCase());
  if (countryCities) {
    const data = countryCities.get(city.toLowerCase());
    if (data) {
      return formatArray(data);
    } else {
      // find the first capital= primary city
      for (const [key, value] of Array.from(countryCities.entries())) {
        if (
          getValue("capital", value) === "primary" ||
          getValue("capital", value) === "admin"
        ) {
          return formatArray(value);
        }
      }
      for (const [key, value] of Array.from(countryCities.entries())) {
        return formatArray(value);
      }
      console.log(country, city);

      return undefined;
    }
  }
  if (!countryCities) {
    console.log(country);
    return { lat: 0, lng: 0 };
  }
  return undefined;
};
