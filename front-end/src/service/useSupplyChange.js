import { axios } from "./api";
import { format, sub } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import useUtilities from "./useUtilities";

function calcPercent(small, larger) {
  if (small > 0 && larger > 0) {
    return Math.round(((small / larger) * 100));
  } else {
    return 0;
  }
}

function useSupplyChange() {
  const path = "/supply_change";
  const pathWeeklyGoals = "/weekly_goal";
  const pathServiceTime = "/service_time_analysis";
  const pathInvoice = "/purchase_order_with_and_without_invoice";
  const pathPurchaseOrder = "/authorized_purchase_order";
  const pathPurchaseRequests = "/open_and_completed_purchase_requests";
  const pathTopItems = "/top_10_requested_items";
  const pathPurchaseItems = "/foloow_up_weekly";
  const pathListingItems = "/stock_listing_items_abc_curve";
  const pathStockItems = "/stock_items_curve_abc";
  const pathTotalStock = "/total_stock";
  const pathValidity = "/validity_control_listing";
  const pathTotalValidity = "/total_stock_by_validity_control";
  const pathValidityItems = "/quantity_items_validity_control_abc";
  const { toBRL } = useUtilities();

  async function getWeeklyGoals(pattern) {
    try {
      const response = await axios.get(
        path + pathWeeklyGoals + `?pattern=${pattern}`
      );
      const weeklyGoals = response.data.weekly_goal.result;
      const { total_month, locked_month } = response.data.weekly_goal;
      return { weeklyGoals, total_month, locked_month };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getSolicitationsMonth(pattern) {
    try {
      const response = await axios.get(
        path + `/total_opens_solic?pattern=${pattern}`
      );
      const json = response.data;
      const solicitations = json.total_opens_solic[0];

      return { solicitations };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getServiceTime(pattern) {
    try {
      const response = await axios.get(
        path + pathServiceTime + `?pattern=${pattern}`
      );
      const serviceTime = response.data.service_time_analysis;
      return { serviceTime };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getInvoice(pattern) {
    try {
      const response = await axios.get(
        path + pathInvoice + `?pattern=${pattern}`
      );
      const json = response.data.purchase_order_with_and_without_invoice;
      const result = json.reduce(
        (acc, { TIPO, QTD_ORDEM_COMPRAS, VALOR_TOTAL }) => {
          if (TIPO === "ATENDIDO") {
            acc.quantityInvoice = QTD_ORDEM_COMPRAS;
            acc.totalInvoice = Math.round(VALOR_TOTAL);
          } else if (TIPO === "PREVISTO") {
            acc.quantityNoInvoice = QTD_ORDEM_COMPRAS;
            acc.totalNoInvoice = Math.round(VALOR_TOTAL);
          }

          acc.totalQuantity += QTD_ORDEM_COMPRAS;
          acc.totalValue += Math.round(VALOR_TOTAL);

          return acc;
        },
        {
          quantityInvoice: 0,
          totalInvoice: 0,
          quantityNoInvoice: 0,
          totalNoInvoice: 0,
          totalQuantity: 0,
          totalValue: 0,
        }
      );
      return {
        result,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getPurchaseOrder(pattern) {
    try {
      const response = await axios.get(
        path + pathPurchaseOrder + `?pattern=${pattern}`
      );
      const json = response.data.authorized_purchase_order;
      const result = json.reduce((acc, { SITUACAO, QTD_ORDEM_COMPRAS, VALOR_TOTAL }) => {
        if (SITUACAO === "AUTORIZADA") {
          acc.quantityAuthorized = QTD_ORDEM_COMPRAS;
          acc.totalAuthorized = Math.round(VALOR_TOTAL);
        } else if (SITUACAO === "PENDENTE AUTORIZACAO") {
          acc.quantityNoAuthorized = QTD_ORDEM_COMPRAS;
          acc.totalNoAuthorized = Math.round(VALOR_TOTAL);
        }

        acc.totalQuantity += QTD_ORDEM_COMPRAS;
        acc.totalValue += Math.round(VALOR_TOTAL);

        return acc;
      },
        {
          quantityAuthorized: 0,
          totalAuthorized: 0,
          quantityNoAuthorized: 0,
          totalNoAuthorized: 0,
          totalQuantity: 0,
          totalValue: 0,
        }
      );

      return {
        result,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getPurchaseRequests(pattern) {
    try {
      const response = await axios.get(
        path + pathPurchaseRequests + `?pattern=${pattern}`
      );
      const json = response.data.open_and_completed_purchase_requests;
      const result = json.reduce(
        (acc, { TIPO, QT_SOLIC, VL_TOTAL }) => {
          if (TIPO === "ABERTO") {
            acc.quantityOpen = QT_SOLIC;
            acc.totalOpen = Math.round(VL_TOTAL);
          } else if (TIPO === "FECHADO") {
            acc.quantityDone = QT_SOLIC;
            acc.totalDone = Math.round(VL_TOTAL);
          }

          acc.quantityRequests += QT_SOLIC;
          acc.totalValue += Math.round(VL_TOTAL);

          return acc;
        },
        {
          quantityOpen: 0,
          totalOpen: 0,
          quantityDone: 0,
          totalDone: 0,
          quantityRequests: 0,
          totalValue: 0,
        }
      );
      return {
        result,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getTopItems(pattern) {
    try {
      const response = await axios.get(
        path + pathTopItems + `?pattern=${pattern}`
      );
      const json = response.data.top_10_requested_items;
      const items = json.map(
        ({ RANK, CD_PRODUTO, DS_PRODUTO, TOTAL_DE_SOLICITACOES }) => ({
          cdProduct: CD_PRODUTO,
          rank: RANK.replace("o", ""),
          describe: DS_PRODUTO,
          itemsRequested: TOTAL_DE_SOLICITACOES,
        })
      );
      const [firstRank, ...outerRanks] = items;
      return { firstRank, outerRanks };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getPurchaseItems() {
    try {
      const response = await axios.get(path + pathPurchaseItems);
      const { delivered, pending, total } = response.data.foloow_up_weekly;

      const unicSectors = Array.from(new Set(total.map(({ DS_ESPECIE }) => DS_ESPECIE)));

      const percents = [];
      unicSectors.forEach((sector) => {
        let pending = 0;
        let delivered = 0;

        total.forEach((totalSector) => {
          if (sector === totalSector.DS_ESPECIE) {
            if (totalSector.TIPO === "PEND") {
              pending += totalSector.TOTAL_POR_ESPECIE;
            } else if (totalSector.TIPO === "ENTREGUE") {
              delivered += totalSector.TOTAL_POR_ESPECIE;
            }
          }
        });

        percents.push({
          sector,
          percent: calcPercent(delivered, delivered + pending)
        });
      });

      const days = [];

      for (let i = 7; i >= 1; i--) {
        const day = format(sub(new Date(), {
          years: 0,
          months: 0,
          weeks: 0,
          days: i,
          hours: 0,
          minutes: 0,
          seconds: 0
        }), "EEEE", { locale: ptBR });

        if (day === "segunda-feira") {
          days.push({
            title: "SEG",
            day: "segunda"
          });
        } else if (day === "terça-feira") {
          days.push({
            title: "TER",
            day: "terça"
          });
        } else if (day === "quarta-feira") {
          days.push({
            title: "QUA",
            day: "quarta"
          });
        } else if (day === "quinta-feira") {
          days.push({
            title: "QUI",
            day: "quinta"
          });
        } else if (day === "sexta-feira") {
          days.push({
            title: "SEX",
            day: "sexta"
          });
        } else if (day === "sábado") {
          days.push({
            title: "SAB",
            day: "sábado"
          });
        } else if (day === "domingo") {
          days.push({
            title: "DOM",
            day: "domingo"
          });
        }
      }

      const situations = percents.map(({ sector, percent }) => ({
        name: sector,
        percent,
        total: 0,
        weeklys: days.map(({ day, title }) => ({
          day,
          title,
          delivered: 0,
          pending: 0,
        }))
      }));

      pending.forEach((pending) => {
        situations.forEach((situation) => {
          if (situation.name === pending.DS_ESPECIE) {
            situation.weeklys.forEach((value, i) => {
              if (value.title === pending.DIA_SEMANA) {
                situation.weeklys[i].pending += pending.QTD_DO_DIA;
                situation.total += pending.QTD_DO_DIA;
              }
            });
          }
        });
      });

      delivered.forEach((delivered) => {
        situations.forEach((situation) => {
          if (situation.name === delivered.DS_ESPECIE) {
            situation.weeklys.forEach((value, i) => {
              if (value.title === delivered.DIA_SEMANA) {
                situation.weeklys[i].delivered += delivered.QTD;
              }
            });
          }
        });
      });

      situations.forEach((situation, i) => {
        situation.weeklys.forEach((weekly, index) => {
          situations[i].weeklys[index].pending = weekly.pending + (situations[i].weeklys[index - 1]?.pending || 0);
        });
      });

      return { fallowUpWeekly: situations };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getListingItems(pattern, page, limit, stock) {
    try {
      const response = await axios.get(
        path + pathListingItems + `?pattern=${pattern}&page=${page}&limitItens=${limit}&stock=${stock}`
      );
      const { totalPage, result } = response.data.stock_listing_items_abc_curve;

      const inventoryItems = result.map(({ DS_PRODUTO, CD_PRODUTO, QT_ESTOQUE_ATUAL }) => {
        const description = DS_PRODUTO.split(" ");
        return {
          CD_PRODUTO,
          DS_PRODUTO: description[0] + " " + (description[1] || "") + " " + (description[2] || ""),
          QT_ESTOQUE_ATUAL
        }
      });

      return { totalPage, inventoryItems };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getStockItems(pattern, stock) {
    try {
      const response = await axios.get(
        path + pathStockItems + `?pattern=${pattern}&stock=${stock}`
      );
      const json = response.data.stock_items_curve_abc;

      const items = [
        { situation: "1- CRITICO", name: "Crítico", A: 0, B: 0, C: 0 },
        { situation: "2- ATENCAO", name: "Atenção", A: 0, B: 0, C: 0 },
        { situation: "3- ABASTECIDO", name: "Abastecido", A: 0, B: 0, C: 0 },
        { situation: "4- EXCESSO", name: "Excesso", A: 0, B: 0, C: 0 },
      ];

      json.forEach(({ SITUACAO, TP_CLASSIFICACAO_ABC, TOTAL }) => {
        items.forEach((item) => {
          if (SITUACAO === item.situation) {
            if (TP_CLASSIFICACAO_ABC === "A") {
              item.A += TOTAL;
            } else if (TP_CLASSIFICACAO_ABC === "B") {
              item.B += TOTAL;
            } else if (TP_CLASSIFICACAO_ABC === "C") {
              item.C += TOTAL;
            }
          }
        });
      });

      return { items };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getTotalStock(pattern, stock) {
    try {
      const response = await axios.get(
        path + pathTotalStock + `?pattern=${pattern}&stock=${stock}`
      );
      const json = response.data.total_stock;
      const value = json?.VALOR_ESTOQUE || 0;
      const stockValue = toBRL(value);

      return { stockValue };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getTotalValidity(pattern, stock) {
    try {
      const response = await axios.get(
        path + pathTotalValidity + `?pattern=${pattern}&stock=${stock}`
      );
      const json = response.data.total_stock_by_validity_control;
      const value = json?.VALOR_ESTOQUE || 0;
      const validityValue = value?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });

      return { validityValue };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getValidityListingItems(pattern, page, limit, stock) {
    try {
      const response = await axios.get(
        path + pathValidity + `?pattern=${pattern}&page=${page}&limitItens=${limit}&stock=${stock}`
      );
      const { totalPage, result } = response.data.validity_control_listing;

      const validityItems = result.map(({ DS_PRODUTO, CD_PRODUTO, QTD_LOTE }) => {
        const description = DS_PRODUTO.split(" ");
        return {
          CD_PRODUTO,
          DS_PRODUTO: description[0] + " " + (description[1] || "") + " " + (description[2] || ""),
          QTD_LOTE
        }
      });

      return { totalPage, validityItems };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getValidityItems(pattern, stock) {
    try {
      const response = await axios.get(
        path + pathValidityItems + `?pattern=${pattern}&stock=${stock}`
      );
      const json = response.data.quantity_items_validity_control_abc;

      const items = [
        {
          situation: "1- CRITICO",
          name: "Crítico",
          A: { red: 0, yellow: 0, green: 0 },
          B: { red: 0, yellow: 0, green: 0 },
          C: { red: 0, yellow: 0, green: 0 }
        },
        {
          situation: "2- ATENCAO",
          name: "Atenção",
          A: { red: 0, yellow: 0, green: 0 },
          B: { red: 0, yellow: 0, green: 0 },
          C: { red: 0, yellow: 0, green: 0 }
        },
        {
          situation: "3- ABASTECIDO",
          name: "Abastecido",
          A: { red: 0, yellow: 0, green: 0 },
          B: { red: 0, yellow: 0, green: 0 },
          C: { red: 0, yellow: 0, green: 0 }
        },
        {
          situation: "4- EXCESSO",
          name: "Excesso",
          A: { red: 0, yellow: 0, green: 0 },
          B: { red: 0, yellow: 0, green: 0 },
          C: { red: 0, yellow: 0, green: 0 }
        },
      ];

      json.forEach(({ SITUACAO, TP_CLASSIFICACAO_ABC, TOTAL, COR }) => {
        items.forEach((item) => {
          if (SITUACAO === item.situation) {
            if (TP_CLASSIFICACAO_ABC === "A") {
              if (COR.split(" ")[1] === "VERMELHO") {
                item.A.red += TOTAL;
              } else if (COR.split(" ")[1] === "AMARELO") {
                item.A.yellow += TOTAL;
              } else if (COR.split(" ")[1] === "VERDE") {
                item.A.green += TOTAL;
              }
            } else if (TP_CLASSIFICACAO_ABC === "B") {
              if (COR.split(" ")[1] === "VERMELHO") {
                item.B.red += TOTAL;
              } else if (COR.split(" ")[1] === "AMARELO") {
                item.B.yellow += TOTAL;
              } else if (COR.split(" ")[1] === "VERDE") {
                item.B.green += TOTAL;
              }
            } else if (TP_CLASSIFICACAO_ABC === "C") {
              if (COR.split(" ")[1] === "VERMELHO") {
                item.C.red += TOTAL;
              } else if (COR.split(" ")[1] === "AMARELO") {
                item.C.yellow += TOTAL;
              } else if (COR.split(" ")[1] === "VERDE") {
                item.C.green += TOTAL;
              }
            }
          }
        });
      });

      return { items };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getStockFiveDays(page, limit) {
    try {
      const response = await axios.get(path + `/stock_days_5d?page=${page}&limitItens=${limit}`);
      const json = response.data.stock_days_5d;

      const totalPage = json.totalPage;
      const days = json.result;

      return {
        totalPage,
        days
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getPendingRequests(page, limit) {
    try {
      const response = await axios.get(path + `/pending_requests?page=${page}&limitItens=${limit}`);
      const json = response.data.pending_requests;

      const totalPage = json.totalPage;
      const requests = json.result;

      return {
        totalPage,
        requests
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getItemsWithVariation(page, limit) {
    try {
      const response = await axios.get(path + `/items_with_greater_variation?page=${page}&limitItens=${limit}`);
      const json = response.data.items_with_greater_variation;

      const totalPage = json.totalPage;
      const items = json.result;

      return {
        totalPage,
        items
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getStockFilters(page, limit) {
    try {
      const response = await axios.get(path + `/stock_filters?page=${page}&limitItens=${limit}`);
      const filters = response.data.stock_filters;

      return {
        filters
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return {
    getWeeklyGoals,
    getSolicitationsMonth,
    getServiceTime,
    getInvoice,
    getPurchaseOrder,
    getPurchaseRequests,
    getTopItems,
    getPurchaseItems,
    getListingItems,
    getStockItems,
    getTotalStock,
    getValidityListingItems,
    getTotalValidity,
    getValidityItems,
    getStockFiveDays,
    getPendingRequests,
    getItemsWithVariation,
    getStockFilters,
  };
}

export default useSupplyChange;
