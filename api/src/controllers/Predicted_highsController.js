process.env.ORA_SDTZ = "UTC";
const client = require('../config/redisconfig')
module.exports = {
  async query(req, res) {
    try {
      const result2 = await client.get("predicted_highs");
      return res.json(JSON.parse(result2))
    } catch (error) {
      console.log(error)
      return res.send(error)
    }
  },
  async managment_high_previous(req, res) {
    try {
      const result2 = await client.get("managment_high_previous");
      return res.json(JSON.parse(result2))
    } catch (error) {
      console.log(error)
      return res.send(error)
    }
  },

  async default (req, res) {
    return res.send('helolo word')
  }
}



//+-----------------------------------------------------------\\
