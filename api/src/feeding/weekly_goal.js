const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const fs = require("fs");
const client = require("../config/redisconfig");
const path = require("path");
const redis = require("redis");
const FeedingToRedis = require("./functionFeedingRedis").function;
const sql46 = fs.readFileSync(__dirname + "/sql/weekly_goal.sql", "utf8");
const sqlProcedure2 = fs.readFileSync(
  __dirname + "/sql/tscm_proc_atualiza_metas.sql",
  "utf8"
);
const file_name46 = path.basename(__dirname + "/sql/weekly_goal.sql");
file_name_to_key_json46 = file_name46.split(".")[0];

module.exports = {
  async run(connection) {
    now = new Date().toLocaleString("pt-br", {
      timeZone: "America/Recife",
    });
    const day = Number(now.split("/")[0])

    if (day >= 1 && day <= 7) {
      let week_goal1 = JSON.parse(await client.get("weekly_goal")).weekly_goal;
      week_goal1.forEach(e => {
        if (e.SEMANA == '1') {
          client.set("week1", String(e.PERCENTUAL_ATENDIDO));
        }
      })
    } else if (day >= 8 && day <= 14) {
      let week_goal2 = JSON.parse(await client.get("weekly_goal")).weekly_goal;
      week_goal2.forEach(e => {
        if (e.SEMANA == '2') {
          client.set("week2", String(e.PERCENTUAL_ATENDIDO));
        }
      })
    } else if (day >= 15 && day <= 21) {
      let week_goal3 = JSON.parse(await client.get("weekly_goal")).weekly_goal;
      week_goal3.forEach(e => {
        if (e.SEMANA == '3') {
          client.set("week3", String(e.PERCENTUAL_ATENDIDO));
        }
      })
    } else if (day >= 2 && day <= 28) {
      let week_goal4 = JSON.parse(await client.get("weekly_goal")).weekly_goal;
      week_goal4.forEach((e) => {
        if (e.SEMANA == "4") {
          client.set("week4", String(e.PERCENTUAL_ATENDIDO));
        }
      });
    } else if (day > 28) {
      let week_goal5 = JSON.parse(await client.get("weekly_goal")).weekly_goal;
      week_goal5.forEach((e) => {
        if (e.SEMANA == "5") {
          client.set("week5", String(e.PERCENTUAL_ATENDIDO));
        }
      });
    } else {
      client.set("week1", JSON.stringify(null));
      client.set("week2", JSON.stringify(null));
      client.set("week3", JSON.stringify(null));
      client.set("week4", JSON.stringify(null));
      client.set("week5", JSON.stringify(null));
    }

    try {
      const date_initial46 = Date.now();
      await connection.execute(`${sqlProcedure2.toString()}`);
      let query = await connection.execute(`${sql46.toString()}`);
      const date_final46 = Date.now();
      time_of_promise_resolve46 = date_final46 - date_initial46;
      console.log(file_name_to_key_json46, time_of_promise_resolve46);
      let result = {
        active: true,
        last_update: now,
      };
      result[`${file_name_to_key_json46}`] = query.rows;
      await client.set(`${file_name_to_key_json46}`, JSON.stringify(result));
      return true;
    } catch (error) {
      try {
        let result = await client.get(`${file_name_to_key_json46}`);
        result = JSON.parse(result);
        result.active = false;
        await client.set(`${file_name_to_key_json46}`, JSON.stringify(result));
        console.log(error);
        console.log("db error: " + file_name_to_key_json46);
        return true;
      } catch (error) {
        console.log("no set: " + file_name_to_key_json46);
      }
    }
  },
};
