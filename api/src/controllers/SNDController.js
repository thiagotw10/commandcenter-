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
  async room_100(req, res) {
    const page = Number.parseInt(req.query.page) || 1;
    const limitItens = Number.parseInt(req.query.limitItens) || 1;

    try {
      const result = JSON.parse(await client.get("room_100"));
      const { room_100 } = result;

      const colors = [
        { desc: "VERDE", color: "#99FF4A" },
        { desc: "AMARELA", color: "#F2FF5D" },
        { desc: "AMARELO", color: "#F2FF5D" },
        { desc: "VERMELHA", color: "#FF4C4C" },
        { desc: "BRANCO", color: "#FFF" },
      ];

      room_100.forEach((room) => {
        colors.forEach((color) => {
          if (room.MEDICAMENTO === color.desc) {
            room.COR_MEDICAMENTO = color.color;
          }

          if (room.LABORATORIO_STATUS === color.desc) {
            room.COR_LABORATORIO = color.color;
          }

          if (room.IMAGEM === color.desc) {
            room.COR_IMAGEM = color.color;
          }
        });
      });

      result.room_100 = paginator(room_100, page, limitItens);

      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async allergy_alert(req, res) {
    const page = Number.parseInt(req.query.page) || 1;
    const limitItens = Number.parseInt(req.query.limitItens) || 1;

    try {
      const result = JSON.parse(await client.get("allergy_alert"));
      const { allergy_alert } = result;

      let previous_allergy;
      const allergies = [];

      allergy_alert.forEach((allergy, i) => {
        allergy.QTD_ALLERGY = 0;

        if (i === 0) {
          previous_allergy = allergy;
          allergies.push(allergy);
        } else if (previous_allergy.CD_ATENDIMENTO === allergy.CD_ATENDIMENTO) {
          allergies[i - 1].QTD_ALLERGY += 1;
          previous_allergy = allergy;
        } else {
          allergies.push(allergy);
        }
      });

      result.allergy_alert = {
        total_itens: allergies.length,
        ...paginator(allergies, page, limitItens)
      }
      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async absence_prescription(req, res) {
    const page = Number.parseInt(req.query.page) || 1;
    const limitItens = Number.parseInt(req.query.limitItens) || 1;

    try {
      const result = JSON.parse(await client.get("absence_prescription"));
      const { absence_prescription } = result;

      result.absence_prescription = {
        total_itens: absence_prescription.length,
        ...paginator(absence_prescription, page, limitItens)
      }
      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async diet_change(req, res) {
    const page = Number.parseInt(req.query.page) || 1;
    const limitItens = Number.parseInt(req.query.limitItens) || 1;

    try {
      const result = JSON.parse(await client.get("diet_change"));
      const { diet_change } = result;

      result.diet_change = {
        total_itens: diet_change.length,
        ...paginator(diet_change, page, limitItens)
      }
      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async fasting_patients(req, res) {
    const page = Number.parseInt(req.query.page) || 1;
    const limitItens = Number.parseInt(req.query.limitItens) || 1;

    try {
      const result = JSON.parse(await client.get("fasting_patients"));
      const { fasting_patients } = result;

      result.fasting_patients = {
        total_itens: fasting_patients.length,
        ...paginator(fasting_patients, page, limitItens)
      }
      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async internal_transfers(req, res) {
    const page = Number.parseInt(req.query.page) || 1;
    const limitItens = Number.parseInt(req.query.limitItens) || 1;

    try {
      const result = JSON.parse(await client.get("internal_transfers"));
      const { internal_transfers } = result;

      result.internal_transfers = {
        total_itens: internal_transfers.length,
        ...paginator(internal_transfers, page, limitItens)
      }
      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async nutritional_evolution(req, res) {
    const page = Number.parseInt(req.query.page) || 1;
    const limitItens = Number.parseInt(req.query.limitItens) || 1;

    try {
      const result = JSON.parse(await client.get("nutritional_evolution"));
      const { nutritional_evolution } = result;

      result.nutritional_evolution = {
        total_itens: nutritional_evolution.length,
        ...paginator(nutritional_evolution, page, limitItens)
      }
      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async anthropometric_evaluation(req, res) {
    const page = Number.parseInt(req.query.page) || 1;
    const limitItens = Number.parseInt(req.query.limitItens) || 1;

    try {
      const result = JSON.parse(await client.get("anthropometric_evaluation"));
      const { anthropometric_evaluation } = result;

      result.anthropometric_evaluation = {
        total_itens: anthropometric_evaluation.length,
        ...paginator(anthropometric_evaluation, page, limitItens)
      }
      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async screening_not_performed(req, res) {
    const page = Number.parseInt(req.query.page) || 1;
    const limitItens = Number.parseInt(req.query.limitItens) || 1;

    try {
      const result = JSON.parse(await client.get("screening_not_performed"));
      const { screening_not_performed } = result;

      result.screening_not_performed = {
        total_itens: screening_not_performed.length,
        ...paginator(screening_not_performed, page, limitItens)
      }
      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async hospitalization_panel(req, res) {
    const unit = req.query.unit;
    const page = Number.parseInt(req.query.page) || 1;
    const limitItens = Number.parseInt(req.query.limitItens) || 1;

    try {
      const result = JSON.parse(await client.get("hospitalization_panel"));
      const { hospitalization_panel } = result;

      if (!!unit) {
        const filteredInternations = hospitalization_panel.filter((internation) => internation.DS_UNID_INT === unit);
        result.hospitalization_panel = paginator(filteredInternations, page, limitItens);
      } else {
        result.hospitalization_panel = paginator(hospitalization_panel, page, limitItens);
      }

      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
};
