import React from "react";
import { Helmet } from "react-helmet";
import { Footer, InternationCard, AsideInformations } from "../../components";
import { Loading, Error } from "../../helper";
import { ReactComponent as House } from "../../assets/svg/House.svg";
import { ReactComponent as Clock } from "../../assets/svg/Clock.svg";

const PreSurgical = () => {
  const timeInterval = 5000;
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  // config

  const titles = [
    {
      icon: <Clock className="w-4 h-4" fill="#FF3636" />,
      title: "ATRASO CIRÚRGICO",
    },
    {
      icon: (
        <div className="flex gap-x-2">
          <div className="relative w-5 h-5">
            <House className="w-full h-full" />
            <span className="text-xsm text-black font-bold absolute top-1 right-2">
              1
            </span>
          </div>
          <span className="text-white text-xs">-</span>
          <div className="relative w-5 h-5">
            <House className="w-full h-full" />
            <span className="text-xsm text-black font-bold absolute top-1 right-2">
              7
            </span>
          </div>
        </div>
      ),
      title: "SALAS CIRÚRGICAS",
    },
  ];

  const internations = [
    {
      hours: [0, 9, 32],
      name: "GABRIEL SANTOS",
      outherName: "GABRIELA SANTOS",
      bed: "AP 152",
      time: "10:03:01",
      color: "#FFF",
    },
    {
      hours: [0, 9, 32],
      name: "FELIPE CARLOS",
      bed: "AP 152",
      time: "10:03:01",
      color: "#71FF88",
    },
    {
      hours: [0, 9, 32],
      name: "CAROLLINA RIBEIRO",
      bed: "AP 152",
      time: "10:03:01",
      color: "#AD7BFF",
    },
  ];

  const internationsTwo = [
    {
      hours: [0, 9, 32],
      name: "GABRIEL SANTOS",
      outherName: "GABRIELA SANTOS",
      bed: "AP 152",
      time: "10:03:01",
      color: "#FFF",
    },
    {
      hours: [0, 9, 32],
      name: "FELIPE CARLOS",
      bed: "AP 152",
      time: "10:03:01",
      color: "#71FF88",
    },
    {
      hours: [0, 9, 32],
      name: "CAROLLINA RIBEIRO",
      bed: "AP 152",
      time: "10:03:01",
      color: "#AD7BFF",
    },
    {
      hours: [0, 9, 32],
      name: "GABRIEL SANTOS",
      outherName: "GABRIELA SANTOS",
      bed: "AP 152",
      time: "10:03:01",
      color: "#FFF",
    },
    {
      hours: [0, 9, 32],
      name: "FELIPE CARLOS",
      bed: "AP 152",
      time: "10:03:01",
      color: "#71FF88",
    },
    {
      hours: [0, 9, 32],
      name: "CAROLLINA RIBEIRO",
      bed: "AP 152",
      time: "10:03:01",
      color: "#AD7BFF",
    },
  ];

  if (loading) return <Loading />;

  return (
    <main className="min-h-screen w-full flex flex-col justify-center">
      <Helmet>
        <title>CMDC | HD - UI - UTI | Pré Cirúrgico</title>
        <meta
          name="description"
          content="Dashboard relacionado aos dados de pre cirúrgico em HD | UI | UTI."
        />
      </Helmet>
      <section className="px-5 flex-1 flex flex-col justify-center">
        <div className="flex flex-col gap-2 w-full max-w-7xl mx-auto">
          <div className="text-white flex flex-col text-xl items-center font-semibold">
            <h1>CC</h1>
            <h2>PACIENTES NO PRÉ-CIRÚRGICO</h2>
          </div>
          <div className="flex flex-col gap-1 p-1 bg-blackCMDC bg-opacity-50 border-2 border-purple-900 rounded-lg">
            <div className="flex md:flex-row flex-col items-center gap-1 w-full md:h-32 h-full bg-blackCMDC rounded-lg p-1">
              <p className="w-32 text-center text-white text-sm">
                PRÉ - CIRÚRGICO
              </p>
              <div className="flex-1 h-full grid md:grid-cols-3 grid-cols-2 md:grid-rows-2 grid-rows-3 sm:gap-x-8 sm:gap-y-1 gap-2">
                {internationsTwo?.map(
                  ({ hours, name, outherName, bed, time, color }, index) => (
                    <InternationCard
                      key={bed}
                      color={color}
                      iconOne={
                        <div className="relative w-6 h-6">
                          <House className="w-full h-full" />
                          <span className="text-xs text-black font-bold absolute top-2 right-2">
                            {index + 1}
                          </span>
                        </div>
                      }
                      iconTwo={<Clock className="w-3 h-3" fill="#FF3636" />}
                      hours={hours}
                      name={name}
                      outherName={outherName}
                      bed={bed}
                      birthDate={<span className="text-red-500">{time}</span>}
                    />
                  )
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 p-1 bg-blackCMDC bg-opacity-50 border-2 border-purple-900 rounded-lg">
            <div className="flex md:flex-row flex-col items-center gap-1 w-full md:h-32 h-full bg-blackCMDC rounded-lg p-1">
              <p className="w-32 text-center text-white text-sm">
                CENTRO - CIRÚRGICO
              </p>
              <div className="flex-1 h-full grid md:grid-cols-3 grid-cols-2 md:grid-rows-2 grid-rows-3 sm:gap-x-8 sm:gap-y-1 gap-2">
                {internationsTwo?.map(
                  ({ hours, name, outherName, bed, time, color }, index) => (
                    <InternationCard
                      key={bed}
                      color={color}
                      iconOne={
                        <div className="relative w-6 h-6">
                          <House className="w-full h-full" />
                          <span className="text-xs text-black font-bold absolute top-2 right-2">
                            {index + 1}
                          </span>
                        </div>
                      }
                      iconTwo={<Clock className="w-3 h-3" fill="#FF3636" />}
                      hours={hours}
                      name={name}
                      outherName={outherName}
                      bed={bed}
                      birthDate={<span className="text-red-500">{time}</span>}
                    />
                  )
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 p-1 bg-blackCMDC bg-opacity-50 border-2 border-purple-900 rounded-lg">
            <div className="flex md:flex-row flex-col items-center gap-1 w-full md:h-32 h-full bg-blackCMDC rounded-lg p-1">
              <p className="w-32 text-center text-white text-sm">RPA</p>
              <div className="flex-1 h-full grid md:grid-cols-3 grid-cols-2 md:grid-rows-2 grid-rows-3 sm:gap-x-8 sm:gap-y-1 gap-2">
                {internationsTwo?.map(
                  ({ hours, name, outherName, bed, time, color }, index) => (
                    <InternationCard
                      key={bed}
                      color={color}
                      iconOne={
                        <div className="relative w-6 h-6">
                          <House className="w-full h-full" />
                          <span className="text-xs text-black font-bold absolute top-2 right-2">
                            {index + 1}
                          </span>
                        </div>
                      }
                      iconTwo={<Clock className="w-3 h-3" fill="#FF3636" />}
                      hours={hours}
                      name={name}
                      outherName={outherName}
                      bed={bed}
                      birthDate={<span className="text-red-500">{time}</span>}
                    />
                  )
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 p-1 bg-blackCMDC bg-opacity-50 border-2 border-purple-900 rounded-lg">
            <div className="flex md:flex-row flex-col items-center gap-1 w-full md:h-20 h-full bg-blackCMDC rounded-lg p-1">
              <p className="w-32 text-center text-white text-sm">PREV. RPA</p>
              <div className="flex-1 h-full grid grid-cols-3 sm:gap-8 gap-2">
                {internations?.map(
                  ({ hours, name, outherName, bed, time, color }, index) => (
                    <InternationCard
                      key={bed}
                      color={color}
                      iconOne={
                        <div className="relative w-6 h-6">
                          <House className="w-full h-full" />
                          <span className="text-xs text-black font-bold absolute top-2 right-2">
                            {index + 1}
                          </span>
                        </div>
                      }
                      iconTwo={<Clock className="w-3 h-3" fill="#FF3636" />}
                      hours={hours}
                      name={name}
                      outherName={outherName}
                      bed={bed}
                      birthDate={<span className="text-red-500">{time}</span>}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="relative my-3 w-full">
        <AsideInformations
          data={titles}
          labelClass="sm:justify-center justify-center sm:flex-row flex-col"
          className="z-10 max-w-4xl m-auto text-xs"
        />
        <Footer className="absolute bottom-0 left-0" />
      </div>
      {error && <Error message={error} />}
    </main>
  );
};

export default PreSurgical;
