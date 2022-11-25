const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql74 = fs.readFileSync(
  __dirname + "/sql/first_aid_super_road.sql",
  "utf8"
);
const file_name74 = path.basename(__dirname + "/sql/first_aid_super_road.sql");
file_name_to_key_json74 = file_name74.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial74 = Date.now();
      let query = await connection.execute(`${sql74.toString()}`);
      const date_final74 = Date.now();
      time_of_promise_resolve74 = date_final74 - date_initial74;
      console.log(file_name_to_key_json74, time_of_promise_resolve74);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json74}`] = query.rows;
      await client.set(`${file_name_to_key_json74}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json74}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json74}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json74);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json74);
      }
    }
  },
};
