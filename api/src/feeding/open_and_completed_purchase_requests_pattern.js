const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql44 = fs.readFileSync(
  __dirname + "/sql/open_and_completed_purchase_requests_pattern.sql",
  "utf8"
);
const file_name44 = path.basename(
  __dirname + "/sql/open_and_completed_purchase_requests_pattern.sql"
);
file_name_to_key_json44 = file_name44.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial44 = Date.now();
      let query = await connection.execute(`${sql44.toString()}`);
      const date_final44 = Date.now();
      time_of_promise_resolve44 = date_final44 - date_initial44;
      console.log(file_name_to_key_json44, time_of_promise_resolve44);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json44}`] = query.rows;
      await client.set(`${file_name_to_key_json44}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json44}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json44}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json44);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json44);
      }
    }
  },
};
