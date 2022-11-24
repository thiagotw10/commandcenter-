const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql47 = fs.readFileSync(
  __dirname + "/sql/authorized_purchase_order.sql",
  "utf8"
);
const file_name47 = path.basename(
  __dirname + "/sql/authorized_purchase_order.sql"
);
file_name_to_key_json47 = file_name47.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial47 = Date.now();
      let query = await connection.execute(`${sql47.toString()}`);
      const date_final47 = Date.now();
      time_of_promise_resolve47 = date_final47 - date_initial47;
      console.log(file_name_to_key_json47, time_of_promise_resolve47);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json47}`] = query.rows;
      await client.set(`${file_name_to_key_json47}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json47}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json47}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json47);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json47);
      }
    }
  },
};
