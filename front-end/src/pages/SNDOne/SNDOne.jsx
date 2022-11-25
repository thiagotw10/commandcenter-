import React from "react";
import { Helmet } from "react-helmet";
import {
  Footer,
  RectCard,
  VerifyInsert,
  AsideInformations,
} from "../../components";
import { Loading, Error } from "../../helper";
import { useTransition, animated, config } from "react-spring";
import CountUp from "react-countup";
import useSND from "../../service/useSND";
import { ReactComponent as Exit } from "../../assets/svg/Exit.svg";
import { ReactComponent as Birthday } from "../../assets/svg/Birthday.svg";
import { ReactComponent as Alert } from "../../assets/svg/Alert.svg";
import { ReactComponent as Clock } from "../../assets/svg/Clock.svg";
import { ReactComponent as Bug } from "../../assets/svg/Bug.svg";
import { ReactComponent as Talhers } from "../../assets/svg/Talhers.svg";

function SNDOne() {
  const intervalPagination = 120000;
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  // Requests
  const {
    getInternalTransfer,
    getFastingPatients,
    getAllergyAlert,
    getAbsencePrescription,
    getDietChange,
  } = useSND();

  // Iternal Tranfers
  const refGetInternalTransfer = React.useRef(getInternalTransfer);
  const [internalTransFers, setInternalTransFers] = React.useState();
  const [pageOne, setPageOne] = React.useState(1);

  React.useEffect(() => {
    async function executeRequest() {
      try {
        const { total, transfers, totalPage } =
          await refGetInternalTransfer.current(pageOne, 5);
        setError(false);
        if (pageOne > totalPage) {
          setPageOne(1);
        } else {
          setInternalTransFers({ total, items: transfers });
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

  // Fasting Patients
  const refGetFastingPatients = React.useRef(getFastingPatients);
  const [fastingPatients, setFastingPatients] = React.useState();
  const [pageTwo, setPageTwo] = React.useState(1);

  React.useEffect(() => {
    async function executeRequest() {
      try {
        const { total, patients, totalPage } =
          await refGetFastingPatients.current(pageTwo, 5);
        setError(false);
        if (pageTwo > totalPage) {
          setPageTwo(1);
        } else {
          setFastingPatients({ total, items: patients });
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

  // Fasting Patients
  const refGetAllergyAlert = React.useRef(getAllergyAlert);
  const [allergyAlerts, setAllergyAlerts] = React.useState();
  const [pageThree, setPageThree] = React.useState(1);

  React.useEffect(() => {
    async function executeRequest() {
      try {
        const { total, allergies, totalPage } =
          await refGetAllergyAlert.current(pageThree, 5);
        setError(false);
        if (pageThree > totalPage) {
          setPageThree(1);
        } else {
          setAllergyAlerts({ total, items: allergies });
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

  // Absence Prescription
  const refGetAbsencePrescription = React.useRef(getAbsencePrescription);
  const [abscencePrescription, setAbscencePrescription] = React.useState();
  const [pageFour, setPageFour] = React.useState(1);

  React.useEffect(() => {
    async function executeRequest() {
      try {
        const { total, prescriptions, totalPage } =
          await refGetAbsencePrescription.current(pageFour, 5);
        setError(false);
        if (pageFour > totalPage) {
          setPageFour(1);
        } else {
          setAbscencePrescription({ total, items: prescriptions });
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    executeRequest();
    const interval = setInterval(() => {
      setPageFour((page) => page + 1);
    }, intervalPagination);

    return () => clearInterval(interval);
  }, [pageFour]);

  // Diet Change
  const refGetDietChange = React.useRef(getDietChange);
  const [diets, setDiets] = React.useState();
  const [pageFive, setPageFive] = React.useState(1);

  React.useEffect(() => {
    async function executeRequest() {
      try {
        const { total, diets, totalPage } = await refGetDietChange.current(
          pageFive,
          5
        );
        setError(false);
        if (pageFive > totalPage) {
          setPageFive(1);
        } else {
          setDiets({ total, items: diets });
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    executeRequest();
    const interval = setInterval(() => {
      setPageFive((page) => page + 1);
    }, intervalPagination);

    return () => clearInterval(interval);
  }, [pageFive]);

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

  const SNDCard = ({ data, color, to, time, bed, alergy, icons }) => (
    <RectCard color={color} className="flex flex-col h-16 gap-1">
      <div className="flex justify-between text-xsm text-gray-400">
        <span>
          Atendimento: <span style={{ color }}>{data.code}</span>
        </span>
        <div className="flex gap-1 items-center">
          <Birthday className="w-3 h-3" />
          <span>{data.birthDate}</span>
        </div>
      </div>
      <div className="flex justify-between items-center text-xs text-white">
        <span>
          {`${data.from.split(" ")[0]} ${data.from.split(" ")[1] || ""}`}
        </span>
        {to && (
          <div className="flex gap-1 items-center">
            <Exit className="w-5 h-5" fill={color} />
            <span className="text-green-200">
              {`${to.split(" ")[0]} ${to.split(" ")[1] || ""}`}
            </span>
          </div>
        )}
        {icons && <div className="flex items-center gap-1">{icons}</div>}
      </div>
      <div className="flex justify-between text-xs text-white">
        <span>{data.name}</span>
        {time && (
          <div className="flex gap-1 items-center">
            <Clock className="w-3 h-3" fill={color} />
            <span style={{ color }}>{time}</span>
          </div>
        )}
        {bed && <p className="text-xs text-white">{bed}</p>}
      </div>
      {alergy && (
        <span className="text-xs flex gap-1 text-white">
          Alergia:{" "}
          <span className="text-purple-600">{alergy.type?.split(" ")[0]}</span>
          {!!alergy.quantity && (
            <span className="text-white">+{alergy.quantity}</span>
          )}
        </span>
      )}
      {data.jejum && <span className="text-xs text-red-400">{data.jejum}</span>}
    </RectCard>
  );

  const titles = [
    {
      icon: <Bug className="w-5 h-5" />,
      title: "ALERGIA",
    },
  ];

  // Transitions of Pages
  const transitionsInternalTransfer = useTransition(
    internalTransFers ? internalTransFers.items : [],
    {
      from: { opacity: 0, y: -10 },
      enter: { opacity: 1, y: 0 },
      leave: { display: "none" },
      trail: 100,
      delay: 50,
      config: config.gentle,
    }
  );

  const transitionsPatientTransfers = useTransition(
    fastingPatients ? fastingPatients.items : [],
    {
      from: { opacity: 0, y: -10 },
      enter: { opacity: 1, y: 0 },
      leave: { display: "none" },
      trail: 100,
      delay: 50,
      config: config.gentle,
    }
  );

  const transitionsAllergyAllert = useTransition(
    allergyAlerts ? allergyAlerts.items : [],
    {
      from: { opacity: 0, y: -10 },
      enter: { opacity: 1, y: 0 },
      leave: { display: "none" },
      trail: 100,
      delay: 50,
      config: config.gentle,
    }
  );

  const transitionsPrescriptions = useTransition(
    abscencePrescription ? abscencePrescription.items : [],
    {
      from: { opacity: 0, y: -10 },
      enter: { opacity: 1, y: 0 },
      leave: { display: "none" },
      trail: 100,
      delay: 50,
      config: config.gentle,
    }
  );

  const transitionsDiets = useTransition(diets ? diets.items : [], {
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
        <title>CMDC | SND | Sinalizacoes</title>
        <meta
          name="description"
          content="Dashboard relacionado aos sinalizações no SND."
        />
      </Helmet>
      <section className="px-5 flex-1 flex flex-col justify-center">
        <h2 className="text-2xl text-white text-center mb-2 font-semibold mt-1">
          SND
        </h2>
        <div className="max-w-7xl w-full mx-auto flex flex-col gap-2">
          <div className="grid sm:grid-cols-5 grid-cols-1 gap-2 justify-items-center mb-1">
            <div className="bg-opacity-50 bg-blackCMDC rounded-lg border max-w-108 border-orange-450 w-full flex flex-col items-center gap-4 p-2">
              <h2 className="text-white text-sm font-semibold">
                Transferências Internas
              </h2>
              <AlertCard data={internalTransFers?.total} color="#FF903F" />
              <div className="w-full h-110 flex flex-col gap-2 sm:px-2 px-8 mt-2">
                <VerifyInsert
                  display={internalTransFers?.items.length}
                  message="Não há atendimentos no momento"
                  className="text-sm whitespace-normal text-white"
                >
                  {transitionsInternalTransfer((style, attendance) => (
                    <animated.div style={style}>
                      <SNDCard
                        color="#FF903F"
                        to={attendance.DS_LEITO}
                        data={{
                          code: attendance.CD_ATENDIMENTO,
                          birthDate: attendance.DT_NASCIMENTO,
                          from: attendance.LEITO_ANTERIOR,
                          name: attendance.NOME_PACIENTE,
                        }}
                      />
                    </animated.div>
                  ))}
                </VerifyInsert>
              </div>
            </div>
            <div className="bg-opacity-50 bg-blackCMDC rounded-lg border max-w-108 border-yellow-450 w-full flex flex-col items-center gap-4 p-2">
              <h2 className="text-white text-sm font-semibold">
                Pacientes em Jejum
              </h2>
              <AlertCard data={fastingPatients?.total} color="#FBFF47" />
              <div className="w-full h-110 flex flex-col gap-2 sm:px-2 px-8 mt-2">
                <VerifyInsert
                  display={fastingPatients?.items.length}
                  message="Não há atendimentos no momento"
                  className="text-sm whitespace-normal text-white"
                >
                  {transitionsPatientTransfers((style, attendance) => (
                    <animated.div style={style}>
                      <SNDCard
                        color="#FBFF47"
                        time={attendance.HORAS_PRESC_ABERTO}
                        data={{
                          code: attendance.CD_ATENDIMENTO,
                          birthDate: attendance.DT_NASCIMENTO,
                          from: attendance.DS_RESUMO,
                          name: attendance.NM_PACIENTE,
                          jejum:
                            attendance.STATUS === "JEJUM MAIS"
                              ? "Observação"
                              : false,
                        }}
                      />
                    </animated.div>
                  ))}
                </VerifyInsert>
              </div>
            </div>
            <div className="bg-opacity-50 bg-blackCMDC rounded-lg border max-w-108 border-purple-600 w-full flex flex-col items-center gap-4 p-2">
              <h2 className="text-white text-sm font-semibold">
                Alerta de Alergia
              </h2>
              <AlertCard data={allergyAlerts?.total} color="#8526FF" />
              <div className="w-full h-110 flex flex-col gap-2 sm:px-2 px-8 mt-2">
                <VerifyInsert
                  display={allergyAlerts?.items.length}
                  message="Não há atendimentos no momento"
                  className="text-sm whitespace-normal text-white"
                >
                  {transitionsAllergyAllert((style, attendance) => (
                    <animated.div style={style}>
                      <SNDCard
                        color="#8526FF"
                        alergy={{
                          type: attendance.DS_ALERGIA,
                          quantity: attendance.QTD_ALLERGY,
                        }}
                        data={{
                          code: attendance.CD_ATENDIMENTO,
                          birthDate: attendance.DT_NASCIMENTO,
                          from: attendance.DS_RESUMO,
                          name: attendance.NOME_PACIENTE,
                        }}
                        icons={
                          attendance.DS_SUBSTANCIA !== "_INATIVO_"
                            ? [<Bug className="w-3 h-3" />]
                            : []
                        }
                      />
                    </animated.div>
                  ))}
                </VerifyInsert>
              </div>
            </div>
            <div className="bg-opacity-50 bg-blackCMDC rounded-lg border max-w-108 border-red-400 w-full flex flex-col items-center gap-4 p-2">
              <h2 className="text-white text-sm font-semibold">
                Ausência de Prescrição - PS
              </h2>
              <AlertCard data={abscencePrescription?.total} color="#FF6C6C" />
              <div className="w-full h-110 flex flex-col gap-2 sm:px-2 px-8 mt-2">
                <VerifyInsert
                  display={abscencePrescription?.items.length}
                  message="Não há atendimentos no momento"
                  className="text-sm whitespace-normal text-white"
                >
                  {transitionsPrescriptions((style, attendance) => (
                    <animated.div style={style}>
                      <SNDCard
                        color="#FF6C6C"
                        time={attendance.HORAS_MINUTOS}
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
            <div className="bg-opacity-50 bg-blackCMDC rounded-lg border max-w-108 border-blue-400 w-full flex flex-col items-center gap-4 p-2">
              <h2 className="text-white text-sm font-semibold">
                Mudança de Dieta
              </h2>
              <AlertCard data={diets?.total} color="#0096C7" />
              <div className="w-full h-110 flex flex-col gap-2 sm:px-2 px-8 mt-2">
                <VerifyInsert
                  display={diets?.items.length}
                  message="Não há atendimentos no momento"
                  className="text-sm whitespace-normal text-white"
                >
                  {transitionsDiets((style, attendance) => (
                    <animated.div style={style}>
                      <SNDCard
                        color="#0096C7"
                        to={attendance.DIETA2}
                        bed={attendance.DS_RESUMO}
                        data={{
                          code: attendance.CD_ATENDIMENTO,
                          birthDate: attendance.DT_NASCIMENTO,
                          from: attendance.DIETA1,
                          name: attendance.NOME_PACIENTE,
                        }}
                        icons={[<Talhers className="w-4 h-4" />]}
                      />
                    </animated.div>
                  ))}
                </VerifyInsert>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="relative w-full">
        <AsideInformations
          data={titles}
          labelClass="justify-center flex-wrap flex-row"
          className="z-10 max-w-4xl m-auto text-xs"
        />
        <Footer className="sm:absolute block bottom-0 left-0" />
      </div>
      {error && <Error message={error} />}
    </main>
  );
}

export default SNDOne;
