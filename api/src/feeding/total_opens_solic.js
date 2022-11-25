const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql110 = fs.readFileSync(__dirname + "/sql/total_opens_solic.sql", "utf8");
const file_name110 = path.basename(__dirname + "/sql/total_opens_solic.sql");
file_name_to_key_json110 = file_name110.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial110 = Date.now();
      let query = await connection.execute(`${sql110.toString()}`);
      const date_final110 = Date.now();
      time_of_promise_resolve110 = date_final110 - date_initial110;
      console.log(file_name_to_key_json110, time_of_promise_resolve110);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json110}`] = query.rows;
      await client.set(`${file_name_to_key_json110}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json110}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json110}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json110);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json110);
      }
    }
  },
};
