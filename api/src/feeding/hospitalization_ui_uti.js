const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;

const sql28 = fs.readFileSync(
  __dirname + "/sql/hospitalization_ui_uti.sql",
  "utf8"
);
const file_name28 = path.basename(
  __dirname + "/sql/hospitalization_ui_uti.sql"
);
file_name_to_key_json28 = file_name28.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial28 = Date.now();
      let query = await connection.execute(`${sql28.toString()}`);
      const date_final28 = Date.now();
      time_of_promise_resolve28 = date_final28 - date_initial28;
      console.log(file_name_to_key_json28, time_of_promise_resolve28);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json28}`] = query.rows;
      await client.set(`${file_name_to_key_json28}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json28}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json28}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json28);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json28);
      }
    }
  },
};
