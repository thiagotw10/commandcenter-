const redis = require('redis');
const client = redis.createClient();
client.connect();

client.on("error", (error) => {
    console.log('caiu aqui')
    console.error(error);
  });

module.exports = client