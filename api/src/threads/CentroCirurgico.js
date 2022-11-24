const { DynamicPool, StaticPool } = require("node-worker-threads-pool");



const pool = new StaticPool({
  //Pronto Socorro - Geral
  size: 3,
  workerData: [
    "surgeries",
    "operated_patients",
    "surgeries_schedules_aborteds",
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
