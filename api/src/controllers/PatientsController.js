process.env.ORA_SDTZ = "UTC";
const client = require('../config/redisconfig')

module.exports = {
  async total_operated(req, res) {
    try {
      const result2 = await client.get("operated_patients");
      return res.json(JSON.parse(result2))
    } catch (error) {
      console.log(error)
      return res.send(error)
    }
  },

  async managment_high_previous_upp(req, res){
    try {
      const result =  JSON.parse(await client.get("managment_high_previous_upp"))
      return res.json(result)
    } catch (error) {
      console.log(error)
      return res.status(500).send(error)
    }
  }
}



//+-----------------------------------------------------------\\
