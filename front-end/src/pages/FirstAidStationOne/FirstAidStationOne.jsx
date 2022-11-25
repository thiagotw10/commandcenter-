import React from "react";
import { Helmet } from "react-helmet";
import {
  Footer,
  RoundedCard,
  BedsCard,
  SimpleCard,
  RowPatientTable,
} from "../../components";
import { ReactComponent as ClockPlus } from "../../assets/svg/ClockPlus.svg";
import { ReactComponent as ClockSimple } from "../../assets/svg/ClockSimple.svg";
import { ReactComponent as People } from "../../assets/svg/People.svg";
import { Loading, Error } from "../../helper";
import useFirstAidStation from "../../service/useFirstAidStation";
import useRealTimeRegister from "../../service/useRealTimeRegister";
import useTimeTriages from "../../service/useTimeTriages";
import useWaitForPediatric from "../../service/useWaitForPediatric";
import useFirstAidSituation from "../../service/useFirstAidSituation";
import { useTransition, animated, config } from "react-spring";

const FirstAidStationOne = () => {
  const timeInterval = 5000;
  const intervalPagination = 60000;
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  //First Aid Station
  const { getFirstAidStation } = useFirstAidStation();
  const refGetFirstAidStation = React.useRef(getFirstAidStation);
  const [overFourHours, setOverFourHours] = React.useState();
  const [untilFourHours, setUntilFourHours] = React.useState();
  const [untilFourInHours, setUntilFourInHours] = React.useState();
  const [untilEightHours, setUntilEightHours] = React.useState();
  const [overEightHours, setOverEightHours] = React.useState();

  React.useEffect(() => {
    setLoading(true);
    async function executeRequest() {
      try {
        const {
          overFourPs,
          untilFourPs,
          untilFourIn,
          untilEightIn,
          overEightIn,
        } = await refGetFirstAidStation.current();

        setOverFourHours(overFourPs);
        setUntilFourHours(untilFourPs);
        setUntilFourInHours(untilFourIn);
        setUntilEightHours(untilEightIn);
        setOverEightHours(overEightIn);
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

  //Real Time Register
  const { getRealTimeRegister } = useRealTimeRegister();
  const refGetRealTimeRegister = React.useRef(getRealTimeRegister);
  const [registers, setRegisters] = React.useState();

  React.useEffect(() => {
    setLoading(true);
    async function executeRequest() {
      try {
        const { realTimeRes } = await refGetRealTimeRegister.current();
        setRegisters(realTimeRes);
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

  //Wait For Pediatric Care
  const { getWaitForPediatric } = useWaitForPediatric();
  const refGetWaitForPediatric = React.useRef(getWaitForPediatric);
  const [pediatric, setPediatric] = React.useState();

  React.useEffect(() => {
    setLoading(true);
    async function executeRequest() {
      try {
        const { waitPediatric } = await refGetWaitForPediatric.current();
        setPediatric(waitPediatric);
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

  //Time Triage
  const { getTimeTriages } = useTimeTriages();
  const refGetTimeTriages = React.useRef(getTimeTriages);
  const [screeningQtde, setScreeningQtde] = React.useState();
  const [waitingScreening, setWaitingScreening] = React.useState();
  const [waitRegister, setWaitRegister] = React.useState();

  React.useEffect(() => {
    setLoading(true);
    async function executeRequest() {
      try {
        const { screening, waitingScr, waitRes } =
          await refGetTimeTriages.current();
        setScreeningQtde(screening);
        setWaitingScreening(waitingScr);
        setWaitRegister(waitRes);
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

  //First Aid Station Beds Situations
  const { getFirstAidSituation } = useFirstAidSituation();
  const refGetFirstAidSituation = React.useRef(getFirstAidSituation);
  const [fsaBeds, setFsaBeds] = React.useState();
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    async function executeRequest() {
      try {
        const { fsaSituations, totalPage } =
          await refGetFirstAidSituation.current(page, 32);
        setError(false);
        if (page > totalPage) {
          setPage(1);
        } else {
          setFsaBeds(fsaSituations);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    executeRequest();
    const interval = setInterval(() => {
      setPage((page) => page + 1);
    }, intervalPagination);

    return () => clearInterval(interval);
  }, [page]);

  const transitionsBedsCards = useTransition(fsaBeds ? fsaBeds : [], {
    from: { opacity: 0, y: -10 },
    enter: { opacity: 1, y: 0 },
    leave: { display: "none" },
    trail: 100,
    delay: 50,
    config: config.gentle,
  });

  if (loading) return <Loading />;

  return (
    <main className="min-h-screen w-full flex flex-col justify-center">
      <Helmet>
        <title>CMDC | Pronto Socorro | Geral</title>
        <meta
          name="description"
          content="Dashboard com as informações relacionadas ao pronto socorro."
        />
      </Helmet>
      <section className="px-5 w-full flex-1 flex flex-col gap-y-2 justify-center">
        <div className="w-full sm:max-w-7xl mx-auto flex flex-col gap-2">
          <div className="sm:flex grid grid-cols-1 justify-items-center gap-2">
            <div className="bg-blackCMDC bg-opacity-50 shadow-inner-2 rounded-lg px-2 py-3 sm:flex-1 items-center w-full sm:max-w-44 max-w-108">
              <h2 className="text-xs text-white text-center">
                Pacientes no PS
              </h2>
              <div className="gap-3 sm:flex sm:flex-col grid grid-cols-2 w-full">
                <RoundedCard
                  data={untilFourHours}
                  title="Observados no PS até 4h"
                  titleClass="font-normal text-xslg w-24 mx-auto"
                  className="h-40 sm:flex-col-reverse col-span-1 bg-opacity-0"
                  roundedClass="w-32 h-32 text-xl"
                  rounded={{ type: "gradient", color: "#218298", id: "gdr-1" }}
                  barSize={0.7}
                  toolTipConfig={{
                    title: "Observados no PS até 4h",
                    desc: "Esse card mostra o quantitativo de pacientes em atendimento que estão no PS até 4 horas.",
                  }}
                />
                <RoundedCard
                  data={overFourHours}
                  title="Observados no PS acima de 4h"
                  titleClass="font-normal text-xslg w-24 mx-auto"
                  className="h-40 sm:flex-col-reverse col-span-1 bg-opacity-0"
                  roundedClass="w-32 h-32 text-xl"
                  rounded={{ type: "gradient", color: "#218298", id: "gdr-2" }}
                  barSize={0.7}
                  toolTipConfig={{
                    title: "Observados no PS acima de 4h",
                    desc: "Esse card mostra o quantitativo de pacientes em atendimento que estão  no PS acima de  4 horas.",
                  }}
                />
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <div className="sm:w-full sm:max-w-none max-w-108 w-full pt-3 bg-blackCMDC bg-opacity-50 grid grid-cols-1 shadow-inner-2 rounded-lg">
                <h2 className="text-xs text-white text-center">
                  Pacientes internados no PS
                </h2>
                <div className="flex justify-center sm:gap-24 gap-2">
                  <RoundedCard
                    data={untilFourInHours}
                    title="Pacientes internados no PS até 4h"
                    titleClass="font-normal text-xslg w-32 mx-auto"
                    className="h-40 flex-col-reverse bg-opacity-0"
                    roundedClass="w-32 h-32 text-xl"
                    rounded={{
                      type: "gradient",
                      color: "#00FF94",
                      id: "gdr-3",
                    }}
                    barSize={0.7}
                    toolTipConfig={{
                      title: "Pacientes internados no PS até 4h",
                      desc: "Esse card mostra o quantitativo de pacientes em atendimento e que estão internados no PS até 4 horas. O leito em que o paciente se encontra é exibido abaixo e sinalizado de acordo com a cor do seu status.",
                    }}
                  />
                  <RoundedCard
                    data={untilEightHours}
                    title="Pacientes internados no PS até 8h"
                    titleClass="font-normal text-xslg w-32 mx-auto"
                    className="h-40 flex-col-reverse bg-opacity-0"
                    roundedClass="w-32 h-32 text-xl col-span-1"
                    rounded={{
                      type: "gradient",
                      color: "#7000FF",
                      id: "gdr-4",
                    }}
                    barSize={0.7}
                    toolTipConfig={{
                      title: "Pacientes internados no PS até 8h",
                      desc: "Esse card mostra o quantitativo de pacientes em atendimento e que estão internados  no PS até  8 horas. O leito em que o paciente se encontra é exibido abaixo e sinalizado de acordo com a cor do seu status. O leito em que o paciente se encontra é exibido abaixo e sinalizado de acordo com a cor do seu status.",
                    }}
                  />
                  <RoundedCard
                    data={overEightHours}
                    title="Pacientes internados no PS acima 8h"
                    titleClass="font-normal text-xslg w-32 mx-auto"
                    className="h-40 flex-col-reverse bg-opacity-0"
                    roundedClass="w-32 h-32 text-xl col-span-1"
                    rounded={{
                      type: "gradient",
                      color: "#A9136D",
                      id: "gdr-5",
                    }}
                    barSize={0.7}
                    toolTipConfig={{
                      title: "Pacientes internados no PS até 8h",
                      desc: "Esse card mostra o quantitativo de pacientes em atendimento e que estão internados  no PS acima de  8 horas. O leito em que o paciente se encontra é exibido abaixo e sinalizado de acordo com a cor do seu status.",
                    }}
                  />
                </div>
              </div>
              <div className="sm:h-44 bg-blackCMDC bg-opacity-50 shadow-inner-2 rounded-lg flex sm:max-w-none max-w-108 justify-center items-center p-2">
                <div className="w-11/12 grid sm:grid-cols-8 grid-cols-4 sm:grid-rows-4 grid-rows-8 gap-2 sm:h-full h-80 justify-items-center items-center">
                  {transitionsBedsCards((style, bed) => (
                    <animated.div style={style}>
                      <BedsCard
                        key={bed.DS_LEITO}
                        data={bed.DS_LEITO}
                        color={bed.hexadecimal}
                        className="w-22 h-8 rounded-md text-xsm"
                      />
                    </animated.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 overflow-hidden">
            <RowPatientTable
              title="Tempo Real - Cadastro"
              th={[
                "Fila",
                <People className="w-3 h-3 m-auto" />,
                <div className="flex items-center gap-1">
                  <ClockSimple fill="#FFF" className="w-3 h-3" />
                  <span>Cadastro</span>
                </div>,
              ]}
              data={registers}
              config={["FILA", "EM_ESPERA_CADASTRO", "MAIOR_TEMPO_CADASTRO"]}
              className="text-bold text-white text-xs sm:flex-1 bg-blackCMDC bg-opacity-50 rounded-lg sm:h-42 p-2 w-full max-w-108 sm:max-w-none"
              tbody="max-h-28 overflow-y-scroll scroll-hide text-xsm"
              toolTipConfig={{
                title: "Tempo Real - Cadastro",
                desc: "Este card mostra o tempo de cadastro realizado pela recepção para cada paciente no PS.",
              }}
            />
            <RowPatientTable
              title="Espera Atendimento Pediatrico"
              th={[
                "Fila",
                <People className="w-3 h-3 m-auto" />,
                <div className="flex items-center gap-1">
                  <ClockSimple fill="#FFF" className="w-3 h-3" />
                  <span>Espera médica</span>
                </div>,
              ]}
              data={pediatric}
              config={["FILA", "QTD", "MAIOR_TEMPO"]}
              className="text-bold text-white text-xs sm:flex-1 bg-blackCMDC bg-opacity-50 rounded-lg sm:h-42 p-2 w-full max-w-108 sm:max-w-none"
              tbody="max-h-28 overflow-y-scroll scroll-hide text-xsm"
              toolTipConfig={{
                title: "Espera Atendimento Pediatrico",
                desc: "Este card mostra o tempo de espera do paciente para ser atendido pelo médico plantonista no PS.",
              }}
            />
          </div>
        </div>
        <div className="px-5">
          <div className="z-10 sm:max-w-4xl w-full sm:m-auto grid grid-cols-1 justify-items-center gap-2 sm:flex sm:justify-between sm:items-center">
            <SimpleCard
              data={screeningQtde}
              icon={<People className="w-3 h-3" />}
              title="Triagem"
              className="sm:w-50 max-w-108 w-full h-15 py-1 bg-opacity-50 text-white text-xs"
              dataClass="text-3xl"
              toolTipConfig={{
                title: "Triagem",
                desc: "Este card mostra o tempo que se levar para a triagem antes de gerar o atendimento no PS.",
              }}
            />
            <SimpleCard
              data={waitingScreening}
              type="string"
              title="Espera Para Triagem"
              icon={<ClockPlus className="w-5 h-5" />}
              className="sm:w-72 max-w-108 w-full h-15 py-1 bg-opacity-50 text-white text-xs"
              dataClass="text-3xl"
              toolTipConfig={{
                title: "Espera Para Triagem",
                desc: "Este card mostra o maior tempo de espera que se levar para a triagem antes de gerar o atendimento no PS.",
              }}
            />
            <SimpleCard
              data={waitRegister}
              type="string"
              title="Espera Para Cadastro"
              icon={<ClockPlus className="w-5 h-5" />}
              className="sm:w-72 max-w-108 w-full h-15 py-1 bg-opacity-50 text-white text-xs"
              dataClass="text-3xl"
              toolTipConfig={{
                title: "Espera Para Cadastro",
                desc: "Este card mostra o maior tempo de espero do cadastro para se gerar o atendimento do paciente no PS.",
              }}
            />
          </div>
        </div>
      </section>
      <Footer />
      {error && <Error message={error} />}
    </main>
  );
};

export default FirstAidStationOne;
