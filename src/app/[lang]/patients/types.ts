export enum BasicStudyDBKeys {
  "studies.nct_id" = "nct_id",
  "studies.official_title" = "official_title",
  "studies.brief_title" = "brief_title",
  "studies.overall_status" = "overall_status",
  "studies.phase" = "phase",
  "studies.start_date" = "start_date",
}
export type BasicStudy = {
  [K in BasicStudyDBKeys]: string;
};
export enum FacilityDBKeys {
  "facilities.id" = "id",
  "facilities.name" = "name",
  "facilities.city" = "city",
  "facilities.state" = "state",
  "facilities.country" = "country",
  "facilities.zip" = "zip",
}
export type Facility = {
  [K in FacilityDBKeys]: string;
};

export type Study = BasicStudy & {
  facilities: FacilityWithGeoCodingAndContacts[];
  conditions: string[];
};
export type FacilityGeoCoding = {
  geoCoding: {
    lng: number;
    lat: number;
  };
};
export enum FacilityContactDBKeys {
  "facility_contacts.email" = "email",
  "facility_contacts.phone" = "phone",
  "facility_contacts.name" = "name",
}
export type FacilityContact = {
  [K in FacilityContactDBKeys]: string;
};

export type FacilityWithGeoCoding = Facility & FacilityGeoCoding;
export type FacilityWithGeoCodingAndContacts = FacilityWithGeoCoding & {
  facility_contacts: FacilityContact[];
};
