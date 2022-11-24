import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  SurgicalCenter,
  DischargeManagement,
  FirstAidStationOne,
  FirstAidStationTwo,
  BedMaps,
  GeneralOccupation,
  SupplyChange,
  AssistingPharmacyTwo,
  AssistingPharmacyOne,
  FirstAidStationThree,
  PurchaseItems,
  InventoryItems,
  HDUIUTIGeneral,
  PredictabilityHospitalizations,
  PreSurgical,
  UTIUIVacancies,
  OneHundredRoom,
  SNDOne,
  SNDTwo,
  Internations,
  PharmacyCC,
  OPMEOne,
  OPMETwo,
  Consumption,
} from "./pages";
import { Error } from "./helper";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="centro_cirurgico" element={<SurgicalCenter />} />
          <Route path="gestao_de_altas" element={<DischargeManagement />} />
          <Route path="pronto_socorro">
            <Route path="geral" element={<FirstAidStationOne />} />
            <Route path="exames" element={<FirstAidStationTwo />} />
            <Route path="filas" element={<FirstAidStationThree />} />
          </Route>
          <Route path="mapas_de_leitos" element={<BedMaps />} />
          <Route path="ocupacao_geral" element={<GeneralOccupation />} />
          <Route path="farmacia">
            <Route path="sinalizacoes" element={<AssistingPharmacyOne />} />
            <Route path="solicitacoes" element={<AssistingPharmacyTwo />} />
            <Route path="cc" element={<PharmacyCC />} />
            <Route path="opme">
              <Route path="procedimentos" element={<OPMEOne />} />
              <Route path="itens" element={<OPMETwo />} />
            </Route>
          </Route>
          <Route path="suprimentos">
            <Route
              path="padronizado"
              element={<SupplyChange type="padronizado" />}
            />
            <Route
              path="nao_padronizado"
              element={<SupplyChange type="nao_padronizado" />}
            />
            <Route path="itens_de_compras" element={<PurchaseItems />} />
            <Route path="estoque_de_itens">
              <Route
                path="padronizado"
                element={<InventoryItems type="padronizado" />}
              />
              <Route
                path="nao_padronizado"
                element={<InventoryItems type="nao_padronizado" />}
              />
            </Route>
            <Route path="consumo" element={<Consumption />} />
          </Route>
          <Route path="hd_ui_uti">
            <Route path="geral" element={<HDUIUTIGeneral />} />
            <Route
              path="previsibilidade_de_internacoes"
              element={<PredictabilityHospitalizations />}
            />
            <Route path="pre_cirurgico" element={<PreSurgical />} />
            <Route path="vagas" element={<UTIUIVacancies />} />
          </Route>
          <Route path="sala_100" element={<OneHundredRoom />} />
          <Route path="snd">
            <Route path="sinalizacoes" element={<SNDOne />} />
            <Route path="alertas" element={<SNDTwo />} />
          </Route>
          <Route path="internacoes" element={<Internations />} />
          <Route path="*" element={<Error message="Página não encontrada" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
