const { DynamicPool, StaticPool } = require("node-worker-threads-pool");


const pool = new StaticPool({ //Pronto Socorro - Filas
    size: 6,
    workerData: [
      "first_aid_longer_medical_care",
      "first_aid_longer_waiting_time_for_registration",
      "first_aid_real_time_medical_care",
      "first_aid_real_time_registration",
      "first_aid_super_road",
      "first_aid_waiting_for_sorting",
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