import React from "react";
import { Helmet } from "react-helmet";
import { Footer, LabelData, SimpleCard } from "../../components";
import { Loading, Error } from "../../helper";
import useBedsSituation from "../../service/useBedsSituation";
import useGeneralPercent from "../../service/useGeneralPercent";

const GeneralOccupation = () => {
  const timeInterval = 5000;
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  //Beds Situation
  const { getQuantitativeSituations } = useBedsSituation();
  const refGetQuantitativeSituations = React.useRef(getQuantitativeSituations);
  const [quantSituations, setQuantSituations] = React.useState();

  React.useEffect(() => {
    setLoading(true);
    async function executeRequest() {
      try {
        const { situations } = await refGetQuantitativeSituations.current();
        setQuantSituations(situations);
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

  //General Percent
  const { getGeneralPercent, getTotalUnit } = useGeneralPercent();
  const refGetGeneralPercent = React.useRef(getGeneralPercent);
  const refGetTotalUnit = React.useRef(getTotalUnit);
  const [bedPercents, setBedPercent] = React.useState();
  const [totalUnitData, setTotalUnitData] = React.useState();

  React.useEffect(() => {
    setLoading(true);
    async function executeRequest() {
      try {
        const { percents } = await refGetGeneralPercent.current();
        const { totalUnit } = await refGetTotalUnit.current();
        setBedPercent(percents);
        setTotalUnitData(totalUnit);
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

  if (loading) return <Loading />;

  return (
    <main className="min-h-screen w-full flex flex-col justify-center">
      <Helmet>
        <title>CMDC | Ocupação Geral</title>
        <meta
          name="description"
          content="Dashboard principal com informações gerais."
        />
      </Helmet>
      <section className="px-5 flex-1 flex flex-col justify-center">
        <div className="flex flex-col gap-3 w-full max-w-7xl mx-auto my-3">
          <h2 className="text-2xl text-white border-b border-gray-700 text-center pb-1">
            Ocupação Geral
          </h2>
          <div className="flex flex-start divide-x gap-2 divide-white">
            <LabelData
              label="Total de Pacientes"
              data={quantSituations && quantSituations[2].QTD}
              className="text-white text-sm"
            />
            <LabelData
              label="Leitos Operacionais"
              data={totalUnitData?.LEITOS_DIA}
              className="text-white text-sm pl-2"
            />
          </div>
          <div className="grid sm:grid-cols-4 grid-cols-2 gap-x-2 gap-y-20 justify-items-center my-10">
            <SimpleCard
              data={totalUnitData?.TOH_ON_LINE}
              type="string"
              title="Ocupação Geral"
              className="w-40 h-22 bg-opacity-50 text-white text-sm"
              dataClass="text-3xl text-red-600"
              toolTipConfig={{
                title: "Ocupação Geral",
                desc: "Este card mostra  o percentual de ocupação de leitos, não considerando os leitos extras, HD's e Unidade Jardins. Código das unidades que não são consideradas (5,22,19,1,21,41). Fórmula do cálculo : leitos ocupados / (leitos extras ocupados + leitos operacionais) * 100",
              }}
            />
            <SimpleCard
              data={bedPercents?.APARTAMENTO}
              type="string"
              title="Ocupação Apto"
              className="w-40 h-22 bg-opacity-50 text-white text-sm"
              dataClass="text-3xl"
            />
            <SimpleCard
              data={bedPercents?.UTI}
              type="string"
              title="Ocupação UTI"
              className="w-40 h-22 bg-opacity-50 text-white text-sm"
              dataClass="text-3xl"
            />
            <SimpleCard
              data={bedPercents?.HD}
              type="string"
              title="Ocupação HD"
              className="w-40 h-22 bg-opacity-50 text-white text-sm"
              dataClass="text-3xl"
            />

            <SimpleCard
              data={quantSituations && quantSituations[5].QTD}
              title="Vagos"
              rounded={{ class: "bg-white w-8 h-8" }}
              className="w-40 h-22 bg-opacity-50 text-white text-sm"
              dataClass="text-3xl"
            />
            <SimpleCard
              data={quantSituations && quantSituations[6].QTD}
              title="Higienização"
              rounded={{ class: "w-8 h-8 bg-blue-450" }}
              className="w-40 h-22 bg-opacity-50 text-white text-sm"
              dataClass="text-3xl text-blue-450"
            />
            <SimpleCard
              data={quantSituations && quantSituations[2].QTD}
              title="Ocupados"
              rounded={{ class: "w-8 h-8 bg-orange-450" }}
              className="w-40 h-22 bg-opacity-50 text-white text-sm"
              dataClass="text-3xl text-orange-450"
            />
            <SimpleCard
              data={quantSituations && quantSituations[3].QTD}
              asideTitle={`Vagos: ${
                quantSituations ? quantSituations[4].QTD : 0
              }`}
              title="Extras"
              asideTitleClass="absolute left-4 bottom-1 text-white"
              rounded={{ class: "bg-green-450 w-8 h-8" }}
              className="w-40 h-22 bg-opacity-50 text-white text-sm relative"
              dataClass="text-3xl text-green-450"
            />
            <SimpleCard
              data={quantSituations && quantSituations[0].QTD}
              title="Manutenção"
              rounded={{ class: "w-8 h-8 bg-indigo-450" }}
              className="w-40 h-22 bg-opacity-50 text-white text-sm"
              dataClass="text-3xl text-indigo-450"
            />
            <SimpleCard
              data={quantSituations && quantSituations[1].QTD}
              title="Reserva"
              rounded={{ class: "w-8 h-8 bg-yellow-300" }}
              className="w-40 h-22 bg-opacity-50 text-white text-sm"
              dataClass="text-3xl text-yellow-300"
            />
          </div>
        </div>
      </section>
      <Footer />
      {error && <Error message={error} />}
    </main>
  );
};

export default GeneralOccupation;
