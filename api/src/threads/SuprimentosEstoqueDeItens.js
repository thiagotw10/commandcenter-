const { DynamicPool, StaticPool } = require("node-worker-threads-pool");

const pool = new StaticPool({
  //Pronto Socorro - Geral
  size: 12,
  workerData: [
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
