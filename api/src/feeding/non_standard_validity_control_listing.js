const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql62 = fs.readFileSync(
  __dirname + "/sql/non_standard_validity_control_listing.sql",
  "utf8"
);
const file_name62 = path.basename(
  __dirname + "/sql/non_standard_validity_control_listing.sql"
);
file_name_to_key_json62 = file_name62.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial62 = Date.now();
      let query = await connection.execute(`${sql62.toString()}`);
      const date_final62 = Date.now();
      time_of_promise_resolve62 = date_final62 - date_initial62;
      console.log(file_name_to_key_json62, time_of_promise_resolve62);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json62}`] = query.rows;
      await client.set(`${file_name_to_key_json62}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json62}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json62}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json62);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json62);
      }
    }
  },
};
