const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql50 = fs.readFileSync(
  __dirname + "/sql/top_10_requested_items_pattern.sql",
  "utf8"
);
const file_name50 = path.basename(
  __dirname + "/sql/top_10_requested_items_pattern.sql"
);
file_name_to_key_json50 = file_name50.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial50 = Date.now();
      let query = await connection.execute(`${sql50.toString()}`);
      const date_final50 = Date.now();
      time_of_promise_resolve50 = date_final50 - date_initial50;
      console.log(file_name_to_key_json50, time_of_promise_resolve50);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json50}`] = query.rows;
      await client.set(`${file_name_to_key_json50}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json50}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json50}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json50);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json50);
      }
    }
  },
};
