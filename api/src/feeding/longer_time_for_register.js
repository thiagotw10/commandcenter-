const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql19 = fs.readFileSync(
  __dirname + "/sql/longer_time_for_register.sql",
  "utf8"
);
const file_name19 = path.basename(
  __dirname + "/sql/longer_time_for_register.sql"
);
file_name_to_key_json19 = file_name19.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial19 = Date.now();
      let query = await connection.execute(`${sql19.toString()}`);
      const date_final19 = Date.now();
      time_of_promise_resolve19 = date_final19 - date_initial19;
      console.log(file_name_to_key_json19, time_of_promise_resolve19);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json19}`] = query.rows;
      await client.set(`${file_name_to_key_json19}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json19}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json19}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json19);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json19);
      }
    }
  },
};
