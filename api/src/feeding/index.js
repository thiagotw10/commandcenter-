const oracledb = require('oracledb')
const cron = require("node-cron");
const fs = require('fs')
const redis = require('redis');
require('dotenv/config')
oracledb.initOracleClient({
  libDir: process.env.INSTANT_CLIENT_SERVER
});

async function init() {
  try {
    function initSession(connection, requestedTag, cb) {
      cb();
    }
    const pool = await oracledb.createPool({
      user: "tacom.izidorio",
      password: "S4bara2021",
      connectString: "odaris-scan.sabara.local:1521/producaomv",
      sessionCallback: initSession,
      poolMin: 0,
      poolMax: 200,
      poolIncrement: 0,
      queueTimeout: 0,
      queueMax: -1,
      poolTimeout: 30,
    });

    oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
    console.log("DATABASE CONECTED!!!");
  } catch (error) {
    console.log(error);
  }
}


init()

const quantitative_situations = require("./quantitative_situations")
const predicted_highs = require("./predicted_highs")
const surgeries_schedules_aborteds = require("./surgeries_schedules_aborteds")
const managment_high_previous = require("./managment_high_previous")
const hospitalization_day_and_next_3_days_hd = require("./hospitalization_day_and_next_3_days_hd")
const hospitalization_ui_uti = require("./hospitalization_ui_uti")
const managment_high_previous_upp = require("./managment_high_previous_upp")
const internments_on_day_and_previous = require("./internments_on_day_and_previous")
const hospitalization_day_surgical_clinical = require("./hospitalization_day_surgical_clinical")
const hospitalization_next_3_days_surgical_clinical = require("./hospitalization_next_3_days_surgical_clinical")
const total_day_surgical_clinical_plus_hospitalization_next_3_days = require("./total_day_surgical_clinical_plus_hospitalization_next_3_days")
const surgeries = require("./surgeries")
const operated_patients = require("./operated_patients")
const pharmaceutical_evolution = require("./pharmaceutical_evolution")
const signaling_transfer_of_patients_between_beds = require("./signaling_transfer_of_patients_between_beds")
const hospital_discharge_agreement_and_private = require("./hospital_discharge_agreement_and_private")
const patients_using_an_inhalation_device = require("./patients_using_an_inhalation_device")
const patients_without_issuance_of_reconciliation = require("./patients_without_issuance_of_reconciliation")
const total_number_of_medications_treated_in_the_month = require("./total_number_of_medications_treated_in_the_month")
const total_number_of_medications_treated_on_the_day = require("./total_number_of_medications_treated_on_the_day")
const emergency_request_central_pharmacy = require("./emergency_request_central_pharmacy")
const single_request_central_pharmacy = require("./single_request_central_pharmacy")
const medication_not_delivered_on_time = require("./medication_not_delivered_on_time")
const occupancy_per_unit = require("./occupancy_per_unit")
const beds_situation = require("./beds_situation")
const sanitation_beds = require("./sanitation_beds")
const total_beds_percent = require("./total_beds_percent")
const total_beds = require("./total_beds")
const quantitative = require("./quantitative")
const beds = require("./beds")
const full_occupancy = require("./full_occupancy")
const total_beds_percent_unit = require("./total_beds_percent_unit")
const occupancy_per_specialty = require("./occupancy_per_specialty")
const first_aid_total_beds_occupied = require("./first_aid_total_beds_occupied")
const first_aid_beds_occupied_per_unit = require("./first_aid_beds_occupied_per_unit")
const first_aid_patient_list = require("./first_aid_patient_list")
const first_aid_longer_medical_care = require("./first_aid_longer_medical_care")
const first_aid_longer_waiting_time_for_registration = require("./first_aid_longer_waiting_time_for_registration")
const first_aid_real_time_medical_care = require("./first_aid_real_time_medical_care")
const first_aid_real_time_registration = require("./first_aid_real_time_registration")
const first_aid_super_road = require("./first_aid_super_road")
const first_aid_waiting_for_sorting = require("./first_aid_waiting_for_sorting")
const first_aid_station = require("./first_aid_station")
const real_time_register = require("./real_time_register")
const wait_for_pediatric_care = require("./wait_for_pediatric_care")
const longer_time_for_register = require("./longer_time_for_register")
const longer_wait_time_triage = require("./longer_wait_time_triage")
const first_aid_stations_beds_situation = require("./first_aid_stations_beds_situation")
const wait_triage = require("./wait_triage")
const room_100 = require("./room_100")
const weekly_goal_pattern = require("./weekly_goal_pattern")
const weekly_goal = require("./weekly_goal")
const service_time_analysis_pattern = require("./service_time_analysis_pattern")
const service_time_analysis = require("./service_time_analysis")
const purchase_order_with_and_without_invoice_pattern = require("./purchase_order_with_and_without_invoice_pattern")
const purchase_order_with_and_without_invoice = require("./purchase_order_with_and_without_invoice")
const authorized_purchase_order_pattern = require("./authorized_purchase_order_pattern")
const authorized_purchase_order = require("./authorized_purchase_order")
const open_and_completed_purchase_requests_pattern = require("./open_and_completed_purchase_requests_pattern")
const open_and_completed_purchase_requests = require("./open_and_completed_purchase_requests")
const top_10_requested_items_pattern = require("./top_10_requested_items_pattern")
const top_10_requested_items = require("./top_10_requested_items")
const hd_ui_uti_units = require("./hd_ui_uti_units")
const hd_ui_uti_per_unit = require("./hd_ui_uti_per_unit")
const stock_listing_items_standard_abc_curve = require("./stock_listing_items_standard_abc_curve")
const stock_listing_items_nom_standard_abc_curve = require("./stock_listing_items_nom_standard_abc_curve")
const stock_items_curve_abc_standard = require("./stock_items_curve_abc_standard")
const stock_items_curve_abc_non_standard = require("./stock_items_curve_abc_non_standard")
const total_stock_by_standard_validity_control = require("./total_stock_by_standard_validity_control")
const total_stock_by_non_standard_validity_control = require("./total_stock_by_non_standard_validity_control")
const total_standard_stock = require("./total_standard_stock")
const total_non_standard_stock = require("./total_non_standard_stock")
const standard_validity_control_listing = require("./standard_validity_control_listing")
const non_standard_validity_control_listing = require("./non_standard_validity_control_listing")
const quantity_items_validity_control_standard_abc = require("./quantity_items_validity_control_standard_abc")
const quantity_items_validity_control_non_standard_abc = require("./quantity_items_validity_control_non_standard_abc")
const foloow_up_weekly_others = require("./foloow_up_weekly_others")
const foloow_up_weekly_pending = require("./foloow_up_weekly_pending")
const foloow_up_weekly_Total = require("./foloow_up_weekly_Total")
const ui_need_for_vacancies = require("./ui_need_for_vacancies")
const ui_uti_internal_transfer = require("./ui_uti_internal_transfer")
const ui_uti_reason_for_discharge = require("./ui_uti_reason_for_discharge")
const ui_uti_source_and_destination_beds = require("./ui_uti_source_and_destination_beds")
const ui_uti_vacancies_requested_last_5_days = require("./ui_uti_vacancies_requested_last_5_days")
const ui_uti_vacant_and_occupied_beds = require("./ui_uti_vacant_and_occupied_beds")
const uti_need_for_vacancies = require("./uti_need_for_vacancies")
const vacancies_per_floor = require("./vacancies_per_floor")
const total_beds_percent_general = require("./total_beds_percent_general")
const dantrolen_cc = require("./dantrolen_cc")
const dantrolen_sadt = require("./dantrolen_sadt")
const unusual_or_major_surgeries_scheduled = require("./unusual_or_major_surgeries_scheduled")
const allergy_alert = require("./allergy_alert");
const absence_prescription = require("./absence_prescription");
const diet_change = require("./diet_change");
const fasting_patients = require("./fasting_patients");
const internal_transfers = require("./internal_transfers");
const nutritional_evolution = require("./nutritional_evolution");
const anthropometric_evaluation = require("./anthropometric_evaluation");
const screening_not_performed = require("./screening_not_performed");
const items_with_greater_variation = require("./items_with_greater_variation");
const pending_requests = require("./pending_requests");
const stock_days_5d = require("./stock_days_5d");
const OPMS_in_next_24h = require("./OPMS_in_next_24h");
const list_OPMES_procedures = require("./list_OPMES_procedures");
const list_procedures_achieved_OPMES = require("./list_procedures_achieved_OPMES");
const number_procedures_in_24Hour_period = require("./number_procedures_in_24Hour_period");
const surgeries_OPME_per_next_day = require("./surgeries_OPME_per_next_day");
const total_procedures_request_OPME_in_next_30Days = require("./total_procedures_request_OPME_in_next_30Days");
const stock_filters = require("./stock_filters");
const total_opens_solic_pattern = require("./total_opens_solic_pattern");
const total_opens_solic = require("./total_opens_solic");
const hospitalization_panel = require("./hospitalization_panel");
const medication_delivered_and_not_delivered = require("./medication_delivered_and_not_delivered");
const total_emergency_request_central_pharmacy = require("./total_emergency_request_central_pharmacy");
const total_single_request_central_pharmacy = require("./total_single_request_central_pharmacy");

const secondsEasy = 15;
const secondsMedium = 30;
const secondsHard = 50;
console.log("REDIS-SERVER FEEDING END-POINTS EVERY", secondsMedium, "SECONDS");

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}


setTimeout(async () => {
  let infinityCount1 = 1;
  let count1 = 0;

  while (count1 < infinityCount1) {
    const date_initial1 = Date.now();
    
    console.log("initial 1 --------------------------");
    
    let connection1 = await oracledb.getConnection();
    
    await quantitative_situations.run(connection1);
    await predicted_highs.run(connection1);
    await surgeries_schedules_aborteds.run(connection1);
    await managment_high_previous.run(connection1);
    await hospitalization_day_and_next_3_days_hd.run(connection1);
    await hospitalization_ui_uti.run(connection1);
    await managment_high_previous_upp.run(connection1);
    await internments_on_day_and_previous.run(connection1);
    await hospitalization_day_surgical_clinical.run(connection1);
    await hospitalization_next_3_days_surgical_clinical.run(connection1);
    await total_day_surgical_clinical_plus_hospitalization_next_3_days.run(connection1);
    await surgeries.run(connection1);
    await operated_patients.run(connection1);
    await pharmaceutical_evolution.run(connection1);
    await signaling_transfer_of_patients_between_beds.run(connection1);
    await hospital_discharge_agreement_and_private.run(connection1);
    await patients_using_an_inhalation_device.run(connection1);
    await patients_without_issuance_of_reconciliation.run(connection1);
    await total_number_of_medications_treated_in_the_month.run(connection1);
    await total_number_of_medications_treated_on_the_day.run(connection1);
    await emergency_request_central_pharmacy.run(connection1);
    await single_request_central_pharmacy.run(connection1);
    await medication_not_delivered_on_time.run(connection1);
    await medication_delivered_and_not_delivered.run(connection1);
    await total_emergency_request_central_pharmacy.run(connection1);
    await total_single_request_central_pharmacy.run(connection1);
    await occupancy_per_unit.run(connection1);
    await beds_situation.run(connection1);
    await sanitation_beds.run(connection1);
    await total_beds_percent.run(connection1);
    await total_beds.run(connection1);
    await nutritional_evolution.run(connection1);
    await anthropometric_evaluation.run(connection1);
    await screening_not_performed.run(connection1);

    await wait(10000);

    await connection1.close();

    const date_final1 = Date.now();
    time_of_promise_resolve1 = date_final1 - date_initial1;
    console.log("Time the queries in block 1", time_of_promise_resolve1);
    console.log("final 1 ++++++++-----------++++++++");
    count1++;
    infinityCount1++;
  }
}, secondsMedium * 1000);


setTimeout(async () => {
  let infinityCount2 = 1;
  let count2 = 0;

  while (count2 < infinityCount2) {
    const date_initial2 = Date.now();

    console.log("initial 2 --------------------------");

    let connection2 = await oracledb.getConnection();

    await quantitative.run(connection2);
    await beds.run(connection2);
    await full_occupancy.run(connection2);
    await total_beds_percent_unit.run(connection2);
    await occupancy_per_specialty.run(connection2);
    await first_aid_total_beds_occupied.run(connection2);
    await first_aid_beds_occupied_per_unit.run(connection2);
    await first_aid_patient_list.run(connection2);
    await first_aid_longer_medical_care.run(connection2);
    await first_aid_longer_waiting_time_for_registration.run(connection2);
    await first_aid_real_time_medical_care.run(connection2);
    await first_aid_real_time_registration.run(connection2);
    await first_aid_super_road.run(connection2);
    await first_aid_waiting_for_sorting.run(connection2);
    await first_aid_station.run(connection2);
    await real_time_register.run(connection2);
    await wait_for_pediatric_care.run(connection2);
    await longer_time_for_register.run(connection2);
    await longer_wait_time_triage.run(connection2);
    await first_aid_stations_beds_situation.run(connection2);
    await wait_triage.run(connection2);
    await room_100.run(connection2);
    await weekly_goal_pattern.run(connection2);
    await weekly_goal.run(connection2);
    await service_time_analysis_pattern.run(connection2);
    await service_time_analysis.run(connection2);
    await purchase_order_with_and_without_invoice_pattern.run(connection2);
    await purchase_order_with_and_without_invoice.run(connection2);
    await authorized_purchase_order_pattern.run(connection2);
    await authorized_purchase_order.run(connection2);
    await open_and_completed_purchase_requests_pattern.run(connection2);
    await open_and_completed_purchase_requests.run(connection2);
    await top_10_requested_items_pattern.run(connection2);
    await top_10_requested_items.run(connection2);
    await wait(10000)

    await connection2.close();

    const date_final2 = Date.now();
    time_of_promise_resolve2 = date_final2 - date_initial2;
    console.log("Time the queries in block 2", time_of_promise_resolve2);
    console.log("final 2 ++++++++-----------++++++++");
    count2++;
    infinityCount2++;
  }
}, secondsMedium * 1000);


setTimeout(async () => {
  let infinityCount3 = 1;
  let count3 = 0;

  while (count3 < infinityCount3) {
    const date_initial3 = Date.now();

    console.log("initial 3 --------------------------");

    let connection3 = await oracledb.getConnection();

    await hd_ui_uti_units.run(connection3);
    await hd_ui_uti_per_unit.run(connection3);
    await foloow_up_weekly_others.run(connection3);
    await foloow_up_weekly_pending.run(connection3);
    await foloow_up_weekly_Total.run(connection3);
    await ui_need_for_vacancies.run(connection3);
    await ui_uti_internal_transfer.run(connection3);
    await ui_uti_reason_for_discharge.run(connection3);
    await ui_uti_source_and_destination_beds.run(connection3);
    await ui_uti_vacancies_requested_last_5_days.run(connection3);
    await ui_uti_vacant_and_occupied_beds.run(connection3);
    await uti_need_for_vacancies.run(connection3);
    await vacancies_per_floor.run(connection3);
    await total_beds_percent_general.run(connection3);
    await dantrolen_cc.run(connection3);
    await dantrolen_sadt.run(connection3);
    await unusual_or_major_surgeries_scheduled.run(connection3);
    await allergy_alert.run(connection3);
    await absence_prescription.run(connection3);
    await diet_change.run(connection3);
    await fasting_patients.run(connection3);
    await internal_transfers.run(connection3);

    await connection3.close();

    await wait(10000);

    const date_final3 = Date.now();
    time_of_promise_resolve3 = date_final3 - date_initial3;
    console.log("Time the queries in block 3", time_of_promise_resolve3);
    console.log("final 3 ++++++++-----------++++++++");
    count3++;
    infinityCount3++;
  }
}, secondsMedium * 1000);

setTimeout(async () => {
  let infinityCount4 = 1;
  let count4 = 0;

  while (count4 < infinityCount4) {
    const date_initial4 = Date.now();

    console.log("initial 4 --------------------------");

    let connection4 = await oracledb.getConnection();

    await items_with_greater_variation.run(connection4);
    await pending_requests.run(connection4);
    await OPMS_in_next_24h.run(connection4);
    await list_OPMES_procedures.run(connection4);
    await list_procedures_achieved_OPMES.run(connection4);
    await number_procedures_in_24Hour_period.run(connection4);
    await surgeries_OPME_per_next_day.run(connection4);
    await total_procedures_request_OPME_in_next_30Days.run(connection4);
    await stock_filters.run(connection4);
    await total_opens_solic_pattern.run(connection4);
    await total_opens_solic.run(connection4);
    await hospitalization_panel.run(connection4);

    await connection4.close();

    await wait(10000);

    const date_final4 = Date.now();
    time_of_promise_resolve4 = date_final4 - date_initial4;
    console.log("Time the queries in block 4", time_of_promise_resolve4);
    console.log("final 4 ++++++++-----------++++++++");
    count4++;
    infinityCount4++;
  }
}, secondsMedium * 1000);

cron.schedule("0 0,6,12,18 * * *", async () => {

  const date_initial5 = Date.now();

  console.log("CRON OF QUERIES WITH BIG FUNCTION --------------------------");


  let connection5 = await oracledb.getConnection();
  
  await stock_listing_items_standard_abc_curve.run(connection5);
  await stock_listing_items_nom_standard_abc_curve.run(connection5);
  await stock_items_curve_abc_standard.run(connection5);
  await stock_items_curve_abc_non_standard.run(connection5);
  await total_stock_by_standard_validity_control.run(connection5);
  await total_stock_by_non_standard_validity_control.run(connection5);
  await total_standard_stock.run(connection5);
  await total_non_standard_stock.run(connection5);
  await standard_validity_control_listing.run(connection5);
  await non_standard_validity_control_listing.run(connection5);
  await quantity_items_validity_control_standard_abc.run(connection5);
  await quantity_items_validity_control_non_standard_abc.run(connection5);
  await stock_days_5d.run(connection5);
  
  await connection5.close();

  const date_final5 = Date.now();
  time_of_promise_resolve5 = date_final5 - date_initial5;
  console.log("Time the queries in block CRON", time_of_promise_resolve5);
  console.log("final CRON ++++++++-----------++++++++");
},{
   scheduled: true,
   timezone: "America/Sao_Paulo"
 });
