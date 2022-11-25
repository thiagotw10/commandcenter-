const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql43 = fs.readFileSync(
  __dirname + "/sql/purchase_order_with_and_without_invoice_pattern.sql",
  "utf8"
);
const file_name43 = path.basename(
  __dirname + "/sql/purchase_order_with_and_without_invoice_pattern.sql"
);
file_name_to_key_json43 = file_name43.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial43 = Date.now();
      let query = await connection.execute(`${sql43.toString()}`);
      const date_final43 = Date.now();
      time_of_promise_resolve43 = date_final43 - date_initial43;
      console.log(file_name_to_key_json43, time_of_promise_resolve43);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json43}`] = query.rows;
      await client.set(`${file_name_to_key_json43}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json43}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json43}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json43);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json43);
      }
    }
  },
};
