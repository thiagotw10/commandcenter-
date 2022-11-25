import React from "react";
import { Loading, Error } from "../../helper";
import { Helmet } from "react-helmet";
import { RoundedGraphic, Footer, BarGraphic } from "../../components";
import useUtilities from "../../service/useUtilities";
import useSupplyChange from "../../service/useSupplyChange";
import { useScroll } from "../../service/useScroll";
import { format } from "date-fns";

const PurchaseItems = () => {
  const timeInterval = 30000;
  const { getFontSize } = useUtilities();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const divSectors = React.useRef(null);

  useScroll(divSectors, 10, 180000);

  // requests
  const { getPurchaseItems } = useSupplyChange();
  const refGetPurchaseItems = React.useRef(getPurchaseItems);
  const [purchaseItems, setPurchaseItems] = React.useState();

  React.useEffect(() => {
    setLoading(true);
    async function executeRequest() {
      try {
        const { fallowUpWeekly } = await refGetPurchaseItems.current();
        setPurchaseItems(fallowUpWeekly);
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
  }, []);

  // config charts

  const colorsConfig = React.useMemo(() => {
    const colors = [
      { lineOne: "#11528B", lineTwo: "#47B900", rounded: "#FF0C0C" },
      { lineOne: "#CCEA", lineTwo: "#EBFF00", rounded: "#FF8E0A" },
      { lineOne: "#0AD3FF", lineTwo: "#FFA53C", rounded: "#0AD3FF" },
      { lineOne: "#DE58FF", lineTwo: "#FF5050", rounded: "#FF0C0C" },
    ];

    let index = 0;
    return purchaseItems?.map(() => {
      const color = colors[index];
      if (index === 3) {
        index = 0;
      } else {
        index += 1;
      }

      return color;
    });
  }, [purchaseItems]);

  if (loading) return <Loading />;

  return (
    <main className="min-h-screen w-full flex flex-col justify-center">
      <Helmet>
        <title>CMDC | Supply | Itens de Compras</title>
        <meta
          name="description"
          content="Dashboard relacionado a Farmácia Assistencial"
        />
      </Helmet>
      <section className="px-5 flex-1 flex flex-col justify-center">
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-2 my-3">
          <h2 className="text-2xl text-white text-center mb-2 font-semibold">
            Follow Up Semanal dos Itens de Compras por Espécie -{" "}
            {format(new Date(), "dd/MM/yyyy")}
          </h2>
          <div
            ref={divSectors}
            className="grid grid-cols-1 md:grid-cols-2 gap-2 min-h-56 sm:max-h-115 overflow-y-scroll scroll-hide"
          >
            {purchaseItems?.map((sector, i) => (
              <div
                className="flex bg-blackCMDC bg-opacity-60 rounded-lg h-65 relative pt-5"
                key={sector.name}
              >
                <h2 className="text-sm text-white absolute top-2 left-20">
                  {sector.name}
                </h2>
                <BarGraphic
                  className="h-60 bg-opacity-0 flex-1 sm:col-span-3 col-span-1 text-sm text-center"
                  data={sector.weeklys}
                  barSize={2.5}
                  radius={0.2}
                  backgroundFill="transparent"
                  label={{
                    position: "center",
                    fontSize: ".5rem",
                    fill: "#FFF",
                    fontWeight: 600,
                  }}
                  x={{
                    type: "category",
                    dataKey: "day",
                    interval: 0,
                    tick: {
                      fontSize: "0.6rem",
                      fill: "#fff",
                    },
                    axisLine: { transform: "translate(0, 5)" },
                    tickLine: false,
                  }}
                  y={{
                    type: "number",
                    tick: { fontSize: "0.6rem", fill: "#fff" },
                  }}
                  config={{
                    bars: [
                      {
                        key: "pending",
                        fill: `url(#gdr1-${i})`,
                        color: colorsConfig[i].lineOne,
                        stackId: 1,
                        title: (
                          <span style={{ display: "inline-flex" }}>
                            Pendentes
                          </span>
                        ),
                        icon: "circle",
                      },
                      {
                        key: "delivered",
                        fill: `url(#gdr2-${i})`,
                        color: colorsConfig[i].lineTwo,
                        stackId: 1,
                        title: (
                          <span style={{ display: "inline-flex" }}>
                            Entregues
                          </span>
                        ),
                        icon: "circle",
                      },
                    ],
                    gradients: [
                      {
                        id: "gdr1-" + i,
                        from: "rgba(0, 0, 10, 0.2)",
                        to: colorsConfig[i].lineOne,
                        x: "0",
                        y: "1",
                      },
                      {
                        id: "gdr2-" + i,
                        from: "rgba(0, 0, 10, 0.2)",
                        to: colorsConfig[i].lineTwo,
                        x: "0",
                        y: "1",
                      },
                    ],
                  }}
                  margin={{
                    top: 1 * getFontSize(),
                    right: 1.2 * getFontSize(),
                    left: -1 * getFontSize(),
                    bottom: 0.5 * getFontSize(),
                  }}
                  legendPosition={{
                    position: "absolute",
                    marginTop: 13 * getFontSize(),
                    marginRight: 9 * getFontSize(),
                  }}
                  legendLayout="horizontal"
                />
                <div className="flex flex-col col-span-1">
                  <RoundedGraphic
                    data={sector.percent}
                    title={
                      <span className="flex flex-col">
                        Meta Mensal:
                        <span className="text-yellow-300">85%</span>
                      </span>
                    }
                    className="max-w-108 sm:max-w-none bg-opacity-0 text-sm"
                    titleClass="text-sm"
                    graphicClass="w-36 h-36"
                    barSize={1.1}
                    rounded={{
                      type: "gradient",
                      color: colorsConfig[i].rounded,
                      id: "gdr-" + i,
                    }}
                  />
                  <div className="flex flex-col items-center text-sm">
                    <span className="text-white m-auto">Total Itens:</span>
                    <span style={{ color: colorsConfig[i].lineOne }}>
                      {sector.total}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
      {error && <Error message={error} />}
    </main>
  );
};

export default PurchaseItems;
