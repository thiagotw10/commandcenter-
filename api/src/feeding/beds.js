const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql11 = fs.readFileSync(__dirname + "/sql/beds.sql", "utf8");
const file_name11 = path.basename(__dirname + "/sql/beds.sql");
file_name_to_key_json11 = file_name11.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial11 = Date.now();
      let query = await connection.execute(`${sql11.toString()}`);
      const date_final11 = Date.now();
      time_of_promise_resolve11 = date_final11 - date_initial11;
      console.log(file_name_to_key_json11, time_of_promise_resolve11);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json11}`] = query.rows;
      await client.set(`${file_name_to_key_json11}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json11}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json11}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json11);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json11);
      }
    }
  },
};
