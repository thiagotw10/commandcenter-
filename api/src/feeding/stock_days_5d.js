const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql101 = fs.readFileSync(__dirname + "/sql/stock_days_5d.sql", "utf8");
const file_name101 = path.basename(__dirname + "/sql/stock_days_5d.sql");
file_name_to_key_json101 = file_name101.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial101 = Date.now();
      let query = await connection.execute(`${sql101.toString()}`);
      const date_final101 = Date.now();
      time_of_promise_resolve101 = date_final101 - date_initial101;
      console.log(file_name_to_key_json101, time_of_promise_resolve101);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json101}`] = query.rows;
      await client.set(`${file_name_to_key_json101}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json101}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json101}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json101);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json101);
      }
    }
  },
};
