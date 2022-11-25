import React from "react";
import { Helmet } from "react-helmet";
import {
  Footer,
  SimpleCard,
  InventoryCard,
  QuantityIventoryCard,
  AsideInformations,
  VerifyInsert,
  Select,
} from "../../components";
import { Error, Loading } from "../../helper";
import { useTransition, animated, config } from "react-spring";
import useSupplyChange from "../../service/useSupplyChange";

const InventoryItems = ({ type }) => {
  const timeInterval = 5000;
  const intervalPagination = 60000;
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [palette, setPalette] = React.useState();
  const [standardized, setStandardized] = React.useState();
  const [filter, setFilter] = React.useState("ALMOXARIFADO GERAL");

  const {
    getListingItems,
    getStockItems,
    getTotalStock,
    getTotalValidity,
    getValidityListingItems,
    getValidityItems,
    getStockFilters,
  } = useSupplyChange();

  React.useEffect(() => {
    const palleteStandardized = {
      main: "#0AA7FF",
    };

    const palleteNotStandardized = {
      main: "#FF0A0A",
    };

    if (type === "padronizado") {
      setPalette(palleteStandardized);
      setStandardized(true);
    } else if (type === "nao_padronizado") {
      setPalette(palleteNotStandardized);
      setStandardized(false);
    }
  }, [type]);

  // Stock filter
  const refGetStockFilters = React.useRef(getStockFilters);
  const [stockOptions, setStockOptions] = React.useState([]);

  React.useEffect(() => {
    async function executeRequest() {
      setLoading(true);
      try {
        const { filters } = await refGetStockFilters.current();
        setStockOptions(filters);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    executeRequest();
  }, []);

  // Stock Listing Items
  const refGetListingItems = React.useRef(getListingItems);
  const [listingItems, setListingItems] = React.useState();
  const [pageOne, setPageOne] = React.useState(1);

  React.useEffect(() => {
    async function executeRequest() {
      try {
        const { inventoryItems, totalPage } = await refGetListingItems.current(
          standardized,
          pageOne,
          6,
          stockOptions?.filter(({ DS_ESTOQUE }) => DS_ESTOQUE === filter)[0]
            .CD_ESTOQUE
        );
        setError(false);
        if (pageOne > totalPage && totalPage > 0) {
          setPageOne(1);
        } else {
          setListingItems(inventoryItems);
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

    return () => clearInterval(interval);
  }, [pageOne, standardized, filter, stockOptions]);

  // Stock Items ABC
  const refGetStockItems = React.useRef(getStockItems);
  const [stockItems, setStockItems] = React.useState();

  React.useEffect(() => {
    setLoading(true);
    async function executeRequest() {
      try {
        const { items } = await refGetStockItems.current(
          standardized,
          stockOptions?.filter(({ DS_ESTOQUE }) => DS_ESTOQUE === filter)[0]
            .CD_ESTOQUE
        );
        setStockItems(items);
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

    return () => clearInterval(interval);
  }, [standardized, filter, stockOptions]);

  // Total Stock
  const refGetTotalStock = React.useRef(getTotalStock);
  const [totalStock, setTotalStock] = React.useState();

  React.useEffect(() => {
    setLoading(true);
    async function executeRequest() {
      try {
        const { stockValue } = await refGetTotalStock.current(
          standardized,
          stockOptions?.filter(({ DS_ESTOQUE }) => DS_ESTOQUE === filter)[0]
            .CD_ESTOQUE
        );
        setTotalStock(stockValue);
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

    return () => clearInterval(interval);
  }, [standardized, filter, stockOptions]);

  // Total Validity
  const refGetTotalValidity = React.useRef(getTotalValidity);
  const [totalValidity, setTotalValidity] = React.useState();

  React.useEffect(() => {
    setLoading(true);
    async function executeRequest() {
      try {
        const { validityValue } = await refGetTotalValidity.current(
          standardized,
          stockOptions?.filter(({ DS_ESTOQUE }) => DS_ESTOQUE === filter)[0]
            .CD_ESTOQUE
        );
        setTotalValidity(validityValue);
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

    return () => clearInterval(interval);
  }, [standardized, filter, stockOptions]);

  // Validity Listing Items
  const refGetValidityListingItems = React.useRef(getValidityListingItems);
  const [validityListingItems, setValidityListingItems] = React.useState();
  const [pageTwo, setPageTwo] = React.useState(1);

  React.useEffect(() => {
    async function executeRequest() {
      try {
        const { validityItems, totalPage } =
          await refGetValidityListingItems.current(
            standardized,
            pageTwo,
            6,
            stockOptions?.filter(({ DS_ESTOQUE }) => DS_ESTOQUE === filter)[0]
              .CD_ESTOQUE
          );
        setError(false);
        if (pageTwo > totalPage && totalPage > 0) {
          setPageTwo(1);
        } else {
          setValidityListingItems(validityItems);
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

    return () => clearInterval(interval);
  }, [pageTwo, standardized, filter, stockOptions]);

  // Validity Items ABC
  const refGetValidityItems = React.useRef(getValidityItems);
  const [validityItems, setValidityItems] = React.useState();

  React.useEffect(() => {
    setLoading(true);
    async function executeRequest() {
      try {
        const { items } = await refGetValidityItems.current(
          standardized,
          stockOptions?.filter(({ DS_ESTOQUE }) => DS_ESTOQUE === filter)[0]
            .CD_ESTOQUE
        );
        setValidityItems(items);
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

    return () => clearInterval(interval);
  }, [standardized, filter, stockOptions]);

  // Configs

  const titlesOne = [
    { color: "#FF5454", title: "30 Dias" },
    { color: "#FCFF54", title: "60 Dias" },
    { color: "#62FF54", title: "90 Dias" },
  ];

  const titlesTwo = [
    {
      title: (
        <span className="font-normal">
          CRITICO: <span className="font-bold">0 - 10</span>
        </span>
      ),
    },
    {
      title: (
        <span className="font-normal">
          ATENCAO: <span className="font-bold">10 - 20</span>
        </span>
      ),
    },
    {
      title: (
        <span className="font-normal">
          ABASTECIDO: <span className="font-bold"> 20 - 40</span>
        </span>
      ),
    },
    {
      title: (
        <span className="font-normal">
          EXCESSO: <span className="font-bold"> Maior que 40</span>
        </span>
      ),
    },
  ];

  const transitionsListingItems = useTransition(
    listingItems ? listingItems : [],
    {
      from: { opacity: 0, y: -10 },
      enter: { opacity: 1, y: 0 },
      leave: { display: "none" },
      trail: 100,
      delay: 50,
      config: config.gentle,
    }
  );

  const transitionsValidityListingItems = useTransition(
    validityListingItems ? validityListingItems : [],
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
    <main className="min-h-screen w-full flex flex-col justify-center">
      <Helmet>
        <title>
          CMDC | Supply | Estoque de Itens |{" "}
          {standardized ? "Padronizado" : "Não Padronizado"}
        </title>
        <meta
          name="description"
          content="Dashboard relacionado as mudanças de suprimentos."
        />
      </Helmet>
      <section className="px-5 flex-1 flex flex-col justify-center gap-2">
        <div className="relative">
          <h2 className="text-xl text-white text-center font-semibold flex-1">
            Estoque | Itens | {standardized ? "Padronizado" : "Não Padronizado"}
          </h2>
          <Select
            value={filter}
            setValue={(value) => {
              setFilter(value);
            }}
            options={stockOptions?.map((option) => option.DS_ESTOQUE)}
            className="text-xs h-7 absolute top-0 right-10"
          />
        </div>
        <div className="w-full flex flex-col gap-2 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-1">
            <div className="bg-opacity-50 bg-blackCMDC shadow-inner-2 rounded-lg py-1.5 px-5 flex flex-col gap-1 relative">
              <h2 className="text-lg text-white text-center font-semibold sm:col-span-6">
                Quantidade de Itens
              </h2>
              <div className="grid grid-cols-2 grid-rows-3 sm:grid-rows-1 sm:grid-cols-7 gap-2">
                <div
                  style={{ borderColor: palette.main }}
                  className="bg-blackCMDC bg-opacity-70 border-l-2 h-42 col-span-2 sm:col-span-3 p-1 gap-2 flex items-center"
                >
                  <div
                    style={{ borderColor: palette.main }}
                    className="border-r-2 h-32 flex flex-col items-center justify-center pr-2"
                  >
                    <span className="text-white text-3xl">A</span>
                    <span className="text-white text-sm">Crítico</span>
                  </div>
                  <div className="flex-1 grid grid-cols-2 grid-rows-3 p-1 gap-1">
                    <VerifyInsert
                      display={listingItems?.length}
                      message="Não há itens no momento"
                      className="text-sm whitespace-normal text-white col-span-full"
                    >
                      {transitionsListingItems((style, item) => (
                        <animated.div style={style}>
                          <InventoryCard
                            color={palette.main}
                            data={item}
                            className="bg-opacity-100"
                          />
                        </animated.div>
                      ))}
                    </VerifyInsert>
                  </div>
                </div>
                {stockItems?.map(({ name, A, B, C }, index) => (
                  <div
                    key={name + "-" + index}
                    className="bg-blackCMDC bg-opacity-70 border-l-2 border-white h-42 col-span-1 px-2 py-1 flex flex-col gap-1"
                  >
                    <p className="text-sm text-center text-white">{name}</p>
                    <QuantityIventoryCard letter="A" data={[{ value: A }]} />
                    <QuantityIventoryCard letter="B" data={[{ value: B }]} />
                    <QuantityIventoryCard letter="C" data={[{ value: C }]} />
                  </div>
                ))}
              </div>
              <AsideInformations
                className="static sm:absolute -bottom-1 left-3 sm:block flex justify-start flex-wrap max-w-106"
                labelClass="text-xs grid grid-cols-2 grid-rows-2"
                data={titlesTwo}
              />
              <SimpleCard
                data={totalStock}
                type="string"
                title="Valor do Estoque"
                className="w-56 h-12 rounded-full bg-opacity-50 text-white text-xs m-auto"
                dataClass="text-lg text-white"
              />
            </div>
            <h2 className="text-xl text-white text-center mb-1 font-semibold">
              Controle de Validade Mat | Med
            </h2>
            <div className="bg-opacity-50 bg-blackCMDC shadow-inner-2 rounded-lg py-1 px-5 flex flex-col gap-1.5 relative">
              <h2 className="text-lg text-white text-center font-semibold sm:col-span-6">
                Quantidade de Itens
              </h2>
              <div className="grid grid-cols-2 grid-rows-3 sm:grid-rows-1 sm:grid-cols-7 gap-2">
                <div
                  style={{ borderColor: palette.main }}
                  className="bg-blackCMDC bg-opacity-70 border-l-2 h-42 col-span-2 sm:col-span-3 p-1 gap-2 flex items-center"
                >
                  <div
                    style={{ borderColor: palette.main }}
                    className="border-r-2 h-32 flex flex-col items-center justify-center pr-2"
                  >
                    <span className="text-white text-3xl">A</span>
                    <span className="text-white text-sm">Crítico</span>
                  </div>
                  <div className="flex-1 grid grid-cols-2 grid-rows-3 p-1 gap-1">
                    <VerifyInsert
                      display={validityListingItems?.length}
                      message="Não há itens no momento"
                      className="text-sm whitespace-normal text-white col-span-full"
                    >
                      {transitionsValidityListingItems((style, item) => (
                        <animated.div style={style}>
                          <InventoryCard
                            color={palette.main}
                            data={item}
                            className="bg-opacity-100"
                          />
                        </animated.div>
                      ))}
                    </VerifyInsert>
                  </div>
                </div>
                {validityItems?.map(({ name, A, B, C }, index) => (
                  <div
                    key={index + "-" + name}
                    className="bg-blackCMDC bg-opacity-70 border-l-2 border-white h-42 col-span-1 px-2 py-1 flex flex-col gap-1"
                  >
                    <p className="text-sm text-center text-white">{name}</p>
                    <QuantityIventoryCard
                      letter="A"
                      data={[
                        { value: A.red, color: "#FF5454" },
                        { value: A.yellow, color: "#FCFF54" },
                        { value: A.green, color: "#62FF54" },
                      ]}
                    />
                    <QuantityIventoryCard
                      letter="B"
                      data={[
                        { value: B.red, color: "#FF5454" },
                        { value: B.yellow, color: "#FCFF54" },
                        { value: B.green, color: "#62FF54" },
                      ]}
                    />
                    <QuantityIventoryCard
                      letter="C"
                      data={[
                        { value: C.red, color: "#FF5454" },
                        { value: C.yellow, color: "#FCFF54" },
                        { value: C.green, color: "#62FF54" },
                      ]}
                    />
                  </div>
                ))}
              </div>
              <AsideInformations
                className="static sm:absolute bottom-0 left-5 sm:block flex justify-center"
                data={titlesOne}
              />
              <SimpleCard
                data={totalValidity}
                type="string"
                title="Valor do Estoque"
                className="w-56 h-12 rounded-full bg-opacity-50 text-white text-xs mx-auto"
                dataClass="text-lg text-white"
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
      {error && <Error message={error} />}
    </main>
  );
};

export default InventoryItems;
