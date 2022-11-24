const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
// const errorLog = require("../logs/utilsLogs").errorlog;
// const successlog = require("../logs/utilsLogs").successlog;

// successlog.info(`Success Message and variables: ${variable}`);
// errorlog.error(`Error Message : ${error}`);

const sql42 = fs
  .readFileSync(
    __dirname + "/sql/authorized_purchase_order_pattern.sql",
    "utf8"
  )
  .toString();
const file_name42 = path.basename(
  __dirname + "/sql/authorized_purchase_order_pattern.sql"
);
file_name_to_key_json42 = file_name42.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial42 = Date.now();
      let query = await connection.execute(`${sql42.toString()}`);
      const date_final42 = Date.now();
      time_of_promise_resolve42 = date_final42 - date_initial42;
      console.log(file_name_to_key_json42, time_of_promise_resolve42);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json42}`] = query.rows;
      await client.set(`${file_name_to_key_json42}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json42}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json42}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json42);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json42);
      }
    }
  },
};
