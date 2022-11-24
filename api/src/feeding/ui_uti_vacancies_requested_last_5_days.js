const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql82 = fs.readFileSync(
  __dirname + "/sql/ui_uti_vacancies_requested_last_5_days.sql",
  "utf8"
);
const file_name82 = path.basename(
  __dirname + "/sql/ui_uti_vacancies_requested_last_5_days.sql"
);
file_name_to_key_json82 = file_name82.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial82 = Date.now();
      let query = await connection.execute(`${sql82.toString()}`);
      const date_final82 = Date.now();
      time_of_promise_resolve82 = date_final82 - date_initial82;
      console.log(file_name_to_key_json82, time_of_promise_resolve82);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json82}`] = query.rows;
      await client.set(`${file_name_to_key_json82}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json82}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json82}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json82);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json82);
      }
    }
  },
};
