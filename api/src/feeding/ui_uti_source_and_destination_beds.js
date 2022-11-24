const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql81 = fs.readFileSync(
  __dirname + "/sql/ui_uti_source_and_destination_beds.sql",
  "utf8"
);
const file_name81 = path.basename(
  __dirname + "/sql/ui_uti_source_and_destination_beds.sql"
);
file_name_to_key_json81 = file_name81.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial81 = Date.now();
      let query = await connection.execute(`${sql81.toString()}`);
      const date_final81 = Date.now();
      time_of_promise_resolve81 = date_final81 - date_initial81;
      console.log(file_name_to_key_json81, time_of_promise_resolve81);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json81}`] = query.rows;
      await client.set(`${file_name_to_key_json81}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json81}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json81}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json81);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json81);
      }
    }
  },
};
