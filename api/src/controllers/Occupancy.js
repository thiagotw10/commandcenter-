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

module.exports = {
  async occupancy_per_unit(req, res) {
    const { unit, page, limitItens } = req.query;

    try {
      const occupancy_per_unit = JSON.parse(
        await client.get("occupancy_per_unit")
      );

      if (unit == "all") {
        const result = [];
        occupancy_per_unit.occupancy_per_unit.forEach((e) => {
          if (e.PERCENTAGEM_OCUPACAO.substr(0, 1) == ".") {
            e.PERCENTAGEM_OCUPACAO = "0" + e.PERCENTAGEM_OCUPACAO
          }
          result.push({
            unit: e.DS_UNID_INT,
            percentage: e.PERCENTAGEM_OCUPACAO,
          });
        });


        delete occupancy_per_unit.occupancy_per_unit;
        result.sort()

        let ordernation = []

        result.forEach(e => {
          if (e.unit.substr(0, 1) == "U") {
            ordernation.push(e)
          }
        })
        result.forEach(e => {
          if (e.unit.substr(0, 1) != "U") {
            ordernation.push(e)
          }
        })


        occupancy_per_unit.unities = ordernation;

        return res.json(occupancy_per_unit);
      }
      const { beds_situation } = JSON.parse(await client.get("beds_situation"));

      occupancy_per_unit.occupancy_per_unit.forEach((e) => {
        e.beds = [];
        beds_situation.forEach((t) => {
          colors.forEach(c => {
            if (c.title == t.SITUACAO) {
              t.color = c.color
            }
          })
          if (t.CD_UNIDADE == e.CD_UNID_INT) {
            e.beds.push(t);
          }
        });
      });

      if (unit != null) {
        const result = [];

        occupancy_per_unit.occupancy_per_unit.forEach((e) => {
          if (e.DS_UNID_INT == unit) {
            result.push(paginator(e.beds, parseInt(page), parseInt(limitItens)));
          }
        });
        delete occupancy_per_unit.occupancy_per_unit;
        occupancy_per_unit.beds = result;
        return res.json(occupancy_per_unit);
      }

      return res.json(occupancy_per_unit);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },

  async occupancy_per_specialty(req, res) {
    const { filters, unit, specialty, accommodation } = req.query
    try {
      let result = JSON.parse(await client.get("occupancy_per_specialty"));
      const unities = []
      const accommodations = []
      const specialties = []

      result.occupancy_per_specialty.forEach(e => {
        if (!unities.includes(e.DS_UNID_INT)) {
          unities.push(e.DS_UNID_INT)
        }
        if (!accommodations.includes(e.DS_TIP_ACOM)) {
          accommodations.push(e.DS_TIP_ACOM)
        }
        if (!specialties.includes(e.ESP) && e.ESP != null) {
          specialties.push(e.ESP)
        }
      })

      if (filters == "all") {
        result.filters = {
          unities: unities,
          accommodations: accommodations,
          specialties: specialties,
        }
        delete result.occupancy_per_specialty
        return res.json(result);
      } else if (unit || specialty || accommodation) {
        let resultQuery = []
        if (unit && specialty && accommodation) {
          result.occupancy_per_specialty.forEach(e => {
            if (e.DS_UNID_INT == unit && e.ESP == specialty && e.DS_TIP_ACOM == accommodation) {
              resultQuery.push(e)
            }
          })
          result.occupancy_per_specialty = resultQuery
          return res.json(result);
        } else if (unit && specialty) {
          result.occupancy_per_specialty.forEach(e => {
            if (e.DS_UNID_INT == unit && e.ESP == specialty) {
              resultQuery.push(e)
            }
          })
          result.occupancy_per_specialty = resultQuery
          return res.json(result);
        } else if (unit && accommodation) {
          result.occupancy_per_specialty.forEach(e => {
            if (e.DS_UNID_INT == unit && e.DS_TIP_ACOM == accommodation) {
              resultQuery.push(e)
            }
          })
          result.occupancy_per_specialty = resultQuery
          return res.json(result);
        } else if (specialty && accommodation) {
          result.occupancy_per_specialty.forEach(e => {
            if (e.ESP == specialty && e.DS_TIP_ACOM == accommodation) {
              resultQuery.push(e)
            }
          })
          result.occupancy_per_specialty = resultQuery
          return res.json(result);
        } else if (specialty) {
          result.occupancy_per_specialty.forEach(e => {
            if (e.ESP == specialty) {
              resultQuery.push(e)
            }
          })
          result.occupancy_per_specialty = resultQuery
          return res.json(result);
        } else if (unit) {
          result.occupancy_per_specialty.forEach(e => {
            if (e.DS_UNID_INT == unit) {
              resultQuery.push(e)
            }
          })
          result.occupancy_per_specialty = resultQuery
          return res.json(result);
        } else if (accommodation) {
          result.occupancy_per_specialty.forEach(e => {
            if (e.DS_TIP_ACOM == accommodation) {
              resultQuery.push(e)
            }
          })
          result.occupancy_per_specialty = resultQuery
          return res.json(result);
        }
      }

      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },

  async current_admissions(req, res) {
    try {
      const hospitalization_day_and_next_3_days_hd = JSON.parse(await client.get("hospitalization_next_3_days_hd"));
      const hospitalization_day_surgical_clinical = JSON.parse(await client.get("hospitalization_next_3_days_hd"));
      const hospitalization_next_3_days_surgical_clinical = JSON.parse(await client.get("surgical_clinical_next_3_days"));
      const total_day_surgical_clinical_plus_hospitalization_next_3_days = JSON.parse(await client.get("total_day_surgical_clinical_next_3_days"));

      let hospitalization_on_day_clinical = 0
      let hospitalization_on_day_surgerie = 0
      let hospitalization_on_day_hd = 0
      let hospitalization_on_day_normal = 0

      hospitalization_day_surgical_clinical.hospitalization_next_3_days_hd.forEach(e => {
        if (e.TIPO == "INTERNACOES DO DIA HD") {
          hospitalization_on_day_hd += e.QTD
        }
      })

      total_day_surgical_clinical_plus_hospitalization_next_3_days.total_day_surgical_clinical_next_3_days.forEach(e => {
        if (e.TIPO == "INTERNACOES DO DIA") {
          if (e.TIPO_INTERNACAO == "CIRURGIA") {
            hospitalization_on_day_surgerie = hospitalization_on_day_surgerie + e.QUANT
          }
          else if (e.TIPO_INTERNACAO == "CLINICA") {
            hospitalization_on_day_clinical = hospitalization_on_day_clinical + e.QUANT
          }
          hospitalization_on_day_normal += e.QUANT
        }
      })


      const result = {
        active: hospitalization_day_and_next_3_days_hd.active,
        last_update: hospitalization_day_and_next_3_days_hd.last_update,
        results: {
          hospitalization_day_and_next_3_days_hd: hospitalization_day_and_next_3_days_hd.hospitalization_next_3_days_hd,
          hospitalization_on_day_clinical: hospitalization_on_day_clinical,
          hospitalization_on_day_surgerie: hospitalization_on_day_surgerie,
          hospitalization_on_day_hd: hospitalization_on_day_hd,
          hospitalization_on_day_total: hospitalization_on_day_normal,
          hospitalization_on_day_normal: hospitalization_on_day_clinical + hospitalization_on_day_surgerie - hospitalization_on_day_hd,
        }
      }

      return res.json(result)
    } catch (error) {
      console.log(error)
      return res.send(error)
    }
  }
};

//+-----------------------------------------------------------\\
