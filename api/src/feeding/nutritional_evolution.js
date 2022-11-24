const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql96 = fs.readFileSync(__dirname + "/sql/nutritional_evolution.sql", "utf8");
const file_name96 = path.basename(__dirname + "/sql/nutritional_evolution.sql");
file_name_to_key_json96 = file_name96.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial96 = Date.now();
      let query = await connection.execute(`${sql96.toString()}`);
      const date_final96 = Date.now();
      time_of_promise_resolve96 = date_final96 - date_initial96;
      console.log(file_name_to_key_json96, time_of_promise_resolve96);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json96}`] = query.rows;
      await client.set(`${file_name_to_key_json96}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json96}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json96}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json96);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json96);
      }
    }
  },
};
