const { DynamicPool, StaticPool } = require("node-worker-threads-pool");

const pool = new StaticPool({
  //Pronto Socorro - Geral
  size: 8,
  workerData: [
    "ui_need_for_vacancies",
    "ui_uti_internal_transfer",
    "ui_uti_reason_for_discharge",
    "ui_uti_source_and_destination_beds",
    "ui_uti_vacancies_requested_last_5_days",
    "ui_uti_vacant_and_occupied_beds",
    "uti_need_for_vacancies",
    "vacancies_per_floor",
  ],
  task() {
    this.workerData.forEach((e) => {
      console.log(e);
      require("./src/feeding/" + e);
    });
  },
});

setTimeout(() => {
  pool.exec();
}, 10000);
