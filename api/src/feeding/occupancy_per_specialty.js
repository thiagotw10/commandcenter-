const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql27 = fs.readFileSync(
  __dirname + "/sql/occupancy_per_specialty.sql",
  "utf8"
);
const file_name27 = path.basename(
  __dirname + "/sql/occupancy_per_specialty.sql"
);
file_name_to_key_json27 = file_name27.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial27 = Date.now();
      let query = await connection.execute(`${sql27.toString()}`);
      const date_final27 = Date.now();
      time_of_promise_resolve27 = date_final27 - date_initial27;
      console.log(file_name_to_key_json27, time_of_promise_resolve27);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json27}`] = query.rows;
      await client.set(`${file_name_to_key_json27}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json27}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json27}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json27);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json27);
      }
    }
  },
};
