const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql79 = fs.readFileSync(
  __dirname + "/sql/ui_uti_internal_transfer.sql",
  "utf8"
);
const file_name79 = path.basename(
  __dirname + "/sql/ui_uti_internal_transfer.sql"
);
file_name_to_key_json79 = file_name79.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial79 = Date.now();
      let query = await connection.execute(`${sql79.toString()}`);
      const date_final79 = Date.now();
      time_of_promise_resolve79 = date_final79 - date_initial79;
      console.log(file_name_to_key_json79, time_of_promise_resolve79);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json79}`] = query.rows;
      await client.set(`${file_name_to_key_json79}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json79}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json79}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json79);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json79);
      }
    }
  },
};
