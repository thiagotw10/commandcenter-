const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;

const sql38 = fs.readFileSync(
  __dirname + "/sql/total_number_of_medications_treated_on_the_day.sql",
  "utf8"
);
const file_name38 = path.basename(
  __dirname + "/sql/total_number_of_medications_treated_on_the_day.sql"
);
file_name_to_key_json38 = file_name38.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial38 = Date.now();
      let query = await connection.execute(`${sql38.toString()}`);
      const date_final38 = Date.now();
      time_of_promise_resolve38 = date_final38 - date_initial38;
      console.log(file_name_to_key_json38, time_of_promise_resolve38);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json38}`] = query.rows;
      await client.set(`${file_name_to_key_json38}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json38}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json38}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json38);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json38);
      }
    }
  },
};
