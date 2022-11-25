process.env.ORA_SDTZ = "UTC";
const client = require('../config/redisconfig')

function paginator(array, page, limit) {
  const result = [];
  const totalPage = Math.ceil(array.length / limit);
  let count = page * limit - limit;
  const delimiter = count + limit;

  if (page <= totalPage) {
    for (let i = count; i < delimiter; i++) {
      if (array[i] != null) {
        result.push(array[i]);
      }
      count++;
    }
  }

  return {
    totalPage: totalPage,
    pageActual: page,
    result: result,
  };
}

module.exports = {
  async surgeries(req, res) {
    try {
      const result2 = await client.get("surgeries");
      return res.json(JSON.parse(result2));
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },

  async schedules_aborteds(req, res) {
    try {
      const result2 = await client.get("surgeries_schedules_aborteds");
      return res.json(JSON.parse(result2));
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },

  async unusual_or_major_surgeries_scheduled(req, res) {
    const filter = req.query.filter;
    const page = Number.parseInt(req.query.page) || 1;
    const limitItens = Number.parseInt(req.query.limitItens) || 1;

    try {
      const result = JSON.parse(await client.get("unusual_or_major_surgeries_scheduled"));

      if (!!filter) {
        const { unusual_or_major_surgeries_scheduled } = result;
        const filteredSurgerie = unusual_or_major_surgeries_scheduled.filter((surgerie) => {
          return surgerie.TIPO === filter;
        });

        result.unusual_or_major_surgeries_scheduled = {
          total_itens: filteredSurgerie.length,
          ...paginator(filteredSurgerie, page, limitItens)
        }
      }

      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
}