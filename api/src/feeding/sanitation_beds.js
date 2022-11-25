const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql6 = fs.readFileSync(__dirname + "/sql/sanitation_beds.sql", "utf8");
const file_name6 = path.basename(__dirname + "/sql/sanitation_beds.sql");
file_name_to_key_json6 = file_name6.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial6 = Date.now();
      let query = await connection.execute(`${sql6.toString()}`);
      const date_final6 = Date.now();
      time_of_promise_resolve6 = date_final6 - date_initial6;
      console.log(file_name_to_key_json6, time_of_promise_resolve6);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json6}`] = query.rows;
      await client.set(`${file_name_to_key_json6}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json6}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json6}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json6);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json6);
      }
    }
  },
};
