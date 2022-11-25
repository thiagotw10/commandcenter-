const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql106 = fs.readFileSync(__dirname + "/sql/surgeries_OPME_per_next_day.sql", "utf8");
const file_name106 = path.basename(__dirname + "/sql/surgeries_OPME_per_next_day.sql");
file_name_to_key_json106 = file_name106.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial106 = Date.now();
      let query = await connection.execute(`${sql106.toString()}`);
      const date_final106 = Date.now();
      time_of_promise_resolve106 = date_final106 - date_initial106;
      console.log(file_name_to_key_json106, time_of_promise_resolve106);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json106}`] = query.rows;
      await client.set(`${file_name_to_key_json106}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json106}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json106}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json106);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json106);
      }
    }
  },
};
