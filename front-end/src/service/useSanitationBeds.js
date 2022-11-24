import { axios } from "./api";

function useSanitationBeds() {
  async function getSanitationBeds() {
    try {
      const response = await axios.get("sanitation_beds");
      const json = response.data.sanitation_beds;

      const higienEnded = json.filter(
        (value) => value.LEITO === "HIGIENIZADO DIA"
      );
      const higienNotEnded = json.filter(
        (value) => value.LEITO !== "HIGIENIZADO DIA"
      );
      const timesEnded = !!higienEnded.length ? higienEnded.map((value) => value.TEMPO) : ["00:00:00"];

      return {
        higienEnded,
        higienNotEnded,
        timesEnded,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return {
    getSanitationBeds,
  };
}

export default useSanitationBeds;
