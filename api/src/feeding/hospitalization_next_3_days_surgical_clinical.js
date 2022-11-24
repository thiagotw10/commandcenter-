const oracledb = require("oracledb");
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;

const sql24 = fs.readFileSync(
  __dirname + "/sql/surgical_clinical_next_3_days.sql",
  "utf8"
);
const file_name24 = path.basename(
  __dirname + "/sql/surgical_clinical_next_3_days.sql"
);
file_name_to_key_json24 = file_name24.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial24 = Date.now();
      let query = await connection.execute(`${sql24.toString()}`);
      const date_final24 = Date.now();
      time_of_promise_resolve24 = date_final24 - date_initial24;
      console.log(file_name_to_key_json24, time_of_promise_resolve24);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json24}`] = query.rows;
      await client.set(`${file_name_to_key_json24}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json24}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json24}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json24);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json24);
      }
    }
  },
};
