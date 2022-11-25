import { axios } from "./api";

function useHospitalizationUIUTI() {
  async function getHospitalizationUIUTI() {
    try {
      const response = await axios.get("hospitalization_ui_uti");
      const json = response.data.hospitalization_ui_uti;

      const UI = json[0]?.QTD || 0;
      const UTI = json[1]?.QTD || 0;

      return {
        UI,
        UTI,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return {
    getHospitalizationUIUTI,
  };
}

export default useHospitalizationUIUTI;
