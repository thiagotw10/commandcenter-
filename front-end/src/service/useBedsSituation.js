import { axios } from "./api";

function useBedsSituation() {
  async function getBedsSituation() {
    try {
      const responseSituations = await axios.get(
        `beds_situation?quantitative=true`
      );
      const jsonSituations = responseSituations.data.beds_situation;

      const situations = [
        {
          title: "Leitos Vagos",
          value: 0,
          color: "text-white",
          tooltip: "Este card mostra o quantitativo de leitos vagos, ou seja, que estão liberados para receber pacientes"
        }, {
          title: "Reservados",
          value: 0,
          color: "text-indigo-450",
          tooltip: "Este card mostra o quantitativo de leitos que foram reservados para internar os pacientes mediante a pré-internação"
        }, {
          title: "Alta Médica",
          value: 0,
          color: "text-gray-400",
          tooltip: "Este card mostra os quantitativos de pacientes que receberam alta medica após as 00:00 do dia vigente"
        }, {
          title: "Alta Hospitalar",
          value: 0,
          color: "text-yellow-400",
          tooltip: "Este card mostra os quantitativos de pacientes que receberam alta hospitalar após terem recebido a alta médica"
        }, {
          title: "Higienização",
          value: 0,
          color: "text-blue-500",
          tooltip: "Este card mostra os quantitativos de leitos que foram higienizados"
        }, {
          title: "Manutenção",
          value: 0,
          color: "text-green-500",
          tooltip: "Este card mostra os quantitativos de leitos que estão em Interditado/Bloqueado/Manutenção"
        }, {
          title: "Interditado Temp.",
          value: 0,
          color: "text-brown-450",
          tooltip: "Este card mostra os quantitativos de leitos que estão em interditados temporariamente"
        }
      ];

      jsonSituations.forEach(({ name, qtde }) => {
        if (name === "VAGO") {
          situations[0].value = qtde;
        } else if (name === "RESERVADO") {
          situations[1].value = qtde;
        } else if (name === "ALTA MEDICA") {
          situations[2].value = qtde;
        } else if (name === "ALTA HOSPITALAR") {
          situations[3].value = qtde;
        } else if (name === "HIGIENIZACAO") {
          situations[4].value = qtde;
        } else if (name === "MANUTENCAO") {
          situations[5].value = qtde;
        } else if (name === "INTERD. TEMP.") {
          situations[6].value = qtde;
        }
      });

      return {
        formatedSituations: situations,
        situations: jsonSituations,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getQuantitativeSituations() {
    try {
      const response = await axios.get("quantitative_situations");
      const json = response.data.quantitative_situations;

      return {
        situations: json,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return {
    getBedsSituation,
    getQuantitativeSituations
  };
}

export default useBedsSituation;
