import { axios } from "./api";

function useTimeTriages() {
  async function getTimeTriages() {
    try {
      const response = await axios.get("time_triage");
      const json = response.data;
      const triages = json.results;

      const screening = triages[0].EM_ESPERA_TRIAGEM;
      const waitingScr = triages[2].MAIOR_TEMPO_TRIAGEM;
      const waitRes = triages[1].MAIOR_TEMPO;

      return {
        screening,
        waitingScr,
        waitRes,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return {
    getTimeTriages,
  };
}

export default useTimeTriages;
