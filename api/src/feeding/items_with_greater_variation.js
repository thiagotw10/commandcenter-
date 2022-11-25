const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql99 = fs.readFileSync(__dirname + "/sql/items_with_greater_variation.sql", "utf8");
const file_name99 = path.basename(__dirname + "/sql/items_with_greater_variation.sql");
file_name_to_key_json99 = file_name99.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial99 = Date.now();
      let query = await connection.execute(`${sql99.toString()}`);
      const date_final99 = Date.now();
      time_of_promise_resolve99 = date_final99 - date_initial99;
      console.log(file_name_to_key_json99, time_of_promise_resolve99);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json99}`] = query.rows;
      await client.set(`${file_name_to_key_json99}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json99}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json99}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json99);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json99);
      }
    }
  },
};
