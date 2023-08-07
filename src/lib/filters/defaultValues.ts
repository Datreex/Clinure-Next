export const FilterDefaults = {
  phases: [
    // "Early Phase 1",
    "Phase 1",
    // "Phase 1/Phase 2",
    "Phase 2",
    // "Phase 2/Phase 3",
    "Phase 3",
    // "Phase 4",
  ],
  status: [
    // "Available",
    "Enrolling by invitation",
    "Not yet recruiting",
    "Recruiting",
  ],
  studyStart: new Date("1-1-" + (new Date().getFullYear() - 3)),
  // studyEnd: new Date(),
};
