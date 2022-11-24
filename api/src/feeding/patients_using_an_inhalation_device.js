const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;

const sql34 = fs.readFileSync(
  __dirname + "/sql/patients_using_an_inhalation_device.sql",
  "utf8"
);
const file_name34 = path.basename(
  __dirname + "/sql/patients_using_an_inhalation_device.sql"
);
file_name_to_key_json34 = file_name34.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial34 = Date.now();
      let query = await connection.execute(`${sql34.toString()}`);
      const date_final34 = Date.now();
      time_of_promise_resolve34 = date_final34 - date_initial34;
      console.log(file_name_to_key_json34, time_of_promise_resolve34);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json34}`] = query.rows;
      await client.set(`${file_name_to_key_json34}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json34}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json34}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json34);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json34);
      }
    }
  },
};
