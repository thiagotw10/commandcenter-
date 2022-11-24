import React from "react";
import { Helmet } from "react-helmet";
import {
  Footer,
  RectCard,
  VerifyInsert,
  VariationItemCard,
  VariationMonthCard,
} from "../../components";
import { Loading, Error } from "../../helper";
import { useTransition, animated, config } from "react-spring";
import useSupplyChange from "../../service/useSupplyChange";

function Consumption() {
  const intervalPagination = 180000;
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  // Requests
  const { getStockFiveDays, getPendingRequests, getItemsWithVariation } =
    useSupplyChange();

  // Stock 5 days
  const refGetStockFiveDays = React.useRef(getStockFiveDays);
  const [stockFiveDays, setStockFiveDays] = React.useState();
  const [pageOne, setPageOne] = React.useState(1);

  React.useEffect(() => {
    async function executeRequest() {
      try {
        const { days, totalPage } = await refGetStockFiveDays.current(
          pageOne,
          6
        );
        setError(false);
        if (pageOne > totalPage) {
          setPageOne(1);
        } else {
          setStockFiveDays(days);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    executeRequest();
    const interval = setInterval(() => {
      setPageOne((page) => page + 1);
    }, intervalPagination);

    return () => clearInterval(interval);
  }, [pageOne]);

  // Pending Requests
  const refGetPendingRequests = React.useRef(getPendingRequests);
  const [pendingRequests, setPendingRequests] = React.useState();
  const [pageTwo, setPageTwo] = React.useState(1);

  React.useEffect(() => {
    async function executeRequest() {
      try {
        const { requests, totalPage } = await refGetPendingRequests.current(
          pageTwo,
          6
        );
        setError(false);
        if (pageTwo > totalPage) {
          setPageTwo(1);
        } else {
          setPendingRequests(requests);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    executeRequest();
    const interval = setInterval(() => {
      setPageTwo((page) => page + 1);
    }, intervalPagination);

    return () => clearInterval(interval);
  }, [pageTwo]);

  // Pending Requests
  const refGetItemsWithVariation = React.useRef(getItemsWithVariation);
  const [items, setItems] = React.useState();
  const [pageThree, setPageThree] = React.useState(1);

  React.useEffect(() => {
    async function executeRequest() {
      try {
        const { items, totalPage } = await refGetItemsWithVariation.current(
          pageThree,
          3
        );
        setError(false);
        if (pageThree > totalPage) {
          setPageThree(1);
        } else {
          setItems(items);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    executeRequest();
    const interval = setInterval(() => {
      setPageThree((page) => page + 1);
    }, intervalPagination);

    return () => clearInterval(interval);
  }, [pageThree]);

  // Cards
  const ConsumptionCard = ({ data, color }) => (
    <RectCard color={color} className="flex flex-col gap-2">
      <div className="flex justify-between">
        <p className="text-xs" style={{ color }}>
          {data.item
            ?.split(" ")
            .filter((_, i) => i <= 2)
            .join(" ")}
        </p>
        <p className="text-gray-400 text-xsm">
          Codigo: <span className="text-white">{data.code}</span>
        </p>
      </div>
      <p className="text-xsm text-gray-400">
        Saldo de estoque: <span className="text-white">{data.quantity}</span>
      </p>
      <div className="flex justify-between">
        <p className="text-gray-400 text-xsm">
          Espécie: <span className="text-white">{data.species}</span>
        </p>
        <p className="text-white text-xs">{data.days}</p>
      </div>
    </RectCard>
  );

  const SectorItensCard = ({ data }) => (
    <div
      className="rounded-lg flex flex-col px-2 py-1 gap-1"
      style={{ backgroundColor: "#0A101F" }}
    >
      <p className="text-gray-400 text-xs">
        Solic: <span className="text-white">{data.solic}</span>
      </p>
      <p className="text-gray-400 text-xs">
        Setor: <span className="text-white">{data.sector?.split(" ")[0]}</span>
      </p>
      <div
        className="flex flex-col items-center p-1 w-full rounded-lg h-15"
        style={{ backgroundColor: "#070B16" }}
      >
        <h3 className="text-white text-xsm">Itens</h3>
        {data.items?.map((item, index) => {
          return (
            <span key={item + "-" + index} className="text-blue-300 text-xsm">
              {item
                ?.split(" ")
                .filter((_, i) => i <= 1)
                .join(" ")}
            </span>
          );
        })}
      </div>
      <div className="flex justify-center items-center py-1 w-14 bg-green-600 self-end rounded-xl bg-opacity-20">
        <span className="text-green-300 text-xsm">{data.status}</span>
      </div>
    </div>
  );

  // Transitions of Pages
  const transitionsInventory = useTransition(
    stockFiveDays ? stockFiveDays : [],
    {
      from: { opacity: 0, y: -10 },
      enter: { opacity: 1, y: 0 },
      leave: { display: "none" },
      trail: 100,
      delay: 50,
      config: config.gentle,
    }
  );

  const transitionsSectorItens = useTransition(
    pendingRequests ? pendingRequests : [],
    {
      from: { opacity: 0, y: -10 },
      enter: { opacity: 1, y: 0 },
      leave: { display: "none" },
      trail: 100,
      delay: 50,
      config: config.gentle,
    }
  );

  const transitionsVariations = useTransition(items ? items : [], {
    from: { opacity: 0, y: -10 },
    enter: { opacity: 1, y: 0 },
    leave: { display: "none" },
    trail: 100,
    delay: 50,
    config: config.gentle,
  });

  const colors = ["#FFD600", "#D0D0D0", "#786500"];

  if (loading) return <Loading />;

  return (
    <main className="min-h-screen w-full flex flex-col justify-center">
      <Helmet>
        <title>CMDC | Supply | Consumo</title>
        <meta
          name="description"
          content="Dashboard relacionado aos Alertas no SND."
        />
      </Helmet>
      <section className="px-5 flex-1 flex flex-col justify-center">
        <h1 className="text-2xl text-blue-200 text-center mb-2 font-semibold mt-1">
          CONSUMO
        </h1>
        <div className="max-w-7xl w-full mx-auto grid sm:grid-cols-2 grid-cols-1 gap-2">
          <div className="w-full flex flex-col gap-2">
            <div className="bg-blackCMDC bg-opacity-50 rounded-lg w-full min-h-56 p-2">
              <h2 className="text-lg text-white text-center mb-1">
                <span className="text-red-500">-5D</span> Dias de estoque
              </h2>
              <div className="w-full grid grid-cols-2 grid-rows-3 gap-2">
                <VerifyInsert
                  display={stockFiveDays?.length}
                  message="Não há itens no momento"
                  className="col-span-2 row-start-2 text-sm whitespace-normal text-white"
                >
                  {transitionsInventory((style, stock) => (
                    <animated.div style={style}>
                      <ConsumptionCard
                        color="#77FFF7"
                        data={{
                          item: stock.NM_PRODUTO,
                          code: stock.CD_PRODUTO,
                          quantity: stock.SALDO_ESTOQUE,
                          species: stock.ESPECIE,
                          days: `${stock.DIAS_PARA_ACABAR} DIAS`,
                        }}
                      />
                    </animated.div>
                  ))}
                </VerifyInsert>
              </div>
            </div>
            <div className="bg-blackCMDC bg-opacity-50 rounded-lg w-full min-h-56 p-2">
              <h2 className="text-lg text-white text-center mb-1">
                Solicitações
              </h2>
              <div className="w-full grid grid-cols-3 grid-rows-2 gap-2">
                <VerifyInsert
                  display={pendingRequests?.length}
                  message="Não há itens no momento"
                  className="col-span-3 row-start-2 text-sm whitespace-normal text-white"
                >
                  {transitionsSectorItens((style, request) => (
                    <animated.div style={style}>
                      <SectorItensCard
                        color="#77FFF7"
                        data={{
                          solic: request.SOLIC,
                          sector: request.SETOR,
                          status: request.SITUACAO,
                          items: request.ITENS?.filter((_, i) => i <= 2),
                        }}
                      />
                    </animated.div>
                  ))}
                </VerifyInsert>
              </div>
            </div>
          </div>
          <div className="bg-blackCMDC bg-opacity-50 rounded-lg w-full min-h-56 p-2 flex flex-col gap-2">
            <h2 className="text-lg text-white text-center mb-1">
              Itens com Maior Variação
            </h2>
            <VerifyInsert
              display={items?.length}
              message="Não há itens no momento"
              className="col-span-2 row-start-2 text-sm whitespace-normal text-white"
            >
              {transitionsVariations((style, item, _, index) => (
                <animated.div style={style}>
                  <div className="w-full flex items-center gap-1">
                    <VariationItemCard
                      data={{
                        item: item.NM_PRODUTO,
                        lastRequests: item.ULTIMOS_PEDIDOS,
                        quantity: item.QUANTITATIVO,
                      }}
                      color={colors[index]}
                      number={item.RANK}
                      top={"TOP " + item.RANK}
                      className="w-72"
                    />
                    <div className="w-20 h-1 bg-green-400 bg-opacity-70 rounded-full" />
                    <VariationMonthCard
                      quantity={item.SOLIC_MEDIA}
                      currentSector={item.SETOR1?.split(" ")
                        .filter((_, i) => i <= 2)
                        .join(" ")}
                      currentMonth={item.SOLIC1}
                      previousSector={item.SETOR2?.split(" ")
                        .filter((_, i) => i <= 2)
                        .join(" ")}
                      previousMonth={item.SOLIC2}
                      className="w-72"
                      currentArrow={!!item.STATUS1}
                      previousArrow={!!item.STATUS2}
                    />
                  </div>
                </animated.div>
              ))}
            </VerifyInsert>
          </div>
        </div>
      </section>
      <Footer />
      {error && <Error message={error} />}
    </main>
  );
}

export default Consumption;
