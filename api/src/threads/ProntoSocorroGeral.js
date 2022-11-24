const { DynamicPool, StaticPool } = require("node-worker-threads-pool");

const pool = new StaticPool({
  //Pronto Socorro - Geral
  size: 7,
  workerData: [
    "first_aid_station",
    "real_time_register",
    "wait_for_pediatric_care",
    "longer_time_for_register",
    "longer_wait_time_triage",
    "first_aid_stations_beds_situation",
    "wait_triage",
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
