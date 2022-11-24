import { axios } from "./api";

function useUnitBeds() {
  async function getUnitBeds(unit, page, limit) {
    try {
      const response = await axios.get(
        `occupancy_per_unit?unit=${unit}&page=${page}&limitItens=${limit}`
      );
      const json = response.data;
      const unitBeds = json.beds[0] ? json.beds[0].result : [];
      const totPages = json.beds[0] ? json.beds[0].totalPage : 0;

      return {
        unitBeds,
        totPages,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return {
    getUnitBeds,
  };
}

export default useUnitBeds;
