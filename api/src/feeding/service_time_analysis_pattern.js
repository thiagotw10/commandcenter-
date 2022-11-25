const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql40 = fs.readFileSync(
  __dirname + "/sql/service_time_analysis_pattern.sql",
  "utf8"
);
const file_name40 = path.basename(
  __dirname + "/sql/service_time_analysis_pattern.sql"
);
file_name_to_key_json40 = file_name40.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial40 = Date.now();
      let query = await connection.execute(`${sql40.toString()}`);
      const date_final40 = Date.now();
      time_of_promise_resolve40 = date_final40 - date_initial40;
      console.log(file_name_to_key_json40, time_of_promise_resolve40);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json40}`] = query.rows;
      await client.set(`${file_name_to_key_json40}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json40}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json40}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json40);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json40);
      }
    }
  },
};
