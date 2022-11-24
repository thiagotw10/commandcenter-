const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql69 = fs.readFileSync(
  __dirname + "/sql/first_aid_beds_occupied_per_unit.sql",
  "utf8"
);
const file_name69 = path.basename(
  __dirname + "/sql/first_aid_beds_occupied_per_unit.sql"
);
file_name_to_key_json69 = file_name69.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial69 = Date.now();
      let query = await connection.execute(`${sql69.toString()}`);
      const date_final69 = Date.now();
      time_of_promise_resolve69 = date_final69 - date_initial69;
      console.log(file_name_to_key_json69, time_of_promise_resolve69);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json69}`] = query.rows;
      await client.set(`${file_name_to_key_json69}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json69}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json69}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json69);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json69);
      }
    }
  },
};
