import React from "react";
import { ToolTip } from "../";
import { useScroll } from "../../service/useScroll";

const RowPatientTable = ({
  data,
  th,
  title,
  config,
  className,
  tbody,
  toolTipConfig,
}) => {
  const [tooltip, setToolTip] = React.useState(false);
  const table = React.useRef(null);
  useScroll(table, 12);

  const ths =
    th &&
    th.map((title, i) => {
      return (
        <th
          key={title + "-" + i}
          className="border border-gray-900 h-6 font-normal flex-1"
        >
          {title}
        </th>
      );
    });

  const rows =
    data &&
    data.map((register, i) => {
      return (
        <tr key={register + "-" + i} className="flex-1 flex">
          <td className="pt-1 flex-1">
            <div
              className="w-3 h-3 m-auto rounded-full"
              style={{ backgroundColor: register.color }}
            ></div>
          </td>
          <td className="flex-1">{register[config[0]]}</td>
          <td className="flex-1">{register[config[1]]}</td>
          <td className="flex-1">{register[config[2]]}</td>
        </tr>
      );
    });

  return (
    <div className={`bg-grayCMDC ${className}`}>
      <table className="border border-gray-900 w-11/12 m-auto border-collapse p-1">
        <caption className="text-xs text-center relative">
          <span
            onMouseOver={() => setToolTip(true)}
            onMouseLeave={() => setToolTip(false)}
          >
            {title}
          </span>
          <ToolTip
            title={toolTipConfig && toolTipConfig.title}
            display={toolTipConfig && tooltip}
            desc={toolTipConfig && toolTipConfig.desc}
          />
        </caption>
        <thead className="block">
          <tr className="flex">
            <th className="border border-gray-900 h-6 font-normal flex-1">
              Classificação
            </th>
            {ths}
          </tr>
        </thead>
        <tbody
          ref={table}
          className={`text-center text-white flex flex-col ${tbody}`}
        >
          {rows}
        </tbody>
      </table>
    </div>
  );
};

export default RowPatientTable;
