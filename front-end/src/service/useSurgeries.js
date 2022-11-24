import { axios } from "./api";

function useSurgeries() {
  const path = "surgeries";

  async function getSurgeries() {
    try {
      const response = await axios.get(path);
      const json = response.data.surgeries;

      return {
        surgeriesMonth: json[0].TOTAL_PACIENTES_OPERADOS,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getUnusualSurgeries(filter, page, limit) {
    try {
      const response = await axios.get(
        path +
        `/unusual_or_major_surgeries_scheduled?filter=${filter}&page=${page}&limitItens=${limit}`
      );
      const json = response.data.unusual_or_major_surgeries_scheduled;
      const total = json.total_itens;
      const totalPage = json.totalPage;
      const surgeries = json.result;

      return {
        totalPage,
        total,
        surgeries,
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return {
    getSurgeries,
    getUnusualSurgeries,
  };
}

export default useSurgeries;
