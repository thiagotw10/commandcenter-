import React from "react";
import { Helmet } from "react-helmet";
import {
  RoundedCard,
  Footer,
  RoundedGraphic,
  AreaGraphic,
  MultipleRoundedGraphic,
} from "../../components";
import { Loading, Error } from "../../helper";
import usePredictedHighs from "../../service/usePredictedHighs";
import useGeneralPercent from "../../service/useGeneralPercent";
import useUtilities from "../../service/useUtilities";
import useManagmentHight from "../../service/useManagmentHight";
import useHospitalizationHd from "../../service/useHospitalizationHd";
import useHospitalizationUIUTI from "../../service/useHospitalizationUIUTI";
import { ReactComponent as Chart } from "../../assets/svg/Chart.svg";

const DischargeManagement = () => {
  const timeInterval = 5000;
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const { getFontSize } = useUtilities();

  //General Percent
  const { getTotalUnit } = useGeneralPercent();
  const refGetTotalUnit = React.useRef(getTotalUnit);
  const [totalUnitData, setTotalUnitData] = React.useState();

  React.useEffect(() => {
    setLoading(true);
    async function executeRequest() {
      try {
        const { totalUnit } = await refGetTotalUnit.current();
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

  //Predicted Highs
  const { getPredictedHighs } = usePredictedHighs();
  const refGetPredictedHighs = React.useRef(getPredictedHighs);
  const [predictedMedicalDischarges, setPredictedMedicalDischarges] =
    React.useState();
  const [ocupationThreeDays, setOcupationTionThreeDays] = React.useState();

  React.useEffect(() => {
    setLoading(true);
    async function executeRequest() {
      try {
        const { pMedc, totOcupation } = await refGetPredictedHighs.current();
        setPredictedMedicalDischarges(pMedc);
        setOcupationTionThreeDays(totOcupation);
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

  //Managment Hight
  const { getManagmentHight } = useManagmentHight();
  const refGetManagmentHight = React.useRef(getManagmentHight);
  const [internations, setInternations] = React.useState([]);
  const [highs, setHighs] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    async function executeRequest() {
      try {
        const { internations, highs } = await refGetManagmentHight.current();
        setInternations(internations);
        setHighs(highs);
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

  //Hospitalization HD
  const { getHospitalizationHd } = useHospitalizationHd();
  const refGetHospitalizationHd = React.useRef(getHospitalizationHd);
  const [hdThreeDays, setHdThreeDays] = React.useState([]);
  const [surgicalHd, setSurgicalHd] = React.useState();
  const [clinicalSurgerie, setClinicalSurgerie] = React.useState();

  React.useEffect(() => {
    setLoading(true);
    async function executeRequest() {
      try {
        const { hdThreeDays, clinicalSurgerie, surgicalHd } =
          await refGetHospitalizationHd.current();
        setHdThreeDays(hdThreeDays);
        setSurgicalHd(surgicalHd);
        setClinicalSurgerie(clinicalSurgerie);
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

  //Hospitalization UI - UTI
  const { getHospitalizationUIUTI } = useHospitalizationUIUTI();
  const refGetHospitalizationUIUTI = React.useRef(getHospitalizationUIUTI);
  const [internationUIUTI, setInternationUIUTI] = React.useState();
  const [UIUTI, setUIUTI] = React.useState();

  React.useEffect(() => {
    setLoading(true);
    async function executeRequest() {
      try {
        const { UI, UTI } = await refGetHospitalizationUIUTI.current();
        setUIUTI([UI, UTI]);
        setInternationUIUTI([
          { internation: UTI, label: "UTI", fill: "url('#yellow')" },
          { internation: UI, label: "UI", fill: "url('#green')" },
        ]);
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
  const configHighs = {
    areas: [
      {
        key: "altas_prev",
        bgGradient: {
          from: "#3d3d3f",
          to: "#0BD213",
        },
        lineGradient: {
          from: "#0BD213",
          to: "#3EFFE8",
        },
      },
      {
        key: "upp",
        bgGradient: {
          from: "#3d3d3f",
          to: "#FBFF2C",
        },
        lineGradient: {
          from: "#519D00",
          to: "#FBFF2C",
        },
      },
    ],
    legends: [
      { title: "Altas", color: "#3FA500" },
      { title: "UPP", color: "#FBFF2C" },
    ],
  };

  const configInternations = {
    areas: [
      {
        key: "internacoes_prev",
        bgGradient: {
          from: "#3d3d3f",
          to: "#0BD213",
        },
        lineGradient: {
          from: "#0BD213",
          to: "#3EFFE8",
        },
      },
      {
        key: "hd",
        bgGradient: {
          from: "#3d3d3f",
          to: "#FBFF2C",
        },
        lineGradient: {
          from: "#519D00",
          to: "#FBFF2C",
        },
      },
    ],
    legends: [
      { title: "Interna????es", color: "#3FA500" },
      { title: "HD", color: "#FBFF2C" },
    ],
  };

  const threeDays = internations.map((value, i) => ({
    ...value,
    ...hdThreeDays[i],
  }));

  const multipleRoundedConfig = {
    key: "internation",
    label: "label",
  };

  const multipleRoundedGradient = [
    { id: "yellow", y2: 0.5, from: "#DBFF4C" },
    { id: "green", y1: 1.1, from: "#0FFF0A" },
  ];

  if (loading) return <Loading />;

  return (
    <main className="min-h-screen w-full flex flex-col justify-center">
      <Helmet>
        <title>CMDC | Gest??o de Altas</title>
        <meta
          name="description"
          content="Dashboard principal com informa????es gerais."
        />
      </Helmet>
      <section className="px-5 w-full flex-1 flex items-center">
        <div className="flex flex-col gap-3 w-full max-w-7xl mx-auto my-6">
          <h2 className="text-2xl text-white text-center mb-2 font-semibold">
            Gest??o de Altas
          </h2>
          <div className="grid sm:grid-cols-5 grid-cols-1 w-full justify-items-center sm:justify-items-stretch gap-3">
            <RoundedGraphic
              data={{
                dataOne: totalUnitData
                  ? parseInt(totalUnitData.LEITOS_OCUPADOS)
                  : 0,
                dataTwo: totalUnitData ? parseInt(totalUnitData.LEITOS_DIA) : 0,
              }}
              title="Ocupa????o Total"
              exibition={{ titleOne: "Ocupados", titleTwo: "Operacionais" }}
              className="h-64 w-full max-w-108 sm:max-w-none bg-opacity-50 col-span-1 shadow-inner-2 text-sm"
              graphicClass="w-42 h-42"
              barSize={1.1}
              rounded={{ type: "gradient", color: "#0FFF0A", id: "gdr-1" }}
              toolTipConfig={{
                title: "Ocupa????o Total",
                desc: "Este card mostra  o percentual de ocupa????o de leitos, n??o considerando os leitos extras, HD's e Unidade Jardins. C??digo das unidades que n??o s??o consideradas (5,22,19,1,21,41). F??rmula do c??lculo : leitos ocupados / (leitos extras ocupados + leitos operacionais) * 100",
              }}
            />
            <RoundedCard
              data={
                predictedMedicalDischarges && predictedMedicalDischarges.data
              }
              title="Previs??o de Altas no dia"
              className="h-64 w-full max-w-108 sm:max-w-none bg-opacity-50 col-span-1 shadow-inner-2"
              roundedClass="w-42 h-42 text-3xl"
              titleClass="text-sm"
              barSize={1.1}
              rounded={{ type: "gradient", color: "#0FFF0A", id: "gdr-1" }}
              toolTipConfig={{
                title: "Previs??o de Altas no Dia",
                desc: "Este card refere ao quantitativo de altas previstas no dia. Ou seja, todos os pacientes que poder??o receber alta nas ??ltimas 24h. Isso inclui alta m??dica e alta hospitalar.",
              }}
            />
            <AreaGraphic
              data={highs}
              className="sm:col-span-3 col-span-1 w-full max-w-108 sm:max-w-none h-64 bg-opacity-50 shadow-inner-2"
              title="Altas pr??ximos 3 dias"
              config={configHighs}
              xKey="dia"
              legendPosition={{
                marginTop: -50,
                marginRight: 40,
              }}
              chartPosition={{
                top: 1.5 * getFontSize(),
                right: 0.9 * getFontSize(),
                left: -2.8 * getFontSize(),
                bottom: -0.5 * getFontSize(),
              }}
              icon={<Chart className="w-7 h-7 mr-5" />}
              toolTipConfig={{
                title: "Altas pr??ximos 3 dias",
                desc: "Este gr??fico mostra o total de altas previstas por dia, para os pr??ximos 3 dias.",
              }}
            />
          </div>
          <div className="grid sm:grid-cols-5 grid-cols-1 w-full justify-items-center sm:justify-items-stretch gap-3">
            <RoundedGraphic
              data={ocupationThreeDays}
              title="Ocupa????o Prevista para os Pr??ximos 3 Dias"
              className="h-64 col-span-1 w-full max-w-108 sm:max-w-none bg-opacity-50 shadow-inner-2"
              graphicClass="w-42 h-42"
              titleClass="text-sm"
              barSize={1.1}
              rounded={{ type: "gradient", color: "#0FFF0A", id: "gdr-1" }}
              toolTipConfig={{
                title: "Ocupa????o Prevista para os Pr??ximos 3 Dias",
                desc: "Este gr??fico mostra a porcentagem de interna????es previstas para os pr??ximos 3 dias. Baseado em pr?? interna????es.",
              }}
            />
            <MultipleRoundedGraphic
              data={surgicalHd}
              titleValues={clinicalSurgerie}
              title="Previs??o de interna????es no Dia"
              className="h-64 col-span-1 w-full max-w-108 sm:max-w-none bg-opacity-50 shadow-inner-2"
              graphicClass="w-42 h-42"
              titleClass="text-sm"
              exibition={{ titleOne: "Cl??nica", titleTwo: "Cir??rgica" }}
              barSize={1}
              config={multipleRoundedConfig}
              gradients={multipleRoundedGradient}
              toolTipConfig={{
                title: "Previs??o de interna????es no Dia",
                desc: "Este card mostra a quantidade de interna????es previstas para o dia atual sendo elas, clinicas (Clinicas: eletiva e urg??ncia) e cir??rgicas (Cirurgia: eletiva e urg??ncia). Eles est??o representados por interna????es cl??nicas cir??rgicas e HD - Hospital dia as para os pr??ximos 3 dias, baseado em pr?? interna????es.",
              }}
            />
            <MultipleRoundedGraphic
              data={internationUIUTI}
              titleValues={UIUTI}
              title="Previs??o de interna????es no Dia"
              className="h-64 col-span-1 w-full max-w-108 sm:max-w-none bg-opacity-50 shadow-inner-2"
              graphicClass="w-42 h-42"
              titleClass="text-sm"
              exibition={{ titleOne: "UI", titleTwo: "UTI" }}
              barSize={1}
              config={multipleRoundedConfig}
              gradients={multipleRoundedGradient}
            />
            <AreaGraphic
              data={threeDays}
              className="sm:col-span-2 col-span-1 w-full max-w-108 sm:max-w-none h-64 bg-opacity-50 shadow-inner-2"
              title="Interna????es pr??ximos 3 dias"
              config={configInternations}
              xKey="dia"
              chartPosition={{
                top: 1.5 * getFontSize(),
                right: 0.9 * getFontSize(),
                left: -2.8 * getFontSize(),
                bottom: -0.5 * getFontSize(),
              }}
              legendPosition={{
                marginTop: -50,
                marginRight: 40,
              }}
              icon={<Chart className="w-7 h-7 mr-5" />}
              toolTipConfig={{
                title: "Interna????es pr??ximos 3 dias",
                desc: "Este gr??fico mostra o total de interna????es por dia, previstas para os pr??ximos 3 dias. Elas est??o representadas por interna????es dia e interna????es HD???Hospital Dia",
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

export default DischargeManagement;
