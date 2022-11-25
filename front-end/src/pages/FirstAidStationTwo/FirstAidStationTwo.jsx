import React from "react";
import { Helmet } from "react-helmet";
import {
  Footer,
  RoundedCard,
  RectCard,
  AsideInformations,
  PSCard,
} from "../../components";
import { Loading, Error } from "../../helper";
import { ReactComponent as Clock } from "../../assets/svg/Clock.svg";
import { ReactComponent as Check } from "../../assets/svg/Check.svg";
import { ReactComponent as LabExam } from "../../assets/svg/LabExam.svg";
import { ReactComponent as Skeleton } from "../../assets/svg/Skeleton.svg";
import useFirstAidStation from "../../service/useFirstAidStation";
import { useTransition, animated, config } from "react-spring";

const FirstAidStationTwo = () => {
  const timeInterval = 5000;
  const intervalPagination = 60000;
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const { getTotalBedsOccupied, getUnitiesValues, getPatients } =
    useFirstAidStation();

  //Total Beds Occupied
  const refGetTotalBedsOccupied = React.useRef(getTotalBedsOccupied);
  const [totalOccupied, setTotalOccupied] = React.useState();

  React.useEffect(() => {
    setLoading(true);
    async function executeRequest() {
      try {
        const { bedsOcuppied } = await refGetTotalBedsOccupied.current();
        setTotalOccupied(bedsOcuppied);
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

  //Unities Values
  const refGetUnitiesValues = React.useRef(getUnitiesValues);
  const [unitiesValues, setUnitiesValues] = React.useState();

  React.useEffect(() => {
    setLoading(true);
    async function executeRequest() {
      try {
        const { unities } = await refGetUnitiesValues.current();
        setUnitiesValues(unities);
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

  // Stock Listing Items
  const refGetPatients = React.useRef(getPatients);
  const [patients, setPatients] = React.useState();
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    async function executeRequest() {
      try {
        const { patients, totalPage } = await refGetPatients.current(page, 12);
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
    }, intervalPagination);

    return () => clearInterval(interval);
  }, [page]);

  // configs

  const titles = [
    {
      icon: <Check className="w-4 h-4" fill="#FF7A00" />,
      title: "SOLICITADO INTERNAÇÃO",
    },
    {
      icon: <Check className="w-4 h-4" fill="#76FF53" />,
      title: "SOLICITAÇÃO ATENDIDA",
    },
    {
      icon: <LabExam className="w-4 h-4" fill="#FFF" />,
      title: "EXAME LABORATORIAL ",
    },
    {
      icon: <Skeleton className="w-4 h-4" fill="#FFF" />,
      title: "EXAME DE IMAGEM",
    },
    {
      icon: <Clock className="w-4 h-4" fill="#FFF" />,
      title: "HORAS DE INTERNAÇÃO",
    },
  ];

  const transitionsPatients = useTransition(patients ? patients : [], {
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
        <title>CMDC | Pronto Socorro | Exames</title>
        <meta
          name="description"
          content="Dashboard com as informações relacionadas ao pronto socorro."
        />
      </Helmet>
      <section className="px-5 flex-1 flex flex-col justify-center">
        <h2 className="text-2xl text-white text-center mb-2 font-semibold">
          Pronto Socorro
        </h2>
        <div className="w-full sm:max-w-7xl mx-auto flex flex-col gap-2">
          <div className="grid md:grid-cols-5 grid-cols-1 gap-2 sm:justify-items-center">
            <RoundedCard
              data={totalOccupied}
              title="LEITOS OCUPADOS"
              titleClass="font-normal sm:text-sm text-2sm w-25 mx-auto"
              className="bg-opacity-50 h-48 w-full col-span-1"
              roundedClass="w-42 h-42 text-3xl"
              rounded={{ type: "gradient", color: "#A22BFF", id: "gdr-1" }}
              barSize={1}
            />
            <div className="sm:col-span-4 bg-blackCMDC bg-opacity-50 rounded-lg min-h-48 grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-1 p-2 items-center w-full">
              {unitiesValues?.map(({ unit, QTD }) => (
                <RectCard
                  key={unit}
                  color="#A22BFF"
                  className="flex justify-between px-5 sm:px-2 items-center h-32 border-l-3"
                >
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-xsm">UNIDADE:</span>
                    <span className="text-white text-sm">{unit}</span>
                  </div>
                  <RoundedCard
                    data={QTD}
                    className="bg-opacity-0 h-28 w-28"
                    roundedClass="w-28 h-28 text-2xl"
                    rounded={{
                      type: "gradient",
                      color: "#A22BFF",
                      id: "gdr-1",
                    }}
                    barSize={0.6}
                  />
                </RectCard>
              ))}
            </div>
          </div>
          <div className="bg-blackCMDC bg-opacity-50 rounded-lg sm:h-96 min-h-56 grid sm:grid-cols-4 sm:grid-rows-3 grid-cols-2 grid-rows-6 gap-x-3 gap-y-1 sm:px-8 px-3 py-2 ">
            {transitionsPatients((style, patient) => (
              <animated.div style={style}>
                <PSCard
                  key={patient.name}
                  data={patient}
                  color={patient.genre === "MASC" ? "#43FFFF" : "#FF7BEA"}
                  labIcon={patient.iconLab}
                  rxIcon={patient.iconRX}
                  checkIcon={patient.iconCheck}
                />
              </animated.div>
            ))}
          </div>
        </div>
      </section>
      <div className="relative mt-3">
        <AsideInformations
          data={titles}
          labelClass="sm:justify-around justify-center sm:flex-row flex-col text-xsm"
          className="z-10 max-w-3xl m-auto"
        />
        <Footer className="absolute bottom-0 left-0" />
      </div>
      {error && <Error message={error} />}
    </main>
  );
};

export default FirstAidStationTwo;
