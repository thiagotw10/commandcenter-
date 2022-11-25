const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql85 = fs.readFileSync(
  __dirname + "/sql/vacancies_per_floor.sql",
  "utf8"
);
const file_name85 = path.basename(__dirname + "/sql/vacancies_per_floor.sql");
file_name_to_key_json85 = file_name85.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial85 = Date.now();
      let query = await connection.execute(`${sql85.toString()}`);
      const date_final85 = Date.now();
      time_of_promise_resolve85 = date_final85 - date_initial85;
      console.log(file_name_to_key_json85, time_of_promise_resolve85);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json85}`] = query.rows;
      await client.set(`${file_name_to_key_json85}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json85}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json85}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json85);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json85);
      }
    }
  },
};
