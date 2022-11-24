const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql63 = fs.readFileSync(
  __dirname + "/sql/total_stock_by_standard_validity_control.sql",
  "utf8"
);
const file_name63 = path.basename(
  __dirname + "/sql/total_stock_by_standard_validity_control.sql"
);
file_name_to_key_json63 = file_name63.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial63 = Date.now();
      let query = await connection.execute(`${sql63.toString()}`);
      const date_final63 = Date.now();
      time_of_promise_resolve63 = date_final63 - date_initial63;
      console.log(file_name_to_key_json63, time_of_promise_resolve63);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json63}`] = query.rows;
      await client.set(`${file_name_to_key_json63}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json63}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json63}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json63);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json63);
      }
    }
  },
};
