import { axios } from "./api";

function useInternations() {
  async function getInternations() {
    try {
      const response = await axios.get("internments/on_day_and_previous");
      const json = response.data.internments_on_day_and_previous;

      return {
        inDay: json[0].QUANT,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return {
    getInternations,
  };
}

export default useInternations;
