import React from "react";
import { Helmet } from "react-helmet";
import { Loading, Error } from "../../helper";
import {
  Footer,
  AsideInformations,
  SimpleCard,
  UnitBedsCard,
} from "../../components";
import useUnitBeds from "../../service/useUnitBeds";
import useUnities from "../../service/useUnities";
import useBedsSituation from "../../service/useBedsSituation";
import useGeneralPercent from "../../service/useGeneralPercent";
import useSanitationBeds from "../../service/useSanitationBeds";
import { useScroll } from "../../service/useScroll";
import useUtilities from "../../service/useUtilities";

const BedMaps = () => {
  const timeInterval = 5000;
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [fetchEnd, setFetchEnd] = React.useState(false);
  const divBeds = React.useRef(null);
  const { getPageDimensions } = React.useMemo(useUtilities, []);

  useScroll(divBeds, 12, 15000, () => setFetchEnd(true));

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

  //Sanitation beds
  const { getSanitationBeds } = useSanitationBeds();
  const refGetSanitationBeds = React.useRef(getSanitationBeds);
  const [mediumTime, setMediumTime] = React.useState();

  React.useEffect(() => {
    setLoading(true);
    async function executeRequest() {
      try {
        const { timesEnded } = await refGetSanitationBeds.current();
        setMediumTime(timesEnded);
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

  //Beds Situation
  const { getBedsSituation } = useBedsSituation();
  const refGetBedsSituation = React.useRef(getBedsSituation);
  const [quantSituations, setQuantSituations] = React.useState();

  React.useEffect(() => {
    setLoading(true);
    async function executeRequest() {
      try {
        const { formatedSituations } = await refGetBedsSituation.current();
        setQuantSituations(formatedSituations);
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

  //unities
  const { getUnities } = useUnities();
  const refGetUnities = React.useRef(getUnities);
  const [unities, setUnities] = React.useState();
  const [pages, setPages] = React.useState([]);
  const [totalPages, setTotalPages] = React.useState([]);

  React.useLayoutEffect(() => {
    setLoading(true);
    async function executeRequest() {
      try {
        const { unit } = await refGetUnities.current();
        setUnities(unit);
        setError(false);
        setPages(() => {
          const pages = [];
          unit.forEach(() => {
            pages.push(1);
          });
          return pages;
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    if (!pages.length && !totalPages.length) {
      executeRequest();
    }

    if (fetchEnd) {
      const incrementedPages = pages.map((page, index) => {
        if (page > totalPages[index]) {
          return 1;
        } else {
          return ++page;
        }
      });
      setPages(incrementedPages);
      setFetchEnd(false);
    }
  }, [pages, totalPages, fetchEnd]);

  //Unit Beds
  const { getUnitBeds } = useUnitBeds();
  const refGetUnitBeds = React.useRef(getUnitBeds);
  const [unit, setUnit] = React.useState([]);

  React.useLayoutEffect(() => {
    async function executeRequest() {
      const loopPages = totalPages;
      const loopBeds = unit;
      const limitItens = getPageDimensions().width <= 900 ? 3 : 10;
      try {
        unities?.forEach(async (loopUnit, index) => {
          const { unitBeds, totPages } = await refGetUnitBeds.current(
            loopUnit.unit,
            pages[index],
            limitItens
          );
          setError(false);

          if (pages[index] <= totPages) {
            unit[index] = unitBeds;
            loopPages[index] = totPages;
          }
        });
        setUnit(loopBeds);
        setTotalPages(loopPages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    if (pages.length) {
      executeRequest();
    }
  }, [pages, unities, totalPages, unit, getPageDimensions]);

  //config cards
  const titles = [
    { color: "#FFFFFF", title: "Vago" },
    { color: "#D62F2F", title: "Ocupado" },
    { color: "#D09600", title: "Alta Hospitalar" },
    { color: "#109683", title: "Reservado" },
    { color: "#7C7C7C", title: "Alta médica" },
    { color: "#165590", title: "Higienização" },
    { color: "#65A42B", title: "Bloqueado/Manutenção" },
    { color: "#74603B", title: "Interd. Temp." },
  ];

  const configUnities =
    !unities && !unit.length
      ? []
      : unities.map((loopUnit, i) => {
          return { ...loopUnit, beds: unit[i] };
        });

  const unitiesCards =
    unities &&
    configUnities.map((unitie) => {
      return (
        <UnitBedsCard
          key={unitie.unit}
          title={unitie.unit}
          percent={unitie.percentage}
          data={unitie.beds}
          className="h-8 items-center"
          containerClass="items-center"
          bedClass="w-22 h-8 rounded-md text-sm"
        />
      );
    });

  const situationsCards = quantSituations?.map(
    ({ title, value, tooltip, color }) => (
      <SimpleCard
        key={title}
        data={value}
        title={title}
        className={`w-32 h-15 bg-opacity-50 ${color} text-xslg font-semibold`}
        dataClass="text-3xl"
        toolTipConfig={{
          title: title,
          desc: tooltip,
        }}
      />
    )
  );

  if (loading) return <Loading />;

  return (
    <main className="min-h-screen w-full flex flex-col justify-center">
      <Helmet>
        <title>CMDC | Mapas de Leitos</title>
        <meta
          name="description"
          content="Dashboard com o resumo de dados dos leitos."
        />
      </Helmet>
      <section className="flex-1 flex flex-col justify-center">
        <div className="grid sm:grid-cols-9 grid-cols-4 justify-between gap-2 mt-3 w-full max-w-7xl mx-auto">
          <SimpleCard
            data={totalUnitData?.TOH_ON_LINE}
            type="string"
            title="% Ocupação"
            className="w-32 h-15 bg-opacity-50 text-red-500 text-xslg font-semibold"
            dataClass="text-3xl"
            toolTipConfig={{
              title: "% Ocupação",
              desc: "Este card mostra  o percentual de ocupação de leitos, não considerando os leitos extras, HD's e Unidade Jardins. Código das unidades que não são consideradas (5,22,19,1,21,41). Fórmula do cálculo : leitos ocupados / (leitos extras ocupados + leitos operacionais) * 100",
            }}
          />
          {situationsCards}
          <SimpleCard
            data={mediumTime}
            type="time"
            title="TM Liberação"
            className="w-32 h-15 bg-opacity-50 text-white text-xslg font-semibold"
            dataClass="text-3xl"
            toolTipConfig={{
              title: "TM Liberação",
              desc: "Este card faz o cálculo em cima dos somatórios dos tempos utilizados para a higienização de cada leito higienizado no dia, dividido pela quantidade total de leitos higienizados. Obs: Começa a ser contabilizado, quando concluiu a primeira higienização",
            }}
          />
        </div>
        <div className="px-5">
          <div
            ref={divBeds}
            className="flex flex-col gap-3 max-w-7xl mx-auto mt-3 h-full max-h-none sm:max-h-113 py-1 overflow-y-scroll scroll-hide"
          >
            {unitiesCards}
          </div>
        </div>
      </section>
      <div className="relative sm:block flex flex-col">
        <AsideInformations
          data={titles}
          labelClass="flex-wrap sm:justify-around flex-row"
          className="relative z-10 max-w-4xl m-auto text-xs"
        />
        <Footer className="sm:absolute relative bottom-0 left-0" />
      </div>
      {error && <Error message={error} />}
    </main>
  );
};

export default BedMaps;
