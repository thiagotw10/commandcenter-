const client = require("../config/redisconfig");
const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

// let connection;

// (async () => {
//   connection = await oracledb.getConnection();
//   console.log(connection);
// })()
// const errorLog = require("../logs/utilsLogs").errorlog;
// const successlog = require("../logs/utilsLogs").successlog;

async function FeedingToRedis(queryName, queryContent, connection) {
  // console.log(connection);
  // setTimeout(async () => {
  let infinityCount = 1;
  let count = 0;

  while (count < infinityCount) {
  // let connection;
  // if (user == "mv.ajunior") {
  //   connection = await oracledb.getConnection({
  //     user: "mv.ajunior",
  //     password: "Sabara!2021",
  //     connectString: "srv-odax8-scan.sabara.local:1521/trnmv",
  //   });
  // }
  // console.log(connection);
  // const connection = await oracledb.getConnection();

  const date_initial = Date.now();
  now = new Date().toLocaleString("pt-br", {
    timeZone: "America/Recife",
  });
  try {
    const query = await connection.execute(`${queryContent}`);
    // await connection.close();
    const result = {
      active: true,
      last_update: now,
    };
    result[`${queryName}`] = query.rows;
    await client.set(`${queryName}`, JSON.stringify(result));
    // console.log(queryName, now);
    count++;
    infinityCount++;
    // successlog.info(`Success Message: ${queryName}, `);

    const date_final = Date.now();
    time_of_promise_resolve = date_final - date_initial;
    console.log(queryName, time_of_promise_resolve);
    // const promise = new Promise( (setTimeout(() => { console.log(time_of_promise_resolve); return true }, 3000))())
    // await promise()
    // setTimeout(async () => {console.log(time_of_promise_resolve);}, 3000);
    return true;
  } catch (error) {
    try {
      console.log(queryName, error);
      let result = await client.get(`${queryName}`);
      result = JSON.parse(result);
      result.active = false;
      await client.set(`${queryName}`, JSON.stringify(result));
      const date_final = Date.now();
      time_of_promise_resolve = date_final - date_initial;
      count++;
      infinityCount++;
      return true;
    } catch (error) {
      //   errorLog.error(`Error Message : ${error}`);
      const date_final = Date.now();
      time_of_promise_resolve = date_final - date_initial;
      count++;
      infinityCount++;
    }
  }
  }
  // }, 10000);

  // successlog.info(`Success Message and variables: ${variable}`);
  // errorLog.error(`Error Message : ${error}`);
}

module.exports = {
  function: FeedingToRedis,
};
