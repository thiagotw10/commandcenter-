const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql67 = fs.readFileSync(
  __dirname + "/sql/first_aid_total_beds_occupied.sql",
  "utf8"
);
const file_name67 = path.basename(
  __dirname + "/sql/first_aid_total_beds_occupied.sql"
);
file_name_to_key_json67 = file_name67.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial67 = Date.now();
      let query = await connection.execute(`${sql67.toString()}`);
      const date_final67 = Date.now();
      time_of_promise_resolve67 = date_final67 - date_initial67;
      console.log(file_name_to_key_json67, time_of_promise_resolve67);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json67}`] = query.rows;
      await client.set(`${file_name_to_key_json67}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json67}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json67}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json67);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json67);
      }
    }
  },
};
