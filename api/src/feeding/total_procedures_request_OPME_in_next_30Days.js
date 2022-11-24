const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql107 = fs.readFileSync(__dirname + "/sql/total_procedures_request_OPME_in_next_30Days.sql", "utf8");
const file_name107 = path.basename(__dirname + "/sql/total_procedures_request_OPME_in_next_30Days.sql");
file_name_to_key_json107 = file_name107.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial107 = Date.now();
      let query = await connection.execute(`${sql107.toString()}`);
      const date_final107 = Date.now();
      time_of_promise_resolve107 = date_final107 - date_initial107;
      console.log(file_name_to_key_json107, time_of_promise_resolve107);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json107}`] = query.rows;
      await client.set(`${file_name_to_key_json107}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json107}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json107}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json107);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json107);
      }
    }
  },
};
