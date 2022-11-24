const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql56 = fs.readFileSync(
  __dirname + "/sql/stock_listing_items_nom_standard_abc_curve.sql",
  "utf8"
);
const file_name56 = path.basename(
  __dirname + "/sql/stock_listing_items_nom_standard_abc_curve.sql"
);
file_name_to_key_json56 = file_name56.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial56 = Date.now();
      let query = await connection.execute(`${sql56.toString()}`);
      const date_final56 = Date.now();
      time_of_promise_resolve56 = date_final56 - date_initial56;
      console.log(file_name_to_key_json56, time_of_promise_resolve56);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json56}`] = query.rows;
      await client.set(`${file_name_to_key_json56}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json56}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json56}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json56);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json56);
      }
    }
  },
};
