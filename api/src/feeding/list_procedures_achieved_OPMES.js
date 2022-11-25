const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql104 = fs.readFileSync(__dirname + "/sql/list_procedures_achieved_OPMES.sql", "utf8");
const file_name104 = path.basename(__dirname + "/sql/list_procedures_achieved_OPMES.sql");
file_name_to_key_json104 = file_name104.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial104 = Date.now();
      let query = await connection.execute(`${sql104.toString()}`);
      const date_final104 = Date.now();
      time_of_promise_resolve104 = date_final104 - date_initial104;
      console.log(file_name_to_key_json104, time_of_promise_resolve104);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json104}`] = query.rows;
      await client.set(`${file_name_to_key_json104}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json104}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json104}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json104);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json104);
      }
    }
  },
};
