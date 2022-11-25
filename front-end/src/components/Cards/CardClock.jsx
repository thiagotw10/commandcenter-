import React from "react";
import CountUp from "react-countup";
import { ToolTip } from "../";

function CardClock({ data, title, toolTipConfig, className }) {
  const [hours, setHours] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
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
    const splitMediumTime = mediumTime.split(":").map((value) => Number(value));

    return {
      hours: splitMediumTime[0],
      minutes: splitMediumTime[1],
      seconds: splitMediumTime[2],
    };
  }

  React.useEffect(() => {
    if (data && !!data[0]) {
      const time = mediumTime(data);
      setHours(time.hours);
      setMinutes(time.minutes);
    }
  }, [data]);

  return (
    <div className={`bg-blackCMDC rounded-lg flex flex-col p-2 ${className}`}>
      <h2 className="text-center text-xs font-semibold text-white mt-2">
        <span
          onMouseOver={() => setToolTip(true)}
          onMouseLeave={() => setToolTip(false)}
        >
          {title}
        </span>
      </h2>
      <ToolTip title={toolTipConfig && toolTipConfig.title} display={toolTipConfig && tooltip} desc={toolTipConfig && toolTipConfig.desc} />
      <div className="bg-clock-circle w-28 h-28 bg-cover m-auto flex justify-center items-center">
        <div className="text-xs font-bold text-white">
          <span className="text-xl">
            <CountUp end={hours} duration={1} />
          </span>
          h
          <span className="text-xl">
            <CountUp end={minutes} duration={1} />
          </span>
          m
        </div>
      </div>
    </div>
  );
}

export default CardClock;
