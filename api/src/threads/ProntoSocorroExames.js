const { DynamicPool, StaticPool } = require("node-worker-threads-pool");


const pool = new StaticPool({
  //Pronto Socorro - Exames
  size: 6,
  workerData: [
    "first_aid_total_beds_occupied",
    "first_aid_beds_occupied_per_unit",
    "first_aid_patient_list",
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
