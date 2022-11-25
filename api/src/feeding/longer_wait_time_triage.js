const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql18 = fs.readFileSync(
  __dirname + "/sql/longer_wait_time_triage.sql",
  "utf8"
);
const file_name18 = path.basename(
  __dirname + "/sql/longer_wait_time_triage.sql"
);
file_name_to_key_json18 = file_name18.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial18 = Date.now();
      let query = await connection.execute(`${sql18.toString()}`);
      const date_final18 = Date.now();
      time_of_promise_resolve18 = date_final18 - date_initial18;
      console.log(file_name_to_key_json18, time_of_promise_resolve18);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json18}`] = query.rows;
      await client.set(`${file_name_to_key_json18}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json18}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json18}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json18);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json18);
      }
    }
  },
};
