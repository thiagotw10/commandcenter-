const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql54 = fs.readFileSync(
  __dirname + "/sql/foloow_up_weekly_Total.sql",
  "utf8"
);
const file_name54 = path.basename(
  __dirname + "/sql/foloow_up_weekly_Total.sql"
);
file_name_to_key_json54 = file_name54.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial54 = Date.now();
      let query = await connection.execute(`${sql54.toString()}`);
      const date_final54 = Date.now();
      time_of_promise_resolve54 = date_final54 - date_initial54;
      console.log(file_name_to_key_json54, time_of_promise_resolve54);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json54}`] = query.rows;
      await client.set(`${file_name_to_key_json54}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json54}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json54}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json54);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json54);
      }
    }
  },
};
