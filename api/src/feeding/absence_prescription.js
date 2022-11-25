const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql92 = fs.readFileSync(__dirname + "/sql/absence_prescription.sql", "utf8");
const file_name92 = path.basename(__dirname + "/sql/absence_prescription.sql");
file_name_to_key_json92 = file_name92.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial92 = Date.now();
      let query = await connection.execute(`${sql92.toString()}`);
      const date_final92 = Date.now();
      time_of_promise_resolve92 = date_final92 - date_initial92;
      console.log(file_name_to_key_json92, time_of_promise_resolve92);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json92}`] = query.rows;
      await client.set(`${file_name_to_key_json92}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json92}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json92}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json92);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json92);
      }
    }
  },
};
