const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql113 = fs.readFileSync(
  __dirname + "/sql/medication_delivered_and_not_delivered.sql",
  "utf8"
);
const file_name113 = path.basename(__dirname + "/sql/medication_delivered_and_not_delivered.sql");
file_name_to_key_json113 = file_name113.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial113 = Date.now();
      let query = await connection.execute(`${sql113.toString()}`);
      const date_final113 = Date.now();
      time_of_promise_resolve113 = date_final113 - date_initial113;
      console.log(file_name_to_key_json113, time_of_promise_resolve113);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json113}`] = query.rows;
      await client.set(`${file_name_to_key_json113}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json113}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json113}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json113);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json113);
      }
    }
  },
};
