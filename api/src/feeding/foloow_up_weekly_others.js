const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql52 = fs.readFileSync(
  __dirname + "/sql/foloow_up_weekly_others.sql",
  "utf8"
);
const file_name52 = path.basename(
  __dirname + "/sql/foloow_up_weekly_others.sql"
);
file_name_to_key_json52 = file_name52.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial52 = Date.now();
      let query = await connection.execute(`${sql52.toString()}`);
      const date_final52 = Date.now();
      time_of_promise_resolve52 = date_final52 - date_initial52;
      console.log(file_name_to_key_json52, time_of_promise_resolve52);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json52}`] = query.rows;
      await client.set(`${file_name_to_key_json52}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json52}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json52}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json52);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json52);
      }
    }
  },
};
