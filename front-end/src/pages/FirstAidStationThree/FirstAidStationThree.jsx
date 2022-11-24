import React from "react";
import { Helmet } from "react-helmet";
import { Footer, RectCard, SimpleCard } from "../../components";
import { Loading, Error } from "../../helper";
import { ReactComponent as Patient } from "../../assets/svg/Patient.svg";
import useFirstAidStation from "../../service/useFirstAidStation";

const FirstAidStationThree = () => {
  const timeInterval = 5000;
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const {
    getLongerTimeMedicalCare,
    getLongerTimeRegister,
    getLongerTimeSorting,
    getLongerTimeRoad,
    getQueuesRealTimeMedicalCare,
    getQueuesRealTimeRegister,
  } = useFirstAidStation();

  //Time Registers
  const refGetLongerTimeMedicalCare = React.useRef(getLongerTimeMedicalCare);
  const [longerTimerMedicalCare, setLongerTimerMedicalCare] = React.useState(
    []
  );
  const refGetLongerTimeRegister = React.useRef(getLongerTimeRegister);
  const [longerTimerRegister, setLongerTimerRegister] = React.useState([]);
  const refGetLongerTimeSorting = React.useRef(getLongerTimeSorting);
  const [longerTimerSorting, setLongerTimerSorting] = React.useState([]);
  const refGetLongerTimeRoad = React.useRef(getLongerTimeRoad);
  const [longerTimerRoad, setLongerTimerRoad] = React.useState();
  const refGetQueuesRealTimeMedicalCare = React.useRef(
    getQueuesRealTimeMedicalCare
  );
  const [medicalQueues, setMedicalQueues] = React.useState();
  const refGetQueuesRealTimeRegister = React.useRef(getQueuesRealTimeRegister);
  const [register, setRegister] = React.useState();

  React.useEffect(() => {
    setLoading(true);
    async function executeRequest() {
      try {
        const { timeMedicalCare } = await refGetLongerTimeMedicalCare.current();
        const { timeRegister } = await refGetLongerTimeRegister.current();
        const { timeSorting } = await refGetLongerTimeSorting.current();
        const { timeRoad } = await refGetLongerTimeRoad.current();
        const { queuesMedicalCare } =
          await refGetQueuesRealTimeMedicalCare.current();
        const { queuesRegister } = await refGetQueuesRealTimeRegister.current();
        setLongerTimerMedicalCare(timeMedicalCare);
        setLongerTimerRegister(timeRegister);
        setLongerTimerSorting(timeSorting);
        setLongerTimerRoad(timeRoad);
        setMedicalQueues(queuesMedicalCare);
        setRegister(queuesRegister);
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

  const IconData = ({ quantity, className }) => {
    return (
      <div className={`flex gap-2 absolute top-8 ${className}`}>
        <Patient className="w-4 h-4" />
        <span className="text-white text-sm font-bold">{quantity}</span>
      </div>
    );
  };

  const Queue = ({ queue, quantity, time, color, alert }) => {
    return (
      <RectCard
        color={color}
        className={`flex justify-between items-center ${
          alert ? "animate-ping-red" : ""
        }`}
      >
        <div className="flex flex-col">
          <span className="text-gray-400 text-xs">
            Fila:{" "}
            <span className="text-xslg" style={{ color }}>
              {queue}
            </span>
          </span>
          <span className="text-gray-400 text-xslg" style={{ color }}>
            QTD: <span className="text-white">{quantity}</span>
          </span>
        </div>
        <span className="text-sm text-white">{time}</span>
      </RectCard>
    );
  };

  if (loading) return <Loading />;

  return (
    <main className="min-h-screen w-full flex flex-col justify-center">
      <Helmet>
        <title>CMDC | Pronto Socorro | Filas</title>
        <meta
          name="description"
          content="Dashboard com as informações relacionadas ao pronto socorro."
        />
      </Helmet>
      <section className="px-5 flex flex-1 flex-col justify-center">
        <h2 className="text-2xl text-white text-center mb-2 font-semibold">
          Pronto Socorro
        </h2>
        <div className="w-full sm:max-w-7xl mx-auto flex flex-col gap-2 mb-1">
          <h2 className="text-lg text-purple-400 text-center font-semibold sm:col-span-6">
            TRADICIONAL
          </h2>
          <div className="bg-blackCMDC bg-opacity-50 flex flex-col md:flex-row justify-center items-center gap-10 md:gap-5 p-2 rounded-lg">
            <SimpleCard
              data={longerTimerSorting[1]?.time}
              icon={
                <IconData
                  quantity={longerTimerSorting[1]?.patients}
                  className="-right-12"
                />
              }
              type="string"
              title="Espera para Triagem"
              asideTitle="Maior Tempo"
              className="w-72 h-22 bg-opacity-50 text-white text-sm relative"
              dataClass="text-2xl"
            />
            <SimpleCard
              data={longerTimerRegister[1]?.time}
              icon={
                <IconData
                  quantity={longerTimerRegister[1]?.patients}
                  className="-right-12"
                />
              }
              type="string"
              title="Espera para Cadastro"
              asideTitle="Maior Tempo"
              className="w-72 h-22 bg-opacity-50 text-white text-sm relative"
              dataClass="text-2xl"
            />
            <SimpleCard
              data={longerTimerMedicalCare[1]?.time}
              icon={
                <IconData
                  quantity={longerTimerMedicalCare[1]?.patients}
                  className="right-0"
                />
              }
              type="string"
              title="Espera para Atendimento Médico"
              asideTitle="Maior Tempo"
              className="w-72 h-22 bg-opacity-50 text-white text-sm relative"
              dataClass="text-2xl"
            />
          </div>
          <div>
            <div className="grid grid-cols-2 gap-2">
              <div className="sm:h-36 h-full bg-blackCMDC bg-opacity-50 rounded-lg flex flex-col gap-1 py-1 px-3">
                <h2 className="text-white text-sm text-center">
                  Tempo Real Cadastro
                </h2>
                <div className="flex-1 grid sm:grid-cols-3 grid-cols-2 sm:grid-rows-2 grid-rows-3 gap-x-3 gap-y-1">
                  {register?.ps_tradicional?.queues.map(
                    ({ name, color, patients, time, alert }) => (
                      <Queue
                        key={name + time}
                        queue={name}
                        quantity={patients}
                        time={time}
                        color={color}
                        alert={alert}
                      />
                    )
                  )}
                  <SimpleCard
                    title={"QTD: " + register?.ps_tradicional?.total}
                    icon={<Patient className="w-5 h-5 mr-2" />}
                    type="string"
                    className="bg-opacity-50 text-white rounded-full border-2 border-white"
                    dataClass="text-sm"
                  />
                </div>
              </div>
              <div className="sm:h-36 h-full bg-blackCMDC bg-opacity-50 rounded-lg flex flex-col gap-1 py-1 px-3">
                <h2 className="text-white text-sm text-center">
                  Espera Atendimento Médico
                </h2>
                <div className="flex-1 grid sm:grid-cols-3 grid-cols-2 sm:grid-rows-2 grid-rows-3 gap-x-3 gap-y-1">
                  {medicalQueues?.ps_tradicional?.queues.map(
                    ({ name, color, patients, time, alert }) => (
                      <Queue
                        key={name + time}
                        queue={name}
                        quantity={patients}
                        time={time}
                        color={color}
                        alert={alert}
                      />
                    )
                  )}
                  <SimpleCard
                    title={"QTD: " + medicalQueues?.ps_tradicional?.total}
                    icon={<Patient className="w-5 h-5 mr-2" />}
                    type="string"
                    className="bg-opacity-50 text-white rounded-full border-2 border-white"
                    dataClass="text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
          <h2 className="text-lg text-blue-300 text-center font-semibold sm:col-span-6">
            DIRECIONADO
          </h2>
          <div className="bg-blackCMDC bg-opacity-50 flex flex-col md:flex-row justify-center items-center gap-10 md:gap-5 p-2 rounded-lg">
            <SimpleCard
              data={longerTimerSorting[0]?.time}
              icon={
                <IconData
                  quantity={longerTimerSorting[0]?.patients}
                  className="-right-12"
                />
              }
              type="string"
              title="Espera para Triagem"
              asideTitle="Maior Tempo"
              className="w-72 h-22 bg-opacity-50 text-white text-sm relative"
              dataClass="text-2xl"
            />
            <SimpleCard
              data={longerTimerRegister[0]?.time}
              icon={
                <IconData
                  quantity={longerTimerRegister[0]?.patients}
                  className="-right-12"
                />
              }
              type="string"
              title="Espera para Cadastro"
              asideTitle="Maior Tempo"
              className="w-72 h-22 bg-opacity-50 text-white text-sm relative"
              dataClass="text-2xl"
            />
            <SimpleCard
              data={longerTimerMedicalCare[0]?.time}
              icon={
                <IconData
                  quantity={longerTimerMedicalCare[0]?.patients}
                  className="right-0"
                />
              }
              type="string"
              title="Espera para Atendimento Médico"
              asideTitle="Maior Tempo"
              className="w-72 h-22 bg-opacity-50 text-white text-sm relative"
              dataClass="text-2xl"
            />
            <SimpleCard
              data={longerTimerRoad?.MAIOR_TEMPO_SUPER_VIA || "-"}
              icon={
                <IconData
                  quantity={longerTimerRoad?.QTD_PACIENTE || 0}
                  className="-right-12"
                />
              }
              type="string"
              title="Espera para Super Via"
              asideTitle="Maior Tempo"
              className="w-72 h-22 bg-opacity-50 text-white text-sm relative"
              dataClass="text-2xl"
            />
          </div>
          <div>
            <div className="grid grid-cols-2 gap-2">
              <div className="sm:h-36 h-full bg-blackCMDC bg-opacity-50 rounded-lg flex flex-col gap-1 py-1 px-3">
                <h2 className="text-white text-sm text-center">
                  Tempo Real Cadastro
                </h2>
                <div className="flex-1 grid sm:grid-cols-3 grid-cols-2 sm:grid-rows-2 grid-rows-3 gap-x-3 gap-y-1">
                  {register?.ps_direcionado?.queues.map(
                    ({ name, color, patients, time, alert }) => (
                      <Queue
                        key={name + time}
                        queue={name}
                        quantity={patients}
                        time={time}
                        color={color}
                        alert={alert}
                      />
                    )
                  )}
                  <SimpleCard
                    title={"QTD: " + register?.ps_direcionado?.total}
                    icon={<Patient className="w-5 h-5 mr-2" />}
                    type="string"
                    className="bg-opacity-50 text-white rounded-full border-2 border-white"
                    dataClass="text-sm"
                  />
                </div>
              </div>
              <div className="sm:h-36 h-full bg-blackCMDC bg-opacity-50 rounded-lg flex flex-col gap-1 py-1 px-3">
                <h2 className="text-white text-sm text-center">
                  Espera Atendimento Médico
                </h2>
                <div className="flex-1 grid sm:grid-cols-3 grid-cols-2 sm:grid-rows-2 grid-rows-3 gap-x-3 gap-y-1">
                  {medicalQueues?.ps_direcionado?.queues.map(
                    ({ name, color, patients, time, alert }) => (
                      <Queue
                        key={name + time}
                        queue={name}
                        quantity={patients}
                        time={time}
                        color={color}
                        alert={alert}
                      />
                    )
                  )}
                  <SimpleCard
                    title={"QTD: " + medicalQueues?.ps_direcionado?.total}
                    icon={<Patient className="w-5 h-5 mr-2" />}
                    type="string"
                    className="bg-opacity-50 text-white rounded-full border-2 border-white"
                    dataClass="text-sm"
                  />
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

export default FirstAidStationThree;
