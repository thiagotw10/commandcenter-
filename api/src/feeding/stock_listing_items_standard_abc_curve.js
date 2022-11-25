const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql55 = fs.readFileSync(
  __dirname + "/sql/stock_listing_items_standard_abc_curve.sql",
  "utf8"
);
const file_name55 = path.basename(
  __dirname + "/sql/stock_listing_items_standard_abc_curve.sql"
);
file_name_to_key_json55 = file_name55.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial55 = Date.now();
      let query = await connection.execute(`${sql55.toString()}`);
      const date_final55 = Date.now();
      time_of_promise_resolve55 = date_final55 - date_initial55;
      console.log(file_name_to_key_json55, time_of_promise_resolve55);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json55}`] = query.rows;
      await client.set(`${file_name_to_key_json55}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json55}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json55}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json55);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json55);
      }
    }
  },
};
