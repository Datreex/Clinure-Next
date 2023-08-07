const FilterDefaults = {
  phase: [
    // "Early Phase 1",
    "Phase 1",
    // "Phase 1/Phase 2",
    "Phase 2",
    // "Phase 2/Phase 3",
    "Phase 3",
    // "Phase 4",
  ],
  overall_status: [
    // "Available",
    "Enrolling by invitation",
    "Not yet recruiting",
    "Recruiting",
  ],
  start_date: new Date("1-1-" + (new Date().getFullYear() - 3)),
  // studyEnd: new Date(),
};
cube(`studies`, {
  sql_table: `ctgov.studies`,

  joins: {
    countries: {
      sql: `${CUBE}.nct_id = ${countries}.nct_id`,
      relationship: `one_to_many`,
    },

    links: {
      sql: `${CUBE}.nct_id = ${links}.nct_id`,
      relationship: `one_to_many`,
    },

    keywords: {
      sql: `${CUBE}.nct_id = ${keywords}.nct_id`,
      relationship: `one_to_many`,
    },

    interventions: {
      sql: `${CUBE}.nct_id = ${interventions}.nct_id`,
      relationship: `one_to_many`,
    },

    facility_contacts: {
      sql: `${CUBE}.nct_id = ${facility_contacts}.nct_id`,
      relationship: `one_to_many`,
    },

    facility_investigators: {
      sql: `${CUBE}.nct_id = ${facility_investigators}.nct_id`,
      relationship: `one_to_many`,
    },

    facilities: {
      sql: `${CUBE}.nct_id = ${facilities}.nct_id`,
      relationship: `one_to_many`,
    },

    eligibilities: {
      sql: `${CUBE}.nct_id = ${eligibilities}.nct_id`,
      relationship: `one_to_many`,
    },

    detailed_descriptions: {
      sql: `${CUBE}.nct_id = ${detailed_descriptions}.nct_id`,
      relationship: `one_to_many`,
    },

    brief_summaries: {
      sql: `${CUBE}.nct_id = ${brief_summaries}.description`,
      relationship: `one_to_many`,
    },

    browse_conditions: {
      sql: `${CUBE}.nct_id = ${browse_conditions}.nct_id`,
      relationship: `one_to_many`,
    },

    browse_interventions: {
      sql: `${CUBE}.nct_id = ${browse_interventions}.nct_id`,
      relationship: `one_to_many`,
    },

    conditions: {
      sql: `${CUBE}.nct_id = ${conditions}.nct_id`,
      relationship: `one_to_many`,
    },
  },

  dimensions: {
    nct_id: {
      sql: `nct_id`,
      type: `string`,
      primaryKey: true,
    },

    nlm_download_date_description: {
      sql: `nlm_download_date_description`,
      type: `string`,
    },

    study_first_posted_date_type: {
      sql: `study_first_posted_date_type`,
      type: `string`,
    },

    results_first_posted_date_type: {
      sql: `results_first_posted_date_type`,
      type: `string`,
    },

    disposition_first_posted_date_type: {
      sql: `disposition_first_posted_date_type`,
      type: `string`,
    },

    last_update_posted_date_type: {
      sql: `last_update_posted_date_type`,
      type: `string`,
    },

    start_month_year: {
      sql: `start_month_year`,
      type: `string`,
    },

    start_date_type: {
      sql: `start_date_type`,
      type: `string`,
    },

    verification_month_year: {
      sql: `verification_month_year`,
      type: `string`,
    },

    completion_month_year: {
      sql: `completion_month_year`,
      type: `string`,
    },

    completion_date_type: {
      sql: `completion_date_type`,
      type: `string`,
    },

    primary_completion_month_year: {
      sql: `primary_completion_month_year`,
      type: `string`,
    },

    primary_completion_date_type: {
      sql: `primary_completion_date_type`,
      type: `string`,
    },

    target_duration: {
      sql: `target_duration`,
      type: `string`,
    },

    study_type: {
      sql: `study_type`,
      type: `string`,
    },

    acronym: {
      sql: `acronym`,
      type: `string`,
    },

    baseline_population: {
      sql: `baseline_population`,
      type: `string`,
    },

    brief_title: {
      sql: `brief_title`,
      type: `string`,
    },

    official_title: {
      sql: `official_title`,
      type: `string`,
    },

    overall_status: {
      sql: `overall_status`,
      type: `string`,
    },

    last_known_status: {
      sql: `last_known_status`,
      type: `string`,
    },

    phase: {
      sql: `phase`,
      type: `string`,
    },

    enrollment_type: {
      sql: `enrollment_type`,
      type: `string`,
    },

    source: {
      sql: `source`,
      type: `string`,
    },

    limitations_and_caveats: {
      sql: `limitations_and_caveats`,
      type: `string`,
    },

    why_stopped: {
      sql: `why_stopped`,
      type: `string`,
    },

    has_expanded_access: {
      sql: `has_expanded_access`,
      type: `string`,
    },

    expanded_access_type_individual: {
      sql: `expanded_access_type_individual`,
      type: `string`,
    },

    expanded_access_type_intermediate: {
      sql: `expanded_access_type_intermediate`,
      type: `string`,
    },

    expanded_access_type_treatment: {
      sql: `expanded_access_type_treatment`,
      type: `string`,
    },

    has_dmc: {
      sql: `has_dmc`,
      type: `string`,
    },

    is_fda_regulated_drug: {
      sql: `is_fda_regulated_drug`,
      type: `string`,
    },

    is_fda_regulated_device: {
      sql: `is_fda_regulated_device`,
      type: `string`,
    },

    is_unapproved_device: {
      sql: `is_unapproved_device`,
      type: `string`,
    },

    is_ppsd: {
      sql: `is_ppsd`,
      type: `string`,
    },

    is_us_export: {
      sql: `is_us_export`,
      type: `string`,
    },

    biospec_retention: {
      sql: `biospec_retention`,
      type: `string`,
    },

    biospec_description: {
      sql: `biospec_description`,
      type: `string`,
    },

    ipd_time_frame: {
      sql: `ipd_time_frame`,
      type: `string`,
    },

    ipd_access_criteria: {
      sql: `ipd_access_criteria`,
      type: `string`,
    },

    ipd_url: {
      sql: `ipd_url`,
      type: `string`,
    },

    plan_to_share_ipd: {
      sql: `plan_to_share_ipd`,
      type: `string`,
    },

    plan_to_share_ipd_description: {
      sql: `plan_to_share_ipd_description`,
      type: `string`,
    },

    source_class: {
      sql: `source_class`,
      type: `string`,
    },

    delayed_posting: {
      sql: `delayed_posting`,
      type: `string`,
    },

    expanded_access_nctid: {
      sql: `expanded_access_nctid`,
      type: `string`,
    },

    expanded_access_status_for_nctid: {
      sql: `expanded_access_status_for_nctid`,
      type: `string`,
    },

    fdaaa801_violation: {
      sql: `fdaaa801_violation`,
      type: `string`,
    },

    baseline_type_units_analyzed: {
      sql: `baseline_type_units_analyzed`,
      type: `string`,
    },

    created_at: {
      sql: `created_at`,
      type: `time`,
    },

    last_update_submitted_date: {
      sql: `last_update_submitted_date`,
      type: `time`,
    },

    last_update_submitted_qc_date: {
      sql: `last_update_submitted_qc_date`,
      type: `time`,
    },

    last_update_posted_date: {
      sql: `last_update_posted_date`,
      type: `time`,
    },

    updated_at: {
      sql: `updated_at`,
      type: `time`,
    },

    study_first_submitted_date: {
      sql: `study_first_submitted_date`,
      type: `time`,
    },

    results_first_submitted_date: {
      sql: `results_first_submitted_date`,
      type: `time`,
    },

    disposition_first_submitted_date: {
      sql: `disposition_first_submitted_date`,
      type: `time`,
    },

    study_first_submitted_qc_date: {
      sql: `study_first_submitted_qc_date`,
      type: `time`,
    },

    study_first_posted_date: {
      sql: `study_first_posted_date`,
      type: `time`,
    },

    results_first_submitted_qc_date: {
      sql: `results_first_submitted_qc_date`,
      type: `time`,
    },

    results_first_posted_date: {
      sql: `results_first_posted_date`,
      type: `time`,
    },

    disposition_first_submitted_qc_date: {
      sql: `disposition_first_submitted_qc_date`,
      type: `time`,
    },

    disposition_first_posted_date: {
      sql: `disposition_first_posted_date`,
      type: `time`,
    },

    start_date: {
      sql: `start_date`,
      type: `time`,
    },

    verification_date: {
      sql: `verification_date`,
      type: `time`,
    },

    completion_date: {
      sql: `completion_date`,
      type: `time`,
    },

    primary_completion_date: {
      sql: `primary_completion_date`,
      type: `time`,
    },
  },

  measures: {
    count: {
      type: `count`,
    },
  },
  segments: {
    relevantStudies: {
      sql: `${CUBE}.phase in ('${FilterDefaults.phase.join(
        "','",
      )}') and  ${CUBE}.overall_status in ('${FilterDefaults.overall_status.join(
        "','",
      )}')  and ${CUBE}.start_date >= '${FilterDefaults.start_date}'  '`,
    },
  },
  pre_aggregations: {
    // Pre-aggregation definitions go here.
    // Learn more in the documentation: https://cube.dev/docs/caching/pre-aggregations/getting-started
  },
});
