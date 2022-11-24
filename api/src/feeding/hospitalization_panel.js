const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql111 = fs.readFileSync(__dirname + "/sql/hospitalization_panel.sql", "utf8");
const file_name111 = path.basename(__dirname + "/sql/hospitalization_panel.sql");
file_name_to_key_json111 = file_name111.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial111 = Date.now();
      let query = await connection.execute(`${sql111.toString()}`);
      const date_final111 = Date.now();
      time_of_promise_resolve111 = date_final111 - date_initial111;
      console.log(file_name_to_key_json111, time_of_promise_resolve111);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json111}`] = query.rows;
      await client.set(`${file_name_to_key_json111}`, JSON.stringify(result));
      return true;
    } catch (error) {
      console.log(error);
      try {
        let result = await client.get(`${file_name_to_key_json111}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json111}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json111);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json111);
      }
    }
  },
};
