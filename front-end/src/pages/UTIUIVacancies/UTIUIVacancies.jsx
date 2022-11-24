import React from "react";
import { Helmet } from "react-helmet";
import {
  AreaGraphic,
  Footer,
  RoundedCard,
  SimpleCard,
  RectCard,
  SimpleRectCard,
  VerifyInsert,
} from "../../components";
import { Loading, Error } from "../../helper";
import useUtilities from "../../service/useUtilities";
import useHDUIUTI from "../../service/useHDUIUTI";
import { useTransition, animated, config } from "react-spring";
import { ReactComponent as Appetizer } from "../../assets/svg/Appetizer.svg";
import { ReactComponent as Exit } from "../../assets/svg/Exit.svg";
import { ReactComponent as Birthday } from "../../assets/svg/Birthday.svg";
import CountUp from "react-countup";

const UTIUIVacancies = () => {
  const timeInterval = 30000;
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const { getFontSize } = useUtilities();

  // HOME CARES
  const {
    getReasonForDischarge,
    getPatients,
    getVacantOccupiedBeds,
    getNeedVacancies,
    getInternalTransfer,
    getRequestDays,
    getVacanciesPerFloor,
  } = useHDUIUTI();
  const refGetReasonForDischarge = React.useRef(getReasonForDischarge);
  const refGetVacantOccupiedBeds = React.useRef(getVacantOccupiedBeds);
  const refGetNeedVacancies = React.useRef(getNeedVacancies);
  const refGetInternalTransfer = React.useRef(getInternalTransfer);
  const refGetRequestDays = React.useRef(getRequestDays);
  const refGetVacanciesPerFloor = React.useRef(getVacanciesPerFloor);
  const [homeCare, setHomeCare] = React.useState();
  const [vacantsOccupied, setVacantsOccupied] = React.useState();
  const [needVacancies, setNeedVacancies] = React.useState();
  const [internalTransfer, setInternalTransfer] = React.useState();
  const [requestedDays, setRequestedDays] = React.useState();
  const [vacancies, setVacancies] = React.useState();

  React.useEffect(() => {
    setLoading(true);
    async function executeRequest() {
      try {
        const { predictedExits } = await refGetReasonForDischarge.current();
        const { vacantsAndOccupied } = await refGetVacantOccupiedBeds.current();
        const needVacanciesUIUTI = await refGetNeedVacancies.current();
        const transfer = await refGetInternalTransfer.current();
        const requesteds = await refGetRequestDays.current();
        const { vacanciesPerFlor } = await refGetVacanciesPerFloor.current();
        setHomeCare(predictedExits);
        setVacantsOccupied(vacantsAndOccupied);
        setNeedVacancies(needVacanciesUIUTI);
        setInternalTransfer(transfer);
        setRequestedDays(requesteds);
        setVacancies(vacanciesPerFlor);

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

  //
  const refGetPatients = React.useRef(getPatients);
  const [page, setPage] = React.useState(1);
  const [patients, setPatients] = React.useState();

  React.useEffect(() => {
    async function executeRequest() {
      try {
        const { totalPage, patients } = await refGetPatients.current(page, 6);
        setError(false);
        if (page > totalPage) {
          setPage(1);
        } else {
          setPatients(patients);
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
    }, timeInterval);

    return () => {
      clearInterval(interval);
    };
  }, [page]);

  // config
  const configAreas = {
    areas: [
      {
        key: "internations",
        bgGradient: {
          from: "#3d3d3f",
          to: "#0096C7",
        },
        lineGradient: {
          from: "#0096C7",
          to: "#3EFFE8",
        },
      },
    ],
  };

  const transitionsPatients = useTransition(patients ? patients : [], {
    from: { opacity: 0, y: -10 },
    enter: { opacity: 1, y: 0 },
    leave: { display: "none" },
    trail: 100,
    delay: 50,
    config: config.gentle,
  });

  const VacationCard = ({ data, color }) => {
    const values = data ? Object.values(data) : [];
    const [patient, birthDate, from, to] = values;

    return (
      <RectCard
        style={{ backgroundColor: "#1B1D22" }}
        color={color}
        className="flex flex-col gap-2 py-4"
      >
        <div className="flex justify-between items-center">
          <span className="text-xs text-white">{patient}</span>
          <div className="flex gap-1 items-center">
            <Birthday className="w-3 h-3" />
            <span className="text-xsm text-gray-400">{birthDate}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-red-400">{from}</span>
          <div className="flex gap-1 items-center">
            <Exit className="w-4 h-4" fill="#FFB156" />
            <span className="text-xs text-green-300">{to}</span>
          </div>
        </div>
      </RectCard>
    );
  };

  if (loading) return <Loading />;

  return (
    <main className="min-h-screen w-full flex flex-col">
      <Helmet>
        <title>CMDC | HD - UI - UTI | Vagas</title>
        <meta
          name="description"
          content="Dashboard relacionado as vagas de UI | UTI"
        />
      </Helmet>
      <section className="px-5 flex-1 flex flex-col justify-center">
        <div className="flex flex-col gap-2 w-full max-w-7xl mx-auto">
          <h1 className="text-2xl text-white text-center flex-1 font-bold">
            UI | UTI
          </h1>
          <div className="grid sm:grid-cols-5 grid-cols-1 gap-2">
            <div className="bg-blackCMDC rounded-lg bg-opacity-50 col-span-1 flex flex-col">
              <RoundedCard
                data={vacantsOccupied ? vacantsOccupied.vacants.total : 0}
                totalValue="Vagos"
                valueExibition={{
                  dataOne: vacantsOccupied ? vacantsOccupied.vacants.ui : 0,
                  dataTwo: vacantsOccupied ? vacantsOccupied.vacants.uti : 0,
                }}
                exibition={{
                  titleOne: "UI",
                  titleTwo: "UTI",
                }}
                className="bg-opacity-0 sm:w-full w-72 m-auto"
                roundedClass="w-36 h-36 text-xl"
                barSize={1.1}
                rounded={{
                  type: "gradient",
                  color: "#65C8FF",
                  id: "gdr-1",
                }}
              />
              <RoundedCard
                data={vacantsOccupied ? vacantsOccupied.occupied.total : 0}
                totalValue="Ocupados"
                valueExibition={{
                  dataOne: vacantsOccupied ? vacantsOccupied.occupied.ui : 0,
                  dataTwo: vacantsOccupied ? vacantsOccupied.occupied.uti : 0,
                }}
                exibition={{
                  titleOne: "UI",
                  titleTwo: "UTI",
                }}
                className="bg-opacity-0 sm:w-full w-72 m-auto"
                roundedClass="w-36 h-36 text-xl"
                barSize={1.1}
                rounded={{
                  type: "gradient",
                  color: "#FF5050",
                  id: "gdr-2",
                }}
              />
              <RoundedCard
                data={vacantsOccupied ? vacantsOccupied.total : 0}
                totalValue="Total"
                className="bg-opacity-0 sm:w-full w-72 m-auto"
                roundedClass="w-36 h-36 text-xl"
                barSize={1.1}
                rounded={{
                  type: "gradient",
                  color: "#FFF",
                  id: "gdr-3",
                }}
              />
            </div>
            <div className="col-span-2 flex flex-col gap-2">
              <AreaGraphic
                data={requestedDays?.fiveDays}
                totalValue={
                  <div className="flex items-center gap-1 text-6xl mt-8">
                    <CountUp
                      end={requestedDays ? requestedDays.onDay.internations : 0}
                      duration={1}
                    />
                    <Appetizer className="w-8 h-8" />
                  </div>
                }
                xKey="day"
                className="w-full h-72 bg-opacity-50"
                title="Vagas Solicitadas"
                config={configAreas}
                legendPosition={{
                  marginTop: -50,
                  marginRight: 40,
                }}
                chartPosition={{
                  top: 2 * getFontSize(),
                  right: 0.9 * getFontSize(),
                  left: -2.2 * getFontSize(),
                  bottom: -0.4 * getFontSize(),
                }}
              />
              <div className="bg-blackCMDC bg-opacity-50 rounded-lg h-72 w-full p-1">
                <h2 className="text-sm text-white font-semibold text-center">
                  Motivos de Alta
                </h2>
                <div className="flex flex-wrap p-5 gap-x-2 justify-center items-center h-full w-full">
                  <SimpleCard
                    data={homeCare ? homeCare.homeCare.total : 0}
                    title="HOME CARE"
                    style={{ backgroundColor: "#1B1D22" }}
                    className="w-48 h-28 bg-opacity-50 text-yellow-300 text-xs font-bold flex-col"
                    dataClass="text-2xl"
                    exibition={{
                      dataOne: homeCare ? homeCare.homeCare.ui : 0,
                      titleOne: "UI",
                      dataTwo: homeCare ? homeCare.homeCare.uti : 0,
                      titleTwo: "UTI",
                    }}
                  />
                  <SimpleCard
                    data={homeCare ? homeCare.hospitalization.total : 0}
                    title="ALTA HOSPITALAR"
                    style={{ backgroundColor: "#1B1D22" }}
                    className="w-48 h-28 bg-opacity-50 text-green-300 text-xs font-bold flex-col"
                    dataClass="text-2xl"
                    exibition={{
                      dataOne: homeCare ? homeCare.hospitalization.ui : 0,
                      titleOne: "UI",
                      dataTwo: homeCare ? homeCare.hospitalization.uti : 0,
                      titleTwo: "UTI",
                    }}
                  />
                  <SimpleCard
                    data={internalTransfer?.total}
                    title="TRANSF. INTERNA"
                    style={{ backgroundColor: "#1B1D22" }}
                    className="w-36 h-24 bg-opacity-50 text-pink-400 text-xs font-bold flex-col"
                    dataClass="text-2xl"
                    exibition={{
                      dataOne: internalTransfer?.ui,
                      titleOne: "UI",
                      dataTwo: internalTransfer?.uti,
                      titleTwo: "UTI",
                    }}
                  />
                  <SimpleCard
                    data={homeCare ? homeCare.externTransfer.total : 0}
                    title="TRANSF. EXTERNA"
                    style={{ backgroundColor: "#1B1D22" }}
                    className="w-36 h-24 bg-opacity-50 text-indigo-300 text-xs font-bold flex-col"
                    dataClass="text-2xl"
                    exibition={{
                      dataOne: homeCare ? homeCare.externTransfer.ui : 0,
                      titleOne: "UI",
                      dataTwo: homeCare ? homeCare.externTransfer.uti : 0,
                      titleTwo: "UTI",
                    }}
                  />
                  <SimpleCard
                    data={homeCare ? homeCare.obito.total : 0}
                    title="ÓBITO"
                    style={{ backgroundColor: "#1B1D22" }}
                    className="w-36 h-24 bg-opacity-50 text-red-300 text-xs font-bold flex-col"
                    dataClass="text-2xl"
                    exibition={{
                      dataOne: homeCare ? homeCare.obito.ui : 0,
                      titleOne: "UI",
                      dataTwo: homeCare ? homeCare.obito.uti : 0,
                      titleTwo: "UTI",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-2 flex flex-col gap-2">
              <div className="bg-blackCMDC bg-opacity-50 rounded-lg h-72 w-full p-1">
                <div className="flex flex-col gap-2">
                  <div className="grid grid-cols-2 justify-items-center mt-2">
                    <SimpleRectCard
                      data={needVacancies ? needVacancies.uti.TOTAL_HJ : 0}
                      title="UTI"
                      color="#B5FFA2"
                      style={{ backgroundColor: "#1B1D22" }}
                      exibition={{
                        dataOne: needVacancies
                          ? needVacancies.uti.PS_UTI_HJ
                          : 0,
                        titleOne: "PS",
                        dataTwo: needVacancies
                          ? needVacancies.uti.UPP_UTI_HJ
                          : 0,
                        titleTwo: "UPP",
                        dataThree: needVacancies
                          ? needVacancies.uti.RESERVAS_UTI_HJ
                          : 0,
                        titleThree: "RES",
                        dataFour: needVacancies
                          ? needVacancies.uti.RESERVAS_UTI_AM
                          : 0,
                        titleFour: "RES AM",
                      }}
                      className="w-42 h-32"
                      dataClass="text-2xl"
                    />
                    <SimpleRectCard
                      data={needVacancies ? needVacancies.ui.TOTAL : 0}
                      title="UI"
                      color="#B5FFA2"
                      style={{ backgroundColor: "#1B1D22" }}
                      exibition={{
                        dataOne: needVacancies ? needVacancies.ui.PS_UI_HJ : 0,
                        titleOne: "PS",
                        dataTwo: needVacancies ? needVacancies.ui.UPP_UI_HJ : 0,
                        titleTwo: "UPP",
                        dataThree: needVacancies
                          ? needVacancies.ui.RESERVAS_UI_HJ
                          : 0,
                        titleThree: "RES",
                        dataFour: needVacancies
                          ? needVacancies.ui.RESERVAS_UI_AM
                          : 0,
                        titleFour: "RES AM",
                      }}
                      className="w-42 h-32"
                      dataClass="text-2xl"
                    />
                  </div>
                  <div className="h-28">
                    <h2 className="text-white font-semibold text-xs text-center mb-1">
                      Vagas por Andar
                    </h2>
                    <RectCard
                      color="#05A0FF"
                      style={{ backgroundColor: "#1B1D22" }}
                      className="grid grid-cols-3 grid-rows-5 grid-flow-col gap-1 w-full h-full bg-blackCMDC bg-opacity-50"
                    >
                      {vacancies?.map(({ DS_UNID_INT, QTD_UNID }) => (
                        <p className="text-white text-sm animate-left">
                          {DS_UNID_INT} -{" "}
                          <span className="text-blue-300">{QTD_UNID}</span>
                        </p>
                      ))}
                    </RectCard>
                  </div>
                </div>
              </div>
              <div className="bg-blackCMDC bg-opacity-50 rounded-lg h-72 w-full py-1 px-3">
                <h2 className="text-sm text-white text-center mb-2">
                  Pacientes Leitos de Origem e Destino
                </h2>
                <div className="grid grid-cols-2 grid-rows-3 gap-2 h-64 w-full">
                  {
                    <VerifyInsert
                      display={!!patients}
                      message="Não há transferências no momento"
                      className="col-span-2 text-xs whitespace-normal text-white"
                    >
                      {transitionsPatients((style, patient) => (
                        <animated.div style={style}>
                          <VacationCard data={patient} color="#9B9B9B" />
                        </animated.div>
                      ))}
                    </VerifyInsert>
                  }
                </div>
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

export default UTIUIVacancies;
