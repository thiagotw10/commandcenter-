import { axios } from "./api";

function usePredictedHighs() {
  async function getPredictedHighs() {
    try {
      const response = await axios.get("predicted_highs");
      const json = response.data.predicted_highs;
      const responseTot = await axios.get("total_beds");
      const jsonTot = responseTot.data.total_beds.filter(
        (bed) => bed.CD_UNID_INT === "TOTAL"
      )[0];

      return {
        medc: {
          dataOne: json[1].QTD_ALTAS_HOSPITALAR,
          dataTwo: json[0].QTD_ALTAS_HOSPITALAR,
        },
        pMedc: {
          data: json[2].QTD_ALTAS_HOSPITALAR,
        },
        totOcupation: {
          dataOne:
            jsonTot.LEITOS_OCUPADOS -
            json[3].QTD_ALTAS_HOSPITALAR +
            json[5].QTD_ALTAS_HOSPITALAR,
          dataTwo: jsonTot.LEITOS_INSTALADOS,
        },
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return {
    getPredictedHighs,
  };
}

export default usePredictedHighs;
