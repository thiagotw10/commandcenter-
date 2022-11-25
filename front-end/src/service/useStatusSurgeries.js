import { axios } from "./api";

function useStatusSurgeries() {
  async function getStatusSurgeries() {
    try {
      const response = await axios.get("surgeries_schedules_aborteds");
      const json = response.data.surgeries_schedules_aborteds;

      const agendado = [];
      const realizado = [];
      const cancelado = [];
      const status = [];

      json.forEach(({ STATUS, QUANTIDADE, ...obj }) => {
        if (STATUS === "TOTAL_AGENDADO") {
          agendado.push({
            agendado: QUANTIDADE,
            dia: obj["TO_CHAR(DATA_EVENTO,'DD/MM/YYYY')"].slice(0, 5),
          });
        } else if (STATUS === "TOTAL_REALIZADO") {
          realizado.push({
            realizado: QUANTIDADE,
          });
        } else if (STATUS === "TOTAL_CANCELADO") {
          cancelado.push({
            cancelado: QUANTIDADE,
          });
        }
      });

      for (let i = 0; agendado.length > i; i++) {
        status.push({ ...agendado[i], ...realizado[i], ...cancelado[i] });
      }

      return {
        status,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return {
    getStatusSurgeries,
  };
}

export default useStatusSurgeries;
