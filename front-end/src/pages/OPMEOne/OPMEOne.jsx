import React from "react";
import { Helmet } from "react-helmet";
import { Footer, SimpleCard, BarGraphic } from "../../components";
import { Loading, Error } from "../../helper";
import useUtilities from "../../service/useUtilities";
import { useTransition, animated, config } from "react-spring";
import useDrugstore from "../../service/useDrugstore";

const OPMEOne = () => {
  const timeInterval = 5000;
  const intervalPagination = 60000;
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const { getFontSize } = React.useMemo(useUtilities, []);

  // Requests
  const {
    getTotalOPMES,
    getPercentOPMES,
    getSurgerisOPME,
    getProcedimentsPerDay,
  } = useDrugstore();

  // OPMES
  const refGetTotalOPMES = React.useRef(getTotalOPMES);
  const refGetPercentOPMES = React.useRef(getPercentOPMES);
  const refGetProcedimentsPerDay = React.useRef(getProcedimentsPerDay);
  const [totalOPMES, setTotalOPMES] = React.useState();
  const [percentOPME, setPercentOPME] = React.useState();
  const [procedimentsOPME, setProcedimentsOPME] = React.useState();

  React.useEffect(() => {
    async function executeRequest() {
      try {
        const { totalOPMES } = await refGetTotalOPMES.current();
        const { percentOPMES } = await refGetPercentOPMES.current();
        const { procediments } = await refGetProcedimentsPerDay.current();
        setTotalOPMES(totalOPMES);
        setPercentOPME(percentOPMES);
        setProcedimentsOPME(procediments);
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

    return () => clearInterval(interval);
  }, []);

  // Procediments OPME
  const refGetSurgerisOPME = React.useRef(getSurgerisOPME);
  const [surgeriesOPME, setSurgeriesOPME] = React.useState();
  const [pageOne, setPageOne] = React.useState(1);

  React.useEffect(() => {
    async function executeRequest() {
      try {
        const { surgeries, totalPage } = await refGetSurgerisOPME.current(
          pageOne,
          14
        );
        setError(false);
        if (pageOne > totalPage) {
          setPageOne(1);
        } else {
          setSurgeriesOPME(surgeries);
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

  //Transitions
  const transitionSurgeries = useTransition(
    surgeriesOPME ? surgeriesOPME : [],
    {
      from: { opacity: 0, y: -10 },
      enter: { opacity: 1, y: 0 },
      leave: { display: "none" },
      trail: 100,
      delay: 50,
      config: config.gentle,
    }
  );

  //Configurations from charts
  const configBars = {
    bars: [
      {
        key: "QTD_SOLICITADA",
        fill: "url(#gdr1-1)",
      },
    ],
    gradients: [
      {
        id: "gdr1-1",
        from: "rgba(0, 0, 10, 0.2)",
        to: "#1093C2",
        x: "0",
        y: "1",
      },
    ],
  };

  if (loading) return <Loading />;

  return (
    <main className="min-h-screen w-full flex flex-col">
      <Helmet>
        <title>CMDC | Farmácia | OPME | Procedimentos</title>
        <meta
          name="description"
          content="Dashboard relacionado a farmácia OPME - procedimentos"
        />
      </Helmet>
      <section className="px-5 flex-1 flex flex-col justify-center">
        <div className="flex flex-col gap-2 w-full max-w-7xl mx-auto">
          <h1 className="text-2xl text-white text-center font-bold">
            FARMÁCIA - OPME
          </h1>
          <div className="grid sm:grid-cols-6 grid-cols-2 gap-2">
            <SimpleCard
              data={totalOPMES}
              title="Nr. Procedimento Total - 24H"
              rounded={{ class: "bg-blue-400 w-12 h-12" }}
              className="h-42 bg-opacity-50 text-white text-xs relative"
              dataClass="text-5xl text-blue-400"
            />
            <SimpleCard
              data={percentOPME}
              type="string"
              title="OPME - 24H"
              className="h-42 bg-opacity-50 text-white text-xs relative"
              dataClass="text-5xl text-white"
            />
            <div className="h-42 bg-blackCMDC rounded-lg bg-opacity-50 col-span-4 py-1">
              <h2 className="relative w-5/6 m-auto text-white text-sm text-center border-b-2 border-dashed border-blue-300 border-opacity-30">
                Total Procedimentos Solicitados com OPME - 30 Dias
                <span className="absolute -bottom-2 -right-6 text-xsm text-blue-300">
                  MAX
                </span>
              </h2>
              <BarGraphic
                className="h-full w-full"
                data={procedimentsOPME}
                barSize={2}
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
                  dataKey: "DATA",
                  interval: 0,
                  tick: {
                    fontSize: "0.5rem",
                    fill: "#fff",
                  },
                  axisLine: false,
                  tickLine: false,
                }}
                y={{
                  hide: true,
                }}
                config={configBars}
                margin={{
                  top: 2 * getFontSize(),
                  right: 0.2 * getFontSize(),
                  left: -0.2 * getFontSize(),
                  bottom: 0.6 * getFontSize(),
                }}
              />
            </div>
          </div>
          <div className="p-4 w-full h-104 rounded-lg bg-blackCMDC bg-opacity-50">
            <h2 className="text-sm text-white text-center mb-1">
              Procedimentos | Cirurgias com OPME para o Próximo Dia
            </h2>
            <div className="w-full h-92 flex gap-2">
              <div className="p-2 w-36 h-full rounded-lg bg-blackCMDC bg-opacity-50 flex flex-col items-center">
                <h4 className="tex-sm text-white">Aviso</h4>
                {transitionSurgeries((style, surgerie) => (
                  <animated.div style={style}>
                    <span className="text-blue-400 text-xs">
                      {surgerie.AVISO}
                    </span>
                  </animated.div>
                ))}
              </div>
              <div className="p-2 w-full h-full rounded-lg bg-blackCMDC bg-opacity-50 flex flex-col items-center">
                <h4 className="tex-sm text-white">PROCEDIMENTO</h4>
                {transitionSurgeries((style, surgerie) => (
                  <animated.div style={style}>
                    <span className="text-blue-200 text-xs">
                      {surgerie.PROCEDIMENTO}
                    </span>
                  </animated.div>
                ))}
              </div>
              <div className="p-2 w-36 h-full rounded-lg bg-blackCMDC bg-opacity-50 flex flex-col items-center">
                <h4 className="tex-sm text-white">QTD SOLIC.</h4>
                {transitionSurgeries((style, surgerie) => (
                  <animated.div style={style}>
                    <span className="text-blue-200 text-xs">
                      {surgerie.QTD_SOLICITADA}
                    </span>
                  </animated.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      {error && <Error message={error} />}
    </main>
  );
};

export default OPMEOne;
