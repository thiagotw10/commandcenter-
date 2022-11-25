import React from "react";

const Table = ({ data, endData, th, title, className, tbody }) => {
  const ths =
    th &&
    th.map(({ name }, i) => {
      return (
        <th key={name + "-" + i} className="h-7 text-base font-semibold flex-1">
          {name}
        </th>
      );
    });

  const rows =
    data &&
    data.map((tr, i) => {
      return (
        <tr
          key={i}
          className="flex-1 flex border-b border-gray-800 items-center"
        >
          {Object.values(tr).map((td, i) => {
            return (
              <td
                key={td + "-" + i}
                className="flex-1 text-center break-words"
                style={{ color: th[i]?.color ? th[i].color : "#fff" }}
              >
                {typeof td === "string" ? td.replaceAll("/", " / ") : td}
              </td>
            );
          })}
        </tr>
      );
    });

  return (
    <div className={`${className}`}>
      <table className="w-full h-full m-auto border-collapse p-1">
        <caption className="text-xs text-center">{title}</caption>
        <thead className="block border-b border-gray-800">
          <tr className="flex">{ths}</tr>
        </thead>
        <tbody className={`text-center text-white flex flex-col ${tbody}`}>
          {rows}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
