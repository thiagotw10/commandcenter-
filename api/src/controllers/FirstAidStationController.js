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
  async patients_in_FAS(req, res) {
    try {
      const result2 = JSON.parse(await client.get("first_aid_station"));
      return res.json(result2);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },

  async real_time_register(req, res) {
    try {
      const result = JSON.parse(await client.get("real_time_register"));
      return res.send(result);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },

  async wait_for_pediatric_care(req, res) {
    try {
      const result = JSON.parse(await client.get("wait_for_pediatric_care"));
      return res.send(result);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },

  async time_triage(req, res) {
    try {
      const wait_triage = JSON.parse(await client.get("wait_triage"));
      const longer_wait_time_triage = JSON.parse(await client.get("longer_wait_time_triage"));
      const longer_time_for_register = JSON.parse(await client.get("longer_time_for_register"));

      const result = {
        active: wait_triage.active,
        last_update: wait_triage.last_update,
        results: [
          wait_triage.wait_triage[0],
          longer_time_for_register.longer_time_for_register[0],
          longer_wait_time_triage.longer_wait_time_triage[0]
        ]
      }
      return res.send(result);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },

  async first_aid_stations_beds_situation(req, res) {
    const page = Number.parseInt(req.query.page) || 1;
    const limitItens = Number.parseInt(req.query.limitItens) || 1;

    const colors = [
      { name: "ROSA", hexadecimal: "#991465" },
      { name: "ROXO", hexadecimal: "#7000FF" },
      { name: "AZUL", color: "#0084FF", hexadecimal: "#218298" },
      { name: "VERDE", color: "#00FF47", hexadecimal: "#06955F" },
      { name: "VAZIO", hexadecimal: "#232836" }
    ]


    try {
      const result = JSON.parse(await client.get("first_aid_stations_beds_situation"));
      result.first_aid_stations_beds_situation = paginator(result.first_aid_stations_beds_situation, page, limitItens);
      result.first_aid_stations_beds_situation.result.forEach(e => {
        colors.forEach(t => {
          if (e.COR == t.name) {
            e.hexadecimal = t.hexadecimal
          }
        })
      })
      return res.send(result);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },

  async first_aid_total_beds_occupied(req, res) {
    try {
      const result = JSON.parse(await client.get("first_aid_total_beds_occupied"));
      return res.send(result);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },

  async first_aid_beds_occupied_per_unit(req, res) {
    try {
      const result = JSON.parse(await client.get("first_aid_beds_occupied_per_unit"));
      return res.send(result);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },

  async first_aid_patient_list(req, res) {
    const page = Number.parseInt(req.query.page);
    const limitItens = Number.parseInt(req.query.limitItens) || 1;

    try {
      const result = JSON.parse(await client.get("first_aid_patient_list"));
      const { first_aid_patient_list } = result;

      if (!!page) {
        result.first_aid_patient_list = paginator(first_aid_patient_list, page, limitItens);
      } else {
        result.first_aid_patient_list = { result: first_aid_patient_list };
      }

      return res.send(result);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
  async first_aid_longer_medical_care(req, res) {
    try {
      const result = JSON.parse(await client.get("first_aid_longer_medical_care"));

      const queues = [
        { name: "PS DIRECIONADO", time: "--", patients: 0 },
        { name: "PS TRADICIONAL", time: "--", patients: 0 }
      ];

      result.first_aid_longer_medical_care.forEach(({ FILA, MAIOR_TEMPO, QTD_PACIENTE }) => {
        queues.forEach((queue) => {
          if (queue.name === FILA) {
            queue.time = MAIOR_TEMPO || queue.time;
            queue.patients = QTD_PACIENTE || queue.patients;
          }
        });
      });

      result.first_aid_longer_medical_care = queues;


      return res.send(result);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
  async first_aid_longer_waiting_time_for_registration(req, res) {
    try {
      const result = JSON.parse(await client.get("first_aid_longer_waiting_time_for_registration"));

      const queues = [
        { name: "CADASTRO - DIRECIONADO", time: "--", patients: 0 },
        { name: "CADASTRO - TRADICIONAL", time: "--", patients: 0 }
      ];

      result.first_aid_longer_waiting_time_for_registration.forEach(({ TIPO, MAIOR_TEMPO_CADASTRO, EM_ESPERA_ATENDIMENTO }) => {
        queues.forEach((queue) => {
          if (queue.name === TIPO) {
            queue.time = MAIOR_TEMPO_CADASTRO || queue.time;
            queue.patients = EM_ESPERA_ATENDIMENTO || queue.patients;
          }
        });
      });

      result.first_aid_longer_waiting_time_for_registration = queues;

      return res.send(result);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
  async first_aid_real_time_medical_care(req, res) {
    try {
      const result = JSON.parse(await client.get("first_aid_real_time_medical_care"));

      const queues = {
        ps_tradicional: {
          total: 0,
          queues: [
            { name: "VERMELHO", color: "#FF2D2D", patients: 0, time: "--" },
            { name: "LARANJA", color: "#FF7A19", patients: 0, time: "--" },
            { name: "AMARELA", color: "#FFE816", patients: 0, time: "--" },
            { name: "VERDE", color: "#00FF47", patients: 0, time: "--" },
            { name: "AZUL", color: "#0084FF", patients: 0, time: "--" },
          ]
        },
        ps_direcionado: {
          total: 0,
          queues: [
            { name: "VERMELHO", color: "#FF2D2D", patients: 0, time: "--" },
            { name: "LARANJA", color: "#FF7A19", patients: 0, time: "--" },
            { name: "AMARELA", color: "#FFE816", patients: 0, time: "--" },
            { name: "VERDE", color: "#00FF47", patients: 0, time: "--" },
            { name: "AZUL", color: "#0084FF", patients: 0, time: "--" },
          ]
        }
      }

      result.first_aid_real_time_medical_care.forEach(({ DS_REFERENCIA, FILA, ESPERA_ATENDIMENTO, MAIOR_TEMPO_ESPERA }) => {
        const timeReal = MAIOR_TEMPO_ESPERA.split(":").map((time) => parseInt(time));

        if (FILA === "PS TRADICIONAL") {
          queues.ps_tradicional.queues.forEach((queue) => {
            const timeLoop = MAIOR_TEMPO_ESPERA.split(":").map((time) => parseInt(time));

            if (queue.name === DS_REFERENCIA) {
              queue.patients += ESPERA_ATENDIMENTO;
              queues.ps_tradicional.total += ESPERA_ATENDIMENTO;
              if (queue.time === "--") {
                queue.time = MAIOR_TEMPO_ESPERA || queue.time;
              } else if (timeReal[0] > timeLoop[0]) {
                queue.time = MAIOR_TEMPO_ESPERA;
              } else if (timeReal[1] > timeLoop[1]) {
                queue.time = MAIOR_TEMPO_ESPERA;
              } else if (timeReal[2] > timeLoop[2]) {
                queue.time = MAIOR_TEMPO_ESPERA;
              }
            }
          });
        } else if (FILA === "PS DIRECIONADO") {
          queues.ps_direcionado.queues.forEach((queue) => {
            const timeLoop = MAIOR_TEMPO_ESPERA.split(":").map((time) => parseInt(time));

            if (queue.name === DS_REFERENCIA) {
              queue.patients += ESPERA_ATENDIMENTO;
              queues.ps_direcionado.total += ESPERA_ATENDIMENTO;
              if (queue.time === "--") {
                queue.time = MAIOR_TEMPO_ESPERA || queue.time;
              } else if (timeReal[0] > timeLoop[0]) {
                queue.time = MAIOR_TEMPO_ESPERA;
              } else if (timeReal[1] > timeLoop[1]) {
                queue.time = MAIOR_TEMPO_ESPERA;
              } else if (timeReal[2] > timeLoop[2]) {
                queue.time = MAIOR_TEMPO_ESPERA;
              }
            }
          });
        }
      });

      result.first_aid_real_time_medical_care = queues;

      return res.send(result);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
  async first_aid_real_time_registration(req, res) {
    try {
      const result = JSON.parse(await client.get("first_aid_real_time_registration"));

      const queues = {
        ps_tradicional: {
          total: 0,
          queues: [
            { name: "VERMELHO", color: "#FF2D2D", patients: 0, time: "--" },
            { name: "LARANJA", color: "#FF7A19", patients: 0, time: "--" },
            { name: "AMARELA", color: "#FFE816", patients: 0, time: "--" },
            { name: "VERDE", color: "#00FF47", patients: 0, time: "--" },
            { name: "AZUL", color: "#0084FF", patients: 0, time: "--" },
          ]
        },
        ps_direcionado: {
          total: 0,
          queues: [
            { name: "VERMELHO", color: "#FF2D2D", patients: 0, time: "--" },
            { name: "LARANJA", color: "#FF7A19", patients: 0, time: "--" },
            { name: "AMARELA", color: "#FFE816", patients: 0, time: "--" },
            { name: "VERDE", color: "#00FF47", patients: 0, time: "--" },
            { name: "AZUL", color: "#0084FF", patients: 0, time: "--" },
          ]
        }
      }

      result.first_aid_real_time_registration.forEach(({ DS_REFERENCIA, FILA, EM_ESPERA_CADASTRO, MAIOR_TEMPO_CADASTRO }) => {
        const timeReal = MAIOR_TEMPO_CADASTRO.split(":").map((time) => parseInt(time));

        if (FILA === "PS TRADICIONAL") {
          queues.ps_tradicional.queues.forEach((queue) => {
            const timeLoop = MAIOR_TEMPO_CADASTRO.split(":").map((time) => parseInt(time));

            if (queue.name === DS_REFERENCIA) {
              queue.patients += EM_ESPERA_CADASTRO;
              queues.ps_tradicional.total += EM_ESPERA_CADASTRO;
              if (queue.time === "--") {
                queue.time = MAIOR_TEMPO_CADASTRO || queue.time;
              } else if (timeReal[0] > timeLoop[0]) {
                queue.time = MAIOR_TEMPO_CADASTRO;
              } else if (timeReal[1] > timeLoop[1]) {
                queue.time = MAIOR_TEMPO_CADASTRO;
              } else if (timeReal[2] > timeLoop[2]) {
                queue.time = MAIOR_TEMPO_CADASTRO;
              }
            }
          });
        } else if (FILA === "PS DIRECIONADO") {
          queues.ps_direcionado.queues.forEach((queue) => {
            const timeLoop = MAIOR_TEMPO_CADASTRO.split(":").map((time) => parseInt(time));

            if (queue.name === DS_REFERENCIA) {
              queue.patients += EM_ESPERA_CADASTRO;
              queues.ps_direcionado.total += EM_ESPERA_CADASTRO;
              if (queue.time === "--") {
                queue.time = MAIOR_TEMPO_CADASTRO || queue.time;
              } else if (timeReal[0] > timeLoop[0]) {
                queue.time = MAIOR_TEMPO_CADASTRO;
              } else if (timeReal[1] > timeLoop[1]) {
                queue.time = MAIOR_TEMPO_CADASTRO;
              } else if (timeReal[2] > timeLoop[2]) {
                queue.time = MAIOR_TEMPO_CADASTRO;
              }
            }
          });
        }
      });

      result.first_aid_real_time_registration = queues;

      return res.send(result);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
  async first_aid_super_road(req, res) {
    try {
      const result = JSON.parse(await client.get("first_aid_super_road"));
      return res.send(result);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
  async first_aid_waiting_for_sorting(req, res) {
    try {
      const result = JSON.parse(await client.get("first_aid_waiting_for_sorting"));

      const queues = [
        { name: "TRIAGEM - DIRECIONADO", time: "--", patients: 0 },
        { name: "TRIAGEM - TRADICIONAL", time: "--", patients: 0 }
      ];

      result.first_aid_waiting_for_sorting.forEach(({ TIPO, MAIOR_TEMPO_ESP, QTD_TRIAGEM }) => {
        queues.forEach((queue) => {
          if (queue.name === TIPO) {
            queue.time = MAIOR_TEMPO_ESP || queue.time;
            queue.patients = QTD_TRIAGEM || queue.patients;
          }
        });
      });

      result.first_aid_waiting_for_sorting = queues;

      return res.send(result);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
};
