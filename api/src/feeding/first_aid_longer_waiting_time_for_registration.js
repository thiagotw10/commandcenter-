const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql71 = fs.readFileSync(
  __dirname + "/sql/first_aid_longer_waiting_time_for_registration.sql",
  "utf8"
);
const file_name71 = path.basename(
  __dirname + "/sql/first_aid_longer_waiting_time_for_registration.sql"
);
file_name_to_key_json71 = file_name71.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial71 = Date.now();
      let query = await connection.execute(`${sql71.toString()}`);
      const date_final71 = Date.now();
      time_of_promise_resolve71 = date_final71 - date_initial71;
      console.log(file_name_to_key_json71, time_of_promise_resolve71);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json71}`] = query.rows;
      await client.set(`${file_name_to_key_json71}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json71}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json71}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json71);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json71);
      }
    }
  },
};
