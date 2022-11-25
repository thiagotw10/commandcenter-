import React from "react";
import { Helmet } from "react-helmet";
import { Loading, Error } from "../../helper";
import {
  Footer,
  AsideInformations,
  SimpleCard,
  UnitBedsCard,
  Select,
} from "../../components";
import { ReactComponent as Clock } from "../../assets/svg/Clock.svg";
import { ReactComponent as Paper } from "../../assets/svg/Paper.svg";
import { ReactComponent as Skeleton } from "../../assets/svg/Skeleton.svg";
import { ReactComponent as Lab } from "../../assets/svg/Lab.svg";
import useHDUIUTI from "../../service/useHDUIUTI";
import useGeneralPercent from "../../service/useGeneralPercent";
import { useScroll } from "../../service/useScroll";
import useUtilities from "../../service/useUtilities";

const HDUIUTIGeneral = () => {
  const timeInterval = 5000;
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [filter, setFilter] = React.useState("-");
  const [unitOptions, setUnitOptions] = React.useState([]);
  const [fetch, setFetch] = React.useState(true);
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

  //unities
  const { getUnities, getBeds } = useHDUIUTI();
  const refGetUnities = React.useRef(getUnities);
  const [unities, setUnities] = React.useState();
  const [pages, setPages] = React.useState([]);
  const [totalPages, setTotalPages] = React.useState([]);

  React.useLayoutEffect(() => {
    setLoading(true);
    async function executeRequest() {
      try {
        const { unit } = await refGetUnities.current();
        setUnities(
          filter === "-"
            ? unit
            : unit.filter(({ DS_UNID_INT }) => DS_UNID_INT === filter)
        );
        setError(false);
        setUnitOptions(unit.map((loopUnit) => loopUnit.DS_UNID_INT));
        setPages(() => {
          const pages = [];
          if (filter === "-") {
            unit.forEach(() => {
              pages.push(1);
            });
          } else {
            pages.push(1);
          }
          return pages;
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
        setFetch(false);
      }
    }
    if ((!pages.length && !totalPages.length) || fetch) {
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
  }, [pages, totalPages, filter, fetch, fetchEnd]);

  //Unit Beds
  const refGetUnitBeds = React.useRef(getBeds);
  const [unit, setUnit] = React.useState([]);

  React.useLayoutEffect(() => {
    async function executeRequest() {
      const loopPages = totalPages;
      const loopBeds = unit;
      let limitItens = getPageDimensions().width <= 900 ? 3 : 9;
      limitItens = unities.length !== 1 ? limitItens : 30;
      try {
        unities?.forEach(async (loopUnit, index) => {
          const { unitBeds, totPages } = await refGetUnitBeds.current(
            loopUnit.DS_UNID_INT,
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
    { color: "#65A42B", title: "Manutenção" },
    { color: "#74603B", title: "Interd. Temp." },
    {
      icon: <Clock className="w-4 h-4" fill="#65A42B" />,
      title: "Manutenção | Higienização",
    },
    { icon: <Paper className="w-4 h-4" fill="#CC78FF" />, title: "Presc. dia" },
    {
      icon: <Paper className="w-4 h-4" fill="#65A42B" />,
      title: "Presc. nova",
    },
    { icon: <Skeleton className="w-4 h-4" fill="#FFF" />, title: "Imagem" },
    { icon: <Lab className="w-4 h-4" fill="#FFF" />, title: "Laboratório" },
    {
      icon: (
        <div className="flex">
          <Skeleton className="w-4 h-4" fill="#D62F2F" />
          <Lab className="w-4 h-4" fill="#D62F2F" />
        </div>
      ),
      title: "Solicitado",
    },
    {
      icon: (
        <div className="flex">
          <Skeleton className="w-4 h-4" fill="#65A42B" />
          <Lab className="w-4 h-4" fill="#65A42B" />
        </div>
      ),
      title: "Liberado",
    },
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
      const iconSize = filter !== "-" ? "w-5 h-5" : "w-3 h-3";
      const cardSize =
        filter !== "-" ? "w-42 h-16 tex-lg" : "w-28 h-12 text-xs";

      return (
        <UnitBedsCard
          key={unitie.DS_UNID_INT}
          title={unitie.DS_UNID_INT}
          data={unitie.beds}
          dataKey="DS_RESUMO"
          bedVariant="outlined"
          className={unities.length !== 1 ? "h-20 items-center" : ""}
          bedClass={`rounded-md ${cardSize}`}
          containerClass={unities.length !== 1 ? "" : "flex-wrap"}
          filterIcons={(bed) => {
            const icons = [];
            const seconds = 10 * 1000;

            if (!!bed.TEMPO_MANUTENCAO) {
              icons.push(
                <div className="flex gap-1 items-center">
                  <Paper className={iconSize} fill="#65A42B" />
                  <span className="text-xs text-green-700">
                    {bed.TEMPO_MANUTENCAO}
                  </span>
                </div>
              );
            } else {
              if (bed.STATUS_PRESCRICAO === "PRIMEIRA PRESCRICAO") {
                icons.push(
                  <Paper
                    id={bed.DS_RESUMO + " - paper1"}
                    className={`${iconSize} ${
                      bed.STATUS_COR === "ROXO" ? "" : "animate-pulse-plus"
                    }`}
                    fill={bed.STATUS_COR === "ROXO" ? "#CC78FF" : "#FFF"}
                  />
                );

                setTimeout(() => {
                  const element = document.getElementById(
                    bed.DS_RESUMO + " - paper1"
                  );
                  if (!!element) {
                    element.classList.remove("animate-pulse-plus");
                    element.style.fill = "#CC78FF";
                  }
                }, seconds);
              }

              if (bed.STATUS_PRESCRICAO_2 === "OUTRAS") {
                icons.push(
                  <div className="flex">
                    <Paper
                      id={bed.DS_RESUMO + " - paper2"}
                      className={`${iconSize} ${
                        bed.STATUS_COR_2 === "VERDE" ? "" : "animate-pulse-plus"
                      }`}
                      fill={bed.STATUS_COR_2 === "VERDE" ? "#65A42B" : "#FFF"}
                    />
                    <span className="text-xs text-red-500">
                      {bed.QTD_PEND_PRESC}
                    </span>
                  </div>
                );

                setTimeout(() => {
                  const element = document.getElementById(
                    bed.DS_RESUMO + " - paper2"
                  );
                  if (!!element) {
                    element.classList.remove("animate-pulse-plus");
                    element.style.fill = "#65A42B";
                  }
                }, seconds);
              }

              if (
                bed.QTD_PEND_LAB &&
                !!bed.LABORATORIO_STATUS &&
                bed.LABORATORIO_STATUS !== "NAO TEM"
              ) {
                icons.push(
                  <div className="flex">
                    <Lab
                      id={bed.DS_RESUMO + " - lab"}
                      className={`${iconSize} ${
                        bed.LABORATORIO_STATUS === "PENDENTE"
                          ? ""
                          : "animate-pulse-plus"
                      }`}
                      fill={
                        bed.LABORATORIO_STATUS === "PENDENTE"
                          ? "#D62F2F"
                          : "#65A42B"
                      }
                    />
                    <span className="text-xs text-red-500">
                      {bed.QTD_PEND_LAB}
                    </span>
                  </div>
                );

                setTimeout(() => {
                  const element = document.getElementById(
                    bed.DS_RESUMO + " - lab"
                  );
                  if (!!element) {
                    element.classList.remove("animate-pulse-plus");
                  }
                }, seconds);
              }

              if (!!bed.IMAGEM_STATUS && bed.IMAGEM_STATUS !== "NAO TEM") {
                icons.push(
                  <div className="flex">
                    <Skeleton
                      id={bed.DS_RESUMO + " - skeleton"}
                      className={`${iconSize} ${
                        bed.IMAGEM_STATUS === "PENDENTE"
                          ? ""
                          : "animate-pulse-plus"
                      }`}
                      fill={
                        bed.IMAGEM_STATUS === "PENDENTE" ? "#D62F2F" : "#65A42B"
                      }
                    />
                    <span className="text-xs text-red-500">
                      {bed.QTD_PEND_IMAG}
                    </span>
                  </div>
                );

                setTimeout(() => {
                  const element = document.getElementById(
                    bed.DS_RESUMO + " - skeleton"
                  );
                  if (!!element) {
                    element.classList.remove("animate-pulse-plus");
                  }
                }, seconds);
              }
            }

            return icons;
          }}
        />
      );
    });

  if (loading) return <Loading />;

  return (
    <main className="min-h-screen w-full flex flex-col justify-center">
      <Helmet>
        <title>CMDC | HD - UI - UTI | Geral</title>
        <meta
          name="description"
          content="Dashboard principal de HD | UI | UTI."
        />
      </Helmet>
      <section className="flex-1 flex flex-col justify-center">
        <div className="flex items-center justify-between gap-2 mt-3 w-full max-w-7xl mx-auto">
          <SimpleCard
            data={
              unities?.length !== 1
                ? totalUnitData?.TOH_ON_LINE
                : unities[0].PERCENTAGEM_OCUPACAO
            }
            type="string"
            title="% Ocupação"
            className="w-32 h-15 bg-opacity-50 text-red-500 text-xslg font-semibold"
            dataClass="text-3xl"
            toolTipConfig={{
              title: "% Ocupação",
              desc: "Este card mostra  o percentual de ocupação de leitos, não considerando os leitos extras, HD's e Unidade Jardins. Código das unidades que não são consideradas (5,22,19,1,21,41). Fórmula do cálculo : leitos ocupados / (leitos extras ocupados + leitos operacionais) * 100",
            }}
          />
          <h1 className="text-2xl text-white text-center font-bold">
            HD | UI | UTI
          </h1>
          <Select
            value={filter}
            setValue={(value) => {
              setFilter(value);
              setFetch(true);
            }}
            defaultValue="GERAL"
            options={unitOptions}
            className="text-xs h-7"
          />
        </div>
        <div className="px-5">
          <div
            ref={divBeds}
            className="flex flex-col gap-3 max-w-7xl mx-auto mt-3 h-screen max-h-none sm:max-h-113 py-1 overflow-y-scroll scroll-hide"
          >
            {unitiesCards}
          </div>
        </div>
      </section>
      <div className="relative sm:block flex flex-col">
        <AsideInformations
          data={titles}
          variant="outlined"
          labelClass="flex-wrap sm:justify-around flex-row"
          className="relative z-10 max-w-4xl m-auto text-xs"
        />
        <Footer className="sm:absolute relative bottom-0 left-0" />
      </div>
      {error && <Error message={error} />}
    </main>
  );
};

export default HDUIUTIGeneral;
