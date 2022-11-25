const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql95 = fs.readFileSync(__dirname + "/sql/internal_transfers.sql", "utf8");
const file_name95 = path.basename(__dirname + "/sql/internal_transfers.sql");
file_name_to_key_json95 = file_name95.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial95 = Date.now();
      let query = await connection.execute(`${sql95.toString()}`);
      const date_final95 = Date.now();
      time_of_promise_resolve95 = date_final95 - date_initial95;
      console.log(file_name_to_key_json95, time_of_promise_resolve95);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json95}`] = query.rows;
      await client.set(`${file_name_to_key_json95}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json95}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json95}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json95);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json95);
      }
    }
  },
};
