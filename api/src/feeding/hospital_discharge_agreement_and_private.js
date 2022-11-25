const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;

const sql31 = fs.readFileSync(
  __dirname + "/sql/hospital_discharge_agreement_and_private.sql",
  "utf8"
);
const file_name31 = path.basename(
  __dirname + "/sql/hospital_discharge_agreement_and_private.sql"
);
file_name_to_key_json31 = file_name31.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial31 = Date.now();
      let query = await connection.execute(`${sql31.toString()}`);
      const date_final31 = Date.now();
      time_of_promise_resolve31 = date_final31 - date_initial31;
      console.log(file_name_to_key_json31, time_of_promise_resolve31);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json31}`] = query.rows;
      await client.set(`${file_name_to_key_json31}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json31}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json31}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json31);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json31);
      }
    }
  },
};
