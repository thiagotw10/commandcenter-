import { axios } from "./api";

function useWaitForPediatric() {
  async function getWaitForPediatric() {
    try {
      const response = await axios.get("wait_for_pediatric_care");
      const json = response.data;
      let waitPediatric = json.wait_for_pediatric_care;

      waitPediatric = waitPediatric.map((register) => {
        if (register.CLASSIFICACAO === "VERDE") {
          return { ...register, color: "#00F519" };
        } else if (register.CLASSIFICACAO === "VERMELHA") {
          return { ...register, color: "#FF0606" };
        } else if (register.CLASSIFICACAO === "AMARELA") {
          return { ...register, color: "#DDFF12" };
        } else if (register.CLASSIFICACAO === "LARANJA") {
          return { ...register, color: "#F56700" };
        } else if (register.CLASSIFICACAO === "AZUL") {
          return { ...register, color: "#000AF5" };
        }

        return "";
      });

      return {
        waitPediatric,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return {
    getWaitForPediatric,
  };
}

export default useWaitForPediatric;
