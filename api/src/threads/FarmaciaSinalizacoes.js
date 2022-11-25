const { DynamicPool, StaticPool } = require("node-worker-threads-pool");

const pool = new StaticPool({
  //Pronto Socorro - Geral
  size: 10,
  workerData: [
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
