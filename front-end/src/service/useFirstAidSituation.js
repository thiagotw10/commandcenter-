import { axios } from "./api";

function useFirstAidSituation() {
  async function getFirstAidSituation(page, limit) {
    try {
      const response = await axios.get(`first_aid_stations_beds_situation?page=${page}&limitItens=${limit}`);
      const json = response.data;
      const { result, totalPage } = json.first_aid_stations_beds_situation;

      return {
        fsaSituations: result,
        totalPage,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return {
    getFirstAidSituation,
  };
}

export default useFirstAidSituation;
