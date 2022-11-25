const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql115 = fs.readFileSync(
  __dirname + "/sql/total_single_request_central_pharmacy.sql",
  "utf8"
);
const file_name115 = path.basename(__dirname + "/sql/total_single_request_central_pharmacy.sql");
file_name_to_key_json115 = file_name115.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial115 = Date.now();
      let query = await connection.execute(`${sql115.toString()}`);
      const date_final115 = Date.now();
      time_of_promise_resolve115 = date_final115 - date_initial115;
      console.log(file_name_to_key_json115, time_of_promise_resolve115);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json115}`] = query.rows;
      await client.set(`${file_name_to_key_json115}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json115}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json115}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json115);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json115);
      }
    }
  },
};
