const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;

const sql32 = fs.readFileSync(
  __dirname + "/sql/medication_not_delivered_on_time.sql",
  "utf8"
);
const file_name32 = path.basename(
  __dirname + "/sql/medication_not_delivered_on_time.sql"
);
file_name_to_key_json32 = file_name32.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial32 = Date.now();
      let query = await connection.execute(`${sql32.toString()}`);
      const date_final32 = Date.now();
      time_of_promise_resolve32 = date_final32 - date_initial32;
      console.log(file_name_to_key_json32, time_of_promise_resolve32);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json32}`] = query.rows;
      await client.set(`${file_name_to_key_json32}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json32}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json32}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json32);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json32);
      }
    }
  },
};
