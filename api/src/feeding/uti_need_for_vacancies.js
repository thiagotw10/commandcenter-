const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql84 = fs.readFileSync(
  __dirname + "/sql/uti_need_for_vacancies.sql",
  "utf8"
);
const file_name84 = path.basename(
  __dirname + "/sql/uti_need_for_vacancies.sql"
);
file_name_to_key_json84 = file_name84.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial84 = Date.now();
      let query = await connection.execute(`${sql84.toString()}`);
      const date_final84 = Date.now();
      time_of_promise_resolve84 = date_final84 - date_initial84;
      console.log(file_name_to_key_json84, time_of_promise_resolve84);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json84}`] = query.rows;
      await client.set(`${file_name_to_key_json84}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json84}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json84}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json84);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json84);
      }
    }
  },
};
