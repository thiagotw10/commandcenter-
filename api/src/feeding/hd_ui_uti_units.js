const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql77 = fs.readFileSync(__dirname + "/sql/hd_ui_uti_units.sql", "utf8");
const file_name77 = path.basename(__dirname + "/sql/hd_ui_uti_units.sql");
file_name_to_key_json77 = file_name77.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial77 = Date.now();
      let query = await connection.execute(`${sql77.toString()}`);
      const date_final77 = Date.now();
      time_of_promise_resolve77 = date_final77 - date_initial77;
      console.log(file_name_to_key_json77, time_of_promise_resolve77);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json77}`] = query.rows;
      await client.set(`${file_name_to_key_json77}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json77}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json77}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json77);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json77);
      }
    }
  },
};
