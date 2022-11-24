import React from "react";
import { Helmet } from "react-helmet";
import { Footer, RoundedCard, RectCard, VerifyInsert } from "../../components";
import { Loading, Error } from "../../helper";
import { format, parseISO } from "date-fns";
import { useTransition, animated, config } from "react-spring";
import { ReactComponent as People } from "../../assets/svg/People.svg";
import { ReactComponent as Birthday } from "../../assets/svg/Birthday.svg";
import { ReactComponent as CupHelth } from "../../assets/svg/CupHelth.svg";
import CountUp from "react-countup";
import useDrugstore from "../../service/useDrugstore";
import useSurgeries from "../../service/useSurgeries";

const PharmacyCC = () => {
  const intervalPagination = 60000;
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const { getDantrolenCC } = useDrugstore();

  const refGetDantrolenCC = React.useRef(getDantrolenCC);
  const [pageOne, setPageOne] = React.useState(1);
  const [prescriptionsCC, setPrescriptionsCC] = React.useState();

  React.useEffect(() => {
    async function executeRequest() {
      try {
        const { totalPage, total, prescriptions } =
          await refGetDantrolenCC.current(pageOne, 4);
        setError(false);
        if (pageOne > totalPage) {
          setPageOne(1);
        } else {
          setPrescriptionsCC({ total, items: prescriptions });
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

    return () => {
      clearInterval(interval);
    };
  }, [pageOne]);

  const { getUnusualSurgeries } = useSurgeries();
  const refGetUnusualSurgeries = React.useRef(getUnusualSurgeries);

  const [childbirthSurgery, setChildbirthSurgery] = React.useState([]);
  const [pageThree, setPageThree] = React.useState(1);

  React.useEffect(() => {
    async function executeRequest() {
      try {
        const { totalPage, surgeries, total } =
          await refGetUnusualSurgeries.current("FETAL/PARTO", pageThree, 4);
        setError(false);
        if (pageThree > totalPage) {
          setPageThree(1);
        } else {
          setChildbirthSurgery({ total, surgeries });
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

  const [cardio, setCardio] = React.useState([]);
  const [pageFour, setPageFour] = React.useState(1);

  React.useEffect(() => {
    async function executeRequest() {
      try {
        const { totalPage, surgeries, total } =
          await refGetUnusualSurgeries.current("CARDIOLOGIA", pageFour, 4);
        setError(false);
        if (pageFour > totalPage) {
          setPageFour(1);
        } else {
          setCardio({ total, surgeries });
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

  const [neuro, setNeuro] = React.useState([]);
  const [pageFive, setPageFive] = React.useState(1);

  React.useEffect(() => {
    async function executeRequest() {
      try {
        const { totalPage, surgeries, total } =
          await refGetUnusualSurgeries.current("NEUROCIRURGIA", pageFive, 4);
        setError(false);
        if (pageFive > totalPage) {
          setPageFive(1);
        } else {
          setNeuro({ total, surgeries });
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

  const [orthopedics, setOrthopedics] = React.useState([]);
  const [pageSix, setPageSix] = React.useState(1);

  React.useEffect(() => {
    async function executeRequest() {
      try {
        const { totalPage, surgeries, total } =
          await refGetUnusualSurgeries.current("ORTOPEDIA/COLUNA", pageSix, 4);
        setError(false);
        if (pageSix > totalPage) {
          setPageSix(1);
        } else {
          setOrthopedics({ total, surgeries });
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    executeRequest();
    const interval = setInterval(() => {
      setPageSix((page) => page + 1);
    }, intervalPagination);

    return () => clearInterval(interval);
  }, [pageSix]);

  const [quimio, setQuimio] = React.useState([]);
  const [pageSeven, setPageSeven] = React.useState(1);

  React.useEffect(() => {
    async function executeRequest() {
      try {
        const { totalPage, surgeries, total } =
          await refGetUnusualSurgeries.current("QUIMIOTERAPIA", pageSeven, 4);
        setError(false);
        if (pageSeven > totalPage) {
          setPageSeven(1);
        } else {
          setQuimio({ total, surgeries });
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    executeRequest();
    const interval = setInterval(() => {
      setPageSeven((page) => page + 1);
    }, intervalPagination);

    return () => clearInterval(interval);
  }, [pageSeven]);

  const surgeriesData = [childbirthSurgery, cardio, neuro, orthopedics, quimio];

  // Transitions
  const transitionsDantrolenCC = useTransition(
    prescriptionsCC ? prescriptionsCC.items : [],
    {
      from: { opacity: 0, y: -10 },
      enter: { opacity: 1, y: 0 },
      leave: { display: "none" },
      trail: 100,
      delay: 50,
      config: config.gentle,
    }
  );

  const transitionsChildbirthSurgery = useTransition(
    childbirthSurgery ? childbirthSurgery.surgeries : [],
    {
      from: { opacity: 0, y: -10 },
      enter: { opacity: 1, y: 0 },
      leave: { display: "none" },
      trail: 100,
      delay: 50,
      config: config.gentle,
    }
  );

  const transitionsCardio = useTransition(cardio ? cardio.surgeries : [], {
    from: { opacity: 0, y: -10 },
    enter: { opacity: 1, y: 0 },
    leave: { display: "none" },
    trail: 100,
    delay: 50,
    config: config.gentle,
  });

  const transitionsNeuro = useTransition(neuro ? neuro.surgeries : [], {
    from: { opacity: 0, y: -10 },
    enter: { opacity: 1, y: 0 },
    leave: { display: "none" },
    trail: 100,
    delay: 50,
    config: config.gentle,
  });

  const transitionsOrthopedics = useTransition(
    orthopedics ? orthopedics.surgeries : [],
    {
      from: { opacity: 0, y: -10 },
      enter: { opacity: 1, y: 0 },
      leave: { display: "none" },
      trail: 100,
      delay: 50,
      config: config.gentle,
    }
  );

  const transitionsQuimio = useTransition(quimio ? quimio.surgeries : [], {
    from: { opacity: 0, y: -10 },
    enter: { opacity: 1, y: 0 },
    leave: { display: "none" },
    trail: 100,
    delay: 50,
    config: config.gentle,
  });

  const transitionsSurgeries = [
    transitionsChildbirthSurgery,
    transitionsCardio,
    transitionsNeuro,
    transitionsOrthopedics,
    transitionsQuimio,
  ];

  const PatientCard = ({ data, color }) => {
    const values = data ? Object.values(data) : [];
    const [quantity, prescription, patient, birthDate, item, attendance] =
      values;

    return (
      <RectCard
        style={{ backgroundColor: "#1B1D22" }}
        color={color}
        className="flex flex-col"
      >
        <div className="flex justify-between items-center">
          <span className="text-xsm text-gray-400">
            Presc:{" "}
            <span className="text-xs" style={{ color }}>
              {prescription}
            </span>
          </span>
          <span className="text-xsm text-gray-400">Presc: {attendance}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs" style={{ color }}>
            {`${patient.split(" ")[0]} ${patient.split(" ")[1]}`}
          </span>
          <div className="flex gap-1 items-center">
            <Birthday className="w-3 h-3" />
            <span className="text-xsm text-gray-400">
              {format(parseISO(birthDate), "dd/MM/yyyy")}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xsm text-gray-400">
            Item:{" "}
            <span className="text-xs" style={{ color }}>
              {item.split(" ")[0]}
            </span>
          </span>
          <div className="flex gap-1 items-center">
            <span className="text-xs text-white">QTD: {quantity}</span>
            <CupHelth className="w-3 h-3" />
          </div>
        </div>
      </RectCard>
    );
  };

  const ExamCard = ({ data, color }) => {
    const { CD_CIRURGIA_AVISO, CD_ATENDIMENTO, DS_CIRURGIA } = data;

    return (
      <RectCard
        style={{ backgroundColor: "#1B1D22" }}
        color={color}
        className="flex flex-col py-2 w-56"
      >
        <div className="flex justify-between items-center">
          <span className="text-xsm text-gray-300">
            Aviso: <span style={{ color }}>{CD_CIRURGIA_AVISO}</span>
          </span>
          <span className="text-xsm text-gray-300">
            Atendimento: {CD_ATENDIMENTO || "Sem código"}
          </span>
        </div>
        <span className="text-xs text-gray-300">
          PROC:{" "}
          <span style={{ color }}>
            {`${DS_CIRURGIA.split(" ")[0]} ${DS_CIRURGIA.split(" ")[1] || ""}`}
          </span>
        </span>
      </RectCard>
    );
  };

  const exams = [
    { title: "FETAL | PARTO", color: "#74FFAC" },
    { title: "CARDIOLOGIA", color: "#16C5EA" },
    { title: "NEUROCIRURGIA", color: "#FF91ED" },
    { title: "ORTOPEDIA | COLUNA", color: "#E5EFC1" },
    { title: "QUIMIO", color: "#D6A2FF" },
  ];

  if (loading) return <Loading />;

  return (
    <main className="min-h-screen w-full flex flex-col">
      <Helmet>
        <title>CMDC | Farmácia | CC</title>
        <meta
          name="description"
          content="Dashboard relacionado a farmácia cc"
        />
      </Helmet>
      <section className="px-5 flex-1 flex flex-col justify-center">
        <div className="flex flex-col gap-2 w-full max-w-7xl mx-auto">
          <h1 className="text-2xl text-white text-center font-bold">
            FARMÁCIA - CC
          </h1>
          <div className="flex flex-col gap-1">
            <h2 className="text-lg text-white text-center">
              Cirurgias Não Usuais ou de Grande Porte Agendadas
            </h2>
            <div className="grid sm:grid-cols-5 grid-cols-2 gap-2">
              {exams.map(({ title, color }, i) => (
                <div className="flex flex-col items-center gap-1 bg-blackCMDC bg-opacity-50 p-2 rounded-lg h-65">
                  <h4 className="text-sm" style={{ color }}>
                    {title}
                  </h4>
                  <div className="flex justify-center items-center gap-2 bg-black rounded-lg w-12 h-6">
                    <People className="w-3 h-3" />
                    <CountUp
                      end={surgeriesData[i]?.total || 0}
                      duration={1}
                      className="text-white text-xs"
                    />
                  </div>
                  <VerifyInsert
                    display={surgeriesData[i]?.surgeries?.length}
                    message="Não há cirurgias no momento"
                    className="mt-5 text-sm whitespace-normal text-white"
                  >
                    {transitionsSurgeries[i] &&
                      transitionsSurgeries[i]((style, surgerie) => (
                        <animated.div style={style}>
                          <ExamCard
                            key={surgerie.CD_AVISO_CIRURGIA}
                            data={surgerie}
                            color={color}
                          />
                        </animated.div>
                      ))}
                  </VerifyInsert>
                </div>
              ))}
            </div>
          </div>
          <div className="grid sm:grid-cols-7 grid-cols-1 gap-2">
            <div className="flex flex-col gap-2 items-center col-span-5 bg-blackCMDC bg-opacity-50 rounded-lg p-2">
              <h4 className="text-sm text-white">Prescrição Dantrolen</h4>
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="flex flex-col gap-2 items-center w-full">
                  <RectCard
                    color="#AD7BFF"
                    className="flex justify-between items-center w-42"
                  >
                    <span className="text-white text-sm">CC</span>
                    <RoundedCard
                      data={prescriptionsCC?.total}
                      className="h-16 w-16 bg-opacity-0"
                      roundedClass="w-full h-full text-lg"
                      barSize={1.1}
                      rounded={{
                        type: "gradient",
                        color: "#AD7BFF",
                        id: "gdr-1",
                      }}
                    />
                  </RectCard>
                  <div className="w-full min-h-36 grid sm:grid-cols-2 grid-cols-1 sm:grid-rows-2 grid-rows-4 gap-2">
                    <VerifyInsert
                      display={prescriptionsCC?.items?.length}
                      message="Não há prescrições no momento"
                      className="col-span-2 row-start-2 text-sm whitespace-normal text-white"
                    >
                      {transitionsDantrolenCC((style, prescription) => (
                        <animated.div style={style}>
                          <PatientCard data={prescription} color="#AD7BFF" />
                        </animated.div>
                      ))}
                    </VerifyInsert>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-center w-full">
                  <RectCard
                    color="#49B3FF"
                    className="flex justify-between items-center w-42"
                  >
                    <span className="text-white text-sm">SADT</span>
                    <RoundedCard
                      data={prescriptionsCC?.total}
                      className="h-16 w-16 bg-opacity-0"
                      roundedClass="w-full h-full text-lg"
                      barSize={1.1}
                      rounded={{
                        type: "gradient",
                        color: "#49B3FF",
                        id: "gdr-2",
                      }}
                    />
                  </RectCard>
                  <div className="w-full min-h-36 grid sm:grid-cols-2 grid-cols-1 sm:grid-rows-2 grid-rows-4 gap-2">
                    <VerifyInsert
                      display={prescriptionsCC?.items?.length}
                      message="Não há prescrições no momento"
                      className="col-span-2 row-start-2 text-sm whitespace-normal text-white"
                    >
                      {transitionsDantrolenCC((style, prescription) => (
                        <animated.div style={style}>
                          <PatientCard
                            data={{
                              quantity: prescription.QTD,
                              prescription: prescription.SOLICITACAO,
                              patient: prescription.NM_PACIENTE,
                              birthDate: prescription.DATA_NASCIMENTO,
                              item: prescription.ITEM,
                              attendance: prescription.COD_ATENDIMENTO,
                            }}
                            color="#49B3FF"
                          />
                        </animated.div>
                      ))}
                    </VerifyInsert>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-blackCMDC bg-opacity-50 rounded-lg col-span-2 p-2">
              <h4 className="text-sm text-white text-center">
                Total Prescrição Dantrolen
              </h4>
              <div className="flex justify-center items-center w-full sm:h-full h-64">
                <div className="flex items-center gap-2">
                  <CountUp
                    end={prescriptionsCC?.total + prescriptionsCC?.total || 0}
                    duration={1}
                    className="text-green-100 text-5xl font-bold"
                  />
                  <CupHelth className="w-6 h-6" />
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

export default PharmacyCC;
