import React from "react";
import { Helmet } from "react-helmet";
import {
  RoundedCard,
  Footer,
  LineGraphic,
  ComposedBarGraphic,
} from "../../components";
import { Loading, Error } from "../../helper";
import useSurgeries from "../../service/useSurgeries";
import useOperatedPatients from "../../service/useOperatedPatients";
import useUtilities from "../../service/useUtilities";
import useStatusSurgeries from "../../service/useStatusSurgeries";

const SurgicalCenter = () => {
  const timeInterval = 5000;
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const { getFontSize } = useUtilities();

  //Surgeries
  const { getSurgeries } = useSurgeries();
  const refGetSurgeries = React.useRef(getSurgeries);
  const [surgeries, setSurgeries] = React.useState();

  React.useEffect(() => {
    setLoading(true);
    async function executeRequest() {
      try {
        const { surgeriesMonth } = await refGetSurgeries.current();
        setSurgeries(surgeriesMonth);
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

  //Operated Patients
  const { getOperatedPatients } = useOperatedPatients();
  const refGetOperatedPatients = React.useRef(getOperatedPatients);
  const [operatedPatients, setOperatedPatients] = React.useState();
  const [operationsEU, setOperationsEU] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    async function executeRequest() {
      try {
        const { totOperated, operations } =
          await refGetOperatedPatients.current();
        setOperatedPatients(totOperated);
        setOperationsEU(operations);
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

  //Status Surgeries
  const { getStatusSurgeries } = useStatusSurgeries();
  const refGetStatusSurgeries = React.useRef(getStatusSurgeries);
  const [statusSurgeries, setStatusSurgeries] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    async function executeRequest() {
      try {
        const { status } = await refGetStatusSurgeries.current();
        setStatusSurgeries(status);
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

  //Configurations from charts
  const configLineChart = [
    {
      key: "eletivo",
      color: "#47B900",
      title: <span style={{ display: "inline-flex" }}> Eletivo </span>,
    },
    {
      key: "urgencia",
      color: "#11528B",
      title: <span style={{ display: "inline-flex" }}> Urgência </span>,
    },
  ];

  const configBarChart = {
    bars: [{ key: "agendado" }, { key: "realizado" }],
    lines: [{ key: "cancelado", color: "#F32A28" }],
    legends: [
      { title: "Realizados", color: "#38A3D5" },
      { title: "Agendados", color: "#3FA500" },
      { title: "Cancelados", color: "#F32A28" },
    ],
  };

  if (loading) return <Loading />;

  return (
    <main className="min-h-screen w-full flex flex-col justify-center">
      <Helmet>
        <title>CMDC | Centro Cirúrgico</title>
        <meta
          name="description"
          content="Dashboard principal com informações gerais."
        />
      </Helmet>
      <section className="px-5 w-full flex-1 flex items-center">
        <div className="flex flex-col gap-3 w-full max-w-7xl mx-auto my-6">
          <div className="grid sm:grid-cols-4 grid-cols-1 items-center gap-3">
            <RoundedCard
              data={surgeries && surgeries}
              title="Total Procedimentos Cirúrgicos Mês"
              className="h-60 bg-opacity-50 col-span-1 shadow-inner-2"
              roundedClass="w-42 h-42 text-3xl"
              titleClass="text-sm"
              barSize={1.2}
              rounded={{ type: "gradient", color: "#0FFF0A", id: "gdr-1" }}
              toolTipConfig={{
                title: "Total Procedimentos Cirúrgicos Mês",
                desc: "Este card mostra o total de procedimentos cirúrgicos mensalmente. Observação: Existem pacientes que fazem mais de um procedimento no mesmo aviso de cirurgia.",
              }}
            />
            <LineGraphic
              className="h-60 bg-opacity-50 sm:col-span-3 col-span-1 shadow-inner-2 text-sm"
              data={operationsEU}
              value={operatedPatients}
              config={configLineChart}
              xKey="data"
              title="Pacientes Operados Mês"
              chartPosition={{
                top: 1 * getFontSize(),
                right: -2.2 * getFontSize(),
                left: -2.1 * getFontSize(),
                bottom: 0.5 * getFontSize(),
              }}
              legendPosition={{
                position: "absolute",
                marginTop: -4.1 * getFontSize(),
                marginRight: 2 * getFontSize(),
              }}
              toolTipConfig={{
                title: "Pacientes Operados Mês",
                desc: "Este gráfico mostra o total de pacientes operados mensalmente. Observação: O número de pacientes operados é menor, porque existem pacientes que fazem mais de um procedimento no mesmo aviso de cirurgia.",
              }}
            />
          </div>
          <ComposedBarGraphic
            className="h-80 bg-opacity-50 shadow-inner-2 col-span-1 text-sm"
            data={statusSurgeries}
            config={configBarChart}
            title={"Centro Cirúrgico"}
            toolTipConfig={{
              title: "Centro Cirúrgico",
              desc: "Este gráfico mostra o quantitativo de cirurgias realizadas por dia durante o mês.",
            }}
          />
        </div>
      </section>
      <Footer />
      {error && <Error message={error} />}
    </main>
  );
};

export default SurgicalCenter;
