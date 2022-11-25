import React from "react";
import { Helmet } from "react-helmet";
import { Footer, RectCard, VerifyInsert } from "../../components";
import { Loading, Error } from "../../helper";
import { useTransition, animated, config } from "react-spring";
import useDrugstore from "../../service/useDrugstore";

const OPMETwo = () => {
  const intervalPagination = 60000;
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  // Requests
  const { getListOPME, getConsignedsOPME } = useDrugstore();

  // Procediments OPME
  const refGetListOPME = React.useRef(getListOPME);
  const [OPMES, setOPMES] = React.useState();
  const [pageOne, setPageOne] = React.useState(1);

  React.useEffect(() => {
    async function executeRequest() {
      try {
        const { procediments, totalPage } = await refGetListOPME.current(
          pageOne,
          16
        );
        setError(false);
        if (pageOne > totalPage) {
          setPageOne(1);
        } else {
          setOPMES(procediments);
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

  // Consigneds Procediments OPME
  const refGetConsignedsOPME = React.useRef(getConsignedsOPME);
  const [consigneds, setConsigneds] = React.useState();
  const [pageTwo, setPageTwo] = React.useState(1);

  React.useEffect(() => {
    async function executeRequest() {
      try {
        const { procediments, totalPage } = await refGetConsignedsOPME.current(
          pageTwo,
          16
        );
        setError(false);
        if (pageTwo > totalPage) {
          setPageTwo(1);
        } else {
          setConsigneds(procediments);
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

  //Transitions
  const transitionOpmes = useTransition(OPMES ? OPMES : [], {
    from: { opacity: 0, y: -10 },
    enter: { opacity: 1, y: 0 },
    leave: { display: "none" },
    trail: 100,
    delay: 50,
    config: config.gentle,
  });

  const transitionConsigns = useTransition(consigneds ? consigneds : [], {
    from: { opacity: 0, y: -10 },
    enter: { opacity: 1, y: 0 },
    leave: { display: "none" },
    trail: 100,
    delay: 50,
    config: config.gentle,
  });

  if (loading) return <Loading />;

  return (
    <main className="min-h-screen w-full flex flex-col">
      <Helmet>
        <title>CMDC | Farmácia | OPME | Itens</title>
        <meta
          name="description"
          content="Dashboard relacionado a farmácia OPME - itens"
        />
      </Helmet>
      <section className="px-5 flex-1 flex flex-col justify-center">
        <div className="flex flex-col gap-2 w-full max-w-7xl mx-auto">
          <h1 className="text-2xl text-white text-center font-bold">
            FARMÁCIA - OPME
          </h1>
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
            <div className="bg-blackCMDC bg-opacity-50 rounded-lg border border-gray-400 w-full h-117 grid grid-cols-2 content-start gap-y-2 gap-x-4 p-2">
              <h2 className="text-lg text-white col-span-2 text-center mb-2">
                OPMES
              </h2>
              <VerifyInsert
                display={OPMES?.length}
                message="Não há procedimentos no momento"
                className="col-span-2 row-start-2 text-sm whitespace-normal text-white"
              >
                {transitionOpmes((style, procediment) => (
                  <animated.div style={style}>
                    <RectCard
                      className="h-14"
                      color="#E3A6FF"
                      style={{ backgroundColor: "#1B1D22" }}
                    >
                      <span className="text-pink-200 text-sm">
                        {procediment.OPMES?.replace("OPME - ", "")}
                      </span>
                    </RectCard>
                  </animated.div>
                ))}
              </VerifyInsert>
            </div>
            <div className="bg-blackCMDC bg-opacity-50 rounded-lg border border-gray-400 w-full h-117 grid grid-cols-2 content-start gap-y-2 gap-x-4 p-2">
              <h2 className="text-lg text-white col-span-2 text-center mb-2">
                CONSIGNADOS
              </h2>
              <VerifyInsert
                display={consigneds?.length}
                message="Não há procedimentos no momento"
                className="col-span-2 row-start-2 text-sm whitespace-normal text-white"
              >
                {transitionConsigns((style, procediments) => (
                  <animated.div style={style}>
                    <RectCard
                      className="h-14"
                      color="#7DFFD8"
                      style={{ backgroundColor: "#1B1D22" }}
                    >
                      <span className="text-green-200 text-sm">
                        {procediments.CONSEGUINADOS?.replace("OPME - ", "")}
                      </span>
                    </RectCard>
                  </animated.div>
                ))}
              </VerifyInsert>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      {error && <Error message={error} />}
    </main>
  );
};

export default OPMETwo;
