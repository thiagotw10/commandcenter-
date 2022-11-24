const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql112 = fs.readFileSync(
  __dirname + "/sql/quantitative_situations.sql",
  "utf8"
);
const file_name112 = path.basename(__dirname + "/sql/quantitative_situations.sql");
file_name_to_key_json112 = file_name112.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial112 = Date.now();
      let query = await connection.execute(`${sql112.toString()}`);
      const date_final112 = Date.now();
      time_of_promise_resolve112 = date_final112 - date_initial112;
      console.log(file_name_to_key_json112, time_of_promise_resolve112);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json112}`] = query.rows;
      await client.set(`${file_name_to_key_json112}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json112}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json112}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json112);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json112);
      }
    }
  },
};
