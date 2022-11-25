const { DynamicPool, StaticPool } = require("node-worker-threads-pool");

const pool = new StaticPool({
  //Pronto Socorro - Geral
  size: 3,
  workerData: [
    "total_beds_percent_unit",
    "occupancy_per_specialty",
    // "quantitative_situations",
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

