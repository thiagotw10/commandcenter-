const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql64 = fs.readFileSync(
  __dirname + "/sql/total_stock_by_non_standard_validity_control.sql",
  "utf8"
);
const file_name64 = path.basename(
  __dirname + "/sql/total_stock_by_non_standard_validity_control.sql"
);
file_name_to_key_json64 = file_name64.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial64 = Date.now();
      let query = await connection.execute(`${sql64.toString()}`);
      const date_final64 = Date.now();
      time_of_promise_resolve64 = date_final64 - date_initial64;
      console.log(file_name_to_key_json64, time_of_promise_resolve64);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json64}`] = query.rows;
      await client.set(`${file_name_to_key_json64}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json64}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json64}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json64);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json64);
      }
    }
  },
};
