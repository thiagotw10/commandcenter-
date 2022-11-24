const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;

async () => {
  await client.connect();
};

let sql2 = fs.readFileSync(__dirname + "/sql/total_beds.sql", "utf8");
let file_name2 = path.basename(__dirname + "/sql/total_beds.sql");
file_name_to_key_json2 = file_name2.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });

    try {
      const date_initial2 = Date.now();
      let query = await connection.execute(`${sql2.toString()}`);
      const date_final2 = Date.now();
      time_of_promise_resolve2 = date_final2 - date_initial2;
      console.log(file_name_to_key_json2, time_of_promise_resolve2);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json2}`] = query.rows;
      await client.set(`${file_name_to_key_json2}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json2}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json2}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json2);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json2);
      }
    }
  },
};
