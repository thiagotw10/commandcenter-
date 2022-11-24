process.env.ORA_SDTZ = "UTC";
const client = require('../config/redisconfig')

module.exports = {
  async on_day_and_previous(req, res) {
    try {
      const result2 = await client.get("internments_on_day_and_previous");
      return res.json(JSON.parse(result2))
    } catch (error) {
      console.log(error)
      return res.send(error)
    }
  },
  
  async default (req, res) {
    return res.send('helolo word')
  },
  
  async hospitalization_ui_uti (req, res){
    try {
      const result2 = JSON.parse(await client.get("hospitalization_ui_uti"));
      return res.json(result2)
    } catch (error) {
      console.log(error)
      return res.send(error)
    }

  }
}



//+-----------------------------------------------------------\\
