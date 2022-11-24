const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;

const sql33 = fs.readFileSync(
  __dirname + "/sql/pharmaceutical_evolution.sql",
  "utf8"
);
const file_name33 = path.basename(
  __dirname + "/sql/pharmaceutical_evolution.sql"
);
file_name_to_key_json33 = file_name33.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial33 = Date.now();
      let query = await connection.execute(`${sql33.toString()}`);
      const date_final33 = Date.now();
      time_of_promise_resolve33 = date_final33 - date_initial33;
      console.log(file_name_to_key_json33, time_of_promise_resolve33);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json33}`] = query.rows;
      await client.set(`${file_name_to_key_json33}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json33}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json33}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json33);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json33);
      }
    }
  },
};
