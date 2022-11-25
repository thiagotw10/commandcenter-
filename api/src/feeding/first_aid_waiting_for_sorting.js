const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql75 = fs.readFileSync(
  __dirname + "/sql/first_aid_waiting_for_sorting.sql",
  "utf8"
);
const file_name75 = path.basename(
  __dirname + "/sql/first_aid_waiting_for_sorting.sql"
);
file_name_to_key_json75 = file_name75.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial75 = Date.now();
      let query = await connection.execute(`${sql75.toString()}`);
      const date_final75 = Date.now();
      time_of_promise_resolve75 = date_final75 - date_initial75;
      console.log(file_name_to_key_json75, time_of_promise_resolve75);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json75}`] = query.rows;
      await client.set(`${file_name_to_key_json75}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json75}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json75}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json75);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json75);
      }
    }
  },
};
