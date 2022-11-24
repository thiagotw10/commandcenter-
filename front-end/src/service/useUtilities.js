const useUtilities = () => {
  const getFontSize = () => {
    let fontSize = window.getComputedStyle(document.body).fontSize;
    fontSize = Number(fontSize.replace("px", ""));
    return fontSize;
  };

  function formatDate(date, type) {
    let fullDate = date.split("T")[0].split("-");
    let formatedDate = "";

    if (type === "DM") {
      formatedDate = `${fullDate[2]}/${fullDate[1]}`;
    } else if (type === "D") {
      formatedDate = fullDate[2];
    } else {
      formatedDate = `${fullDate[2]}/${fullDate[1]}/${fullDate[0]}`;
    }

    return formatedDate;
  }

  function getLimit(array, identifier) {
    let total = 0;

    if (!!identifier) {
      total = array?.reduce((acc, obj) => {
        const max = obj[identifier];
        return acc > max ? acc : max;
      }, 0);
    } else {
      total = array?.reduce((acc, obj) => {
        const values = Object.values(obj);
        const numbers = values.filter((value) => typeof value === "number");
        const max = Math.max(...numbers);
        return acc > max ? acc : max;
      }, 0);
    }

    total = total === 0 ? 100 : total;
    return total;
  }

  function getPageDimensions() {
    const body = document.body;
    const dimensions = body.getBoundingClientRect();
    return dimensions;
  }

  function limitName(name, limit = 2) {
    const splitedName = name.split(" ");
    const limitedName = splitedName.filter((_, i) => i <= limit - 1).join(" ");
    return limitedName;
  }

  function toBRL(value) {
    if (typeof value === "number") {
      return value?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });
    }
  }

  return {
    getFontSize,
    formatDate,
    getLimit,
    getPageDimensions,
    limitName,
    toBRL,
  };
};

export default useUtilities;
