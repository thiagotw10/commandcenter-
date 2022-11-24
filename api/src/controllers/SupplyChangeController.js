process.env.ORA_SDTZ = "UTC";
const client = require("../config/redisconfig");

function calcPercent(small, larger) {
  if (small > 0) {
    return Math.round(((small / larger) * 100));
  } else {
    return 0;
  }
}

function paginator(array, page, limit) {
  const result = [];
  const totalPage = Math.ceil(array.length / limit);
  let count = page * limit - limit;
  const delimiter = count + limit;

  if (page <= totalPage) {
    for (let i = count; i < delimiter; i++) {
      if (array[i] != null) {
        result.push(array[i]);
      }
      count++;
    }
  }

  return {
    totalPage: totalPage,
    pageActual: page,
    result: result,
  };
}

module.exports = {
  async service_time_analysis(req, res) {
    const pattern = req.query.pattern === "true" ? true : false;

    try {
      if (pattern) {
        const result = JSON.parse(await client.get("service_time_analysis_pattern"));
        const { service_time_analysis_pattern, ...newResult } = result;
        newResult.service_time_analysis = service_time_analysis_pattern;
        return res.json(newResult);
      } else {
        const result = JSON.parse(await client.get("service_time_analysis"));
        return res.json(result);
      }
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async total_opens_solic(req, res) {
    const pattern = req.query.pattern === "true" ? true : false;

    try {
      if (pattern) {
        const result = JSON.parse(await client.get("total_opens_solic_pattern"));
        const { total_opens_solic_pattern, ...newResult } = result;
        newResult.total_opens_solic = total_opens_solic_pattern;
        return res.json(newResult);
      } else {
        const result = JSON.parse(await client.get("total_opens_solic"));
        return res.json(result);
      }
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async weekly_goal(req, res) {
    const pattern = req.query.pattern === "true" ? true : false;

    try {
      let result;
      let weeks = [];

      if (pattern) {
        const { weekly_goal_pattern, ...weekly } = JSON.parse(await client.get("weekly_goal_pattern"));
        weekly.weekly_goal = weekly_goal_pattern;

        const weekPattern1 = JSON.parse(await client.get("week1_pattern"));
        const weekPattern2 = JSON.parse(await client.get("week2_pattern"));
        const weekPattern3 = JSON.parse(await client.get("week3_pattern"));
        const weekPattern4 = JSON.parse(await client.get("week4_pattern"));
        const weekPattern5 = JSON.parse(await client.get("week5_pattern"));
        weeks = [weekPattern1, weekPattern2, weekPattern3, weekPattern4, weekPattern5];

        result = weekly;
      } else {
        result = JSON.parse(await client.get("weekly_goal"));

        const week1 = JSON.parse(await client.get("week1"));
        const week2 = JSON.parse(await client.get("week2"));
        const week3 = JSON.parse(await client.get("week3"));
        const week4 = JSON.parse(await client.get("week4"));
        const week5 = JSON.parse(await client.get("week5"));
        weeks = [week1, week2, week3, week4, week5];
      }

      const formatedWeeklyGoal = [];
      let currentWeek = result.weekly_goal[0].SEMANA;
      let currentPercent = result.weekly_goal[0].PERCENTUAL_ATENDIDO;
      let totalWeek = 0;
      let lockedWeek = 0;
      let total_month = 0;
      let locked_month = 0;

      result.weekly_goal.forEach(({ TIPO, SEMANA, QT_SOLIC, PERCENTUAL_ATENDIDO }, index, array) => {
        const endLoop = index === (array.length - 1);

        if (SEMANA === currentWeek) {
          totalWeek += QT_SOLIC;
          total_month += QT_SOLIC;

          if (TIPO === "FECHADO") {
            lockedWeek += QT_SOLIC;
            locked_month += QT_SOLIC;
          }
        }

        if (SEMANA !== currentWeek || endLoop) {
          formatedWeeklyGoal.push({
            week: "Sm" + currentWeek,
            percent: !!weeks[currentWeek - 1] ? Math.round(weeks[currentWeek - 1]) : Math.round(currentPercent),
          });

          currentWeek = SEMANA;
          currentPercent = PERCENTUAL_ATENDIDO;
          totalWeek = 0;
          lockedWeek = 0;
          totalWeek += QT_SOLIC;
          total_month += QT_SOLIC;
        }
      });

      result.weekly_goal = {
        total_month,
        locked_month,
        result: formatedWeeklyGoal,
      };

      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async authorized_purchase_order(req, res) {
    const pattern = req.query.pattern === "true" ? true : false;

    try {
      if (pattern) {
        const { authorized_purchase_order_pattern, ...newResult } = JSON.parse(await client.get("authorized_purchase_order_pattern"));
        newResult.authorized_purchase_order = authorized_purchase_order_pattern;
        return res.json(newResult);
      } else {
        const result = JSON.parse(await client.get("authorized_purchase_order"));
        return res.json(result);
      }
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async purchase_order_with_and_without_invoice(req, res) {
    const pattern = req.query.pattern === "true" ? true : false;

    try {
      if (pattern) {
        const result = JSON.parse(await client.get("purchase_order_with_and_without_invoice_pattern"));
        const { purchase_order_with_and_without_invoice_pattern, ...newResult } = result;
        newResult.purchase_order_with_and_without_invoice = purchase_order_with_and_without_invoice_pattern.map((order) => {
          order.VALOR_TOTAL = Number(order.VALOR_TOTAL);
          return order;
        });
        return res.json(newResult);
      } else {
        const result = JSON.parse(await client.get("purchase_order_with_and_without_invoice"));
        result.purchase_order_with_and_without_invoice = result.purchase_order_with_and_without_invoice.map((order) => {
          order.VALOR_TOTAL = Number(order.VALOR_TOTAL);
          return order;
        });
        return res.json(result);
      }
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async open_and_completed_purchase_requests(req, res) {
    const pattern = req.query.pattern === "true" ? true : false;

    try {
      if (pattern) {
        const result = JSON.parse(await client.get("open_and_completed_purchase_requests_pattern"));
        const { open_and_completed_purchase_requests_pattern, ...newResult } = result;
        newResult.open_and_completed_purchase_requests = open_and_completed_purchase_requests_pattern;

        return res.json(newResult);
      } else {
        const result = JSON.parse(await client.get("open_and_completed_purchase_requests"));
        return res.json(result);
      }
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async top_10_requested_items(req, res) {
    const pattern = req.query.pattern === "true" ? true : false;

    try {
      if (pattern) {
        const result = JSON.parse(await client.get("top_10_requested_items_pattern"));
        const { top_10_requested_items_pattern, ...newResult } = result;
        newResult.top_10_requested_items = top_10_requested_items_pattern;

        return res.json(newResult);
      } else {
        const result = JSON.parse(await client.get("top_10_requested_items"));
        return res.json(result);
      }
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async foloow_up_weekly(req, res) {
    try {
      const delivered = JSON.parse(await client.get("foloow_up_weekly_others")).foloow_up_weekly_others;
      const pending = JSON.parse(await client.get("foloow_up_weekly_pending")).foloow_up_weekly_pending;
      const { foloow_up_weekly_Total, active, last_update } = JSON.parse(await client.get("foloow_up_weekly_Total"));

      return res.json({
        active,
        last_update,
        foloow_up_weekly: {
          delivered,
          pending,
          total: foloow_up_weekly_Total
        }
      });

    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async stock_listing_items_abc_curve(req, res) {
    const pattern = req.query.pattern === "true" ? true : false;
    const stock = Number.parseInt(req.query.stock) || 1;
    const page = Number.parseInt(req.query.page) || 1;
    const limitItens = Number.parseInt(req.query.limitItens) || 1;

    try {
      if (pattern) {
        const result = JSON.parse(await client.get("stock_listing_items_standard_abc_curve"));
        const { stock_listing_items_standard_abc_curve, ...newResult } = result;

        const filteredStock = stock_listing_items_standard_abc_curve.filter((item) => {
          return item.CD_ESTOQUE === stock && item.SITUACAO.includes("CRITICO"); 
        });
        newResult.stock_listing_items_abc_curve = paginator(filteredStock, page, limitItens);

        return res.json(newResult);
      } else {
        const result = JSON.parse(await client.get("stock_listing_items_nom_standard_abc_curve"));
        const { stock_listing_items_nom_standard_abc_curve, ...newResult } = result;

        const filteredStock = stock_listing_items_nom_standard_abc_curve.filter((item) => {
          return item.CD_ESTOQUE === stock && item.SITUACAO.includes("CRITICO"); 
        });
        newResult.stock_listing_items_abc_curve = paginator(filteredStock, page, limitItens);

        return res.json(newResult);
      }
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async stock_items_curve_abc(req, res) {
    const pattern = req.query.pattern === "true" ? true : false;
    const stock = Number.parseInt(req.query.stock) || 1;

    try {
      if (pattern) {
        const result = JSON.parse(await client.get("stock_items_curve_abc_standard"));
        const { stock_items_curve_abc_standard, ...newResult } = result;

        const filteredStock = stock_items_curve_abc_standard.filter((item) => item.CD_ESTOQUE === stock);

        newResult.stock_items_curve_abc = filteredStock;
        return res.json(newResult);
      } else {
        const result = JSON.parse(await client.get("stock_items_curve_abc_non_standard"));
        const { stock_items_curve_abc_non_standard, ...newResult } = result;

        const filteredStock = stock_items_curve_abc_non_standard.filter((item) => item.CD_ESTOQUE === stock);
        newResult.stock_items_curve_abc = filteredStock;

        return res.json(newResult);
      }
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async total_stock(req, res) {
    const pattern = req.query.pattern === "true" ? true : false;
    const stock = Number.parseInt(req.query.stock) || 1;

    try {
      if (pattern) {
        const result = JSON.parse(await client.get("total_standard_stock"));
        const { total_standard_stock, ...newResult } = result;

        const filteredStock = total_standard_stock.filter((item) => item.CD_ESTOQUE === stock);
        newResult.total_stock = filteredStock[0] || null;

        return res.json(newResult);
      } else {
        const result = JSON.parse(await client.get("total_non_standard_stock"));
        const { total_non_standard_stock, ...newResult } = result;

        const filteredStock = total_non_standard_stock.filter((item) => item.CD_ESTOQUE === stock);
        newResult.total_stock = filteredStock[0] || null;

        return res.json(newResult);
      }
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async validity_control_listing(req, res) {
    const pattern = req.query.pattern === "true" ? true : false;
    const stock = Number.parseInt(req.query.stock) || 1;
    const page = Number.parseInt(req.query.page) || 1;
    const limitItens = Number.parseInt(req.query.limitItens) || 1;

    try {
      if (pattern) {
        const result = JSON.parse(await client.get("standard_validity_control_listing"));
        const { standard_validity_control_listing, ...newResult } = result;

        const filteredStock = standard_validity_control_listing.filter((item) => {
          return item.CD_ESTOQUE === stock && item.SITUACAO.includes("CRITICO"); 
        });
        newResult.validity_control_listing = paginator(filteredStock, page, limitItens);

        return res.json(newResult);
      } else {
        const result = JSON.parse(await client.get("non_standard_validity_control_listing"));
        const { non_standard_validity_control_listing, ...newResult } = result;

        const filteredStock = non_standard_validity_control_listing.filter((item) => {
          return item.CD_ESTOQUE === stock && item.SITUACAO.includes("CRITICO"); 
        });
        newResult.validity_control_listing = paginator(filteredStock, page, limitItens);

        return res.json(newResult);
      }
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async total_stock_by_validity_control(req, res) {
    const pattern = req.query.pattern === "true" ? true : false;
    const stock = Number.parseInt(req.query.stock) || 1;

    try {
      if (pattern) {
        const result = JSON.parse(await client.get("total_stock_by_standard_validity_control"));
        const { total_stock_by_standard_validity_control, ...newResult } = result;

        const filteredStock = total_stock_by_standard_validity_control.filter((item) => item.CD_ESTOQUE === stock);
        newResult.total_stock_by_validity_control = filteredStock[0] || null;

        return res.json(newResult);
      } else {
        const result = JSON.parse(await client.get("total_stock_by_non_standard_validity_control"));
        const { total_stock_by_non_standard_validity_control, ...newResult } = result;

        const filteredStock = total_stock_by_non_standard_validity_control.filter((item) => item.CD_ESTOQUE === stock);
        newResult.total_stock_by_validity_control = filteredStock[0] || null;

        return res.json(newResult);
      }
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async quantity_items_validity_control_abc(req, res) {
    const pattern = req.query.pattern === "true" ? true : false;
    const stock = Number.parseInt(req.query.stock) || 1;

    try {
      if (pattern) {
        const result = JSON.parse(await client.get("quantity_items_validity_control_standard_abc"));
        const { quantity_items_validity_control_standard_abc, ...newResult } = result;

        const filteredStock = quantity_items_validity_control_standard_abc.filter((item) => item.CD_ESTOQUE === stock);
        newResult.quantity_items_validity_control_abc = filteredStock;

        return res.json(newResult);
      } else {
        const result = JSON.parse(await client.get("quantity_items_validity_control_non_standard_abc"));
        const { quantity_items_validity_control_non_standard_abc, ...newResult } = result;

        const filteredStock = quantity_items_validity_control_non_standard_abc.filter((item) => item.CD_ESTOQUE === stock);
        newResult.quantity_items_validity_control_abc = filteredStock;

        return res.json(newResult);
      }
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async items_with_greater_variation(req, res) {
    const page = Number.parseInt(req.query.page) || 1;
    const limitItens = Number.parseInt(req.query.limitItens) || 1;

    try {
      const result = JSON.parse(await client.get("items_with_greater_variation"));
      const { items_with_greater_variation } = result;

      result.items_with_greater_variation = paginator(items_with_greater_variation, page, limitItens);
      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async pending_requests(req, res) {
    const page = Number.parseInt(req.query.page) || 1;
    const limitItens = Number.parseInt(req.query.limitItens) || 1;

    try {
      const result = JSON.parse(await client.get("pending_requests"));
      const { pending_requests } = result;

      const formatedRequests = pending_requests.map((request) => {
        request.ITENS = request.ITENS?.split("\n");
        return request;
      });
      result.pending_requests = paginator(formatedRequests, page, limitItens);
      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async stock_days_5d(req, res) {
    const page = Number.parseInt(req.query.page) || 1;
    const limitItens = Number.parseInt(req.query.limitItens) || 1;

    try {
      const result = JSON.parse(await client.get("stock_days_5d"));
      const { stock_days_5d } = result;

      result.stock_days_5d = paginator(stock_days_5d, page, limitItens);
      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  async stock_filters(req, res) {
    try {
      const result = JSON.parse(await client.get("stock_filters"));
      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
};