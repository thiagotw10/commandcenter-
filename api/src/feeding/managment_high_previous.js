const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql8 = fs.readFileSync(
  __dirname + "/sql/managment_high_previous.sql",
  "utf8"
);
const file_name8 = path.basename(
  __dirname + "/sql/managment_high_previous.sql"
);
file_name_to_key_json8 = file_name8.split(".")[0];

// async function run(connection) {
//   FeedingToRedis(file_name_to_key_json8, sql8, connection);
// }

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial8 = Date.now();
      let query = await connection.execute(`${sql8.toString()}`);
      const date_final8 = Date.now();
      time_of_promise_resolve8 = date_final8 - date_initial8;
      console.log(file_name_to_key_json8, time_of_promise_resolve8);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json8}`] = query.rows;
      await client.set(`${file_name_to_key_json8}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json8}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json8}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json8);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json8);
      }
    }
  },
};
