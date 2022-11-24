const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql20 = fs.readFileSync(
  __dirname + "/sql/first_aid_stations_beds_situation.sql",
  "utf8"
);
const file_name20 = path.basename(
  __dirname + "/sql/first_aid_stations_beds_situation.sql"
);
file_name_to_key_json20 = file_name20.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial20 = Date.now();
      let query = await connection.execute(`${sql20.toString()}`);
      const date_final20 = Date.now();
      time_of_promise_resolve20 = date_final20 - date_initial20;
      console.log(file_name_to_key_json20, time_of_promise_resolve20);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json20}`] = query.rows;
      await client.set(`${file_name_to_key_json20}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json20}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json20}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json20);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json20);
      }
    }
  },
};
