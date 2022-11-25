import React from "react";
import CountUp from "react-countup";
import { ToolTip } from "../";

const SimpleCard = ({
  data,
  type,
  title,
  asideTitle,
  asideTitleClass,
  dataClass,
  icon,
  className,
  rounded,
  exibition,
  toolTipConfig,
  style,
}) => {
  const [tooltip, setToolTip] = React.useState(false);

  function mediumTime(times) {
    const secondsTimes = times.map((time) => {
      const splitTime = time.split(":");
      const secondsTime =
        parseInt(splitTime[0]) * 3600 +
        parseInt(splitTime[1]) * 60 +
        parseInt(splitTime[2]);
      return secondsTime;
    });

    const fullTime = secondsTimes.reduce(
      (acc, secondsTime) => acc + secondsTime
    );
    const media = fullTime / times.length;
    const mediumTime = new Date(media * 1000).toISOString().substr(11, 8);
    const splitMediumTime = mediumTime.split(":").map((value) => value);

    return {
      hours: splitMediumTime[0],
      minutes: splitMediumTime[1],
      seconds: splitMediumTime[2],
    };
  }

  const calcPercent = ({ dataOne, dataTwo }) => {
    let result = (dataOne / dataTwo) * 100;
    result = result < 0 ? 0 : result;
    return Math.round(result);
  };

  function typeContent(type) {
    if (type === "percent") {
      return (
        <>
          <CountUp end={data ? calcPercent(data) : 0} duration={1} />%
        </>
      );
    } else if (data && type === "time") {
      const { hours, minutes } = mediumTime(data);
      return <>{`${hours}:${minutes}`}</>;
    } else if (type === "string") {
      return data || "";
    } else {
      return <CountUp end={data || 0} duration={1} />;
    }
  }

  const content = typeContent(type);

  return (
    <div
      className={`flex flex-col items-center py-2 px-2 rounded-lg bg-blackCMDC shadow-inner-2 ${className}`}
      style={style}
    >
      <h2
        className="text-center flex items-center gap-1 relative"
        onMouseOver={() => setToolTip(true)}
        onMouseLeave={() => setToolTip(false)}
      >
        {icon && icon} {title}
        <ToolTip
          title={toolTipConfig && toolTipConfig.title}
          display={toolTipConfig && tooltip}
          desc={toolTipConfig && toolTipConfig.desc}
        />
      </h2>
      <div className="w-full h-full flex justify-around items-center">
        {rounded && <div className={`rounded-full ${rounded?.class}`}></div>}
        <span
          className={`font-semibold ${
            (type === "percent" && calcPercent(data) >= 70) ||
            (type === "string" && +data?.replace("%", "") >= 70)
              ? "text-red-600"
              : "text-white"
          } ${dataClass}`}
        >
          {content}
        </span>
      </div>
      {asideTitle && (
        <span className={`text-gray-300 text-xs ${asideTitleClass}`}>
          {asideTitle}
        </span>
      )}
      {exibition && (
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col items-center">
            <span className="text-sm text-white font-bold">
              {exibition.dataOne}
            </span>
            <span className="text-xs text-white font-normal">
              {exibition.titleOne || ""}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm text-white font-bold">
              {exibition.dataTwo}
            </span>
            <span className="text-xs text-white font-normal">
              {exibition.titleTwo || ""}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleCard;
