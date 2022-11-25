import React from "react";
import { Helmet } from "react-helmet";
import {
  AttendanceCard,
  Footer,
  RoundedCard,
  PieGraphic,
  VerifyInsert,
} from "../../components";
import { ReactComponent as Exit } from "../../assets/svg/Exit.svg";
import { ReactComponent as Private } from "../../assets/svg/Private.svg";
import { ReactComponent as Agreement } from "../../assets/svg/Agreement.svg";
import { ReactComponent as ClockMore } from "../../assets/svg/ClockMore.svg";
import useDrugstore from "../../service/useDrugstore";
import { Loading, Error } from "../../helper";
import { useTransition, animated, config } from "react-spring";

function AssistingPharmacyOne() {
  const intervalPagination = 60000;
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const {
    getPatientPharmaceutical,
    getPatientTransfer,
    getHospitalDischarge,
    getPatientsInhalation,
    getPatientOutReconciliation,
  } = useDrugstore();

  // Patient Admission Signage
  const refGetPatientPharmaceutical = React.useRef(getPatientPharmaceutical);
  const [pageOne, setPageOne] = React.useState(1);
  const [totalPharmaceutical, setTotalPharmaceutical] = React.useState();
  const [patientPharmaceutical, setPatientPharmaceutical] = React.useState();

  React.useEffect(() => {
    async function executeRequest() {
      try {
        const { totalPharmaceutical, totalPage, patientPharmaceutical } =
          await refGetPatientPharmaceutical.current(pageOne, 4);
        setError(false);
        if (pageOne > totalPage) {
          setPageOne(1);
        } else {
          setTotalPharmaceutical(totalPharmaceutical);
          setPatientPharmaceutical(patientPharmaceutical);
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

  // Patient Transfer Between Beds
  const refGetPatientTransfer = React.useRef(getPatientTransfer);
  const [pageTwo, setPageTwo] = React.useState(1);
  const [totalTransfers, setTotalTransfers] = React.useState();
  const [patientsTransfer, setPatientsTransfer] = React.useState();

  React.useEffect(() => {
    async function executeRequest() {
      try {
        const { totalPage, totalTransfers, patientsTransfer } =
          await refGetPatientTransfer.current(pageTwo, 4);
        setError(false);
        if (pageTwo > totalPage) {
          setPageTwo(1);
        } else {
          setTotalTransfers(totalTransfers);
          setPatientsTransfer(patientsTransfer);
        }
      } catch (error) {
        setError(error.message);
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

  //Hospital Discharge - Agreement and Private
  const refGetHospitalDischarge = React.useRef(getHospitalDischarge);
  const [pageThree, setPageThree] = React.useState(1);
  const [patientsHighs, setPatientsHighs] = React.useState();
  const [agreementAndPrivate, setAgreementAndPrivate] = React.useState();

  React.useEffect(() => {
    async function executeRequest() {
      try {
        const { totalPage, patientsHighs, graphicValues } =
          await refGetHospitalDischarge.current(pageThree, 4);
        if (pageThree > totalPage) {
          setPageThree(1);
        } else {
          setPatientsHighs(patientsHighs);
          setAgreementAndPrivate(graphicValues);
        }
      } catch (error) {
        setError(error.message);
      }
    }
    executeRequest();
    const interval = setInterval(() => {
      setPageThree((page) => page + 1);
    }, intervalPagination);

    return () => {
      clearInterval(interval);
    };
  }, [pageThree]);

  // Patients Using Inhalation Device
  const refGetPatientsInhalation = React.useRef(getPatientsInhalation);
  const [pageFour, setPageFour] = React.useState(1);
  const [totalInhalation, settotalInhalation] = React.useState();
  const [patientsInhalation, setPatientsInhalations] = React.useState();

  React.useEffect(() => {
    async function executeRequest() {
      try {
        const { totalPage, totalPatients, patientsInhalation } =
          await refGetPatientsInhalation.current(pageFour, 4);
        if (pageFour > totalPage) {
          setPageFour(1);
        } else {
          settotalInhalation(totalPatients);
          setPatientsInhalations(patientsInhalation);
        }
      } catch (error) {
        setError(error.message);
      }
    }
    executeRequest();
    const interval = setInterval(() => {
      setPageFour((page) => page + 1);
    }, intervalPagination);

    return () => {
      clearInterval(interval);
    };
  }, [pageFour]);

  // Patient Without Issuance of Reconciliation
  const refGetPatientOutReconciliation = React.useRef(
    getPatientOutReconciliation
  );
  const [pageFive, setPageFive] = React.useState(1);
  const [totalReconciliation, setTotalReconciliation] = React.useState();
  const [patientsReconciliation, setPatientsReconciliation] = React.useState();

  React.useEffect(() => {
    async function executeRequest() {
      try {
        const { totalPage, totalPatients, patientsReconciliation } =
          await refGetPatientOutReconciliation.current(pageFive, 4);
        if (pageFive > totalPage) {
          setPageFive(1);
        } else {
          setTotalReconciliation(totalPatients);
          setPatientsReconciliation(patientsReconciliation);
        }
      } catch (error) {
        setError(error.message);
      }
    }
    executeRequest();
    const interval = setInterval(() => {
      setPageFive((page) => page + 1);
    }, intervalPagination);

    return () => {
      clearInterval(interval);
    };
  }, [pageFive]);

  // Transitions of Pages
  const transitionsPatientPharmaceutical = useTransition(
    patientPharmaceutical ? patientPharmaceutical : [],
    {
      from: { opacity: 0, y: -10 },
      enter: { opacity: 1, y: 0 },
      leave: { display: "none" },
      trail: 100,
      delay: 50,
      config: config.gentle,
    }
  );

  const transitionsPatientTransfers = useTransition(
    patientsTransfer ? patientsTransfer : [],
    {
      from: { opacity: 0, y: -10 },
      enter: { opacity: 1, y: 0 },
      leave: { display: "none" },
      trail: 100,
      delay: 50,
      config: config.gentle,
    }
  );

  const transitionsPatientHighs = useTransition(
    patientsHighs ? patientsHighs : [],
    {
      from: { opacity: 0, y: -10 },
      enter: { opacity: 1, y: 0 },
      leave: { display: "none" },
      trail: 100,
      delay: 50,
      config: config.gentle,
    }
  );

  const transitionsPatientInhalation = useTransition(
    patientsInhalation ? patientsInhalation : [],
    {
      from: { opacity: 0, y: -10 },
      enter: { opacity: 1, y: 0 },
      leave: { display: "none" },
      trail: 100,
      delay: 50,
      config: config.gentle,
    }
  );

  const transitionsPatientReconciliation = useTransition(
    patientsReconciliation ? patientsReconciliation : [],
    {
      from: { opacity: 0, y: -10 },
      enter: { opacity: 1, y: 0 },
      leave: { display: "none" },
      trail: 100,
      delay: 50,
      config: config.gentle,
    }
  );

  // Config cell of the PieGraphic
  const cellConfig = {
    cell: [
      { key: "value", fill: "#1DFFF1AA" },
      { key: "value", fill: "#1DFF26CC" },
    ],
  };

  if (loading) return <Loading />;

  return (
    <main className="min-h-screen w-full flex flex-col justify-center">
      <Helmet>
        <title>CMDC | Farmácia Assistencial | Sinalizacoes</title>
        <meta
          name="description"
          content="Dashboard principal com informações gerais."
        />
      </Helmet>
      <section className="px-5 flex-1 flex flex-col justify-center">
        <h2 className="text-2xl text-white text-center mb-2 font-semibold mt-1">
          Farmácia Assistencial
        </h2>
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-2">
          <div className="grid sm:grid-cols-5 grid-cols-1 gap-2 justify-items-center mb-1">
            <div className="w-full flex flex-col items-center">
              <RoundedCard
                data={totalPharmaceutical}
                title="Sem Evolução Farmacêutica"
                titleClass="font-normal sm:text-sm text-2sm w-25 mx-auto"
                className="sm:h-56 h-72 bg-opacity-50 sm:w-60 w-full max-w-108 mb-2"
                roundedClass="sm:w-36 w-50 sm:h-36 h-50 sm:text-2xl text-3xl"
                rounded={{ type: "gradient", color: "#FF903F", id: "gdr-1" }}
                barSize={1}
              />
              <div className="bg-opacity-50 bg-blackCMDC rounded-lg sm:w-60 w-full sm:h-92 h-96 max-w-108 sm:px-5 px-14 py-3 flex flex-col gap-2">
                <VerifyInsert
                  display={patientPharmaceutical?.length}
                  message="Não há atendimentos no momento"
                  className="text-sm whitespace-normal text-white"
                >
                  {transitionsPatientPharmaceutical((style, attendance) => (
                    <animated.div style={style}>
                      <AttendanceCard
                        data={attendance}
                        className="h-16"
                        icon={true}
                        key={attendance}
                        color="#FF903F"
                      />
                    </animated.div>
                  ))}
                </VerifyInsert>
              </div>
            </div>
            <div className="w-full flex flex-col items-center">
              <RoundedCard
                data={totalTransfers}
                title="Sinalização de transferência 
                de Pacientes entre Leitos"
                titleClass="font-normal text-sm w-25 mx-auto"
                className="sm:h-56 h-72 bg-opacity-50 sm:w-60 w-full max-w-108 mb-2"
                roundedClass="sm:w-36 w-50 sm:h-36 h-50 sm:text-2xl text-3xl"
                rounded={{ type: "gradient", color: "#D764FF", id: "gdr-2" }}
                barSize={1}
              />
              <div className="bg-opacity-50 bg-blackCMDC rounded-lg sm:w-60 w-full sm:h-92 h-96 max-w-108 sm:px-5 px-14 py-3 flex flex-col gap-2">
                <VerifyInsert
                  display={patientsTransfer?.length}
                  message="Não há atendimentos no momento"
                  className="text-sm whitespace-normal text-white"
                >
                  {transitionsPatientTransfers((style, attendance) => (
                    <animated.div style={style}>
                      <AttendanceCard
                        className="h-16"
                        data={attendance}
                        icon={<Exit fill="#8A1FEF" />}
                        key={attendance}
                        color="#D764FF"
                      />
                    </animated.div>
                  ))}
                </VerifyInsert>
              </div>
            </div>
            <div className="w-full flex flex-col items-center">
              <PieGraphic
                data={agreementAndPrivate?.percents}
                dataKey="percent"
                config={cellConfig}
                value={agreementAndPrivate?.totalHospit}
                cellSize={2}
                planExibition={{
                  dataOne: agreementAndPrivate?.agreement,
                  dataTwo: agreementAndPrivate?.privateHospit,
                  colorOne: "#1DFFF1",
                  colorTwo: "#1DFF26",
                }}
                title="Sinalização de Alta Hospitalar
                Convênio / Particular"
                exibition={{ titleOne: "Convênios", titleTwo: "Particular" }}
                titleClass="font-normal text-sm w-25 mx-auto"
                className="sm:h-56 h-72 bg-opacity-50 sm:w-60 w-full max-w-108 mb-2"
                graphicClass="sm:w-36 w-50 sm:h-36 h-50 sm:text-2xl text-3xl"
              />
              <div className="bg-opacity-50 bg-blackCMDC rounded-lg sm:w-60 w-full sm:h-92 h-96 max-w-108 sm:px-5 px-14 py-3 flex flex-col gap-2">
                <VerifyInsert
                  display={patientsHighs?.length}
                  message="Não há atendimentos no momento"
                  className="text-sm whitespace-normal text-white"
                >
                  {transitionsPatientHighs((style, attendance) => (
                    <animated.div style={style}>
                      {attendance.type === "CONVENIO" ? (
                        <AttendanceCard
                          className="h-16"
                          data={attendance}
                          icon={<Agreement className="w-5 h-5" />}
                          key={attendance}
                          color={attendance.color}
                        />
                      ) : (
                        <AttendanceCard
                          className="h-16"
                          data={attendance}
                          icon={<Private className="w-5 h-5" />}
                          key={attendance}
                          color={attendance.color}
                        />
                      )}
                    </animated.div>
                  ))}
                </VerifyInsert>
              </div>
            </div>
            <div className="w-full flex flex-col items-center">
              <RoundedCard
                data={totalInhalation}
                title="Paciente em Uso de 
                Dispositivo Inalatório"
                titleClass="font-normal text-sm w-25 mx-auto"
                className="sm:h-56 h-72 bg-opacity-50 sm:w-60 w-full max-w-108 mb-2"
                roundedClass="sm:w-36 w-50 sm:h-36 h-50 sm:text-2xl text-3xl"
                rounded={{ type: "gradient", color: "#FF6C6C", id: "gdr-4" }}
                barSize={1}
              />
              <div className="bg-opacity-50 bg-blackCMDC rounded-lg sm:w-60 w-full sm:h-92 h-96 max-w-108 sm:px-5 px-14 py-3 flex flex-col gap-2">
                <VerifyInsert
                  display={patientsInhalation?.length}
                  message="Não há atendimentos no momento"
                  className="text-sm whitespace-normal text-white"
                >
                  {transitionsPatientInhalation((style, attendance) => (
                    <animated.div style={style}>
                      <AttendanceCard
                        data={attendance}
                        key={attendance}
                        icon={true}
                        className="h-16"
                        color="#FF6C6C"
                      />
                    </animated.div>
                  ))}
                </VerifyInsert>
              </div>
            </div>
            <div className="w-full flex flex-col items-center">
              <RoundedCard
                data={totalReconciliation}
                title="Paciente sem emissão de 
                Formulário de Reconciliação"
                titleClass="font-normal text-sm w-25 mx-auto"
                className="sm:h-56 h-72 bg-opacity-50 sm:w-60 w-full max-w-108 mb-2"
                roundedClass="sm:w-36 w-50 sm:h-36 h-50 sm:text-2xl text-3xl"
                span={"+24h Pendentes"}
                rounded={{ type: "gradient", color: "#FDFF8C", id: "gdr-5" }}
                barSize={1}
              />
              <div className="bg-opacity-50 bg-blackCMDC rounded-lg sm:w-60 w-full sm:h-92 h-100 max-w-108 sm:px-5 px-14 py-3 flex flex-col gap-2">
                <VerifyInsert
                  display={patientsReconciliation?.length}
                  message="Não há atendimentos no momento"
                  className="text-sm whitespace-normal text-white"
                >
                  {transitionsPatientReconciliation((style, attendance) => (
                    <animated.div style={style}>
                      <AttendanceCard
                        className="h-16"
                        data={attendance}
                        key={attendance}
                        icon={<ClockMore className="w-5 h-5" color="#FF0000" />}
                        color="#FDFF8C"
                      />
                    </animated.div>
                  ))}
                </VerifyInsert>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      {error && <Error message={error} />}
    </main>
  );
}

export default AssistingPharmacyOne;
