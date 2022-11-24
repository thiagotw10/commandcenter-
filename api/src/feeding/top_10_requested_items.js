const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql51 = fs.readFileSync(
  __dirname + "/sql/top_10_requested_items.sql",
  "utf8"
);
const file_name51 = path.basename(
  __dirname + "/sql/top_10_requested_items.sql"
);
file_name_to_key_json51 = file_name51.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial51 = Date.now();
      let query = await connection.execute(`${sql51.toString()}`);
      const date_final51 = Date.now();
      time_of_promise_resolve51 = date_final51 - date_initial51;
      console.log(file_name_to_key_json51, time_of_promise_resolve51);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json51}`] = query.rows;
      await client.set(`${file_name_to_key_json51}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json51}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json51}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json51);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json51);
      }
    }
  },
};
