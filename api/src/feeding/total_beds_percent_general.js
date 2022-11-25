const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql87 = fs.readFileSync(__dirname + "/sql/total_beds_percent_general.sql", "utf8");
const file_name87 = path.basename(__dirname + "/sql/total_beds_percent_general.sql");
file_name_to_key_json87 = file_name87.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial87 = Date.now();
      let query = await connection.execute(`${sql87.toString()}`);
      const date_final87 = Date.now();
      time_of_promise_resolve87 = date_final87 - date_initial87;
      console.log(file_name_to_key_json87, time_of_promise_resolve87);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json87}`] = query.rows;
      await client.set(`${file_name_to_key_json87}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json87}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json87}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json87);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json87);
      }
    }
  },
};
