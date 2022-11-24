const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql14 = fs.readFileSync(__dirname + "/sql/beds_per_unit.sql", "utf8");
const file_name14 = path.basename(__dirname + "/sql/beds_per_unit.sql");
file_name_to_key_json14 = file_name14.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial14 = Date.now();
      let query = await connection.execute(`${sql14.toString()}`);
      const date_final14 = Date.now();
      time_of_promise_resolve14 = date_final14 - date_initial14;
      console.log(file_name_to_key_json14, time_of_promise_resolve14);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json14}`] = query.rows;
      await client.set(`${file_name_to_key_json14}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json14}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json14}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json14);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json14);
      }
    }
  },
};
