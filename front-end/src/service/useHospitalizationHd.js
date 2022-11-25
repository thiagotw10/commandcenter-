import { axios } from "./api";

function useHospitalizationHd() {
  async function getHospitalizationHd() {
    try {
      const response = await axios.get("hd");
      const json = response.data.results;

      const hdThreeDays = json.hospitalization_day_and_next_3_days_hd;
      const dayOne = { hd: hdThreeDays[0] ? hdThreeDays[0].QTD : 0 };
      const dayTwo = { hd: hdThreeDays[1] ? hdThreeDays[1].QTD : 0 };
      const dayThree = { hd: hdThreeDays[2] ? hdThreeDays[2].QTD : 0 };

      const clinical = json.hospitalization_on_day_clinical;
      const surgerie = json.hospitalization_on_day_surgerie;
      const internationHd = json.hospitalization_on_day_hd;
      const internation = json.hospitalization_on_day_normal;

      return {
        hdThreeDays: [dayOne, dayTwo, dayThree],
        clinicalSurgerie: [clinical, surgerie],
        surgicalHd: [
          { internation: internationHd, label: "HD", fill: "url('#yellow')" },
          { internation, label: "Internações", fill: "url('#green')" },
        ],
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return {
    getHospitalizationHd,
  };
}

export default useHospitalizationHd;
