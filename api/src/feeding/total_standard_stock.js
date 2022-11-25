const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql59 = fs.readFileSync(
  __dirname + "/sql/total_standard_stock.sql",
  "utf8"
);
const file_name59 = path.basename(__dirname + "/sql/total_standard_stock.sql");
file_name_to_key_json59 = file_name59.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial59 = Date.now();
      let query = await connection.execute(`${sql59.toString()}`);
      const date_final59 = Date.now();
      time_of_promise_resolve59 = date_final59 - date_initial59;
      console.log(file_name_to_key_json59, time_of_promise_resolve59);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json59}`] = query.rows;
      await client.set(`${file_name_to_key_json59}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json59}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json59}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json59);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json59);
      }
    }
  },
};
