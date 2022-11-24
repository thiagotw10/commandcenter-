import { axios } from "./api";

function useUnities() {
  async function getUnities() {
    try {
      const response = await axios.get("occupancy_per_unit?unit=all");
      const json = response.data;
      const unit = json.unities;

      return {
        unit,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return {
    getUnities,
  };
}

export default useUnities;
