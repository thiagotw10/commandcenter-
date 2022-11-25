const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql12 = fs.readFileSync(__dirname + "/sql/beds_situation.sql", "utf8");
const file_name12 = path.basename(__dirname + "/sql/beds_situation.sql");
file_name_to_key_json12 = file_name12.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial12 = Date.now();
      let query = await connection.execute(`${sql12.toString()}`);
      const date_final12 = Date.now();
      time_of_promise_resolve12 = date_final12 - date_initial12;
      console.log(file_name_to_key_json12, time_of_promise_resolve12);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json12}`] = query.rows;
      await client.set(`${file_name_to_key_json12}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json12}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json12}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json12);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json12);
      }
    }
  },
};
