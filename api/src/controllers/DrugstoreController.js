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

function calcPercent(small, larger) {
  if (small > 0) {
    return Math.round(((small / larger) * 100));
  } else {
    return 0;
  }
}

module.exports = {
  async medication_not_delivered_on_time(req, res) {
    try {
      const result = JSON.parse(
        await client.get("medication_not_delivered_on_time")
      );
      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async medication_delivered_and_not_delivered(req, res) {
    try {
      const result = JSON.parse(
        await client.get("medication_delivered_and_not_delivered")
      );
      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async total_emergency_request_central_pharmacy(req, res) {
    try {
      const result = JSON.parse(
        await client.get("total_emergency_request_central_pharmacy")
      );
      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async total_single_request_central_pharmacy(req, res) {
    try {
      const result = JSON.parse(
        await client.get("total_single_request_central_pharmacy")
      );
      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async emergency_request_central_pharmacy(req, res) {
    const page = Number.parseInt(req.query.page);
    const limitItens = Number.parseInt(req.query.limitItens) || 1;

    try {
      const result = JSON.parse(
        await client.get("emergency_request_central_pharmacy")
      );
      const { emergency_request_central_pharmacy } = result;

      const colors = [
        { name: "VERMELHO", color: "#FA7675" },
        { name: "AMARELO", color: "#FCF951" },
      ];

      const attendances = emergency_request_central_pharmacy.map(
        (attendance) => {
          colors.forEach(({ name, color }) => {
            if (attendance.COR === name) {
              attendance.COLOR = color;
            }
          });

          return attendance;
        }
      );

      if (!!page) {
        result.emergency_request_central_pharmacy = paginator(
          attendances,
          page,
          limitItens
        );
      } else {
        result.emergency_request_central_pharmacy = attendances;
      }

      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async hospital_discharge_agreement_and_private(req, res) {
    const page = Number.parseInt(req.query.page);
    const limitItens = Number.parseInt(req.query.limitItens) || 1;

    try {
      const result = JSON.parse(
        await client.get("hospital_discharge_agreement_and_private")
      );
      const { hospital_discharge_agreement_and_private } = result;

      const colors = [
        { name: "CONVENIO", color: "#1DFFF1" },
        { name: "PARTICULAR", color: "#60FF52" },
      ];

      const hospitalDischarge = hospital_discharge_agreement_and_private.map(
        (hospital) => {
          colors.forEach(({ name, color }) => {
            if (hospital.TIPO === name) {
              hospital.COLOR = color;
            }
          });

          return hospital;
        }
      );

      const total_hospitalizations =
        hospital_discharge_agreement_and_private.length;
      let private = 0;
      let health_insurance = 0;

      hospital_discharge_agreement_and_private.forEach(({ TIPO }) => {
        if (TIPO === "CONVENIO") {
          health_insurance++;
        } else if (TIPO === "PARTICULAR") {
          private++;
        }
      });

      const private_percent = calcPercent(private, total_hospitalizations);
      const health_insurance_percent = calcPercent(
        health_insurance,
        total_hospitalizations
      );

      if (!!page) {
        result.hospital_discharge_agreement_and_private = {
          total_hospitalizations,
          private,
          private_percent,
          health_insurance,
          health_insurance_percent,
          ...paginator(hospitalDischarge, page, limitItens),
        };
      } else {
        result.hospital_discharge_agreement_and_private = {
          total_hospitalizations,
          private,
          private_percent,
          health_insurance,
          health_insurance_percent,
          result: hospitalDischarge,
        };
      }

      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async pharmaceutical_evolution(req, res) {
    const page = Number.parseInt(req.query.page);
    const limitItens = Number.parseInt(req.query.limitItens) || 1;

    try {
      const result = JSON.parse(await client.get("pharmaceutical_evolution"));
      const { pharmaceutical_evolution } = result;
      const total_pharmaceutical = pharmaceutical_evolution.length;

      if (!!page) {
        result.pharmaceutical_evolution = {
          total_pharmaceutical,
          ...paginator(pharmaceutical_evolution, page, limitItens),
        };
      } else {
        result.pharmaceutical_evolution = {
          total_pharmaceutical,
          result: pharmaceutical_evolution,
        };
      }

      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async patients_using_an_inhalation_device(req, res) {
    const page = Number.parseInt(req.query.page);
    const limitItens = Number.parseInt(req.query.limitItens) || 1;

    try {
      const result = JSON.parse(
        await client.get("patients_using_an_inhalation_device")
      );
      const { patients_using_an_inhalation_device } = result;
      const total_patients = patients_using_an_inhalation_device.length;

      if (!!page) {
        result.patients_using_an_inhalation_device = {
          total_patients,
          ...paginator(patients_using_an_inhalation_device, page, limitItens),
        };
      } else {
        result.patients_using_an_inhalation_device = {
          total_patients,
          result: patients_using_an_inhalation_device,
        };
      }
      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async signaling_transfer_of_patients_between_beds(req, res) {
    const page = Number.parseInt(req.query.page);
    const limitItens = Number.parseInt(req.query.limitItens) || 1;

    try {
      const result = JSON.parse(
        await client.get("signaling_transfer_of_patients_between_beds")
      );
      const { signaling_transfer_of_patients_between_beds } = result;
      const total_transfers =
        signaling_transfer_of_patients_between_beds.length;

      if (!!page) {
        result.signaling_transfer_of_patients_between_beds = {
          total_transfers,
          ...paginator(
            result.signaling_transfer_of_patients_between_beds,
            page,
            limitItens
          ),
        };
      } else {
        result.signaling_transfer_of_patients_between_beds = {
          total_transfers,
          result: signaling_transfer_of_patients_between_beds,
        };
      }

      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async single_request_central_pharmacy(req, res) {
    const page = Number.parseInt(req.query.page);
    const limitItens = Number.parseInt(req.query.limitItens) || 1;

    try {
      const result = JSON.parse(
        await client.get("single_request_central_pharmacy")
      );
      const { single_request_central_pharmacy } = result;

      const colors = [
        { name: "VERMELHO", color: "#FA7675" },
        { name: "AMARELO", color: "#FCF951" },
      ];

      const attendances = single_request_central_pharmacy.map((attendance) => {
        colors.forEach(({ name, color }) => {
          if (attendance.COR === name) {
            attendance.COLOR = color;
          }
        });

        return attendance;
      });

      if (!!page) {
        result.single_request_central_pharmacy = paginator(
          attendances,
          page,
          limitItens
        );
      } else {
        result.single_request_central_pharmacy = attendances;
      }

      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async total_number_of_medications_treated_in_the_month(req, res) {
    try {
      const result = JSON.parse(
        await client.get("total_number_of_medications_treated_in_the_month")
      );

      let onMonth = 0;
      let previousMonth = 0;

      result.total_number_of_medications_treated_in_the_month.forEach((e) => {
        if (e.TIPO == "MES ATUAL") {
          onMonth = e.QTD_MES_ATUAL;
        } else {
          previousMonth = e.QTD_MES_ATUAL;
        }
      });

      result.total_number_of_medications_treated_in_the_month = {
        value: onMonth,
        percent: calcPercent(onMonth, previousMonth) + "%",
      };

      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async total_number_of_medications_treated_on_the_day(req, res) {
    try {
      const result = JSON.parse(
        await client.get("total_number_of_medications_treated_on_the_day")
      );
      const values = result.total_number_of_medications_treated_on_the_day;

      let onDay = 0;
      let previousDay = 0;

      if (values[0]["DT_SOLSAI_PRO"] > values[1]["DT_SOLSAI_PRO"]) {
        onDay = values[0]["QT_ATENDIDA_DIA"];
        previousDay = values[1]["QT_ATENDIDA_DIA"];
      } else {
        onDay = values[1]["QT_ATENDIDA_DIA"];
        previousDay = values[0]["QT_ATENDIDA_DIA"];
      }

      result.total_number_of_medications_treated_on_the_day = { value: onDay, percent: calcPercent(onDay, previousDay) + "%" };

      return res.json(result);
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
  async dantrolen_sadt(req, res) {
    const page = Number.parseInt(req.query.page) || 1;
    const limitItens = Number.parseInt(req.query.limitItens) || 1;

    try {
      const result = JSON.parse(await client.get("dantrolen_sadt"));
      const { dantrolen_sadt } = result;


      result.dantrolen_sadt = {
        total_itens: dantrolen_sadt.length,
        ...paginator(dantrolen_sadt, page, limitItens)
      };

      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async dantrolen_cc(req, res) {
    const page = Number.parseInt(req.query.page) || 1;
    const limitItens = Number.parseInt(req.query.limitItens) || 1;

    try {
      const result = JSON.parse(await client.get("dantrolen_cc"));
      const { dantrolen_cc } = result;

      result.dantrolen_cc = {
        total_itens: dantrolen_cc.length,
        ...paginator(dantrolen_cc, page, limitItens)
      };

      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async patients_without_issuance_of_reconciliation(req, res) {
    const page = Number.parseInt(req.query.page);
    const limitItens = Number.parseInt(req.query.limitItens) || 1;

    try {
      const result = JSON.parse(
        await client.get("patients_without_issuance_of_reconciliation")
      );
      const { patients_without_issuance_of_reconciliation } = result;
      const total_patients = patients_without_issuance_of_reconciliation.length;

      if (!!page) {
        result.patients_without_issuance_of_reconciliation = {
          total_patients,
          ...paginator(
            patients_without_issuance_of_reconciliation,
            page,
            limitItens
          ),
        };
      } else {
        result.patients_without_issuance_of_reconciliation = {
          total_patients,
          result: patients_without_issuance_of_reconciliation,
        };
      }
      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async OPMS_in_next_24h(req, res) {
    try {
      const result = JSON.parse(await client.get("OPMS_in_next_24h"));
      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async list_OPMES_procedures(req, res) {
    const page = Number.parseInt(req.query.page) || 1;
    const limitItens = Number.parseInt(req.query.limitItens) || 1;

    try {
      const result = JSON.parse(await client.get("list_OPMES_procedures"));
      const { list_OPMES_procedures } = result;

      result.list_OPMES_procedures = paginator(list_OPMES_procedures, page, limitItens);
      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async list_procedures_achieved_OPMES(req, res) {
    const page = Number.parseInt(req.query.page) || 1;
    const limitItens = Number.parseInt(req.query.limitItens) || 1;

    try {
      const result = JSON.parse(await client.get("list_procedures_achieved_OPMES"));
      const { list_procedures_achieved_OPMES } = result;

      result.list_procedures_achieved_OPMES = paginator(list_procedures_achieved_OPMES, page, limitItens);
      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async number_procedures_in_24Hour_period(req, res) {
    try {
      const result = JSON.parse(await client.get("number_procedures_in_24Hour_period"));
      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async surgeries_OPME_per_next_day(req, res) {
    const page = Number.parseInt(req.query.page) || 1;
    const limitItens = Number.parseInt(req.query.limitItens) || 1;

    try {
      const result = JSON.parse(await client.get("surgeries_OPME_per_next_day"));
      const { surgeries_OPME_per_next_day } = result;

      result.surgeries_OPME_per_next_day = paginator(surgeries_OPME_per_next_day, page, limitItens);
      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async total_procedures_request_OPME_in_next_30Days(req, res) {
    try {
      const result = JSON.parse(await client.get("total_procedures_request_OPME_in_next_30Days"));
      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
};