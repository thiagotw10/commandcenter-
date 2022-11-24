const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql65 = fs.readFileSync(
  __dirname + "/sql/quantity_items_validity_control_standard_abc.sql",
  "utf8"
);
const file_name65 = path.basename(
  __dirname + "/sql/quantity_items_validity_control_standard_abc.sql"
);
file_name_to_key_json65 = file_name65.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial65 = Date.now();
      let query = await connection.execute(`${sql65.toString()}`);
      const date_final65 = Date.now();
      time_of_promise_resolve65 = date_final65 - date_initial65;
      console.log(file_name_to_key_json65, time_of_promise_resolve65);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json65}`] = query.rows;
      await client.set(`${file_name_to_key_json65}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json65}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json65}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json65);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json65);
      }
    }
  },
};
