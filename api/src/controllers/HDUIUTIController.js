process.env.ORA_SDTZ = "UTC";
const client = require("../config/redisconfig");

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
  async hd_ui_uti_per_unit(req, res) {
    const unit = req.query.unit;
    const page = Number.parseInt(req.query.page) || 1;
    const limitItens = Number.parseInt(req.query.limitItens) || 1;

    const colors = [
      { color: "#FFFFFF", title: "VAGO" },
      { color: "#D62F2F", title: "OCUPADO" },
      { color: "#D09600", title: "ALTA_ADMIN" },
      { color: "#119683", title: "RESERVADO" },
      { color: "#7C7C7C", title: "ALTA_MEDICA" },
      { color: "#7C7C7C", title: "ALTA MEDICA" },
      { color: "#165590", title: "HIGIENIZACAO" },
      { color: "#65A42B", title: "MANUTENCAO" },
      { color: "#74603B", title: "INTERD. TEMP." },
    ];

    try {
      const resultBeds = JSON.parse(await client.get("hd_ui_uti_per_unit"));

      if (unit == "all") {
        const resultUnits = JSON.parse(await client.get("hd_ui_uti_units"));
        return res.json(resultUnits);
      }

      if (!!unit && resultBeds) {
        const filteredBeds = []
        let previous = null;
        let index = 0;

        resultBeds.hd_ui_uti_per_unit.forEach((bedsPerUnit) => {

          if (bedsPerUnit.DS_UNID_INT === unit) {
            colors.forEach((status) => {
              if (bedsPerUnit.SITUACAO === status.title) {
                bedsPerUnit.color = status.color;
              }
            });

            if (bedsPerUnit.DS_RESUMO === previous?.DS_RESUMO) {
              if (bedsPerUnit.STATUS_PRESCRICAO === "PRIMEIRA PRESCRICAO") {
                bedsPerUnit.STATUS_PRESCRICAO_2 = previous.STATUS_PRESCRICAO;
                bedsPerUnit.STATUS_COR_2 = previous.STATUS_COR;
                index -= 1;
                filteredBeds.splice(index, 1);
              } else if (bedsPerUnit.STATUS_PRESCRICAO === "OUTRAS") {
                bedsPerUnit.STATUS_PRESCRICAO = previous.STATUS_PRESCRICAO;
                bedsPerUnit.STATUS_COR = previous.STATUS_COR;
                bedsPerUnit.STATUS_PRESCRICAO_2 = bedsPerUnit.STATUS_PRESCRICAO;
                bedsPerUnit.STATUS_COR_2 = bedsPerUnit.STATUS_COR;
                index -= 1;
                filteredBeds.splice(index, 1);
              } else {
                index -= 1;
                filteredBeds.splice(index, 1);
              }
            }

            if (previous === null || bedsPerUnit.DS_RESUMO !== previous?.DS_RESUMO) {
              previous = bedsPerUnit;
              bedsPerUnit.STATUS_PRESCRICAO_2 = null;
              bedsPerUnit.STATUS_COR_2 = null;
            }


            filteredBeds.push(bedsPerUnit);
            index++;
          }
        });

        const paginatedBeds = paginator(filteredBeds, page, limitItens);
        resultBeds.hd_ui_uti_per_unit = paginatedBeds;

        return res.json(resultBeds);
      }

      return res.json(resultBeds);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async ui_need_for_vacancies(req, res) {
    try {
      const result = JSON.parse(await client.get("ui_need_for_vacancies"));
      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async ui_uti_internal_transfer(req, res) {
    try {
      const result = JSON.parse(await client.get("ui_uti_internal_transfer"));
      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async ui_uti_reason_for_discharge(req, res) {
    try {
      const result = JSON.parse(await client.get("ui_uti_reason_for_discharge"));
      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async ui_uti_source_and_destination_beds(req, res) {
    const page = Number.parseInt(req.query.page) || 1;
    const limitItens = Number.parseInt(req.query.limitItens) || 1;

    try {
      const result = JSON.parse(await client.get("ui_uti_source_and_destination_beds"));
      const { ui_uti_source_and_destination_beds } = result;
      result.ui_uti_source_and_destination_beds = paginator(ui_uti_source_and_destination_beds, page, limitItens);

      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async ui_uti_vacancies_requested_last_5_days(req, res) {
    try {
      const result = JSON.parse(await client.get("ui_uti_vacancies_requested_last_5_days"));
      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async ui_uti_vacant_and_occupied_beds(req, res) {
    try {
      const result = JSON.parse(await client.get("ui_uti_vacant_and_occupied_beds"));
      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async uti_need_for_vacancies(req, res) {
    try {
      const result = JSON.parse(await client.get("uti_need_for_vacancies"));
      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async vacancies_per_floor(req, res) {
    try {
      const result = JSON.parse(await client.get("vacancies_per_floor"));
      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
};