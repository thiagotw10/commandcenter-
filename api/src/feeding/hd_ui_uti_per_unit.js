const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql76 = fs.readFileSync(
  __dirname + "/sql/hd_ui_uti_per_unit.sql",
  "utf8"
);
const file_name76 = path.basename(__dirname + "/sql/hd_ui_uti_per_unit.sql");
file_name_to_key_json76 = file_name76.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial76 = Date.now();
      let query = await connection.execute(`${sql76.toString()}`);
      const date_final76 = Date.now();
      time_of_promise_resolve76 = date_final76 - date_initial76;
      console.log(file_name_to_key_json76, time_of_promise_resolve76);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json76}`] = query.rows;
      await client.set(`${file_name_to_key_json76}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json76}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json76}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json76);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json76);
      }
    }
  },
};
