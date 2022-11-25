import { axios } from "./api";
import useUtilities from "./useUtilities";

function useBedsSituation() {
  const path = "snd/"
  const { limitName } = useUtilities();

  async function getRooms(page, limit) {
    try {
      const response = await axios.get(path + `room_100?page=${page}&limitItens=${limit}`);
      const json = response.data.room_100;

      const totalPage = json.totalPage;
      const rooms = json.result;

      return {
        totalPage,
        rooms
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getInternalTransfer(page, limit) {
    try {
      const response = await axios.get(path + `internal_transfers?page=${page}&limitItens=${limit}`);
      const json = response.data.internal_transfers;

      const total = json.total_itens;
      const totalPage = json.totalPage;
      const transfers = json.result;

      return {
        totalPage,
        total,
        transfers
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getFastingPatients(page, limit) {
    try {
      const response = await axios.get(path + `fasting_patients?page=${page}&limitItens=${limit}`);
      const json = response.data.fasting_patients;

      const total = json.total_itens;
      const totalPage = json.totalPage;
      const patients = json.result;

      return {
        totalPage,
        total,
        patients
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getDietChange(page, limit) {
    try {
      const response = await axios.get(path + `diet_change?page=${page}&limitItens=${limit}`);
      const json = response.data.diet_change;

      const total = json.total_itens;
      const totalPage = json.totalPage;
      const diets = json.result;

      return {
        totalPage,
        total,
        diets
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getAbsencePrescription(page, limit) {
    try {
      const response = await axios.get(path + `absence_prescription?page=${page}&limitItens=${limit}`);
      const json = response.data.absence_prescription;

      const total = json.total_itens;
      const totalPage = json.totalPage;
      const prescriptions = json.result;

      return {
        totalPage,
        total,
        prescriptions
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getAllergyAlert(page, limit) {
    try {
      const response = await axios.get(path + `allergy_alert?page=${page}&limitItens=${limit}`);
      const json = response.data.allergy_alert;

      const total = json.total_itens;
      const totalPage = json.totalPage;
      const allergies = json.result;

      return {
        totalPage,
        total,
        allergies
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getScreeningNotPerformed(page, limit) {
    try {
      const response = await axios.get(path + `screening_not_performed?page=${page}&limitItens=${limit}`);
      const json = response.data.screening_not_performed;

      const total = json.total_itens;
      const totalPage = json.totalPage;
      const screenings = json.result;

      return {
        totalPage,
        total,
        screenings
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getAnthropometricEvaluation(page, limit) {
    try {
      const response = await axios.get(path + `anthropometric_evaluation?page=${page}&limitItens=${limit}`);
      const json = response.data.anthropometric_evaluation;

      const total = json.total_itens;
      const totalPage = json.totalPage;
      const anthropometrics = json.result;

      return {
        totalPage,
        total,
        anthropometrics
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getNutritionalEvolution(page, limit) {
    try {
      const response = await axios.get(path + `nutritional_evolution?page=${page}&limitItens=${limit}`);
      const json = response.data.nutritional_evolution;

      const total = json.total_itens;
      const totalPage = json.totalPage;
      const nutritionals = json.result;

      return {
        totalPage,
        total,
        nutritionals
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getHospitalizations(unit, page, limit) {
    try {
      const response = await axios.get(path + `hospitalization_panel?${unit !== "-" ? `unit=${unit}&` : ""}page=${page}&limitItens=${limit}`);
      const json = response.data.hospitalization_panel;

      const totalPage = json.totalPage;
      const hospitalizations = json.result?.map(({ DISPOSITIVO, DIETA, ALERGIA, ESPECIALIDADE, ...internation }) => {

        const splitedDiet = DIETA?.split(";").filter((item) => !!item);
        const diets = [];
        splitedDiet?.forEach((item, i) => {
          if (i <= 1) {
            const dietName = limitName(item, 2);
            diets.push(dietName);
          } else if (i === 2) {
            diets.push(`+ ${splitedDiet.length - 2}`);
          }
        });

        const splitedDispositive = DISPOSITIVO?.split(";").filter((item) => !!item);
        const dispositives = [];
        splitedDispositive?.forEach((item, i) => {
          if (i <= 1) {
            const dispositiveName = limitName(item, 2);
            dispositives.push(dispositiveName);
          } else if (i === 2) {
            dispositives.push(`+ ${splitedDispositive.length - 2}`);
          }
        });

        const splitedAlergy = ALERGIA?.split(";").filter((item) => !!item);
        const alergies = [];
        splitedAlergy?.forEach((item, i) => {
          if (i <= 1) {
            const AlergyName = limitName(item, 3);
            alergies.push(AlergyName);
          } else if (i === 2) {
            alergies.push(`+ ${splitedAlergy.length - 2}`);
          }
        });

        const splitedEspecialty = ESPECIALIDADE?.split(";").filter((item) => !!item);
        const especialties = [];
        splitedEspecialty?.forEach((item, i) => {
          if (i <= 1) {
            const especialty = limitName(item, 1);
            especialties.push(especialty);
          } else if (i === 2) {
            especialties.push(`+ ${splitedEspecialty.length - 2}`);
          }
        });

        return {
          ...internation,
          DISPOSITIVO: dispositives,
          DIETA: diets,
          ALERGIA: alergies,
          ESPECIALIDADE: especialties,
        }
      });

      return {
        totalPage,
        hospitalizations
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return {
    getRooms,
    getInternalTransfer,
    getFastingPatients,
    getDietChange,
    getAbsencePrescription,
    getAllergyAlert,
    getScreeningNotPerformed,
    getAnthropometricEvaluation,
    getNutritionalEvolution,
    getHospitalizations,
  };
}

export default useBedsSituation;
