const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql49 = fs.readFileSync(
  __dirname + "/sql/open_and_completed_purchase_requests.sql",
  "utf8"
);
const file_name49 = path.basename(
  __dirname + "/sql/open_and_completed_purchase_requests.sql"
);
file_name_to_key_json49 = file_name49.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial49 = Date.now();
      let query = await connection.execute(`${sql49.toString()}`);
      const date_final49 = Date.now();
      time_of_promise_resolve49 = date_final49 - date_initial49;
      console.log(file_name_to_key_json49, time_of_promise_resolve49);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json49}`] = query.rows;
      await client.set(`${file_name_to_key_json49}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json49}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json49}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json49);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json49);
      }
    }
  },
};
