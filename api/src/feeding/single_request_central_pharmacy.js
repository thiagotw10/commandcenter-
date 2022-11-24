const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;

const sql36 = fs.readFileSync(
  __dirname + "/sql/single_request_central_pharmacy.sql",
  "utf8"
);
const file_name36 = path.basename(
  __dirname + "/sql/single_request_central_pharmacy.sql"
);
file_name_to_key_json36 = file_name36.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial36 = Date.now();
      let query = await connection.execute(`${sql36.toString()}`);
      const date_final36 = Date.now();
      time_of_promise_resolve36 = date_final36 - date_initial36;
      console.log(file_name_to_key_json36, time_of_promise_resolve36);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json36}`] = query.rows;
      await client.set(`${file_name_to_key_json36}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json36}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json36}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json36);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json36);
      }
    }
  },
};
