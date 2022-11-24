const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql15 = fs.readFileSync(
  __dirname + "/sql/real_time_register.sql",
  "utf8"
);
const file_name15 = path.basename(__dirname + "/sql/real_time_register.sql");
file_name_to_key_json15 = file_name15.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial15 = Date.now();
      let query = await connection.execute(`${sql15.toString()}`);
      const date_final15 = Date.now();
      time_of_promise_resolve15 = date_final15 - date_initial15;
      console.log(file_name_to_key_json15, time_of_promise_resolve15);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json15}`] = query.rows;
      await client.set(`${file_name_to_key_json15}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json15}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json15}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json15);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json15);
      }
    }
  },
};
