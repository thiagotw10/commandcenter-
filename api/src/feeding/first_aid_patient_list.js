const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql68 = fs.readFileSync(
  __dirname + "/sql/first_aid_patient_list.sql",
  "utf8"
);
const file_name68 = path.basename(
  __dirname + "/sql/first_aid_patient_list.sql"
);
file_name_to_key_json68 = file_name68.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial68 = Date.now();
      let query = await connection.execute(`${sql68.toString()}`);
      const date_final68 = Date.now();
      time_of_promise_resolve68 = date_final68 - date_initial68;
      console.log(file_name_to_key_json68, time_of_promise_resolve68);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json68}`] = query.rows;
      await client.set(`${file_name_to_key_json68}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json68}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json68}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json68);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json68);
      }
    }
  },
};
