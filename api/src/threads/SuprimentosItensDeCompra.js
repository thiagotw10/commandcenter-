const { DynamicPool, StaticPool } = require("node-worker-threads-pool");

const pool = new StaticPool({
  //Pronto Socorro - Geral
  size: 3,
  workerData: [
    "foloow_up_weekly_others",
    "foloow_up_weekly_pending",
    "foloow_up_weekly_Total",
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
