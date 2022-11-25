const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql23 = fs.readFileSync(
  __dirname + "/sql/hospitalization_next_3_days_hd.sql",
  "utf8"
);
const file_name23 = path.basename(
  __dirname + "/sql/hospitalization_next_3_days_hd.sql"
);
file_name_to_key_json23 = file_name23.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial23 = Date.now();
      let query = await connection.execute(`${sql23.toString()}`);
      const date_final23 = Date.now();
      time_of_promise_resolve23 = date_final23 - date_initial23;
      console.log(file_name_to_key_json23, time_of_promise_resolve23);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json23}`] = query.rows;
      await client.set(`${file_name_to_key_json23}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json23}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json23}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json23);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json23);
      }
    }
  },
};
