const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql88 = fs.readFileSync(__dirname + "/sql/dantrolen_sadt.sql", "utf8");
const file_name88 = path.basename(__dirname + "/sql/dantrolen_sadt.sql");
file_name_to_key_json88 = file_name88.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial88 = Date.now();
      let query = await connection.execute(`${sql88.toString()}`);
      const date_final88 = Date.now();
      time_of_promise_resolve88 = date_final88 - date_initial88;
      console.log(file_name_to_key_json88, time_of_promise_resolve88);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json88}`] = query.rows;
      await client.set(`${file_name_to_key_json88}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json88}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json88}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json88);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json88);
      }
    }
  },
};
