import React from "react";
import { Helmet } from "react-helmet";
import {
  AsideInformations,
  BarGraphic,
  Footer,
  RoundedCard,
  RoundedGraphic,
  SolicitedItemsCard,
} from "../../components";
import { ReactComponent as CashBox } from "../../assets/svg/CashBox.svg";
import { ReactComponent as Open } from "../../assets/svg/Open.svg";
import { ReactComponent as Done } from "../../assets/svg/Done.svg";
import { ReactComponent as DoneInvoice } from "../../assets/svg/DoneInvoice.svg";
import { ReactComponent as Close } from "../../assets/svg/Close.svg";
import { Error, Loading } from "../../helper";
import useSupplyChange from "../../service/useSupplyChange";
import useUtilities from "../../service/useUtilities";

const SupplyChange = ({ type }) => {
  const timeInterval = 5000;
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [palette, setPalette] = React.useState();
  const [standardized, setStandardized] = React.useState();
  const [weeklyGoal, setWeeklyGoal] = React.useState();
  const [solics, setSolics] = React.useState();
  const [monthPercent, setMonthPercent] = React.useState();
  const [serviceTime, setServiceTime] = React.useState();
  const [invoice, setInvoice] = React.useState();
  const [purchaseOrder, setPurchaseOrder] = React.useState();
  const [purchaseRequest, setPurchaseRequest] = React.useState();
  const [topItems, setTopItems] = React.useState();
  const { toBRL } = React.useMemo(useUtilities, []);
  const {
    getWeeklyGoals,
    getSolicitationsMonth,
    getServiceTime,
    getInvoice,
    getPurchaseOrder,
    getPurchaseRequests,
    getTopItems,
  } = useSupplyChange();
  const refGetWeeklyGoals = React.useRef(getWeeklyGoals);
  const refGetSolicitationsMonth = React.useRef(getSolicitationsMonth);
  const refGetServiceTime = React.useRef(getServiceTime);
  const refGetInvoice = React.useRef(getInvoice);
  const refGetPurchaseOrder = React.useRef(getPurchaseOrder);
  const refGetPurchaseRequests = React.useRef(getPurchaseRequests);
  const refGetTopItems = React.useRef(getTopItems);

  React.useEffect(() => {
    const palleteStandardized = {
      main: "#0AA7FF",
      medium: "#47BDFF",
      light: "#7BC5FF",
      info: "#C377FF",
      success: "#37CC2F",
    };

    const palleteNotStandardized = {
      main: "#FF0A0A",
      medium: "#FF2E2E",
      light: "#FF3C3C",
      info: "#FFF62A",
      success: "#37CC2F",
    };

    if (type === "padronizado") {
      setPalette(palleteStandardized);
      setStandardized(true);
    } else if (type === "nao_padronizado") {
      setPalette(palleteNotStandardized);
      setStandardized(false);
    }
  }, [type]);

  // Weekly Goals Pattern
  React.useEffect(() => {
    async function executeRequest() {
      try {
        const { weeklyGoals, total_month, locked_month } =
          await refGetWeeklyGoals.current(standardized);
        const { solicitations } = await refGetSolicitationsMonth.current(
          standardized
        );

        const dataRounded = { dataOne: locked_month, dataTwo: total_month };
        setWeeklyGoal(weeklyGoals);
        setMonthPercent(dataRounded);
        setSolics(solicitations);
        setError(false);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    executeRequest();
    const interval = setInterval(() => {
      executeRequest();
    }, timeInterval);

    return () => {
      clearInterval(interval);
    };
  }, [standardized]);

  // Service Time Analysis
  React.useEffect(() => {
    async function executeRequest() {
      try {
        const { serviceTime } = await refGetServiceTime.current(standardized);
        setServiceTime(serviceTime);
        setError(false);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    executeRequest();
    const interval = setInterval(() => {
      executeRequest();
    }, timeInterval);

    return () => {
      clearInterval(interval);
    };
  }, [standardized]);

  // Purchase Order (with and without invoice)
  React.useEffect(() => {
    async function executeRequest() {
      try {
        const { result } = await refGetInvoice.current(standardized);
        setInvoice(result);
        setError(false);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    executeRequest();
    const interval = setInterval(() => {
      executeRequest();
    }, timeInterval);

    return () => {
      clearInterval(interval);
    };
  }, [standardized]);

  const dataInvoice = {
    dataOne: invoice?.quantityNoInvoice,
    dataTwo: invoice?.quantityInvoice,
  };

  // Authorized Purchase Order
  React.useEffect(() => {
    async function executeRequest() {
      try {
        const { result } = await refGetPurchaseOrder.current(standardized);
        setPurchaseOrder(result);
        setError(false);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    executeRequest();
    const interval = setInterval(() => {
      executeRequest();
    }, timeInterval);

    return () => {
      clearInterval(interval);
    };
  }, [standardized]);

  const dataPurchaseOrder = {
    dataOne: purchaseOrder?.quantityNoAuthorized,
    dataTwo: purchaseOrder?.quantityAuthorized,
  };

  // Purchase Requests
  React.useEffect(() => {
    async function executeRequest() {
      try {
        const { result } = await refGetPurchaseRequests.current(standardized);
        setPurchaseRequest(result);
        setError(false);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    executeRequest();
    const interval = setInterval(() => {
      executeRequest();
    }, timeInterval);

    return () => {
      clearInterval(interval);
    };
  }, [standardized]);

  const dataRequestPurchase = {
    dataOne: purchaseRequest?.quantityOpen,
    dataTwo: purchaseRequest?.quantityDone,
  };

  // Top 10 Requested Items
  React.useEffect(() => {
    async function executeRequest() {
      try {
        const response = await refGetTopItems.current(standardized);
        setTopItems(response);
        setError(false);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    executeRequest();
    const interval = setInterval(() => {
      executeRequest();
    }, timeInterval);

    return () => {
      clearInterval(interval);
    };
  }, [standardized]);

  const barVertical = {
    bars: [{ key: "QTD_SOLICITACOES", fill: "#0E1F2E" }],
  };

  const barHorizontal = {
    bars: [{ key: "percent", fill: "#0E1F2E" }],
  };

  // config footer
  const titles = [
    { icon: <Open className="w-4 h-4" />, title: "Aberto" },
    { icon: <Done className="w-4 h-4" />, title: "Concluídos" },
    { icon: <Close className="w-4 h-4" />, title: "Sem Nota Fiscal" },
    {
      icon: <DoneInvoice className="w-4 h-4" />,
      title: "Com Nota Fiscal SM1-SM5 Semanas",
    },
  ];

  const BarWithBorderVertical = (borderSize) => {
    return (props) => {
      const { fill, x, y, width, height } = props;

      return (
        <g>
          <rect
            x={x}
            y={y}
            width={width}
            height={height}
            stroke="none"
            fill={fill}
          />
          <rect
            x={x}
            y={y}
            width={width}
            height={borderSize}
            stroke="none"
            fill={palette?.light}
          />
        </g>
      );
    };
  };

  const BarWithBorderHorizontal = (borderSize) => {
    return (props) => {
      const { fill, x, y, width, height, value } = props;

      return (
        <g>
          <rect
            x={x}
            y={y}
            width={width}
            height={height}
            stroke="none"
            fill={fill}
          />
          <rect
            x={x + width}
            y={y}
            width={borderSize}
            height={height}
            stroke="none"
            fill={value[1] > 90 ? palette?.success : palette?.light}
          />
        </g>
      );
    };
  };

  if (loading) return <Loading />;

  return (
    <main className="min-h-screen w-full flex flex-col justify-center">
      <Helmet>
        <title>
          CMDC | Supply | {standardized ? "Padronizado" : "Não Padronizado"}
        </title>
        <meta
          name="description"
          content="Dashboard relacionado as mudanças de suprimentos."
        />
      </Helmet>
      <section className="px-5 flex-1 flex flex-col gap-2 justify-center">
        <h2 className="text-2xl text-white text-center font-semibold">
          {type === "padronizado"
            ? "Supply - Padronizado"
            : "Supply - Não Padronizado"}
        </h2>
        <div className="flex flex-col gap-2 w-full max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-5 grid-cols-1 gap-2">
            <div className="sm:flex grid grid-cols-1 sm:gap-10 gap-4 justify-center sm:col-span-3 col-span-1 bg-opacity-50 bg-blackCMDC shadow-inner-2 rounded-lg">
              <RoundedCard
                data={purchaseRequest?.quantityRequests}
                iconOne={<CashBox className="w-4 h-4" />}
                iconTwo={<Open className="w-4 h-4" />}
                iconThree={<Done className="w-4 h-4" />}
                totalValue={toBRL(purchaseRequest?.totalValue)}
                title="Solicitações de Compra"
                valueExibition={dataRequestPurchase}
                exibition={{
                  titleOne: toBRL(purchaseRequest?.totalOpen),
                  titleTwo: toBRL(purchaseRequest?.totalDone),
                }}
                className="bg-opacity-0 col-span-1 sm:px-0 px-28"
                roundedClass="w-44 h-40 text-xl"
                titleClass="text-sm"
                barSize={1.2}
                rounded={{
                  type: "gradient",
                  color: palette?.main,
                  id: "gdr-1",
                }}
              />
              <RoundedCard
                data={purchaseOrder?.totalQuantity}
                iconOne={<CashBox className="w-4 h-4" />}
                iconTwo={<Open className="w-4 h-4" />}
                iconThree={<Done className="w-4 h-4" />}
                totalValue={toBRL(purchaseOrder?.totalValue)}
                valueExibition={dataPurchaseOrder}
                exibition={{
                  titleOne: toBRL(purchaseOrder?.totalNoAuthorized),
                  titleTwo: toBRL(purchaseOrder?.totalAuthorized),
                }}
                title="Ordem de Compras Autorizadas"
                className="bg-opacity-0 col-span-1 sm:px-0 px-28"
                roundedClass="w-44 h-40 text-xl"
                titleClass="text-sm"
                barSize={1.2}
                rounded={{
                  type: "gradient",
                  color: palette?.medium,
                  id: "gdr-2",
                }}
              />
              <RoundedCard
                data={invoice?.totalQuantity}
                iconOne={<CashBox className="w-4 h-4" />}
                iconTwo={<Close className="w-4 h-4" />}
                iconThree={<DoneInvoice className="w-4 h-4" />}
                totalValue={toBRL(invoice?.totalValue)}
                title="Ordem de Compra"
                valueExibition={dataInvoice}
                exibition={{
                  titleOne: toBRL(invoice?.totalNoInvoice),
                  titleTwo: toBRL(invoice?.totalInvoice),
                }}
                className="bg-opacity-0 col-span-1 sm:px-0 px-28"
                roundedClass="w-44 h-40 text-xl"
                titleClass="text-sm"
                barSize={1.2}
                rounded={{
                  type: "gradient",
                  color: palette?.main,
                  id: "gdr-1",
                }}
              />
            </div>
            <div className="bg-opacity-50 bg-blackCMDC sm:col-span-2 col-span-1 h-full shadow-inner-2 p-2 rounded-lg">
              <h2 className="text-white text-center text-sm">
                Solicitações em Aberto
              </h2>
              <BarGraphic
                layout={"horizontal"}
                data={serviceTime}
                config={barVertical}
                limitIdentifier="QTD_SOLITACOES"
                className="w-full h-48 px-6 pt-3"
                shape={BarWithBorderVertical(4)}
                label={{
                  position: "center",
                  fontSize: ".6rem",
                  fill: "#fff",
                }}
                backgroundFill="transparent"
                x={{
                  interval: 0,
                  hide: false,
                  dataKey: "QT_DIAS",
                  tickLine: false,
                  stroke: false,
                  tick: {
                    fill: "white",
                    fontSize: "0.5rem",
                    margin: { right: 100 },
                  },
                  type: "category",
                  tickFormatter: (value) => `${value} dias`,
                }}
                y={{ hide: true, type: "number" }}
                margin={{ top: 1, bottom: 2 }}
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-5 grid-cols-1 gap-2">
            <div className="bg-opacity-50 bg-blackCMDC rounded-lg shadow-inner-2 p-2 sm:col-span-3 col-span-1">
              <h2 className="text-white text-sm py-0.5 text-center">
                TOP 10 ITENS SOLICITADOS NOS ULITMOS 30 DIAS
              </h2>
              <SolicitedItemsCard
                data={topItems?.firstRank}
                className="text-center"
                cardClass="justify-center text-xs"
                color={palette?.info}
              />
              <div className="grid grid-cols-3 py-1 gap-2">
                {topItems?.outerRanks.map((items, i) => (
                  <SolicitedItemsCard
                    key={items + "-" + i}
                    data={items}
                    className="col-span-1 text-xsm h-16"
                    cardClass="justify-start text-xsm"
                    color={palette?.light}
                  />
                ))}
              </div>
            </div>
            <div className="bg-opacity-50 bg-blackCMDC rounded-lg shadow-inner-2 p-2 sm:col-span-2 col-span-1">
              <h2 className="text-white text-center text-sm">
                Metas: Solicitações de Compra x Ordens de Compra
              </h2>
              <div className="sm:flex sm:justify-between">
                <div className="w-full ">
                  <BarGraphic
                    layout={"vertical"}
                    data={weeklyGoal}
                    config={barHorizontal}
                    className="w-full sm:h-72 h-80 pt-10 sm:pr-1 pr-10"
                    shape={BarWithBorderHorizontal(4)}
                    barSize={3}
                    limit={100}
                    label={{
                      position: "center",
                      fontSize: ".7rem",
                      fill: "#fff",
                      formatter: (value) => value + "%",
                    }}
                    backgroundFill="#24203480"
                    x={{
                      hide: true,
                      type: "number",
                    }}
                    y={{
                      hide: false,
                      dataKey: "week",
                      tickLine: false,
                      stroke: false,
                      tick: {
                        fill: "white",
                        fontSize: "0.8rem",
                        transform: "translate(-10, 0)",
                      },
                      type: "category",
                    }}
                    margin={{ top: 1, bottom: 2 }}
                  />
                  <p className="text-white text-center text-sm -mt-2">
                    Semanal: <span className="font-bold">90%</span>
                  </p>
                </div>
                <div className="w-full">
                  <RoundedGraphic
                    data={monthPercent}
                    barSize={1.3}
                    rounded={{
                      type: "gradient",
                      color: palette?.main,
                      id: "grd-1",
                    }}
                    className="h-72 col-span-1 w-full bg-opacity-0"
                    graphicClass="sm:w-42 w-56 sm:h-42 h-56"
                  />
                  <p className="text-white text-center text-sm -mt-2">
                    Mensal: <span className="font-bold">85%</span>
                  </p>
                </div>
              </div>
              {/* <p className="text-sm text-white text-center mt-3">
                Total Solicitações Pendentes:{" "}
                <span className="font-bold">
                  {solics?.TOTAL_SOLIC_ABERTAS_MES_ATUAL || 0}
                </span>
              </p> */}
            </div>
          </div>
        </div>
      </section>
      <div className="relative w-full">
        <AsideInformations
          data={titles}
          labelClass="justify-center"
          className="z-10 max-w-5xl m-auto text-xs"
        />
        <Footer className="absolute sm:mt-0 mt-12 top-0 left-0" />
      </div>
      {error && <Error message={error} />}
    </main>
  );
};

export default SupplyChange;
