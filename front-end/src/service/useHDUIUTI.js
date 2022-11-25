import { axios } from "./api";

function useHDUIUTI() {
  const path = "hd_ui_uti/";

  async function getUnities() {
    try {
      const response = await axios.get(path + "hd_ui_uti_per_unit?unit=all");
      const json = response.data;
      const unit = json.hd_ui_uti_units;

      return {
        unit,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getBeds(unit, page, limit) {
    try {
      const response = await axios.get(path + `hd_ui_uti_per_unit?unit=${unit}&page=${page}&limitItens=${limit}`);
      const json = response.data.hd_ui_uti_per_unit;
      const unitBeds = json.result;
      const totPages = json.totalPage;

      return {
        unitBeds,
        totPages,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getReasonForDischarge() {
    try {
      const response = await axios.get(path + "ui_uti_reason_for_discharge");
      const json = response.data.ui_uti_reason_for_discharge[0];

      const predictedExits = {
        homeCare: {
          total: json.HOMECARE_UI + json.HOMECARE_UTI,
          ui: json.HOMECARE_UI,
          uti: json.HOMECARE_UTI,
        },
        obito: {
          total: json.OBITO_UI + json.OBITO_UTI,
          ui: json.OBITO_UI,
          uti: json.OBITO_UTI,
        },
        externTransfer: {
          total: json.TRANSFERENCIA_EXTERNA_UI + json.TRANSFERENCIA_EXTERNA_UTI,
          ui: json.TRANSFERENCIA_EXTERNA_UI,
          uti: json.TRANSFERENCIA_EXTERNA_UTI,
        },
        hospitalization: {
          total: json.ALTA_HOSPITALAR_UI + json.ALTA_HOSPITALAR_UTI,
          ui: json.ALTA_HOSPITALAR_UI,
          uti: json.ALTA_HOSPITALAR_UTI,
        },
      };

      return {
        predictedExits
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getPatients(page, limit) {
    try {
      const response = await axios.get(path + `ui_uti_source_and_destination_beds?page=${page}&limitItens=${limit}`);
      const json = response.data.ui_uti_source_and_destination_beds;

      const totalPage = json.totalPage;
      const patients = json.result.map(({ NM_PACIENTE, DT_NASCIMENTO, LEITO_ANTERIOR, DS_LEITO }) => {
        const splitedName = NM_PACIENTE?.split(" ") || [""];
        const name = splitedName[0] + " " + splitedName[1] + " " + (splitedName[1]?.length <= 3 ? splitedName[2] : "");

        return {
          name,
          DT_NASCIMENTO,
          LEITO_ANTERIOR,
          DS_LEITO
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

  async function getVacantOccupiedBeds() {
    try {
      const response = await axios.get(path + "ui_uti_vacant_and_occupied_beds");
      const json = response.data.ui_uti_vacant_and_occupied_beds[0];

      const vacantsAndOccupied = {
        occupied: {
          total: json.LEITOS_OCUPADOS_UI + json.LEITOS_OCUPADOS_UTI,
          ui: json.LEITOS_OCUPADOS_UI,
          uti: json.LEITOS_OCUPADOS_UTI,
        },
        vacants: {
          total: json.LEITOS_VAGOS_UI + json.LEITOS_VAGOS_UTI,
          ui: json.LEITOS_VAGOS_UI,
          uti: json.LEITOS_VAGOS_UTI,
        },
      };

      vacantsAndOccupied.total = vacantsAndOccupied.occupied.total + vacantsAndOccupied.vacants.total;

      return {
        vacantsAndOccupied
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getNeedVacancies() {
    try {
      const responseUTI = await axios.get(path + "uti_need_for_vacancies");
      const responseUI = await axios.get(path + "ui_need_for_vacancies");

      const ui = responseUI.data.ui_need_for_vacancies[0];
      let uiTotal = 0;
      if (!!ui) {
        uiTotal = ui.PS_UI_HJ + ui.RESERVAS_UI_HJ + ui.UPP_UI_HJ;
      };

      const uti = responseUTI.data.uti_need_for_vacancies[0];
      let utiTotal = 0;
      if (!!uti) {
        utiTotal = uti.PS_UTI_HJ + uti.RESERVAS_UTI_HJ + uti.UPP_UTI_HJ;
      };

      return {
        ui: {
          ...ui,
          TOTAL: uiTotal,
        },
        uti: {
          ...uti,
          TOTAL: utiTotal,
        }
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getInternalTransfer() {
    try {
      const response = await axios.get(path + "ui_uti_internal_transfer");
      const json = response.data.ui_uti_internal_transfer;

      const internalTransfer = {
        total: 0,
        ui: 0,
        uti: 0,
      }

      json.forEach((transfer) => {
        if (transfer.TIPO_TRANSFERENCIA === "E TRANSFERENCIA UTI") {
          internalTransfer.total += transfer.QTD;
          internalTransfer.uti += transfer.QTD;
        } else if (transfer.TIPO_TRANSFERENCIA === "E TRANSFERENCIA UI") {
          internalTransfer.total += transfer.QTD;
          internalTransfer.ui += transfer.QTD;
        }
      });

      return internalTransfer;

    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getRequestDays() {
    try {
      const response = await axios.get(path + "ui_uti_vacancies_requested_last_5_days");
      const json = response.data.ui_uti_vacancies_requested_last_5_days;

      let onDay;
      let fiveDays = [];

      json.forEach(({ HR_SOLICITACAO, INTERNACAO_EM, DIA }) => {
        if (DIA === "HOJE") {
          onDay = {
            day: HR_SOLICITACAO.slice(0, 5),
            internations: INTERNACAO_EM,
          };
        } else {
          fiveDays.unshift({
            day: HR_SOLICITACAO.slice(0, 5),
            internations: INTERNACAO_EM,
          });
        }
      });

      return {
        onDay,
        fiveDays
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getVacanciesPerFloor() {
    try {
      const response = await axios.get(path + "vacancies_per_floor");
      const json = response.data.vacancies_per_floor;

      return {
        vacanciesPerFlor: json
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return {
    getUnities,
    getBeds,
    getReasonForDischarge,
    getPatients,
    getVacantOccupiedBeds,
    getNeedVacancies,
    getInternalTransfer,
    getRequestDays,
    getVacanciesPerFloor,
  };
}

export default useHDUIUTI;
