const { DynamicPool, StaticPool } = require("node-worker-threads-pool");

const pool = new StaticPool({
  //Pronto Socorro - Geral
  size: 7,
  workerData: [
    "occupancy_per_unit",
    "beds_situation",
    "sanitation_beds",
    "total_beds_percent",
    "total_beds",
    "quantitative",
    "beds",
    "full_occupancy",
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
