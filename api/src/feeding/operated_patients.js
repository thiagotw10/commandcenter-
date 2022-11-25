const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql4 = fs.readFileSync(__dirname + "/sql/operated_patients.sql", "utf8");
const file_name4 = path.basename(__dirname + "/sql/operated_patients.sql");
file_name_to_key_json4 = file_name4.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial4 = Date.now();
      let query = await connection.execute(`${sql4.toString()}`);
      const date_final4 = Date.now();
      time_of_promise_resolve4 = date_final4 - date_initial4;
      console.log(file_name_to_key_json4, time_of_promise_resolve4);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json4}`] = query.rows;
      await client.set(`${file_name_to_key_json4}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json4}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json4}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json4);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json4);
      }
    }
  },
};
