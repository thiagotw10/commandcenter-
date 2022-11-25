const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;

const sql39 = fs.readFileSync(
  __dirname + "/sql/patients_without_issuance_of_reconciliation.sql",
  "utf8"
);
const file_name39 = path.basename(
  __dirname + "/sql/patients_without_issuance_of_reconciliation.sql"
);
file_name_to_key_json39 = file_name39.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial39 = Date.now();
      let query = await connection.execute(`${sql39.toString()}`);
      const date_final39 = Date.now();
      time_of_promise_resolve39 = date_final39 - date_initial39;
      console.log(file_name_to_key_json39, time_of_promise_resolve39);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json39}`] = query.rows;
      await client.set(`${file_name_to_key_json39}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json39}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json39}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json39);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json39);
      }
    }
  },
};
