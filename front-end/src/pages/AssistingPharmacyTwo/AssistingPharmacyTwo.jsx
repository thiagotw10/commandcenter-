import React from "react";
import { Helmet } from "react-helmet";
import {
  AttendanceCard,
  DetailedCard,
  RoundedCard,
  AreaGraphic,
  Footer,
  VerifyInsert,
} from "../../components";
import { Loading, Error } from "../../helper";
import useDrugstore from "../../service/useDrugstore";
import { ReactComponent as ChartBlue } from "../../assets/svg/ChartBlue.svg";
import useUtilities from "../../service/useUtilities";
import { useTransition, animated, config } from "react-spring";

const AssistingPharmacyTwo = () => {
  const timeInterval = 5000;
  const intervalPagination = 60000;
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const { getFontSize } = useUtilities();

  //Drugstore
  const {
    getMedicationsMonth,
    getMedicationsDay,
    getMedicationsNotDelivery,
    getEmergencyPharmacy,
    getCentralPharmacy,
    getMedicationsDeliveredNotDelivered,
    getTotalSingleRequest,
    getTotalEmergencyRequest,
  } = useDrugstore();
  const refGetMedicationsMonth = React.useRef(getMedicationsMonth);
  const refGetMedicationsDay = React.useRef(getMedicationsDay);
  const refGetMedicationsNotDelivery = React.useRef(getMedicationsNotDelivery);
  const refGetMedicationsDeliveredNotDelivered = React.useRef(
    getMedicationsDeliveredNotDelivered
  );
  const refGetTotalSingleRequest = React.useRef(getTotalSingleRequest);
  const refGetTotalEmergencyRequest = React.useRef(getTotalEmergencyRequest);
  const [mediacationsInMonth, setMediacationsInMonth] = React.useState();
  const [mediacationsInDay, setMediacationsInDay] = React.useState();
  const [countNotDelivery, setCountNotDelivery] = React.useState();
  const [medicationsNotDelivery, setMedicationsNotDelivery] = React.useState();
  const [totalSingleRequest, setTotalSingleRequest] = React.useState();
  const [totalEmergencyRequest, setTotalEmergencyRequest] = React.useState();

  React.useEffect(() => {
    async function executeRequest() {
      try {
        const inMonth = await refGetMedicationsMonth.current();
        const inDay = await refGetMedicationsDay.current();
        const countMedications = await refGetMedicationsNotDelivery.current();
        const { medicationsPerHour } =
          await refGetMedicationsDeliveredNotDelivered.current();
        const totalSingleRequest = await refGetTotalSingleRequest.current();
        const totalEmergencyRequest =
          await refGetTotalEmergencyRequest.current();

        setMediacationsInMonth(inMonth);
        setMediacationsInDay(inDay);
        setCountNotDelivery(countMedications);
        setMedicationsNotDelivery(medicationsPerHour);
        setTotalSingleRequest(totalSingleRequest);
        setTotalEmergencyRequest(totalEmergencyRequest);
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

  // Emergency Attendances
  const refGetEmergencyPharmacy = React.useRef(getEmergencyPharmacy);
  const [pageOne, setPageOne] = React.useState(1);
  const [emergencyAttendances, setEmergencyAttendances] = React.useState();

  React.useEffect(() => {
    async function executeRequest() {
      try {
        const { emergencys, totalPage } = await refGetEmergencyPharmacy.current(
          pageOne,
          9
        );
        setError(false);
        if (pageOne > totalPage) {
          setPageOne(1);
        } else {
          setEmergencyAttendances(emergencys);
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

  // Central Attendances
  const refGetCentralPharmacy = React.useRef(getCentralPharmacy);
  const [pageTwo, setPageTwo] = React.useState(1);
  const [centralAttendances, setCentralAttendances] = React.useState();

  React.useEffect(() => {
    async function executeRequest() {
      try {
        const { centrals, totalPage } = await refGetCentralPharmacy.current(
          pageTwo,
          9
        );
        setError(false);
        if (pageTwo > totalPage) {
          setPageTwo(1);
        } else {
          setCentralAttendances(centrals);
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

    return () => {
      clearInterval(interval);
    };
  }, [pageTwo]);

  //Configurations from charts
  const configAreaChart = {
    areas: [
      {
        key: "delivered",
        bgGradient: {
          from: "#3d3d3f",
          to: "#005303",
        },
        lineGradient: {
          from: "#005303",
          to: "#0BD213",
        },
      },
      {
        key: "notDelivered",
        bgGradient: {
          from: "#3d3d3f",
          to: "#61FFE3",
        },
        lineGradient: {
          from: "#0C4FB5",
          to: "#61FFE3",
        },
      },
    ],
    legends: [
      { title: "Entregues", color: "#0BD213" },
      { title: "Não entregues", color: "#0C4FB5" },
    ],
  };

  const transitionsEmergencyAttendances = useTransition(
    emergencyAttendances ? emergencyAttendances : [],
    {
      from: { opacity: 0, y: -10 },
      enter: { opacity: 1, y: 0 },
      leave: { display: "none" },
      trail: 100,
      delay: 50,
      config: config.gentle,
    }
  );

  const transitionsCentralAttendances = useTransition(
    centralAttendances ? centralAttendances : [],
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
        <title>CMDC | Farmácia Assistencial | solicitações</title>
        <meta
          name="description"
          content="Dashboard relacionado a Farmácia Assistencial"
        />
      </Helmet>
      <section className="px-5 flex-1 flex flex-col justify-center">
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-2 my-3">
          <h2 className="text-2xl text-white text-center mb-2 font-semibold">
            Farmácia Assistencial
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 justify-items-center">
            <div className="flex flex-col col-span-1 gap-3 w-full max-w-108 sm:max-w-none">
              <DetailedCard
                titles={[
                  "Total de Solicitações Atendidas no Dia",
                  "vs dia anterior",
                ]}
                data={mediacationsInDay}
                color={"#61FFE3"}
                className="w-full h-28 bg-opacity-50"
              />
              <DetailedCard
                titles={[
                  "Total de Solicitações Atendidas no Mês",
                  "vs mês anterior",
                ]}
                data={mediacationsInMonth}
                color={"#61FFE3"}
                className="w-full h-28 bg-opacity-50"
              />
            </div>
            <RoundedCard
              data={countNotDelivery?.total}
              title="Solicitações Entregues/Não Entregues no Horário"
              valueExibition={{
                dataOne: countNotDelivery?.delivered,
                dataTwo: countNotDelivery?.notDelivered,
              }}
              exibition={{
                titleOne: "Entregues",
                titleTwo: "Não Entregues",
              }}
              className="bg-opacity-50 col-span-1 sm:px-0 px-28 min-h-40"
              roundedClass="w-full h-40 text-xl"
              titleClass="text-xs"
              barSize={1.2}
              rounded={{
                type: "gradient",
                color: "#1DFF26CC",
                id: "gdr-1",
              }}
            />
            <AreaGraphic
              data={medicationsNotDelivery}
              className="col-span-1 sm:col-span-3 bg-opacity-50 shadow-inner-2 w-full max-w-108 sm:max-w-none min-h-52"
              config={configAreaChart}
              xKey="label"
              title="Solicitações por Horário"
              chartPosition={{
                top: 1.5 * getFontSize(),
                right: 1 * getFontSize(),
                left: -2.4 * getFontSize(),
                bottom: -0.5 * getFontSize(),
              }}
              legendPosition={{
                marginTop: -50,
                marginRight: 40,
              }}
              icon={<ChartBlue className="w-7 h-7 mr-5" />}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-0 bg-blackCMDC bg-opacity-50 rounded-lg p-3 min-h-56">
            <div className="flex flex-col items-center gap-2 pr-4 sm:border-r-2 border-gray-500">
              <h1 className="text-sm text-center text-white">
                Solicitação de Urgência Farmácia Central: +15 min pendente
              </h1>
              <VerifyInsert
                display={emergencyAttendances?.length}
                message="Não há atendimentos no momento"
                className="text-sm text-white"
              >
                <div className="grid grid-cols-2 grid-rows-6 sm:grid-cols-3 sm:grid-rows-3 gap-2 w-full">
                  {transitionsEmergencyAttendances(
                    (style, { COLOR, ...attendance }) => (
                      <animated.div style={style}>
                        <AttendanceCard
                          key={attendance.cdAttendance}
                          data={attendance}
                          color={COLOR}
                        />
                      </animated.div>
                    )
                  )}
                </div>
              </VerifyInsert>
              <div className="flex justify-between gap-2 mt-auto">
                <span className="text-white text-sm bg-black bg-opacity-60 rounded-lg py-1 px-2">
                  Não entregues:{" "}
                  {totalEmergencyRequest
                    ? totalEmergencyRequest.FORADOHORARIO
                    : 0}
                </span>
                <span className="text-white text-sm bg-black bg-opacity-60 rounded-lg py-1 px-2">
                  Entregues:{" "}
                  {totalEmergencyRequest
                    ? totalEmergencyRequest.DENTRODOHORARIO
                    : 0}
                </span>
                <span className="text-white text-sm bg-black bg-opacity-60 rounded-lg py-1 px-2">
                  Total:{" "}
                  {totalEmergencyRequest
                    ? totalEmergencyRequest.DENTRODOHORARIO +
                      totalEmergencyRequest.FORADOHORARIO
                    : 0}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 sm:ml-4">
              <h1 className="text-sm text-center text-white">
                Solicitação Avulso Farmácia Central: +1h pendente
              </h1>
              <VerifyInsert
                display={centralAttendances?.length}
                message="Não há atendimentos no momento"
                className="text-sm text-white"
              >
                <div className="grid grid-cols-2 grid-rows-6 sm:grid-cols-3 sm:grid-rows-3 gap-2 w-full">
                  {transitionsCentralAttendances(
                    (style, { COLOR, ...attendance }) => (
                      <animated.div style={style}>
                        <AttendanceCard
                          key={attendance.cdAttendance}
                          data={attendance}
                          color={COLOR}
                        />
                      </animated.div>
                    )
                  )}
                </div>
              </VerifyInsert>
              <div className="flex justify-between gap-2 mt-auto">
                <span className="text-white text-sm bg-black bg-opacity-60 rounded-lg py-1 px-2">
                  Não entregues:{" "}
                  {totalSingleRequest ? totalSingleRequest.FORADOHORARIO : 0}
                </span>
                <span className="text-white text-sm bg-black bg-opacity-60 rounded-lg py-1 px-2">
                  Entregues:{" "}
                  {totalSingleRequest ? totalSingleRequest.DENTRODOHORARIO : 0}
                </span>
                <span className="text-white text-sm bg-black bg-opacity-60 rounded-lg py-1 px-2">
                  Total:{" "}
                  {totalSingleRequest
                    ? totalSingleRequest.DENTRODOHORARIO +
                      totalSingleRequest.FORADOHORARIO
                    : 0}
                </span>
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

export default AssistingPharmacyTwo;
