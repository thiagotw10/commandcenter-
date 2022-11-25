import { axios } from "./api";

function useTotalBeds() {
  async function getTotalBeds() {
    try {
      const responseOne = await axios.get("total_beds");
      const responseTwo = await axios.get("total_beds/percent");
      const percent =
        responseTwo.data.total_beds_percent[0].PERCENTAGEM_OCUPACAO;
      const json = responseOne.data.total_beds;
      const totalBeds = json.filter((bed) => bed.CD_UNID_INT === "TOTAL")[0];

      return {
        percent,
        totBed: {
          dataOne: totalBeds.LEITOS_OCUPADOS,
          dataTwo: totalBeds.LEITOS_INSTALADOS,
        },
      };


    } catch (error) {
      throw new Error();
    }
  }

  return {
    getTotalBeds,
  };
}

export default useTotalBeds;
