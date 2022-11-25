const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql48 = fs.readFileSync(
  __dirname + "/sql/purchase_order_with_and_without_invoice.sql",
  "utf8"
);
const file_name48 = path.basename(
  __dirname + "/sql/purchase_order_with_and_without_invoice.sql"
);
file_name_to_key_json48 = file_name48.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial48 = Date.now();
      let query = await connection.execute(`${sql48.toString()}`);
      const date_final48 = Date.now();
      time_of_promise_resolve48 = date_final48 - date_initial48;
      console.log(file_name_to_key_json48, time_of_promise_resolve48);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json48}`] = query.rows;
      await client.set(`${file_name_to_key_json48}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json48}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json48}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json48);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json48);
      }
    }
  },
};
