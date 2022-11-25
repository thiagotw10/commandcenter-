const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql100 = fs.readFileSync(__dirname + "/sql/pending_requests.sql", "utf8");
const file_name100 = path.basename(__dirname + "/sql/pending_requests.sql");
file_name_to_key_json100 = file_name100.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial100 = Date.now();
      let query = await connection.execute(`${sql100.toString()}`);
      const date_final100 = Date.now();
      time_of_promise_resolve100 = date_final100 - date_initial100;
      console.log(file_name_to_key_json100, time_of_promise_resolve100);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json100}`] = query.rows;
      await client.set(`${file_name_to_key_json100}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json100}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json100}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json100);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json100);
      }
    }
  },
};
