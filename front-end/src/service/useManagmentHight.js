import { axios } from "./api";
import useUtilities from "./useUtilities";

function useManagmentHight() {
  const { formatDate } = useUtilities();

  async function getManagmentHight() {
    try {
      const responseOne = await axios.get("managment_high_previous");
      const managment = responseOne.data.managment_high_previous;
      const responseTwo = await axios.get("managment_high_previous_upp");
      const managmentUpp = responseTwo.data.managment_high_previous_upp;

      const uppDates = [];
      managmentUpp.forEach((e) => {
        if (!uppDates.includes(formatDate(e.DATA_PREVISTA, "DM"))) {
          uppDates.push(formatDate(e.DATA_PREVISTA, "DM"));
        }
      });

      const upp = [0, 0, 0];
      managmentUpp.forEach((e) => {
        uppDates.forEach((uppDate, i) => {
          if (formatDate(e.DATA_PREVISTA, "DM") === uppDate) {
            if (e.TIPO === "ALTAS PREV UPP DIA") {
              upp[i]++;
            }
          }
        });
      });

      const altas = [];
      managment.forEach((e) => {
        if (!altas.includes(formatDate(e.DATA_PREVISTA, "DM"))) {
          altas.push(formatDate(e.DATA_PREVISTA, "DM"));
        }
      });
      const internacoes = [...altas];

      for (let i = 0; i < altas.length; i++) {
        altas[i] = { altas_prev: 0, upp: upp[i], dia: altas[i] };
      }

      for (let i = 0; i < internacoes.length; i++) {
        internacoes[i] = { internacoes_prev: 0, dia: internacoes[i] };
      }

      managment.forEach((e) => {
        altas.forEach((t) => {
          if (formatDate(e.DATA_PREVISTA, "DM") === t.dia) {
            if (e.TIPO === "ALTAS PREV PROX 3DIAS") {
              t.altas_prev++;
            }
          }
        });

        internacoes.forEach((o) => {
          if (formatDate(e.DATA_PREVISTA, "DM") === o.dia) {
            if (e.TIPO === "INTERNACOES PREV PROX 3DIAS") {
              o.internacoes_prev++;
            }
          }
        });
      });

      return {
        internations: internacoes,
        highs: altas,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return {
    getManagmentHight,
  };
}

export default useManagmentHight;
