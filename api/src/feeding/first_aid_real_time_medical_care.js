const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql72 = fs.readFileSync(
  __dirname + "/sql/first_aid_real_time_medical_care.sql",
  "utf8"
);
const file_name72 = path.basename(
  __dirname + "/sql/first_aid_real_time_medical_care.sql"
);
file_name_to_key_json72 = file_name72.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial72 = Date.now();
      let query = await connection.execute(`${sql72.toString()}`);
      const date_final72 = Date.now();
      time_of_promise_resolve72 = date_final72 - date_initial72;
      console.log(file_name_to_key_json72, time_of_promise_resolve72);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json72}`] = query.rows;
      await client.set(`${file_name_to_key_json72}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json72}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json72}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json72);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json72);
      }
    }
  },
};
