const { DynamicPool, StaticPool } = require("node-worker-threads-pool");

const pool = new StaticPool({
  //Pronto Socorro - Geral
  size: 12,
  workerData: [
    "weekly_goal_pattern",
    "weekly_goal",
    "service_time_analysis_pattern",
    "service_time_analysis",
    "purchase_order_with_and_without_invoice_pattern",
    "purchase_order_with_and_without_invoice",
    "authorized_purchase_order_pattern",
    "authorized_purchase_order",
    "open_and_completed_purchase_requests_pattern",
    "open_and_completed_purchase_requests",
    "top_10_requested_items_pattern",
    "top_10_requested_items",
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
