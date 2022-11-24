const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql7 = fs.readFileSync(
  __dirname + "/sql/surgeries_schedules_aborteds.sql",
  "utf8"
);
const file_name7 = path.basename(
  __dirname + "/sql/surgeries_schedules_aborteds.sql"
);
file_name_to_key_json7 = file_name7.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial7 = Date.now();
      let query = await connection.execute(`${sql7.toString()}`);
      const date_final7 = Date.now();
      time_of_promise_resolve7 = date_final7 - date_initial7;
      console.log(file_name_to_key_json7, time_of_promise_resolve7);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json7}`] = query.rows;
      await client.set(`${file_name_to_key_json7}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json7}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json7}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json7);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json7);
      }
    }
  },
};
