process.env.ORA_SDTZ = "UTC";
const client = require("../config/redisconfig");

function paginator(array, page, limit) {
  let result = [];
  let totalPage = Math.ceil(array.length / limit);
  let count = page * limit - limit;
  let delimiter = count + limit;
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
    limitItens: limit,
    result: result,
  };
}

module.exports = {
  async show(req, res) {
    try {
      const result2 = await client.get("full_occupancy");
      return res.json(JSON.parse(result2));
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },

  async total(req, res) {
    try {
      const result = await client.get("total_beds");
      return res.json(JSON.parse(result));
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },

  async quantitative_situations(req, res) {
    try {
      const result = await client.get("quantitative_situations");
      return res.json(JSON.parse(result));
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },

  async percent(req, res) {
    try {
      const result2 = await client.get("total_beds_percent");
      return res.json(JSON.parse(result2));
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },

  async total_beds_percent_general(req, res) {
    try {
      const result2 = await client.get("total_beds_percent_general");
      return res.json(JSON.parse(result2));
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },

  async beds_panel(req, res) {
    try {
      let result2 = JSON.parse(await client.get("beds"));
      const beds = result2.beds;
      const sector = req.query.sector;
      const page = parseInt(req.query.page) || 1;
      const limitItens = parseInt(req.query.limitItens) || 1;

      if (sector) {
        let sectors = [];
        beds.forEach((e) => {
          sectors.push(e.DS_UNID_INT);
        });
        sectors = [...new Set(sectors)];
        if (sector == "all") {
          result2.beds = sectors;
          return res.send(result2);
        }
        if (sectors.includes(sector)) {
          var result_sector = [];
          result2.beds.forEach((e) => {
            if (e.DS_UNID_INT == sector) {
              result_sector.push(e);
            }
          });
          result2.beds = paginator(result_sector, page, limitItens);
          return res.send(result2);
        }
      }
      return res.json(result2);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },

  async default(req, res) {
    return res.send("helolo word");
  },

  async situation(req, res) {
    const situations = [
      { name: "VAGO", color: "FFFFFF" },
      { name: "ALTA MEDICA", color: "C6C6C6" },
      { name: "ALTA HOSPITALAR", color: "D09600" },
      { name: "OCUPADO", color: "D15E63" },
      { name: "INFECCAO", color: "EFE36D" },
      { name: "RESERVADO", color: "648F86" },
      { name: "ACOMPA.", color: "F1D7D4" },
      { name: "REFORMA", color: "F8A8A6" },
      { name: "MANUTENCAO", color: "9CC476" },
      { name: "INTERDICAO", color: "595959" },
      { name: "INTERD. INFEC.", color: "CAA465" },
      { name: "INTERD. TEMP.", color: "74603B" },
      { name: "INF. ALTA MEDICA", color: "EFF8C7" },
    ];

    const page = parseInt(req.query.page);
    const limitItens = parseInt(req.query.limitItens);
    const quantitative = Boolean(req.query.quantitative);
    let order = [
      { name: "VAGO", qtde: 0 },
      { name: "ALTA MEDICA", qtde: 0 },
      { name: "ALTA HOSPITALAR", qtde: 0 },
      { name: "OCUPADO", qtde: 0 },
      { name: "INFECCAO", qtde: 0 },
      { name: "RESERVADO", qtde: 0 },
      { name: "ACOMPA.", qtde: 0 },
      { name: "REFORMA", qtde: 0 },
      { name: "MANUTENCAO", qtde: 0 },
      { name: "INTERDICAO", qtde: 0 },
      { name: "INTERD. INFEC.", qtde: 0 },
      { name: "INTERD. TEMP.", qtde: 0 },
      { name: "INF. ALTA MEDICA", qtde: 0 },
      { name: "HIGIENIZACAO", qtde: 0 },
    ];
    try {
      const result2 = JSON.parse(await client.get("beds_situation"));
      situations.forEach((e) => {
        result2.beds_situation.forEach((i) => {
          if (e.name == i.SITUACAO) {
            i.color = e.color;
            // order.push(i);
          } else if (
            e.name == "INTERD. TEMP." &&
            i.SITUACAO == "INTERD TEMPORARIAMENTE"
          ) {
            i.color == e.color
          }
        });
        if (e.SITUACAO == "ALTA MEDICA") {
          e.color = "C6C6C6"
        }
      });

      order.forEach(t => {
        result2.beds_situation.forEach(u => {
          if (u.SITUACAO === t.name) {
            t.qtde = t.qtde + 1;
          } else if (u.SITUACAO == "INTERD TEMPORARIAMENTE" && t.name == "INTERD. TEMP.") {
            t.qtde++
          }
        });
      });

      if (quantitative) {
        result2.beds_situation = order
      }

      if (page && limitItens) {
        result2.beds_situation = paginator(
          result2.beds_situation,
          page,
          limitItens
        );
      }
      return res.json(result2);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },

  async total_beds_percent_unit(req, res) {
    try {
      const result = JSON.parse(await client.get("total_beds_percent_unit"));
      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  }
};

//+-----------------------------------------------------------\\
