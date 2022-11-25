const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql80 = fs.readFileSync(
  __dirname + "/sql/ui_uti_reason_for_discharge.sql",
  "utf8"
);
const file_name80 = path.basename(
  __dirname + "/sql/ui_uti_reason_for_discharge.sql"
);
file_name_to_key_json80 = file_name80.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial80 = Date.now();
      let query = await connection.execute(`${sql80.toString()}`);
      const date_final80 = Date.now();
      time_of_promise_resolve80 = date_final80 - date_initial80;
      console.log(file_name_to_key_json80, time_of_promise_resolve80);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json80}`] = query.rows;
      await client.set(`${file_name_to_key_json80}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json80}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json80}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json80);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json80);
      }
    }
  },
};
