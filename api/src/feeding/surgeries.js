const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql5 = fs.readFileSync(__dirname + "/sql/surgeries.sql", "utf8");
const file_name5 = path.basename(__dirname + "/sql/surgeries.sql");
file_name_to_key_json5 = file_name5.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial5 = Date.now();
      let query = await connection.execute(`${sql5.toString()}`);
      const date_final5 = Date.now();
      time_of_promise_resolve5 = date_final5 - date_initial5;
      console.log(file_name_to_key_json5, time_of_promise_resolve5);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json5}`] = query.rows;
      await client.set(`${file_name_to_key_json5}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json5}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json5}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json5);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json5);
      }
    }
  },
};
