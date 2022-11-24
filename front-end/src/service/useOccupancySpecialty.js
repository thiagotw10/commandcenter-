import { axios } from "./api";

function useOccupancySpecialty() {
  async function getOccupancySpecialty(unit, accommodation, specialty) {
    const endPoint = "occupancy_per_specialty";
    const isfilter =
      unit !== "-" || !!specialty !== "-" || !!accommodation !== "-";
    const filterUnit = unit !== "-" ? "unit=" + unit + "&" : "";
    const filterSpecialty =
      specialty !== "-" ? "specialty=" + specialty + "&" : "";
    const filterAccommodation =
      accommodation !== "-" ? "accommodation=" + accommodation + "&" : "";

    try {
      const responseOne = await axios.get(
        endPoint +
          (isfilter ? "?" : "") +
          filterUnit +
          filterSpecialty +
          filterAccommodation
      );
      const responseTwo = await axios.get(
        "occupancy_per_specialty?filters=all"
      );
      const occupancySpecialty = responseOne.data.occupancy_per_specialty;
      const filters = responseTwo.data.filters;

      const specialties = occupancySpecialty.map(
        ({
          ESP,
          DS_TIP_ACOM,
          TOTAL_VAGO,
          TOTAL_RESERVADO,
          TOTAL_OCUPADO,
          TOTAL_LIMPEZA,
          TOTAL_MANUTENCAO,
          TOTAL,
        }) => {
          return {
            ESP: ESP ? ESP : "-",
            DS_TIP_ACOM,
            VAGO: TOTAL_VAGO ? TOTAL_VAGO : "-",
            RESERVA: TOTAL_RESERVADO ? TOTAL_RESERVADO : "-",
            OCUPADO: TOTAL_OCUPADO ? TOTAL_OCUPADO : "-",
            LIMPEZA: TOTAL_LIMPEZA ? TOTAL_LIMPEZA : "-",
            MANUTENCAO: TOTAL_MANUTENCAO ? TOTAL_MANUTENCAO : "-",
          };
        }
      );

      return {
        specialties,
        filters,
      };
    } catch (error) {
      throw new Error();
    }
  }

  return {
    getOccupancySpecialty,
  };
}

export default useOccupancySpecialty;
