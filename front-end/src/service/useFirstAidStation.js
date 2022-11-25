import { axios } from "./api";
import { format, parseISO } from "date-fns";

function useFirstAidStation() {
  async function getFirstAidStation() {
    try {
      const response = await axios.get("first_aid_station");
      const json = response.data.first_aid_station;

      let overFourPs = 0;
      let untilFourPs = 0;
      let untilFourIn = 0;
      let untilEightIn = 0;
      let overEightIn = 0;

      json.forEach((e) => {
        if (e.TIPO.includes("1 -PACIENTES OBSERVADOS EM PS ATE 4 HORAS")) {
          untilFourPs += e.QTD;
        } else if (e.TIPO.includes("2 -PACIENTES OBSERVADOS EM PS ACIMA 4 HORAS")) {
          overFourPs += e.QTD;
        } else if (e.TIPO.includes("3 -PACIENTES INTERNADOS NO PS ATE 4 HORAS")) {
          untilFourIn += e.QTD;
        } else if (e.TIPO.includes("4 -PACIENTES INTERNADOS NO PS ATE 8 HORAS")) {
          untilEightIn += e.QTD;
        } else if (e.TIPO.includes("5 -PACIENTES INTERNADOS NO PS ACIMA 8 HORAS")) {
          overEightIn += e.QTD;
        }
      });

      return {
        overFourPs,
        untilFourPs,
        untilFourIn,
        untilEightIn,
        overEightIn,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getTotalBedsOccupied() {
    try {
      const response = await axios.get("first_aid_total_beds_occupied");
      const bedsOcuppied = response.data.first_aid_total_beds_occupied[0].TOTAL;

      return {
        bedsOcuppied
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getUnitiesValues() {
    try {
      const response = await axios.get("first_aid_beds_occupied_per_unit");
      let unities = response.data.first_aid_beds_occupied_per_unit;

      const unitiesNames = [
        { unit: "UPP - UTI" },
        { unit: "UPP - UI" },
        { unit: "REAVALIAÇÃO" },
        { unit: "SOLICITADO INTERNAÇÃO" },
      ];

      unities = unitiesNames.map((unit) => {
        unities.forEach(({ UNIDADE, QTD }) => {
          if (UNIDADE === unit.unit.normalize('NFD').replace(/[\u0300-\u036f]/g, "")) {
            unit.UNIDADE = UNIDADE;
            unit.QTD = QTD;
          }
        });
        return unit;
      });

      return {
        unities
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getPatients(page, limitItens) {
    try {
      const response = await axios.get(`first_aid_patient_list?page=${page}&limitItens=${limitItens}`);
      const { totalPage, result } = response.data.first_aid_patient_list;

      const patients = result.map((patient) => {
        const apartment = patient.POSTO.replace("  ", " - ");
        const splitedName = patient.PACIENTE?.split(" ") || [""];
        const name = splitedName[0] + " " + splitedName[1] + " " + (splitedName[1]?.length <= 3 ? splitedName[2] : "");
        const splitedIllness = patient.HD_ANAMNESE?.split(" ") || [""];
        const illness = splitedIllness[0] + " " + (!!splitedIllness[1] ? splitedIllness[1] : "") + " " + (splitedIllness[1]?.length <= 3 ? splitedIllness[2] || "" : "...");
        const splitedDiet = patient.DIETA?.split(" ") || [""];
        const diet = (splitedDiet[0] || "") + " " + (!!splitedDiet[1] ? splitedDiet[1] : "") + " " + (splitedDiet[1]?.length <= 3 ? splitedDiet[2] || "" : "");
        const yearOld = patient.DS_IDADE.replace(/[à-ú]|[a-z]| /g, "").toLowerCase();

        return {
          apartment,
          weight: patient.PESO || "Não informado",
          yearOld,
          name,
          illness,
          time: patient.HR_INT || "-- : -- : --",
          allergy: patient.ALERGIA || "Sem alergia",
          birthDate: format(parseISO(patient.NASC), "dd/MM/yy"),
          diet,
          unit: patient.TIPO_LEITO,
          genre: patient.SEXO,
          iconRX: {
            display: patient.IMG_RX === "SIM",
            color: patient.RX === "LIBERADO" ? "#76FF53" : "#FF4A4A"
          },
          iconLAB: {
            display: patient.IMG_LAB === "SIM",
            color: patient.LAB === "LIBERADO" ? "#76FF53" : "#FF4A4A"
          },
          iconCheck: {
            display: !!patient.INTERN,
            color: patient.INTERN === "SOLICITACAO ATENDIDA" ? "#76FF53" : "#FF7A00"
          }
        }
      });

      return {
        patients,
        totalPage,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getLongerTimeMedicalCare() {
    try {
      const response = await axios.get("first_aid_longer_medical_care");
      const timeMedicalCare = response.data.first_aid_longer_medical_care;

      return {
        timeMedicalCare
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getLongerTimeRegister() {
    try {
      const response = await axios.get("first_aid_longer_waiting_time_for_registration");
      const timeRegister = response.data.first_aid_longer_waiting_time_for_registration;

      return {
        timeRegister
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getLongerTimeSorting() {
    try {
      const response = await axios.get("first_aid_waiting_for_sorting");
      const timeSorting = response.data.first_aid_waiting_for_sorting;

      return {
        timeSorting
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getLongerTimeRoad() {
    try {
      const response = await axios.get("first_aid_super_road");
      const timeRoad = response.data.first_aid_super_road[0];

      return {
        timeRoad
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getQueuesRealTimeMedicalCare() {
    try {
      const response = await axios.get("first_aid_real_time_medical_care");
      const queuesMedicalCare = response.data.first_aid_real_time_medical_care;

      queuesMedicalCare.ps_tradicional.queues.forEach((queue, i) => {
        const times = queue.time.split(":").map((time) => Number.parseInt(time));
        if (queue.patients === 0) {
          delete queuesMedicalCare.ps_tradicional.queues[i];
        } else if (queue.time === "--") {
          queue.alert = false;
        } else if (queue.name === "VERDE") {
          queue.alert = times[0] >= 2;
        } else if (queue.name === "AMARELA") {
          queue.alert = times[0] > 0 || times[1] >= 30;
        } else if (queue.name === "LARANJA" || queue.name === "AZUL") {
          queue.alert = times[0] >= 1;
        }
      });

      queuesMedicalCare.ps_direcionado.queues.forEach((queue, i) => {
        const times = queue.time.split(":").map((time) => Number.parseInt(time));
        if (queue.patients === 0) {
          delete queuesMedicalCare.ps_direcionado.queues[i];
        } else if (queue.time === "--") {
          queue.alert = false;
        } else if (queue.name === "VERDE") {
          queue.alert = times[0] >= 2;
        } else if (queue.name === "AMARELA") {
          queue.alert = times[0] > 0 || times[1] >= 30;
        } else if (queue.name === "LARANJA" || queue.name === "AZUL") {
          queue.alert = times[0] >= 1;
        }
      });

      return {
        queuesMedicalCare
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getQueuesRealTimeRegister() {
    try {
      const response = await axios.get("first_aid_real_time_registration");
      const queuesRegister = response.data.first_aid_real_time_registration;

      queuesRegister.ps_tradicional.queues.forEach((queue, i) => {
        const times = queue.time.split(":").map((time) => Number.parseInt(time));
        if (queue.patients === 0) {
          delete queuesRegister.ps_tradicional.queues[i];
        } else if (queue.time === "--") {
          queue.alert = false;
        } else if (queue.name === "VERDE") {
          queue.alert = times[0] > 0 || times[1] >= 30;
        } else if (queue.name === "LARANJA" || queue.name === "AZUL" || queue.name === "AMARELA") {
          queue.alert = times[0] > 0 || times[1] >= 15;
        }
      });

      queuesRegister.ps_direcionado.queues.forEach((queue, i) => {
        const times = queue.time.split(":").map((time) => Number.parseInt(time));
        if (queue.patients === 0) {
          delete queuesRegister.ps_direcionado.queues[i];
        } else if (queue.time === "--") {
          queue.alert = false;
        } else if (queue.name === "VERDE") {
          queue.alert = times[0] > 0 || times[1] >= 30;
        } else if (queue.name === "LARANJA" || queue.name === "AZUL" || queue.name === "AMARELA") {
          queue.alert = times[0] > 0 || times[1] >= 15;
        }
      });

      return {
        queuesRegister
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return {
    getFirstAidStation,
    getTotalBedsOccupied,
    getUnitiesValues,
    getPatients,
    getLongerTimeMedicalCare,
    getLongerTimeRegister,
    getLongerTimeSorting,
    getLongerTimeRoad,
    getQueuesRealTimeMedicalCare,
    getQueuesRealTimeRegister,
  };
}

export default useFirstAidStation;
