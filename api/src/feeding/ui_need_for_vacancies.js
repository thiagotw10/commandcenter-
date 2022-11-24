const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql78 = fs.readFileSync(
  __dirname + "/sql/ui_need_for_vacancies.sql",
  "utf8"
);
const file_name78 = path.basename(__dirname + "/sql/ui_need_for_vacancies.sql");
file_name_to_key_json78 = file_name78.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial78 = Date.now();
      let query = await connection.execute(`${sql78.toString()}`);
      const date_final78 = Date.now();
      time_of_promise_resolve78 = date_final78 - date_initial78;
      console.log(file_name_to_key_json78, time_of_promise_resolve78);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json78}`] = query.rows;
      await client.set(`${file_name_to_key_json78}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json78}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json78}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json78);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json78);
      }
    }
  },
};
