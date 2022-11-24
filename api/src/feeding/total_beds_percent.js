const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql21 = fs.readFileSync(
  __dirname + "/sql/total_beds_percent.sql",
  "utf8"
);
const file_name21 = path.basename(__dirname + "/sql/total_beds_percent.sql");
file_name_to_key_json21 = file_name21.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial21 = Date.now();
      let query = await connection.execute(`${sql21.toString()}`);
      const date_final21 = Date.now();
      time_of_promise_resolve21 = date_final21 - date_initial21;
      console.log(file_name_to_key_json21, time_of_promise_resolve21);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json21}`] = query.rows;
      await client.set(`${file_name_to_key_json21}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json21}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json21}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json21);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json21);
      }
    }
  },
};
