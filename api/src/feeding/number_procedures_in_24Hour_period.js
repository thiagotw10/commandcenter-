const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql105 = fs.readFileSync(__dirname + "/sql/number_procedures_in_24Hour_period.sql", "utf8");
const file_name105 = path.basename(__dirname + "/sql/number_procedures_in_24Hour_period.sql");
file_name_to_key_json105 = file_name105.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial105 = Date.now();
      let query = await connection.execute(`${sql105.toString()}`);
      const date_final105 = Date.now();
      time_of_promise_resolve105 = date_final105 - date_initial105;
      console.log(file_name_to_key_json105, time_of_promise_resolve105);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json105}`] = query.rows;
      await client.set(`${file_name_to_key_json105}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json105}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json105}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json105);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json105);
      }
    }
  },
};
