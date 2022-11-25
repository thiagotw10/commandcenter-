import { axios } from "./api";

function useOperatedPatients() {
  async function getOperatedPatients() {
    try {
      const response = await axios.get("patients/operated");
      const json = response.data.operated_patients;

      let operations = json.map(({ ELETIVOS, URGENTES, DT_REALIZACAO }) => ({
        eletivo: ELETIVOS,
        urgencia: URGENTES,
        data: DT_REALIZACAO.slice(0, 5),
      }));

      return {
        totOperated: json[0] ? json[0].TOTAL_MES : 0,
        operations,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return {
    getOperatedPatients,
  };
}

export default useOperatedPatients;
