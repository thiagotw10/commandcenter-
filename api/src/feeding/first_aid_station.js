const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql9 = fs.readFileSync(__dirname + "/sql/first_aid_station.sql", "utf8");
const file_name9 = path.basename(__dirname + "/sql/first_aid_station.sql");
file_name_to_key_json9 = file_name9.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial9 = Date.now();
      let query = await connection.execute(`${sql9.toString()}`);
      const date_final9 = Date.now();
      time_of_promise_resolve9 = date_final9 - date_initial9;
      console.log(file_name_to_key_json9, time_of_promise_resolve9);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json9}`] = query.rows;
      await client.set(`${file_name_to_key_json9}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json9}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json9}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json9);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json9);
      }
    }
  },
};
