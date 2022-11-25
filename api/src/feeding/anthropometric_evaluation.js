const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql97 = fs.readFileSync(__dirname + "/sql/anthropometric_evaluation.sql", "utf8");
const file_name97 = path.basename(__dirname + "/sql/anthropometric_evaluation.sql");
file_name_to_key_json97 = file_name97.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial97 = Date.now();
      let query = await connection.execute(`${sql97.toString()}`);
      const date_final97 = Date.now();
      time_of_promise_resolve97 = date_final97 - date_initial97;
      console.log(file_name_to_key_json97, time_of_promise_resolve97);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json97}`] = query.rows;
      await client.set(`${file_name_to_key_json97}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json97}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json97}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json97);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json97);
      }
    }
  },
};
