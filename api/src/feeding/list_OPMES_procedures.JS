const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql103 = fs.readFileSync(__dirname + "/sql/list_OPMES_procedures.sql", "utf8");
const file_name103 = path.basename(__dirname + "/sql/list_OPMES_procedures.sql");
file_name_to_key_json103 = file_name103.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial103 = Date.now();
      let query = await connection.execute(`${sql103.toString()}`);
      const date_final103 = Date.now();
      time_of_promise_resolve103 = date_final103 - date_initial103;
      console.log(file_name_to_key_json103, time_of_promise_resolve103);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json103}`] = query.rows;
      await client.set(`${file_name_to_key_json103}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json103}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json103}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json103);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json103);
      }
    }
  },
};
