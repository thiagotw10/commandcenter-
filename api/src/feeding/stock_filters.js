const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql108 = fs.readFileSync(__dirname + "/sql/stock_filters.sql", "utf8");
const file_name108 = path.basename(__dirname + "/sql/stock_filters.sql");
file_name_to_key_json108 = file_name108.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial108 = Date.now();
      let query = await connection.execute(`${sql108.toString()}`);
      const date_final108 = Date.now();
      time_of_promise_resolve108 = date_final108 - date_initial108;
      console.log(file_name_to_key_json108, time_of_promise_resolve108);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json108}`] = query.rows;
      await client.set(`${file_name_to_key_json108}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json108}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json108}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json108);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json108);
      }
    }
  },
};
