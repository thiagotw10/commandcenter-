const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql13 = fs.readFileSync(
  __dirname + "/sql/occupancy_per_unit.sql",
  "utf8"
);
const file_name13 = path.basename(__dirname + "/sql/occupancy_per_unit.sql");
file_name_to_key_json13 = file_name13.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial13 = Date.now();
      let query = await connection.execute(`${sql13.toString()}`);
      const date_final13 = Date.now();
      time_of_promise_resolve13 = date_final13 - date_initial13;
      console.log(file_name_to_key_json13, time_of_promise_resolve13);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json13}`] = query.rows;
      await client.set(`${file_name_to_key_json13}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json13}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json13}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json13);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json13);
      }
    }
  },
};
