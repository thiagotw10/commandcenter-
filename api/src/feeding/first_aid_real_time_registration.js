const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql73 = fs.readFileSync(
  __dirname + "/sql/first_aid_real_time_registration.sql",
  "utf8"
);
const file_name73 = path.basename(
  __dirname + "/sql/first_aid_real_time_registration.sql"
);
file_name_to_key_json73 = file_name73.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial73 = Date.now();
      let query = await connection.execute(`${sql73.toString()}`);
      const date_final73 = Date.now();
      time_of_promise_resolve73 = date_final73 - date_initial73;
      console.log(file_name_to_key_json73, time_of_promise_resolve73);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json73}`] = query.rows;
      await client.set(`${file_name_to_key_json73}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json73}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json73}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json73);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json73);
      }
    }
  },
};
