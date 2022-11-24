const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql90 = fs.readFileSync(__dirname + "/sql/unusual_or_major_surgeries_scheduled.sql", "utf8");
const file_name90 = path.basename(__dirname + "/sql/unusual_or_major_surgeries_scheduled.sql");
file_name_to_key_json90 = file_name90.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial90 = Date.now();
      let query = await connection.execute(`${sql90.toString()}`);
      const date_final90 = Date.now();
      time_of_promise_resolve90 = date_final90 - date_initial90;
      console.log(file_name_to_key_json90, time_of_promise_resolve90);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json90}`] = query.rows;
      await client.set(`${file_name_to_key_json90}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json90}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json90}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json90);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json90);
      }
    }
  },
};
