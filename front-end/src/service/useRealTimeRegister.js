import { axios } from "./api";

function useRealTimeRegister() {
  async function getRealTimeRegister() {
    try {
      const response = await axios.get("real_time_register");
      const json = response.data;
      let realTimeRes = json.real_time_register;

      realTimeRes = realTimeRes.map((register) => {
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
        realTimeRes,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return {
    getRealTimeRegister,
  };
}

export default useRealTimeRegister;
