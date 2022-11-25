const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;

const sql37 = fs.readFileSync(
  __dirname + "/sql/total_number_of_medications_treated_in_the_month.sql",
  "utf8"
);
const file_name37 = path.basename(
  __dirname + "/sql/total_number_of_medications_treated_in_the_month.sql"
);
file_name_to_key_json37 = file_name37.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial37 = Date.now();
      let query = await connection.execute(`${sql37.toString()}`);
      const date_final37 = Date.now();
      time_of_promise_resolve37 = date_final37 - date_initial37;
      console.log(file_name_to_key_json37, time_of_promise_resolve37);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json37}`] = query.rows;
      await client.set(`${file_name_to_key_json37}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json37}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json37}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json37);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json37);
      }
    }
  },
};
