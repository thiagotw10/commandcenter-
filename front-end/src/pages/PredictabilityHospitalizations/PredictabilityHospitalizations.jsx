import React from "react";
import { Helmet } from "react-helmet";
import { Footer, InternationCard } from "../../components";
import { Loading, Error } from "../../helper";
import { ReactComponent as Birthday } from "../../assets/svg/Birthday.svg";

const PredictabilityHospitalizations = () => {
  const timeInterval = 5000;
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const internations = [
    {
      hours: [0, 9, 32],
      name: "GABRIEL SANTOS",
      outherName: "GABRIELA SANTOS",
      bed: "AP 152",
      birthDate: "02/06/2002",
      color: "#FFF",
    },
    {
      hours: [0, 9, 32],
      name: "FELIPE CARLOS",
      bed: "AP 152",
      birthDate: "02/06/2002",
      color: "#93FFFF",
    },
    {
      hours: [0, 9, 32],
      name: "CAROLLINA RIBEIRO",
      bed: "AP 152",
      birthDate: "02/06/2002",
      color: "#FF7BEA",
    },
  ];

  if (loading) return <Loading />;

  return (
    <main className="min-h-screen w-full flex flex-col justify-center">
      <Helmet>
        <title>CMDC | HD - UI - UTI | Previsibilidade de Internações</title>
        <meta
          name="description"
          content="Dashboard relacionado a previsibilidade de internações."
        />
      </Helmet>
      <section className="px-5 flex-1 flex flex-col justify-center">
        <div className="flex flex-col gap-1 w-full max-w-7xl mx-auto mb-1">
          <div className="text-white flex flex-col text-sm items-center font-semibold">
            <h1>HD | UI | UTI</h1>
            <h2>PREVISIBILIDADE DE INTERNAÇÕES</h2>
            <h3 className="text-green-450">PRÓXIMAS 24HRS</h3>
          </div>
          <div className="flex flex-col gap-1 p-1 bg-blackCMDC bg-opacity-50 border-2 border-purple-900 rounded-lg">
            <div className="flex md:flex-row flex-col items-center gap-1 w-full md:h-20 h-full bg-blackCMDC rounded-lg p-1">
              <p className="w-42 text-center text-white text-sm">ELETIVA</p>
              <div className="flex-1 h-full grid md:grid-cols-3 grid-cols-2 sm:gap-8 gap-2">
                {internations?.map(
                  ({ hours, name, outherName, bed, birthDate, color }) => (
                    <InternationCard
                      key={bed}
                      color={color}
                      iconTwo={<Birthday className="w-3 h-3" fill="#fff" />}
                      hours={hours}
                      name={name}
                      outherName={outherName}
                      bed={bed}
                      birthDate={birthDate}
                    />
                  )
                )}
              </div>
            </div>
            <div className="flex md:flex-row flex-col items-center gap-1 w-full md:h-20 h-full bg-blackCMDC rounded-lg p-1">
              <p className="w-42 text-center text-white text-sm">URGÊNCIA</p>
              <div className="flex-1 h-full grid md:grid-cols-3 grid-cols-2 sm:gap-8 gap-2">
                {internations?.map(
                  ({ hours, name, outherName, bed, birthDate, color }) => (
                    <InternationCard
                      key={bed}
                      color={color}
                      iconTwo={<Birthday className="w-3 h-3" fill="#fff" />}
                      hours={hours}
                      name={name}
                      outherName={outherName}
                      bed={bed}
                      birthDate={birthDate}
                    />
                  )
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 p-1 bg-blackCMDC bg-opacity-50 border-2 border-purple-900 rounded-lg">
            <div className="flex md:flex-row flex-col items-center gap-1 w-full md:h-32 h-full bg-blackCMDC rounded-lg p-1">
              <p className="w-42 text-center text-white text-sm">
                PRÉ - CIRÚRGICO
              </p>
              <div className="flex-1 h-full grid md:grid-cols-3 grid-cols-2 md:grid-rows-2 grid-rows-3 sm:gap-x-8 sm:gap-y-1 gap-2">
                {internations?.map(
                  ({ hours, name, outherName, bed, birthDate, color }) => (
                    <InternationCard
                      key={bed}
                      color={color}
                      iconTwo={<Birthday className="w-3 h-3" fill="#fff" />}
                      hours={hours}
                      name={name}
                      outherName={outherName}
                      bed={bed}
                      birthDate={birthDate}
                    />
                  )
                )}
                {internations?.map(
                  ({ hours, name, outherName, bed, birthDate, color }) => (
                    <InternationCard
                      key={bed}
                      color={color}
                      iconTwo={<Birthday className="w-3 h-3" fill="#fff" />}
                      hours={hours}
                      name={name}
                      outherName={outherName}
                      bed={bed}
                      birthDate={birthDate}
                    />
                  )
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 p-1 bg-blackCMDC bg-opacity-50 border-2 border-purple-900 rounded-lg">
            <div className="flex md:flex-row flex-col items-center gap-1 w-full md:h-20 h-full bg-blackCMDC rounded-lg p-1">
              <p className="w-42 text-center text-white text-sm">RPA</p>
              <div className="flex-1 h-full grid md:grid-cols-3 grid-cols-2 sm:gap-8 gap-2">
                {internations?.map(
                  ({ hours, name, outherName, bed, birthDate, color }) => (
                    <InternationCard
                      key={bed}
                      color={color}
                      iconTwo={<Birthday className="w-3 h-3" fill="#fff" />}
                      hours={hours}
                      name={name}
                      outherName={outherName}
                      bed={bed}
                      birthDate={birthDate}
                    />
                  )
                )}
              </div>
            </div>
            <div className="flex md:flex-row flex-col items-center gap-1 w-full md:h-32 h-full bg-blackCMDC rounded-lg p-1">
              <p className="w-42 text-center text-white text-sm">XT</p>
              <div className="flex-1 h-full grid md:grid-cols-3 grid-cols-2 md:grid-rows-2 grid-rows-3 sm:gap-x-8 sm:gap-y-1 gap-2">
                {internations?.map(
                  ({ hours, name, outherName, bed, birthDate, color }) => (
                    <InternationCard
                      key={bed}
                      color={color}
                      iconTwo={<Birthday className="w-3 h-3" fill="#fff" />}
                      hours={hours}
                      name={name}
                      outherName={outherName}
                      bed={bed}
                      birthDate={birthDate}
                    />
                  )
                )}
                {internations?.map(
                  ({ hours, name, outherName, bed, birthDate, color }) => (
                    <InternationCard
                      key={bed}
                      color={color}
                      iconTwo={<Birthday className="w-3 h-3" fill="#fff" />}
                      hours={hours}
                      name={name}
                      outherName={outherName}
                      bed={bed}
                      birthDate={birthDate}
                    />
                  )
                )}
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

export default PredictabilityHospitalizations;
