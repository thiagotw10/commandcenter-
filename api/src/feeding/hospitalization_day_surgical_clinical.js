const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql22 = fs.readFileSync(__dirname + "/sql/surgical_clinical.sql", "utf8");
const file_name22 = path.basename(__dirname + "/sql/surgical_clinical.sql");
file_name_to_key_json22 = file_name22.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial22 = Date.now();
      let query = await connection.execute(`${sql22.toString()}`);
      const date_final22 = Date.now();
      time_of_promise_resolve22 = date_final22 - date_initial22;
      console.log(file_name_to_key_json22, time_of_promise_resolve22);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json22}`] = query.rows;
      await client.set(`${file_name_to_key_json22}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json22}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json22}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json22);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json22);
      }
    }
  },
};
