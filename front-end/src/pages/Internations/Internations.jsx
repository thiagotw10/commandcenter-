import React from "react";
import { Helmet } from "react-helmet";
import {
  Footer,
  AsideInformations,
  VerifyInsert,
  InternationPanelCard,
  Select,
} from "../../components";
import { Loading, Error } from "../../helper";
import useHDUIUTI from "../../service/useHDUIUTI";
import useSND from "../../service/useSND";
import { format, parseISO } from "date-fns";
import useUtilities from "../../service/useUtilities";
import { useTransition, animated, config } from "react-spring";

function SNDOne() {
  const intervalPagination = 60000;
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [filter, setFilter] = React.useState("-");
  const { limitName } = useUtilities();

  // Requests
  const { getUnities } = useHDUIUTI();
  const { getHospitalizations } = useSND();

  // Unities
  const refGetUnities = React.useRef(getUnities);
  const [unities, setUnities] = React.useState([]);

  React.useEffect(() => {
    async function executeRequest() {
      try {
        const { unit } = await refGetUnities.current();
        const formatedUntites = unit.map(({ DS_UNID_INT }) => DS_UNID_INT);

        setUnities(formatedUntites);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    executeRequest();
  }, []);

  // Hospitalizations
  const refGetHospitalizations = React.useRef(getHospitalizations);
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);
  const [hospitalizations, setHospitalizations] = React.useState([]);

  React.useEffect(() => {
    async function executeRequest() {
      try {
        const { totalPage, hospitalizations } =
          await refGetHospitalizations.current(filter, page, 5);
        setTotalPage(totalPage);
        setError(false);
        if (page > totalPage && page > 1) {
          setPage(1);
        } else {
          setHospitalizations(hospitalizations);
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
  }, [page, filter]);

  // Transitions of Pages
  const transitionsInternations = useTransition(hospitalizations, {
    from: { opacity: 0, y: -10 },
    enter: { opacity: 1, y: 0 },
    leave: { display: "none" },
    trail: 100,
    delay: 50,
    config: config.gentle,
  });

  const titlesOne = [
    { color: "#FFF50B", title: "CONTATO" },
    { color: "#00318F", title: "GOTÍCULAS" },
    { color: "#2EA7FF", title: "CONTATO E GOTÍCULAS" },
    { color: "#72592F", title: "CONTATO E AEROSSÓIS" },
    { color: "#783809", title: "AEROSSÓIS" },
  ];

  const titlesTwo = [
    { color: "#BCBE44", title: "PEWS" },
    { color: "#8F00FF", title: "AGENDADO" },
    { title: `Páginas: ${page}/${totalPage}` },
    { color: "#52FF00", title: "OK" },
    { color: "#F0303F", title: "PENDENTE" },
    { color: "#FF7100", title: "APRAZ. PENDENTE " },
  ];

  // colors config
  const SAE = [
    { status: "V", color: "#52FF00" },
    { status: "F", color: "#F0303F" },
    { status: "L", color: "#F0303F" },
  ];

  const PM = [
    { status: "S", color: "#52FF00" },
    { status: "V", color: "#FF7100" },
    { status: "N", color: "#FF7100" },
  ];

  const ISOLATION = [
    { status: "CONTATO + AEROSSOL", color: "#72592F" },
    { status: "CONTATO + GOTÍCULA", color: "#2EA7FF" },
    { status: "CONTATO", color: "#FFF50B" },
    { status: "AEROSSOL", color: "#783809" },
    { status: "GOTÍCULA", color: "#00318F" },
  ];

  if (loading) return <Loading />;

  return (
    <main className="min-h-screen w-full flex flex-col justify-center">
      <Helmet>
        <title>CMDC | Internações</title>
        <meta
          name="description"
          content="Dashboard relacionado as internações de pacientes."
        />
      </Helmet>
      <section className="px-5 flex-1 flex flex-col justify-center">
        <div className="flex flex-col w-full max-w-7xl mx-auto">
          <div className="relative mb-2">
            <h2 className="text-2xl text-white text-center font-semibold">
              PAINEL DE INTERNAÇÃO - {filter === "-" ? "GERAL" : filter}
            </h2>
            <Select
              value={filter}
              defaultValue="GERAL"
              setValue={(value) => {
                setPage(1);
                setFilter(value);
              }}
              options={unities}
              className="text-xs h-7 absolute top-0 right-0"
            />
          </div>
          <div className="sm:max-h-114 max-h-full sm:h-screen h-full flex flex-col gap-3">
            {
              <VerifyInsert
                display={hospitalizations.length}
                message="Não há Internações no momento"
                className="text-lg whitespace-normal text-white mt-5"
              >
                {transitionsInternations((style, internation) => {
                  const saeColor = SAE.reduce((acc, { status, color }) => {
                    return internation.SAE === status ? color : acc;
                  }, "transparent");

                  const pmColor = PM.reduce((acc, { status, color }) => {
                    return internation.SAE === status ? color : acc;
                  }, "transparent");

                  const isolationColor = ISOLATION.reduce(
                    (acc, { status, color }) => {
                      return internation.ISOLAMENTO === status ? color : acc;
                    },
                    "transparent"
                  );

                  let labAlert = internation.QTD_LAB_RESULTADO >= 1;
                  let imgAlert = internation.RESULTADO_IMAGEM >= 1;
                  let procAlert = internation.PRODT >= 1;

                  setTimeout(() => {
                    const lab = document.getElementById(
                      "lab -" + internation.CD_ATENDIMENTO
                    );
                    const img = document.getElementById(
                      "img -" + internation.CD_ATENDIMENTO
                    );
                    const proc = document.getElementById(
                      "proc -" + internation.CD_ATENDIMENTO
                    );

                    if (!!lab) {
                      lab.classList.remove("animate-pulse-plus");
                    }

                    if (!!img) {
                      img.classList.remove("animate-pulse-plus");
                    }

                    if (!!proc) {
                      proc.classList.remove("animate-pulse-plus");
                    }
                  }, 10000);

                  return (
                    <animated.div style={style}>
                      <InternationPanelCard
                        data={{
                          attendance: internation.CD_ATENDIMENTO,
                          bed: internation.DS_LEITO,
                          name: limitName(internation.NM_PACIENTE, 3),
                          birthDate: format(
                            parseISO(internation.DT_NASCIMENTO),
                            "dd/MM/yyyy"
                          ),
                          years: internation.IDADE,
                          weight: internation.PESO,
                          dispositive: internation.DISPOSITIVO,
                          diet: internation.DIETA,
                          especialty: internation.ESPECIALIDADE,
                          curatives: internation.CURATIVO ? "SIM" : "NÃO",
                          pattern: internation.NAO_PADRONIZADO,
                        }}
                        bgColor={
                          internation.DT_ALTA_MEDICA ? "#000000" : "#1D2026"
                        }
                        alert={false}
                        isolation={{
                          color: isolationColor,
                          text: internation.ISOLAMENTO,
                        }}
                        alergy={{
                          color: "#F0303F",
                          text: internation.ALERGIA,
                        }}
                        sae={{
                          color: saeColor,
                        }}
                        pm={{ color: pmColor }}
                        lab={{
                          id: "lab -" + internation.CD_ATENDIMENTO,
                          color:
                            internation.QTD_LAB_RESULTADO >= 1
                              ? "#52FF00"
                              : "#F0303F",
                          text: internation.QTD_EXAME_LAB,
                          alert: labAlert,
                        }}
                        xray={{
                          id: "img -" + internation.CD_ATENDIMENTO,
                          color:
                            internation.RESULTADO_IMAGEM >= 1
                              ? "#52FF00"
                              : "#F0303F",
                          text: internation.QTD_EX_IMAG,
                          alert: imgAlert,
                        }}
                        proc={{
                          id: "proc -" + internation.CD_ATENDIMENTO,
                          color:
                            internation.PRODT === internation.PROCEDIMENTO
                              ? "#52FF00"
                              : "#8F00FF",
                          text: internation.PROCEDIMENTO,
                          alert: procAlert,
                        }}
                        pews={{
                          quantity: internation.PEWS,
                          date: internation.DTPEWS,
                          alert: internation.PEWS >= 3,
                          color: internation.PEWS >= 3 ? "#BCBE44" : "#FFF",
                        }}
                        color={page % 2 === 0 ? "#75BDFF" : "#0E8BFF"}
                        className="sm:h-24 h-full w-full"
                      />
                    </animated.div>
                  );
                })}
              </VerifyInsert>
            }
          </div>
          <div className="flex justify-between flex-wrap gap-2 w-full mt-1 rounded-lg">
            <div className="flex items-center bg-blackCMDC bg-opacity-50 rounded-lg divide-x-1 divide-gray-800 px-4">
              <h4 className="text-sm text-white mr-2">Isolamento</h4>
              <AsideInformations
                data={titlesOne}
                labelClass="grid grid-cols-3 text-xsm"
                className="w-full"
              />
            </div>
            <div className="bg-blackCMDC bg-opacity-50 rounded-lg px-4">
              <AsideInformations
                data={titlesTwo}
                labelClass="grid grid-cols-3 text-xsm"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
      {error && <Error message={error} />}
    </main>
  );
}

export default SNDOne;
