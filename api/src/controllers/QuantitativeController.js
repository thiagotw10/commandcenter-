process.env.ORA_SDTZ = "UTC";
const client = require('../config/redisconfig')

function organize(in_array){
    let result = in_array
  let sectors1 = []
  result.forEach(e=>{
    sectors1.push(e.DS_UNID_INT)
  })
  const sectors = [...new Set(sectors1)];
  
  const result_final = []
  
  
  sectors.forEach(e=>{
    result_final.push({"sector": e, "beds": []})
  })
  
  result_final.forEach(async e=>{
    await result.forEach(async r=>{
      if(e.sector == r.DS_UNID_INT){
        await e.beds.push(r)
      }
    })
  })
  
var array = []
  
  result_final.forEach( c=>{
    array.push(c)
  })
return array
}

module.exports = {
  async quantitative(req, res) {
    try {
      const result2 = await client.get("quantitative");
      return res.json(JSON.parse(result2))
    } catch (error) {
      console.log(error)
      return res.send(error)
    }
  }
}



//+-----------------------------------------------------------\\
