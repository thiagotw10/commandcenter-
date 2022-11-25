const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql10 = fs.readFileSync(__dirname + "/sql/quantitative.sql", "utf8");
const file_name10 = path.basename(__dirname + "/sql/quantitative.sql");
file_name_to_key_json10 = file_name10.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial10 = Date.now();
      let query = await connection.execute(`${sql10.toString()}`);
      const date_final10 = Date.now();
      time_of_promise_resolve10 = date_final10 - date_initial10;
      console.log(file_name_to_key_json10, time_of_promise_resolve10);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json10}`] = query.rows;
      await client.set(`${file_name_to_key_json10}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json10}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json10}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json10);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json10);
      }
    }
  },
};
