const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql98 = fs.readFileSync(__dirname + "/sql/screening_not_performed.sql", "utf8");
const file_name98 = path.basename(__dirname + "/sql/screening_not_performed.sql");
file_name_to_key_json98 = file_name98.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial98 = Date.now();
      let query = await connection.execute(`${sql98.toString()}`);
      const date_final98 = Date.now();
      time_of_promise_resolve98 = date_final98 - date_initial98;
      console.log(file_name_to_key_json98, time_of_promise_resolve98);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json98}`] = query.rows;
      await client.set(`${file_name_to_key_json98}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json98}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json98}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json98);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json98);
      }
    }
  },
};
