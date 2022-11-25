const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql57 = fs.readFileSync(
  __dirname + "/sql/stock_items_curve_abc_standard.sql",
  "utf8"
);
const file_name57 = path.basename(
  __dirname + "/sql/stock_items_curve_abc_standard.sql"
);
file_name_to_key_json57 = file_name57.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial57 = Date.now();
      let query = await connection.execute(`${sql57.toString()}`);
      const date_final57 = Date.now();
      time_of_promise_resolve57 = date_final57 - date_initial57;
      console.log(file_name_to_key_json57, time_of_promise_resolve57);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json57}`] = query.rows;
      await client.set(`${file_name_to_key_json57}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json57}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json57}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json57);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json57);
      }
    }
  },
};
