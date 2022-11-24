const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql93 = fs.readFileSync(__dirname + "/sql/diet_change.sql", "utf8");
const file_name93 = path.basename(__dirname + "/sql/diet_change.sql");
file_name_to_key_json93 = file_name93.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial93 = Date.now();
      let query = await connection.execute(`${sql93.toString()}`);
      const date_final93 = Date.now();
      time_of_promise_resolve93 = date_final93 - date_initial93;
      console.log(file_name_to_key_json93, time_of_promise_resolve93);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json93}`] = query.rows;
      await client.set(`${file_name_to_key_json93}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json93}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json93}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json93);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json93);
      }
    }
  },
};
