const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql1 = fs.readFileSync(__dirname + "/sql/full_occupancy.sql", "utf8");
const file_name1 = path.basename(__dirname + "/sql/full_occupancy.sql");
file_name_to_key_json1 = file_name1.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial1 = Date.now();
      let query = await connection.execute(`${sql1.toString()}`);
      const date_final1 = Date.now();
      time_of_promise_resolve1 = date_final1 - date_initial1;
      console.log(file_name_to_key_json1, time_of_promise_resolve1);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json1}`] = query.rows;
      await client.set(`${file_name_to_key_json1}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json1}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json1}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json1);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json1);
      }
    }
  },
};
