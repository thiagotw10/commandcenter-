const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;

const sql30 = fs.readFileSync(
  __dirname + "/sql/emergency_request_central_pharmacy.sql",
  "utf8"
);
const file_name30 = path.basename(
  __dirname + "/sql/emergency_request_central_pharmacy.sql"
);
file_name_to_key_json30 = file_name30.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial30 = Date.now();
      let query = await connection.execute(`${sql30.toString()}`);
      const date_final30 = Date.now();
      time_of_promise_resolve30 = date_final30 - date_initial30;
      console.log(file_name_to_key_json30, time_of_promise_resolve30);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json30}`] = query.rows;
      await client.set(`${file_name_to_key_json30}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json30}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json30}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json30);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json30);
      }
    }
  },
};
