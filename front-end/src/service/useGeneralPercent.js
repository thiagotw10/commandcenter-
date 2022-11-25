import { axios } from "./api";

function useGeneralPercent() {
  async function getGeneralPercent() {
    try {
      const response = await axios.get("total_beds_percent_unit");
      const json = response.data.total_beds_percent_unit;

      const percents = json.reduce((acc, { TIPO, OCUPACAO }) => {
        const obj = { ...acc, [TIPO]: OCUPACAO };
        return obj;
      }, {});

      return {
        percents,
      };
    } catch (error) {
      throw new Error();
    }
  }

  async function getTotalUnit() {
    try {
      const response = await axios.get("total_beds_percent_general");
      const totalUnit = response.data.total_beds_percent_general[0];

      return {
        totalUnit: {
          ...totalUnit,
          TOH_ON_LINE: `${Math.round(totalUnit.TOH_ON_LINE.replace("%", ""))}%`
        },
      };
    } catch (error) {
      throw new Error();
    }
  }

  return {
    getGeneralPercent,
    getTotalUnit
  };
}

export default useGeneralPercent;
