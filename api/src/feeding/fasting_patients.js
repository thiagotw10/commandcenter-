const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql94 = fs.readFileSync(__dirname + "/sql/fasting_patients.sql", "utf8");
const file_name94 = path.basename(__dirname + "/sql/fasting_patients.sql");
file_name_to_key_json94 = file_name94.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial94 = Date.now();
      let query = await connection.execute(`${sql94.toString()}`);
      const date_final94 = Date.now();
      time_of_promise_resolve94 = date_final94 - date_initial94;
      console.log(file_name_to_key_json94, time_of_promise_resolve94);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json94}`] = query.rows;
      await client.set(`${file_name_to_key_json94}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json94}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json94}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json94);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json94);
      }
    }
  },
};
