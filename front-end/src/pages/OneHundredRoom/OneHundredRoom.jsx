import React from "react";
import { Helmet } from "react-helmet";
import {
  AsideInformations,
  Footer,
  OneHundredRoomCard,
  VerifyInsert,
} from "../../components";
import { Loading, Error } from "../../helper";
import { useTransition, animated, config } from "react-spring";
import useSND from "../../service/useSND";

const OneHundredRoom = () => {
  const intervalPagination = 30000;
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const { getRooms } = useSND();

  // Rooms
  const refGetRooms = React.useRef(getRooms);
  const [page, setPage] = React.useState(1);
  const [roomsOneHundred, setRoomsOneHundred] = React.useState();

  React.useEffect(() => {
    async function executeRequest() {
      try {
        const { rooms, totalPage } = await refGetRooms.current(page, 16);
        setError(false);
        if (page > totalPage) {
          setPage(1);
        } else {
          setRoomsOneHundred(rooms);
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

    return () => {
      clearInterval(interval);
    };
  }, [page]);

  // config

  const titles = [
    {
      color: "#5CFF59",
      title: "AGUARDANDO RESULTADO",
    },
    {
      color: "#F1FF55",
      title: "AGUARDANDO RESULTADO",
    },
    {
      color: "#FF4C4C",
      title: "AGUARDANDO PROCEDIMENTO",
    },
    {
      title: (
        <span>
          <span className="font-bold">30+</span> MAIS DE 30 MINUTOS PARA A
          COLETA
        </span>
      ),
    },
    {
      title: (
        <span>
          <span className="font-bold">70+</span> MAIS DE 70 MINUTOS PARA O
          RESULTADO
        </span>
      ),
    },
  ];

  const transitionsRooms = useTransition(
    roomsOneHundred ? roomsOneHundred : [],
    {
      from: { opacity: 0, y: -10 },
      enter: { opacity: 1, y: 0 },
      leave: { display: "none" },
      trail: 100,
      delay: 50,
      config: config.gentle,
    }
  );

  if (loading) return <Loading />;

  return (
    <main className="min-h-screen w-full flex flex-col">
      <Helmet>
        <title>CMDC | Sala 100</title>
        <meta name="description" content="Dashboard de Sala 100" />
      </Helmet>
      <section className="px-5 flex-1 flex flex-col justify-center">
        <div className="flex flex-col gap-2 w-full max-w-7xl mx-auto">
          <h1 className="text-2xl text-white text-center flex-1 font-bold">
            Painel Sala 100
          </h1>
          <div className="sm:max-h-115 max-h-full sm:h-screen h-full grid sm:grid-cols-2 grid-cols-1 content-start gap-2">
            {
              <VerifyInsert
                display={!!roomsOneHundred}
                message="Não há pacientes no momento"
                className="col-span-2 row-start-5 text-lg whitespace-normal text-white"
              >
                {transitionsRooms((style, room) => (
                  <animated.div style={style}>
                    <OneHundredRoomCard
                      data={{
                        attendance: room.CD_ATENDIMENTO,
                        name: room.NM_PACIENTE,
                        time: room.PRESCRICAO_HORARIO,
                      }}
                      alert={!!room.PISCA_VERMELHO}
                      drugs={{ color: room.COR_MEDICAMENTO }}
                      xray={{ color: room.COR_IMAGEM }}
                      lab={{
                        color: room.COR_LABORATORIO,
                        text: room.LABORATORIO_TEMPO,
                        alert: room.LABORATORIO_TEMPO
                          ? Number.parseInt(
                              room.LABORATORIO_TEMPO.replace("+", "")
                            ) >= 70
                          : false,
                      }}
                      className="py-3"
                    />
                  </animated.div>
                ))}
              </VerifyInsert>
            }
          </div>
        </div>
      </section>
      <div className="relative w-full">
        <AsideInformations
          data={titles}
          labelClass="justify-center flex-wrap flex-row"
          className="z-10 max-w-4xl m-auto text-xs"
        />
        <Footer className="sm:absolute block bottom-0 left-0" />
      </div>
      {error && <Error message={error} />}
    </main>
  );
};

export default OneHundredRoom;
