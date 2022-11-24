const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql26 = fs.readFileSync(
  __dirname + "/sql/total_beds_percent_unit.sql",
  "utf8"
);
const file_name26 = path.basename(
  __dirname + "/sql/total_beds_percent_unit.sql"
);
file_name_to_key_json26 = file_name26.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial26 = Date.now();
      let query = await connection.execute(`${sql26.toString()}`);
      const date_final26 = Date.now();
      time_of_promise_resolve26 = date_final26 - date_initial26;
      console.log(file_name_to_key_json26, time_of_promise_resolve26);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json26}`] = query.rows;
      await client.set(`${file_name_to_key_json26}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json26}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json26}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json26);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json26);
      }
    }
  },
};
