const { DynamicPool, StaticPool } = require("node-worker-threads-pool");
const { getConnection } = require("oracledb");
const oracledb = require("oracledb");
// oracledb.initOracleClient({
//   libDir: "C:\\instantclient_21_3",
// });

// async function init() {
//   try {
//     function initSession(connection, requestedTag, cb) {
//       cb();
//     }
//     const pool = await oracledb.createPool({
//       user: "tacom.izidorio",
//       password: "S4bara2021",
//       connectString: "odaris-scan.sabara.local:1521/producaomv",
//       poolMin: 0,
//       poolMax: 100,
//       poolIncrement: 0,
//       queueTimeout: 0,
//       queueMax: -1,
//       poolTimeout: 30,
//     });

//     oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
//     console.log("DATABASE CONECTED!!!");
//     // return "DATABASE CONECTED!!!";
//   } catch (error) {
//     console.log(error);
//     // return error
//   }
// }

// init();

const pool1 = new StaticPool({
  //Pronto Socorro - Geral
  size: 87,
  workerData: [
    [
      "quantitative_situations",
    ],
    [
      "predicted_highs",
      "managment_high_previous",
      "hospitalization_day_and_next_3_days_hd",
      "hospitalization_ui_uti",
      "managment_high_previous_upp",
      "internments_on_day_and_previous",
      "hospitalization_day_surgical_clinical",
      "hospitalization_next_3_days_surgical_clinical",
      "total_day_surgical_clinical_plus_hospitalization_next_3_days",
      "surgeries",
      "operated_patients",
      "surgeries_schedules_aborteds",
    ],
    [
      "pharmaceutical_evolution",
      "signaling_transfer_of_patients_between_beds",
      "hospital_discharge_agreement_and_private",
      "patients_using_an_inhalation_device",
      "patients_without_issuance_of_reconciliation",
      "total_number_of_medications_treated_in_the_month",
      "total_number_of_medications_treated_on_the_day",
      "emergency_request_central_pharmacy",
      "single_request_central_pharmacy",
      "medication_not_delivered_on_time",
    ],
    [
      "occupancy_per_unit",
      "beds_situation",
      "sanitation_beds",
      "total_beds_percent",
      "total_beds",
      "quantitative",
      "beds",
      "full_occupancy",
    ],
    [
      "total_beds_percent_unit",
      "occupancy_per_specialty",
    ],
    [
      "first_aid_total_beds_occupied",
      "first_aid_beds_occupied_per_unit",
      "first_aid_patient_list",
      "first_aid_longer_medical_care",
      "first_aid_longer_waiting_time_for_registration",
      "first_aid_real_time_medical_care",
      "first_aid_real_time_registration",
      "first_aid_super_road",
      "first_aid_waiting_for_sorting",
      "first_aid_station",
      "real_time_register",
      "wait_for_pediatric_care",
      "longer_time_for_register",
      "longer_wait_time_triage",
      "first_aid_stations_beds_situation",
      "wait_triage",
    ],
  ],
  task() {
    (async () => {
      const oracledb = require("oracledb");
      oracledb.initOracleClient({
        libDir: "C:\\instantclient_21_3",
      });
      const pool = await oracledb.createPool({
        user: "dbamv",
        password: "mvtreina",
        connectString: "srv-odax8-scan.sabara.local:1521/trnmv",
        poolMin: 0,
        poolMax: 100,
        poolIncrement: 0,
        queueTimeout: 0,
        queueMax: -1,
        poolTimeout: 30,
      });
      // const connadiel = await oracledb.getConnection({
      //   user: "mv.ajunior",
      //   password: "Sabara!2021",
      //   connectString: "odaris-scan.sabara.local:1521/producaomv",
      // });
      // const conn1 = await oracledb.getConnection();
      // const conn2 = await oracledb.getConnection();
      // const conn3 = await oracledb.getConnection();
      // const conn4 = await oracledb.getConnection();
      // const conn5 = await oracledb.getConnection();
      // const conn6 = await oracledb.getConnection();
      // const conn7 = await oracledb.getConnection();
      // const conn8 = await oracledb.getConnection();
      // const conn9 = await oracledb.getConnection();
      this.workerData[0].forEach(async (e) => {
        console.log(e);
        const query = require("./src/feeding/" + e);
        // setInterval(() => {
          query.run()
        // }, 5000);
      });
      this.workerData[1].forEach(async (e) => {
        console.log(e);
        await require("./src/feeding/" + e).run();
      });
      this.workerData[2].forEach(async (e) => {
        console.log(e);
        await require("./src/feeding/" + e).run();
      });
      this.workerData[3].forEach(async (e) => {
        console.log(e);
        await require("./src/feeding/" + e).run();
      });
      this.workerData[4].forEach(async (e) => {
        console.log(e);
        await require("./src/feeding/" + e).run();
      });
      this.workerData[5].forEach(async (e) => {
        console.log(e);
        await require("./src/feeding/" + e).run();
      });
      
    })();
  },
});
const pool2 = new StaticPool({
  //Pronto Socorro - Geral
  size: 87,
  workerData: [
    ["room_100"],
    [
      "weekly_goal_pattern",
      "weekly_goal",
      "service_time_analysis_pattern",
      "service_time_analysis",
      "purchase_order_with_and_without_invoice_pattern",
      "purchase_order_with_and_without_invoice",
      "authorized_purchase_order_pattern",
      "authorized_purchase_order",
      "open_and_completed_purchase_requests_pattern",
      "open_and_completed_purchase_requests",
      "top_10_requested_items_pattern",
      "top_10_requested_items",
      "hd_ui_uti_units",
      "hd_ui_uti_per_unit",
    ],
    [
      "stock_listing_items_standard_abc_curve",
      "stock_listing_items_nom_standard_abc_curve",
      "stock_items_curve_abc_standard",
      "stock_items_curve_abc_non_standard",
      "total_stock_by_standard_validity_control",
      "total_stock_by_non_standard_validity_control",
      "total_standard_stock",
      "total_non_standard_stock",
      "standard_validity_control_listing",
      "non_standard_validity_control_listing",
      "quantity_items_validity_control_standard_abc",
      "quantity_items_validity_control_non_standard_abc",
      "foloow_up_weekly_others",
      "foloow_up_weekly_pending",
      "foloow_up_weekly_Total",
    ],
    [
      "ui_need_for_vacancies",
      "ui_uti_internal_transfer",
      "ui_uti_reason_for_discharge",
      "ui_uti_source_and_destination_beds",
      "ui_uti_vacancies_requested_last_5_days",
      "ui_uti_vacant_and_occupied_beds",
      "uti_need_for_vacancies",
      "vacancies_per_floor",
    ],
  ],
  task() {
    (async () => {
      const oracledb = await require("oracledb");
      oracledb.initOracleClient({
        libDir: "C:\\instantclient_21_3",
      });
      const pool = await oracledb.createPool({
        user: "dbamv",
        password: "mvtreina",
        connectString: "srv-odax8-scan.sabara.local:1521/trnmv",
        poolMin: 0,
        poolMax: 100,
        poolIncrement: 0,
        queueTimeout: 0,
        queueMax: -1,
        poolTimeout: 30,
      });
      // const connadiel = await oracledb.getConnection({
      //   user: "mv.ajunior",
      //   password: "Sabara!2021",
      //   connectString: "odaris-scan.sabara.local:1521/producaomv",
      // });
      // const conn00 = await oracledb.getConnection();
      // const conn01 = await oracledb.getConnection();
      // const conn02 = await oracledb.getConnection();
      // const conn03 = await oracledb.getConnection();
      // const conn5 = await oracledb.getConnection();
      // const conn6 = await oracledb.getConnection();
      // const conn7 = await oracledb.getConnection();
      // const conn8 = await oracledb.getConnection();
      // const conn9 = await oracledb.getConnection();
      this.workerData[0].forEach(async (e) => {
        console.log(e);
        await require("./src/feeding/" + e).run();
      });
      this.workerData[1].forEach(async (e) => {
        console.log(e);
        await require("./src/feeding/" + e).run();
      });
      this.workerData[2].forEach(async (e) => {
        console.log(e);
        await require("./src/feeding/" + e).run();
      });
      this.workerData[3].forEach(async (e) => {
        console.log(e);
        await require("./src/feeding/" + e).run();
      });
    })();
  },
});

setTimeout(() => {
  pool1.exec();
  pool2.exec();
}, 5000);
