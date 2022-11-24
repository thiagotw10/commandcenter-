const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql45 = fs.readFileSync(
  __dirname + "/sql/service_time_analysis.sql",
  "utf8"
);
const file_name45 = path.basename(__dirname + "/sql/service_time_analysis.sql");
file_name_to_key_json45 = file_name45.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial45 = Date.now();
      let query = await connection.execute(`${sql45.toString()}`);
      const date_final45 = Date.now();
      time_of_promise_resolve45 = date_final45 - date_initial45;
      console.log(file_name_to_key_json45, time_of_promise_resolve45);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json45}`] = query.rows;
      await client.set(`${file_name_to_key_json45}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json45}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json45}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json45);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json45);
      }
    }
  },
};
