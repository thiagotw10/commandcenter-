const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql0 = fs.readFileSync(__dirname + "/sql/predicted_highs.sql", "utf8");
const file_name0 = path.basename(__dirname + "/sql/predicted_highs.sql");
file_name_to_key_json0 = file_name0.split(".")[0];

//

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial0 = Date.now();
      let query = await connection.execute(`${sql0.toString()}`);
      const date_final0 = Date.now();
      time_of_promise_resolve0 = date_final0 - date_initial0;
      console.log(file_name_to_key_json0, time_of_promise_resolve0);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json0}`] = query.rows;
      await client.set(`${file_name_to_key_json0}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json0}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json0}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json0);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json0);
      }
    }
  },
};
