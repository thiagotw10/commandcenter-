import React from "react";
import { ReactComponent as Paper } from "../../assets/svg/Paper.svg";
import { ReactComponent as PaperSae } from "../../assets/svg/PaperSae.svg";
import { ReactComponent as Xray } from "../../assets/svg/Xray.svg";
import { ReactComponent as Lab } from "../../assets/svg/Lab.svg";
import { ReactComponent as Bed } from "../../assets/svg/Bed.svg";

const InternationPanelCard = ({
  data,
  alert,
  isolation,
  alergy,
  sae,
  pm,
  lab,
  xray,
  proc,
  pews,
  color = "current",
  bgColor = "current",
  className,
}) => {
  const {
    attendance,
    bed,
    name,
    birthDate,
    years,
    weight,
    dispositive,
    diet,
    especialty,
    curatives,
    pattern,
  } = data;

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className={`p-2 flex justify-between items-center sm:flex-nowrap flex-wrap gap-1 rounded-lg relative ${
        alert ? "animate-ping-red" : ""
      } ${className}`}
    >
      <div className="flex flex-col items-center gap-1 h-full">
        <span className="text-gray-400 text-xs whitespace-nowrap">
          Atend. | Leito
        </span>
        <div
          className="flex flex-col items-center justify-center rounded-lg w-24 h-11"
          style={{ background: color }}
        >
          <span className="text-gray-450 font-semibold text-xs">
            {attendance}
          </span>
          <span className="text-gray-450 font-semibold text-xslg">{bed}</span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 w-52 h-full">
        <span className="text-gray-400 text-xs whitespace-nowrap">
          Nome do Paciente
        </span>
        <p className="text-white text-xslg">{name}</p>
      </div>
      <div className="flex flex-col items-center gap-2 h-full">
        <span className="text-gray-400 text-xs whitespace-nowrap">
          Dn | Idade
        </span>
        <div className="flex flex-col items-center">
          <span className="text-white text-xslg">{birthDate}</span>
          <span className="text-white text-xslg">{years}</span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 h-full w-16">
        <span className="text-gray-400 text-xs whitespace-nowrap">
          Isolamento
        </span>
        <p className="text-xsm text-center" style={{ color: isolation.color }}>
          {isolation.text}
        </p>
      </div>
      <div className="flex flex-col items-center gap-2 h-full w-32">
        <span className="text-gray-400 text-xs whitespace-nowrap">Alergia</span>
        <div className="flex flex-col gap-1 items-center">
          {alergy?.text?.map((item) => (
            <span className="text-white text-xsm text-center">{item}</span>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 h-full w-12">
        <span className="text-gray-400 text-xs whitespace-nowrap">Peso</span>
        <p className="text-white text-xslg">
          {weight && weight.toFixed(2) + "KG"}
        </p>
      </div>
      <div className="flex flex-col items-center gap-4 h-full">
        <span className="text-gray-400 text-xs whitespace-nowrap">SAE</span>
        <PaperSae className="w-5 h-5" fill={sae?.color} />
      </div>
      <div className="flex flex-col items-center gap-4 h-full">
        <span className="text-gray-400 text-xs whitespace-nowrap">PM</span>
        <Paper className="w-5 h-5" fill={pm?.color} />
      </div>
      <div className="flex flex-col items-center gap-2 h-full w-32">
        <span className="text-gray-400 text-xs whitespace-nowrap">
          Dispositivo
        </span>
        <div className="flex flex-col gap-1 items-center">
          {dispositive?.map((item) => (
            <span className="text-white text-xsm text-center">{item}</span>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 h-full w-32">
        <span className="text-gray-400 text-xs whitespace-nowrap">Dieta</span>
        <div className="flex flex-col gap-1 items-center">
          {diet?.map((item) => (
            <span className="text-white text-xsm text-center">{item}</span>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 h-full">
        <span className="text-gray-400 text-xs whitespace-nowrap">
          Especialidade
        </span>
        <div className="flex flex-col gap-1 items-center">
          {especialty?.map((item) => (
            <span className="text-white text-xsm text-center">{item}</span>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 h-full">
        <span className="text-gray-400 text-xs whitespace-nowrap">
          Exames | Procedimento
        </span>
        <div className="flex gap-4">
          {lab?.text > 0 && (
            <div className="flex">
              <Lab
                id={xray.id}
                className={`w-5 h-5 ${lab?.alert ? "animate-pulse-plus" : ""}`}
                fill={lab?.color}
              />
              <span className="text-red-500 text-xs">{lab?.text}</span>
            </div>
          )}
          {xray?.text > 0 && (
            <div className="flex">
              <Xray
                id={xray.id}
                className={`w-5 h-5 ${xray?.alert ? "animate-pulse-plus" : ""}`}
                fill={xray?.color}
              />
              <span className="text-red-500 text-xs">{xray?.text}</span>
            </div>
          )}
          {proc?.text > "0" && (
            <div className="flex gap-1">
              <Bed
                id={proc.id}
                className={`w-5 h-5 ${proc?.alert ? "animate-pulse-plus" : ""}`}
                fill={proc?.color}
              />
              <span className="text-red-500 text-xs">{proc?.text}</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 h-full">
        <span className="text-gray-400 text-xs whitespace-nowrap">
          Curativos
        </span>
        <p
          className={`text-white text-xslg ${
            curatives === "SIM" ? "text-green-450" : "text-red-450"
          }`}
        >
          {curatives}
        </p>
      </div>
      <div className="flex flex-col items-center gap-4 h-full w-24">
        <span className="text-gray-400 text-xs whitespace-nowrap">
          Não Padrão
        </span>
        <p className="text-white text-xslg">{pattern}</p>
      </div>
      {pews?.quantity && (
        <div
          className={`text-xsm text-white absolute bottom-1 left-2 flex gap-4 ${
            pews?.alert ? "animate-pulse-plus" : ""
          }`}
        >
          <span style={{ color: pews?.color }}>PEWS: {pews.quantity}</span>
          <span>{pews?.date}</span>
        </div>
      )}
    </div>
  );
};

export default InternationPanelCard;
