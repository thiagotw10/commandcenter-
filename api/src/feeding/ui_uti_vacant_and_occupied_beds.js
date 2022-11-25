const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql83 = fs.readFileSync(
  __dirname + "/sql/ui_uti_vacant_and_occupied_beds.sql",
  "utf8"
);
const file_name83 = path.basename(
  __dirname + "/sql/ui_uti_vacant_and_occupied_beds.sql"
);
file_name_to_key_json83 = file_name83.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial83 = Date.now();
      let query = await connection.execute(`${sql83.toString()}`);
      const date_final83 = Date.now();
      time_of_promise_resolve83 = date_final83 - date_initial83;
      console.log(file_name_to_key_json83, time_of_promise_resolve83);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json83}`] = query.rows;
      await client.set(`${file_name_to_key_json83}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json83}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json83}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json83);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json83);
      }
    }
  },
};
