const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;

const sql35 = fs.readFileSync(
  __dirname + "/sql/signaling_transfer_of_patients_between_beds.sql",
  "utf8"
);
const file_name35 = path.basename(
  __dirname + "/sql/signaling_transfer_of_patients_between_beds.sql"
);
file_name_to_key_json35 = file_name35.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial35 = Date.now();
      let query = await connection.execute(`${sql35.toString()}`);
      const date_final35 = Date.now();
      time_of_promise_resolve35 = date_final35 - date_initial35;
      console.log(file_name_to_key_json35, time_of_promise_resolve35);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json35}`] = query.rows;
      await client.set(`${file_name_to_key_json35}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json35}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json35}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json35);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json35);
      }
    }
  },
};
