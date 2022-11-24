const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql60 = fs.readFileSync(
  __dirname + "/sql/total_non_standard_stock.sql",
  "utf8"
);
const file_name60 = path.basename(
  __dirname + "/sql/total_non_standard_stock.sql"
);
file_name_to_key_json60 = file_name60.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial60 = Date.now();
      let query = await connection.execute(`${sql60.toString()}`);
      const date_final60 = Date.now();
      time_of_promise_resolve60 = date_final60 - date_initial60;
      console.log(file_name_to_key_json60, time_of_promise_resolve60);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json60}`] = query.rows;
      await client.set(`${file_name_to_key_json60}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json60}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json60}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json60);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json60);
      }
    }
  },
};
