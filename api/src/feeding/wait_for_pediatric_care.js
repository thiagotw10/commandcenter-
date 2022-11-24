const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql16 = fs.readFileSync(
  __dirname + "/sql/wait_for_pediatric_care.sql",
  "utf8"
);
const file_name16 = path.basename(
  __dirname + "/sql/wait_for_pediatric_care.sql"
);
file_name_to_key_json16 = file_name16.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial16 = Date.now();
      let query = await connection.execute(`${sql16.toString()}`);
      const date_final16 = Date.now();
      time_of_promise_resolve16 = date_final16 - date_initial16;
      console.log(file_name_to_key_json16, time_of_promise_resolve16);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json16}`] = query.rows;
      await client.set(`${file_name_to_key_json16}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json16}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json16}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json16);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json16);
      }
    }
  },
};
