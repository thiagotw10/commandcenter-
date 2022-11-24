const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql109 = fs.readFileSync(__dirname + "/sql/total_opens_solic_pattern.sql", "utf8");
const file_name109 = path.basename(__dirname + "/sql/total_opens_solic_pattern.sql");
file_name_to_key_json109 = file_name109.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial109 = Date.now();
      let query = await connection.execute(`${sql109.toString()}`);
      const date_final109 = Date.now();
      time_of_promise_resolve109 = date_final109 - date_initial109;
      console.log(file_name_to_key_json109, time_of_promise_resolve109);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json109}`] = query.rows;
      await client.set(`${file_name_to_key_json109}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json109}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json109}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json109);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json109);
      }
    }
  },
};
