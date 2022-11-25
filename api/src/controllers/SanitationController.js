process.env.ORA_SDTZ = "UTC";
const client = require('../config/redisconfig')
module.exports = {
  async sanitation_beds(req, res) {
    try {
      const result2 = await client.get("sanitation_beds");
      return res.json(JSON.parse(result2))
    } catch (error) {
      console.log(error)
      return res.send(error)
    }
  }
}



//+-----------------------------------------------------------\\
