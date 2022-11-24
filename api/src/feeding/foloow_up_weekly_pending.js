const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql53 = fs.readFileSync(
  __dirname + "/sql/foloow_up_weekly_pending.sql",
  "utf8"
);
const file_name53 = path.basename(
  __dirname + "/sql/foloow_up_weekly_pending.sql"
);
file_name_to_key_json53 = file_name53.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial53 = Date.now();
      let query = await connection.execute(`${sql53.toString()}`);
      const date_final53 = Date.now();
      time_of_promise_resolve53 = date_final53 - date_initial53;
      console.log(file_name_to_key_json53, time_of_promise_resolve53);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json53}`] = query.rows;
      await client.set(`${file_name_to_key_json53}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json53}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json53}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json53);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json53);
      }
    }
  },
};
