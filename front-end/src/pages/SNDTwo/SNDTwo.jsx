import React from "react";
import { Helmet } from "react-helmet";
import { Footer, RectCard, VerifyInsert } from "../../components";
import { Loading, Error } from "../../helper";
import { useTransition, animated, config } from "react-spring";
import CountUp from "react-countup";
import useSND from "../../service/useSND";
import { ReactComponent as Birthday } from "../../assets/svg/Birthday.svg";
import { ReactComponent as Alert } from "../../assets/svg/Alert.svg";
import { ReactComponent as Clock } from "../../assets/svg/Clock.svg";

function SNDTwo() {
  const intervalPagination = 120000;
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  // Requests
  const {
    getScreeningNotPerformed,
    getAnthropometricEvaluation,
    getNutritionalEvolution,
  } = useSND();

  // Screening Not Performed
  const refGetScreeningNotPerformed = React.useRef(getScreeningNotPerformed);
  const [screenings, setScreenings] = React.useState();
  const [pageOne, setPageOne] = React.useState(1);

  React.useEffect(() => {
    async function executeRequest() {
      try {
        const { total, screenings, totalPage } =
          await refGetScreeningNotPerformed.current(pageOne, 10);
        setError(false);
        if (pageOne > totalPage) {
          setPageOne(1);
        } else {
          setScreenings({ total, items: screenings });
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

  // Anthropometric Evaluation
  const refGetAnthropometricEvaluation = React.useRef(
    getAnthropometricEvaluation
  );
  const [anthropometrics, setAnthropometrics] = React.useState();
  const [pageTwo, setPageTwo] = React.useState(1);

  React.useEffect(() => {
    async function executeRequest() {
      try {
        const { total, anthropometrics, totalPage } =
          await refGetAnthropometricEvaluation.current(pageTwo, 10);
        setError(false);
        if (pageTwo > totalPage) {
          setPageTwo(1);
        } else {
          setAnthropometrics({ total, items: anthropometrics });
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

  // Nutritional Evolution
  const refGetNutritionalEvolution = React.useRef(getNutritionalEvolution);
  const [nutritionals, setNutritionals] = React.useState();
  const [pageThree, setPageThree] = React.useState(1);

  React.useEffect(() => {
    async function executeRequest() {
      try {
        const { total, nutritionals, totalPage } =
          await refGetNutritionalEvolution.current(pageThree, 10);
        setError(false);
        if (pageThree > totalPage) {
          setPageThree(1);
        } else {
          setNutritionals({ total, items: nutritionals });
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
  const AlertCard = ({ data, color }) => (
    <div
      className="flex items-center justify-center gap-5 w-32 h-12 bg-black bg-opacity-30 border rounded-full"
      style={{ borderColor: color }}
    >
      <Alert className="w-6 h-6" fill={color} />
      <span className="text-2xl text-white">
        <CountUp end={data || 0} duration={1} />
      </span>
    </div>
  );

  const SNDCard = ({ data, color, days, status, time, icons }) => (
    <RectCard color={color} className="flex flex-col h-16 gap-2">
      <div className="flex justify-between text-xsm text-gray-400">
        <span>
          Atendimento: <span style={{ color }}>{data.code}</span>
        </span>
        <div className="flex gap-1 items-center">
          <Birthday className="w-3 h-3" />
          <span>{data.birthDate}</span>
        </div>
      </div>
      <div className="flex justify-between text-xs text-white">
        <span>{data.from}</span>
        {days && <span>{days}</span>}
        {time && status && (
          <div className="flex gap-1 items-center">
            <Clock className="w-3 h-3" fill={color} />
            <span style={{ color }}>{time}</span>
          </div>
        )}
        {icons && <div className="flex items-center gap-1">{icons}</div>}
      </div>
      <div className="flex justify-between text-xs text-white">
        <span>{data.name?.replace(data.name[0] + ".", "")}</span>
        {time && !status && (
          <div className="flex gap-1 items-center">
            <Clock className="w-3 h-3" fill={color} />
            <span style={{ color }}>{time}</span>
          </div>
        )}
        {status && (
          <div
            className={`flex justify-center items-center w-full max-w-15 h-6 rounded-full 
            ${status === "BAIXO" && "bg-red-400"} 
            ${status === "MEDIO" && "bg-red-500"} 
            ${status === "ALTO" && "bg-red-800"}
            `}
          >
            <span className="text-white">{status}</span>
          </div>
        )}
      </div>
    </RectCard>
  );

  // Transitions of Pages
  const transitionsScreenings = useTransition(
    screenings ? screenings.items : [],
    {
      from: { opacity: 0, y: -10 },
      enter: { opacity: 1, y: 0 },
      leave: { display: "none" },
      trail: 100,
      delay: 50,
      config: config.gentle,
    }
  );

  const transitionsAnthropometrics = useTransition(
    anthropometrics ? anthropometrics.items : [],
    {
      from: { opacity: 0, y: -10 },
      enter: { opacity: 1, y: 0 },
      leave: { display: "none" },
      trail: 100,
      delay: 50,
      config: config.gentle,
    }
  );

  const transitionsNutritionals = useTransition(
    nutritionals ? nutritionals.items : [],
    {
      from: { opacity: 0, y: -10 },
      enter: { opacity: 1, y: 0 },
      leave: { display: "none" },
      trail: 100,
      delay: 50,
      config: config.gentle,
    }
  );

  if (loading) return <Loading />;

  return (
    <main className="min-h-screen w-full flex flex-col justify-center">
      <Helmet>
        <title>CMDC | SND | Alertas</title>
        <meta
          name="description"
          content="Dashboard relacionado aos Alertas no SND."
        />
      </Helmet>
      <section className="px-5 flex-1 flex flex-col justify-center">
        <h2 className="text-2xl text-white text-center mb-2 font-semibold mt-1">
          SND
        </h2>
        <div className="max-w-7xl w-full mx-auto flex flex-col gap-2">
          <div className="grid sm:grid-cols-3 grid-cols-1 gap-2 justify-items-center mb-1">
            <div className="bg-opacity-50 bg-blackCMDC rounded-lg border max-w-108 border-red-450 w-full flex flex-col items-center gap-4 py-2">
              <h2 className="text-white text-sm font-semibold">
                Notificação de Triagem Não Realizada
              </h2>
              <AlertCard data={screenings?.total} color="#FF4A4A" />
              <div className="w-full h-110 grid grid-cols-2 grid-rows-5 gap-1 sm:px-1 px-6 mt-2">
                <VerifyInsert
                  display={screenings?.items.length}
                  message="Não há atendimentos no momento"
                  className="col-span-2 text-sm whitespace-normal text-white"
                >
                  {transitionsScreenings((style, attendance) => (
                    <animated.div style={style}>
                      <SNDCard
                        color="#FF4A4A"
                        time={attendance.TEMPO}
                        data={{
                          code: attendance.CD_ATENDIMENTO,
                          birthDate: attendance.DT_NASCIMENTO,
                          from: attendance.DS_RESUMO,
                          name: attendance.NOME_PACIENTE,
                        }}
                      />
                    </animated.div>
                  ))}
                </VerifyInsert>
              </div>
            </div>
            <div className="bg-opacity-50 bg-blackCMDC rounded-lg border max-w-108 border-white w-full flex flex-col items-center gap-4 py-2">
              <h2 className="text-white text-sm font-semibold">
                Avaliação Antropométrica
              </h2>
              <AlertCard data={anthropometrics?.total} color="#FFF" />
              <div className="w-full h-110 grid grid-cols-2 grid-rows-5 gap-1 sm:px-1 px-6 mt-2">
                <VerifyInsert
                  display={anthropometrics?.items.length}
                  message="Não há atendimentos no momento"
                  className="col-span-2 text-sm whitespace-normal text-white"
                >
                  {transitionsAnthropometrics((style, attendance) => (
                    <animated.div style={style}>
                      <SNDCard
                        color="#FFF"
                        time={attendance.HORAS_ABERTO}
                        days={`${attendance.DIAS} DIAS`}
                        data={{
                          code: attendance.CD_ATENDIMENTO,
                          birthDate: attendance.DT_NASCIMENTO,
                          from: attendance.DS_RESUMO,
                          name: attendance.NOME_PACIENTE,
                        }}
                      />
                    </animated.div>
                  ))}
                </VerifyInsert>
              </div>
            </div>
            <div className="bg-opacity-50 bg-blackCMDC rounded-lg border max-w-108 border-green-300 w-full flex flex-col items-center gap-4 py-2">
              <h2 className="text-white text-sm font-semibold">
                Evolução Nutricional
              </h2>
              <AlertCard data={nutritionals?.total} color="#4AFFC9" />
              <div className="w-full h-110 grid grid-cols-2 grid-rows-5 gap-1 sm:px-1 px-6 mt-2">
                <VerifyInsert
                  display={nutritionals?.items.length}
                  message="Não há atendimentos no momento"
                  className="col-span-2 text-sm whitespace-normal text-white"
                >
                  {transitionsNutritionals((style, attendance) => (
                    <animated.div style={style}>
                      <SNDCard
                        color="#4AFFC9"
                        time={attendance.HORAS_ABERTO}
                        status={attendance.TIPO.split(" ")[0]}
                        data={{
                          code: attendance.CD_ATENDIMENTO,
                          birthDate: attendance.DT_NASCIMENTO,
                          from: attendance.DS_RESUMO,
                          name: attendance.NOME_PACIENTE,
                        }}
                      />
                    </animated.div>
                  ))}
                </VerifyInsert>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      {error && <Error message={error} />}
    </main>
  );
}

export default SNDTwo;
