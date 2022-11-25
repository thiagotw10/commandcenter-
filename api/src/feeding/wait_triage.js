const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql17 = fs.readFileSync(__dirname + "/sql/wait_triage.sql", "utf8");
const file_name17 = path.basename(__dirname + "/sql/wait_triage.sql");
file_name_to_key_json17 = file_name17.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial17 = Date.now();
      let query = await connection.execute(`${sql17.toString()}`);
      const date_final17 = Date.now();
      time_of_promise_resolve17 = date_final17 - date_initial17;
      console.log(file_name_to_key_json17, time_of_promise_resolve17);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json17}`] = query.rows;
      await client.set(`${file_name_to_key_json17}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json17}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json17}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json17);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json17);
      }
    }
  },
};
