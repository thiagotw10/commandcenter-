const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql61 = fs.readFileSync(
  __dirname + "/sql/standard_validity_control_listing.sql",
  "utf8"
);
const file_name61 = path.basename(
  __dirname + "/sql/standard_validity_control_listing.sql"
);
file_name_to_key_json61 = file_name61.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial61 = Date.now();
      let query = await connection.execute(`${sql61.toString()}`);
      const date_final61 = Date.now();
      time_of_promise_resolve61 = date_final61 - date_initial61;
      console.log(file_name_to_key_json61, time_of_promise_resolve61);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json61}`] = query.rows;
      await client.set(`${file_name_to_key_json61}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json61}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json61}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json61);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json61);
      }
    }
  },
};
