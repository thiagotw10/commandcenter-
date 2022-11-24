const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql25 = fs.readFileSync(
  __dirname + "/sql/total_day_surgical_clinical_next_3_days.sql",
  "utf8"
);
const file_name25 = path.basename(
  __dirname + "/sql/total_day_surgical_clinical_next_3_days.sql"
);
file_name_to_key_json25 = file_name25.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial25 = Date.now();
      let query = await connection.execute(`${sql25.toString()}`);
      const date_final25 = Date.now();
      time_of_promise_resolve25 = date_final25 - date_initial25;
      console.log(file_name_to_key_json25, time_of_promise_resolve25);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json25}`] = query.rows;
      await client.set(`${file_name_to_key_json25}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json25}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json25}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json25);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json25);
      }
    }
  },
};
