const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql86 = fs.readFileSync(__dirname + "/sql/room_100.sql", "utf8");
const file_name86 = path.basename(__dirname + "/sql/room_100.sql");
file_name_to_key_json86 = file_name86.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial86 = Date.now();
      let query = await connection.execute(`${sql86.toString()}`);
      const date_final86 = Date.now();
      time_of_promise_resolve86 = date_final86 - date_initial86;
      console.log(file_name_to_key_json86, time_of_promise_resolve86);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json86}`] = query.rows;
      await client.set(`${file_name_to_key_json86}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json86}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json86}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json86);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json86);
      }
    }
  },
};
