import { axios } from "./api";
import { format, parseISO } from "date-fns";

function useDrugstore() {
  const path = "/drugstore";
  const pathInMonth = "/total_number_of_medications_treated_in_the_month";
  const pathInDay = "/total_number_of_medications_treated_on_the_day";
  const notDelivery = "/medication_not_delivered_on_time";

  // Assisting Drugstore 1
  async function getPatientPharmaceutical(page, limit) {
    try {
      const response = await axios.get(
        path + `/pharmaceutical_evolution?page=${page}&limitItens=${limit}`
      );
      const json = response.data.pharmaceutical_evolution;
      const totalPage = json.totalPage || 0;
      const totalPharmaceutical = json.total_pharmaceutical;
      const attendances = json.result || [];
      const patientPharmaceutical = attendances.map(
        ({
          CD_ATENDIMENTO,
          HR_ATENDIMENTO,
          DS_LEITO,
          NOME_PACIENTE,
          DT_NASCIMENTO,
        }) => {
          return {
            cdAttendance: CD_ATENDIMENTO,
            dtAttendance: HR_ATENDIMENTO,
            bedDescription: DS_LEITO,
            patient: NOME_PACIENTE,
            birhDate: DT_NASCIMENTO,
          };
        }
      );

      return {
        totalPharmaceutical,
        totalPage,
        patientPharmaceutical,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getPatientTransfer(page, limit) {
    try {
      const response = await axios.get(
        path +
        `/signaling_transfer_of_patients_between_beds?page=${page}&limitItens=${limit}`
      );
      const json = response.data.signaling_transfer_of_patients_between_beds;
      const totalTransfers = json.total_transfers;
      const totalPage = json.totalPage || 0;
      const attendances = json.result || [];
      const patientsTransfer = attendances.map(
        ({
          TIPO,
          CD_ATENDIMENTO,
          DT_ATENDIMENTO,
          DS_LEITO,
          NOME_PACIENTE,
          DT_NASCIMENTO,
          LEITO_ANTERIOR,
        }) => {
          if (TIPO === "ADMISSAO") {
            return {
              cdAttendance: CD_ATENDIMENTO,
              dtAttendance: DT_ATENDIMENTO,
              bedDescription: TIPO,
              patient: NOME_PACIENTE,
              birhDate: DT_NASCIMENTO,
              bedPrevious: DS_LEITO,
            };
          } else {
            return {
              cdAttendance: CD_ATENDIMENTO,
              dtAttendance: DT_ATENDIMENTO,
              bedPrevious: LEITO_ANTERIOR,
              patient: NOME_PACIENTE,
              birhDate: DT_NASCIMENTO,
              bedDescription: DS_LEITO,
            };
          }
        }
      );
      return {
        totalTransfers,
        totalPage,
        patientsTransfer,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getHospitalDischarge(page, limit) {
    try {
      const response = await axios.get(
        path +
        `/hospital_discharge_agreement_and_private?page=${page}&limitItens=${limit}`
      );
      const json = response.data.hospital_discharge_agreement_and_private;
      const totalPage = json.totalPage;
      const totalHospit = json.total_hospitalizations;
      const privateHospit = json.private;
      const privatePercent = json.private_percent;
      const agreement = json.health_insurance;
      const agreementPercent = json.health_insurance_percent;
      const attendances = json.result;
      const patientsHighs = attendances.map(
        ({
          TIPO,
          CD_ATENDIMENTO,
          DT_ATENDIMENTO,
          DS_LEITO,
          NOME_PACIENTE,
          DT_NASCIMENTO,
          COLOR,
        }) => {
          return {
            cdAttendance: CD_ATENDIMENTO,
            dtAttendance: DT_ATENDIMENTO,
            bedDescription: DS_LEITO,
            patient: NOME_PACIENTE,
            birhDate: DT_NASCIMENTO,
            type: TIPO,
            color: COLOR,
          };
        }
      );
      const graphicValues = {
        totalHospit,
        privateHospit,
        agreement,
        percents: [{ percent: agreementPercent }, { percent: privatePercent }],
      };
      return { totalPage, patientsHighs, graphicValues };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Patients Using Inhalation Device
  async function getPatientsInhalation(page, limit) {
    try {
      const response = await axios.get(
        path +
        `/patients_using_an_inhalation_device?page=${page}&limitItens=${limit}`
      );
      const json = response.data.patients_using_an_inhalation_device;
      const totalPatients = json.total_patients;
      const totalPage = json.totalPage;
      const attendances = json.result;
      const patientsInhalation = attendances.map(
        ({
          CD_ATENDIMENTO,
          DT_ATENDIMENTO,
          DS_LEITO,
          NOME_PACIENTE,
          DT_NASCIMENTO,
        }) => {
          return {
            cdAttendance: CD_ATENDIMENTO,
            dtAttendance: DT_ATENDIMENTO,
            bedDescription: DS_LEITO,
            patient: NOME_PACIENTE,
            birhDate: DT_NASCIMENTO,
          };
        }
      );
      return {
        totalPatients,
        totalPage,
        patientsInhalation,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Patient Without Issuance of Reconciliation
  async function getPatientOutReconciliation(page, limit) {
    try {
      const response = await axios.get(
        path +
        `/patients_without_issuance_of_reconciliation?page=${page}&limitItens=${limit}`
      );
      const json = response.data.patients_without_issuance_of_reconciliation;
      const totalPage = json.totalPage;
      const totalPatients = json.total_patients;
      const attendances = json.result;
      const patientsReconciliation = attendances.map(
        ({
          CD_ATENDIMENTO,
          DT_ATENDIMENTO,
          DS_LEITO,
          NOME_PACIENTE,
          DT_NASCIMENTO,
          TEMPO,
        }) => {
          return {
            cdAttendance: CD_ATENDIMENTO,
            dtAttendance: DT_ATENDIMENTO,
            bedDescription: DS_LEITO,
            patient: NOME_PACIENTE,
            birhDate: DT_NASCIMENTO,
            time: TEMPO.split(":")[0] + " H",
          };
        }
      );
      return {
        totalPage,
        totalPatients,
        patientsReconciliation,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Assisting Drugstore 2
  async function getMedicationsMonth() {
    try {
      const response = await axios.get(path + pathInMonth);
      const { value, percent } = response.data.total_number_of_medications_treated_in_the_month;

      return {
        value,
        percent,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getMedicationsDay() {
    try {
      const response = await axios.get(path + pathInDay);
      const { value, percent } = response.data.total_number_of_medications_treated_on_the_day;

      return {
        value,
        percent,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getMedicationsDeliveredNotDelivered() {
    try {
      const response = await axios.get(
        path + "/medication_delivered_and_not_delivered"
      );
      const json = response.data.medication_delivered_and_not_delivered;

      const zeroHour = { notDelivered: 0, delivered: 0, label: "00h" };
      const sixHour = { notDelivered: 0, delivered: 0, label: "06h" };
      const twelveHour = { notDelivered: 0, delivered: 0, label: "12h" };
      const eighteenHour = { notDelivered: 0, delivered: 0, label: "18h" };
      const twentyThreeHour = {
        notDelivered: 0,
        delivered: 0,
        label: "23:59h",
      };

      json.forEach(({ HORA_ENTREGA, TOTAL, STATUS }) => {
        const hour = Number(HORA_ENTREGA?.replace(":", "."));

        if (hour >= 0 && hour < 6) {
          zeroHour.notDelivered += STATUS === "NAO ENTREGUE" ? TOTAL : 0;
          zeroHour.delivered += STATUS === "ENTREGUE" ? TOTAL : 0;
        } else if (hour >= 6 && hour < 12) {
          sixHour.notDelivered += STATUS === "NAO ENTREGUE" ? TOTAL : 0;
          sixHour.delivered += STATUS === "ENTREGUE" ? TOTAL : 0;
        } else if (hour >= 12 && hour < 18) {
          twelveHour.notDelivered += STATUS === "NAO ENTREGUE" ? TOTAL : 0;
          twelveHour.delivered += STATUS === "ENTREGUE" ? TOTAL : 0;
        } else if (hour >= 18 && hour < 23) {
          eighteenHour.notDelivered += STATUS === "NAO ENTREGUE" ? TOTAL : 0;
          eighteenHour.delivered += STATUS === "ENTREGUE" ? TOTAL : 0;
        } else if (hour >= 23 && hour <= 23.59) {
          twentyThreeHour.notDelivered += STATUS === "NAO ENTREGUE" ? TOTAL : 0;
          twentyThreeHour.delivered += STATUS === "ENTREGUE" ? TOTAL : 0;
        }
      });

      const medicationsPerHour = [
        zeroHour,
        sixHour,
        twelveHour,
        eighteenHour,
        twentyThreeHour,
      ];

      return {
        medicationsPerHour,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getMedicationsNotDelivery() {
    try {
      const response = await axios.get(path + notDelivery);
      const json = response.data.medication_not_delivered_on_time[0];

      return {
        delivered: json.ENTREGUE,
        notDelivered: json.NAO_ENTREGUE,
        total: json.TOTAL,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getTotalSingleRequest() {
    try {
      const response = await axios.get(
        path + "/total_single_request_central_pharmacy"
      );
      const json = response.data.total_single_request_central_pharmacy[0];

      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getTotalEmergencyRequest() {
    try {
      const response = await axios.get(
        path + "/total_emergency_request_central_pharmacy"
      );
      const json = response.data.total_emergency_request_central_pharmacy[0];

      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getEmergencyPharmacy(page, limit) {
    try {
      const response = await axios.get(
        path +
        `/emergency_request_central_pharmacy?page=${page}&limitItens=${limit}`
      );
      const json = response.data.emergency_request_central_pharmacy;
      const totalPage = json.totalPage;
      const solicitations = json.result;

      const emergencys = solicitations.map(
        ({
          CD_ATENDIMENTO,
          DT_SOLSAI_PRO,
          DS_LEITO,
          NOME_PACIENTE,
          DT_NASCIMENTO,
          CD_SOLSAI_PRO,
          COLOR,
        }) => {
          return {
            cdSolic: CD_ATENDIMENTO,
            dtSolic: DT_SOLSAI_PRO,
            bedDescription: DS_LEITO,
            patient: NOME_PACIENTE,
            birhDate: DT_NASCIMENTO,
            CD_SOLSAI_PRO,
            COLOR,
          };
        }
      );

      return {
        totalPage,
        emergencys,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getCentralPharmacy(page, limit) {
    try {
      const response = await axios.get(
        path +
        `/single_request_central_pharmacy?page=${page}&limitItens=${limit}`
      );
      const json = response.data.single_request_central_pharmacy;
      const totalPage = json.totalPage;
      const solicitations = json.result;

      const centrals = solicitations.map(
        ({
          CD_ATENDIMENTO,
          HR_SOLSAI_PRO,
          DS_LEITO,
          NOME_PACIENTE,
          DT_NASCIMENTO,
          CD_SOLSAI_PRO,
          COLOR,
        }) => {
          return {
            cdSolic: CD_ATENDIMENTO,
            dtSolic: HR_SOLSAI_PRO,
            bedDescription: DS_LEITO,
            patient: NOME_PACIENTE,
            birhDate: DT_NASCIMENTO,
            CD_SOLSAI_PRO,
            COLOR,
          };
        }
      );
      return {
        totalPage,
        centrals,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getDantrolenCC(page, limit) {
    try {
      const response = await axios.get(
        path + `/dantrolen_cc?page=${page}&limitItens=${limit}`
      );
      const json = response.data.dantrolen_cc;
      const total = json.total_itens;
      const totalPage = json.totalPage;
      const prescriptions = json.result;

      return {
        totalPage,
        total,
        prescriptions,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getDantrolenSadt(page, limit) {
    try {
      const response = await axios.get(
        path + `/dantrolen_sadt?page=${page}&limitItens=${limit}`
      );
      const json = response.data.dantrolen_sadt;
      const total = json.total_itens;
      const totalPage = json.totalPage;
      const prescriptions = json.result;

      return {
        totalPage,
        total,
        prescriptions,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getListOPME(page, limit) {
    try {
      const response = await axios.get(
        path + `/list_OPMES_procedures?page=${page}&limitItens=${limit}`
      );
      const json = response.data.list_OPMES_procedures;
      const totalPage = json.totalPage;
      const procediments = json.result;

      return {
        totalPage,
        procediments,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getConsignedsOPME(page, limit) {
    try {
      const response = await axios.get(
        path +
        `/list_procedures_achieved_OPMES?page=${page}&limitItens=${limit}`
      );
      const json = response.data.list_procedures_achieved_OPMES;
      const totalPage = json.totalPage;
      const procediments = json.result;

      return {
        totalPage,
        procediments,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getSurgerisOPME(page, limit) {
    try {
      const response = await axios.get(
        path + `/surgeries_OPME_per_next_day?page=${page}&limitItens=${limit}`
      );
      const json = response.data.surgeries_OPME_per_next_day;
      const totalPage = json.totalPage;
      const surgeries = json.result;

      return {
        totalPage,
        surgeries,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getPercentOPMES() {
    try {
      const response = await axios.get(path + "/OPMS_in_next_24h");
      const json = response.data.OPMS_in_next_24h;
      const percentOPMES = Math.round(json[0]["OPME-24h"] || 0) + "%";

      return {
        percentOPMES,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getTotalOPMES() {
    try {
      const response = await axios.get(
        path + "/number_procedures_in_24Hour_period"
      );
      const json = response.data.number_procedures_in_24Hour_period;
      const totalOPMES = json[0]?.NR_PROCEDIMENTO_24H;

      return {
        totalOPMES,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getProcedimentsPerDay() {
    try {
      const response = await axios.get(
        path + "/total_procedures_request_OPME_in_next_30Days"
      );
      const json = response.data.total_procedures_request_OPME_in_next_30Days;
      const procediments = json.map(({ DATA, QTD_SOLICITADA }) => {
        return {
          DATA: format(parseISO(DATA), "dd"),
          QTD_SOLICITADA,
        };
      });

      return {
        procediments,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return {
    getMedicationsMonth,
    getMedicationsDay,
    getMedicationsNotDelivery,
    getMedicationsDeliveredNotDelivered,
    getPatientPharmaceutical,
    getPatientTransfer,
    getHospitalDischarge,
    getPatientsInhalation,
    getPatientOutReconciliation,
    getEmergencyPharmacy,
    getCentralPharmacy,
    getDantrolenCC,
    getDantrolenSadt,
    getListOPME,
    getConsignedsOPME,
    getPercentOPMES,
    getTotalOPMES,
    getSurgerisOPME,
    getProcedimentsPerDay,
    getTotalSingleRequest,
    getTotalEmergencyRequest,
  };
}

export default useDrugstore;
