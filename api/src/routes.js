const express = require('express')
const routes = express.Router()

const Predicted_highsController = require('./controllers/Predicted_highsController')
const BedsController = require('./controllers/BedsController')
const InternmentsController = require('./controllers/internmentsController')
const PatientsController = require('./controllers/PatientsController')
const SurgeriesController = require('./controllers/SurgeriesController')
const Sanitation_beds = require('./controllers/SanitationController')
const FirstAidStationController = require('./controllers/FirstAidStationController')
const Quantitative = require('./controllers/QuantitativeController')
const OccupancyController = require('./controllers/Occupancy')
const DrugstoreController = require('./controllers/DrugstoreController')
const SupplyChangeController = require("./controllers/SupplyChangeController");
const HDUIUTIController = require("./controllers/HDUIUTIController");
const SNDController = require("./controllers/SNDController");


routes.get('/predicted_highs', Predicted_highsController.query)
routes.get('/managment_high_previous', Predicted_highsController.managment_high_previous)
routes.get('/', Predicted_highsController.default)

routes.get('/full_occupancy', BedsController.show)
routes.get('/total_beds', BedsController.total)
routes.get("/total_beds_percent_general", BedsController.total_beds_percent_general);
routes.get('/quantitative_situations', BedsController.quantitative_situations)
routes.get('/beds_panel/', BedsController.beds_panel)
routes.get('/beds_situation', BedsController.situation)
routes.get('/total_beds/percent', BedsController.percent)
routes.get('/total_beds_percent_unit', BedsController.total_beds_percent_unit)

routes.get('/internments/on_day_and_previous', InternmentsController.on_day_and_previous)
routes.get('/hospitalization_ui_uti', InternmentsController.hospitalization_ui_uti)

routes.get('/surgeries/', SurgeriesController.surgeries)
routes.get('/surgeries/unusual_or_major_surgeries_scheduled', SurgeriesController.unusual_or_major_surgeries_scheduled)
routes.get('/surgeries_schedules_aborteds/', SurgeriesController.schedules_aborteds)

routes.get('/sanitation_beds/', Sanitation_beds.sanitation_beds)
routes.get('/quantitative', Quantitative.quantitative)

routes.get('/occupancy_per_unit', OccupancyController.occupancy_per_unit)
routes.get('/hd', OccupancyController.current_admissions)
routes.get('/occupancy_per_specialty', OccupancyController.occupancy_per_specialty)

routes.get('/patients/operated', PatientsController.total_operated)
routes.get('/managment_high_previous_upp', PatientsController.managment_high_previous_upp)

routes.get('/first_aid_station', FirstAidStationController.patients_in_FAS)
routes.get('/real_time_register', FirstAidStationController.real_time_register)
routes.get('/wait_for_pediatric_care', FirstAidStationController.wait_for_pediatric_care)
routes.get('/time_triage', FirstAidStationController.time_triage)
routes.get('/first_aid_stations_beds_situation', FirstAidStationController.first_aid_stations_beds_situation)
routes.get('/first_aid_total_beds_occupied', FirstAidStationController.first_aid_total_beds_occupied)
routes.get('/first_aid_beds_occupied_per_unit', FirstAidStationController.first_aid_beds_occupied_per_unit)
routes.get('/first_aid_patient_list', FirstAidStationController.first_aid_patient_list)
routes.get('/first_aid_longer_medical_care', FirstAidStationController.first_aid_longer_medical_care)
routes.get('/first_aid_longer_waiting_time_for_registration', FirstAidStationController.first_aid_longer_waiting_time_for_registration)
routes.get('/first_aid_real_time_medical_care', FirstAidStationController.first_aid_real_time_medical_care)
routes.get('/first_aid_real_time_registration', FirstAidStationController.first_aid_real_time_registration)
routes.get('/first_aid_super_road', FirstAidStationController.first_aid_super_road)
routes.get('/first_aid_waiting_for_sorting', FirstAidStationController.first_aid_waiting_for_sorting)

routes.get('/drugstore/medication_not_delivered_on_time', DrugstoreController.medication_not_delivered_on_time)
routes.get('/drugstore/medication_delivered_and_not_delivered', DrugstoreController.medication_delivered_and_not_delivered)
routes.get('/drugstore/total_emergency_request_central_pharmacy', DrugstoreController.total_emergency_request_central_pharmacy)
routes.get('/drugstore/total_single_request_central_pharmacy', DrugstoreController.total_single_request_central_pharmacy)
routes.get('/drugstore/emergency_request_central_pharmacy', DrugstoreController.emergency_request_central_pharmacy)
routes.get('/drugstore/hospital_discharge_agreement_and_private', DrugstoreController.hospital_discharge_agreement_and_private)
routes.get('/drugstore/pharmaceutical_evolution', DrugstoreController.pharmaceutical_evolution)
routes.get('/drugstore/patients_using_an_inhalation_device', DrugstoreController.patients_using_an_inhalation_device)
routes.get('/drugstore/signaling_transfer_of_patients_between_beds', DrugstoreController.signaling_transfer_of_patients_between_beds)
routes.get('/drugstore/single_request_central_pharmacy', DrugstoreController.single_request_central_pharmacy)
routes.get('/drugstore/total_number_of_medications_treated_in_the_month', DrugstoreController.total_number_of_medications_treated_in_the_month)
routes.get('/drugstore/total_number_of_medications_treated_on_the_day', DrugstoreController.total_number_of_medications_treated_on_the_day)
routes.get('/drugstore/patients_without_issuance_of_reconciliation', DrugstoreController.patients_without_issuance_of_reconciliation)
routes.get("/drugstore/dantrolen_sadt", DrugstoreController.dantrolen_sadt);
routes.get("/drugstore/dantrolen_cc", DrugstoreController.dantrolen_cc);
routes.get("/drugstore/OPMS_in_next_24h", DrugstoreController.OPMS_in_next_24h);
routes.get("/drugstore/list_OPMES_procedures", DrugstoreController.list_OPMES_procedures);
routes.get("/drugstore/list_procedures_achieved_OPMES", DrugstoreController.list_procedures_achieved_OPMES);
routes.get("/drugstore/number_procedures_in_24Hour_period", DrugstoreController.number_procedures_in_24Hour_period);
routes.get("/drugstore/surgeries_OPME_per_next_day", DrugstoreController.surgeries_OPME_per_next_day);
routes.get("/drugstore/total_procedures_request_OPME_in_next_30Days", DrugstoreController.total_procedures_request_OPME_in_next_30Days);

routes.get("/supply_change/service_time_analysis", SupplyChangeController.service_time_analysis);
routes.get("/supply_change/weekly_goal", SupplyChangeController.weekly_goal);
routes.get("/supply_change/authorized_purchase_order", SupplyChangeController.authorized_purchase_order);
routes.get("/supply_change/purchase_order_with_and_without_invoice", SupplyChangeController.purchase_order_with_and_without_invoice);
routes.get("/supply_change/open_and_completed_purchase_requests", SupplyChangeController.open_and_completed_purchase_requests);
routes.get("/supply_change/top_10_requested_items", SupplyChangeController.top_10_requested_items);
routes.get("/supply_change/foloow_up_weekly", SupplyChangeController.foloow_up_weekly);
routes.get("/supply_change/stock_listing_items_abc_curve", SupplyChangeController.stock_listing_items_abc_curve);
routes.get("/supply_change/stock_items_curve_abc", SupplyChangeController.stock_items_curve_abc);
routes.get("/supply_change/total_stock", SupplyChangeController.total_stock);
routes.get("/supply_change/validity_control_listing", SupplyChangeController.validity_control_listing);
routes.get("/supply_change/total_stock_by_validity_control", SupplyChangeController.total_stock_by_validity_control);
routes.get("/supply_change/quantity_items_validity_control_abc", SupplyChangeController.quantity_items_validity_control_abc);
routes.get("/supply_change/items_with_greater_variation", SupplyChangeController.items_with_greater_variation);
routes.get("/supply_change/pending_requests", SupplyChangeController.pending_requests);
routes.get("/supply_change/stock_days_5d", SupplyChangeController.stock_days_5d);
routes.get("/supply_change/stock_filters", SupplyChangeController.stock_filters);
routes.get("/supply_change/total_opens_solic", SupplyChangeController.total_opens_solic);

routes.get("/hd_ui_uti/hd_ui_uti_per_unit", HDUIUTIController.hd_ui_uti_per_unit);
routes.get("/hd_ui_uti/ui_need_for_vacancies", HDUIUTIController.ui_need_for_vacancies);
routes.get("/hd_ui_uti/ui_uti_internal_transfer", HDUIUTIController.ui_uti_internal_transfer);
routes.get("/hd_ui_uti/ui_uti_reason_for_discharge", HDUIUTIController.ui_uti_reason_for_discharge);
routes.get("/hd_ui_uti/ui_uti_source_and_destination_beds", HDUIUTIController.ui_uti_source_and_destination_beds);
routes.get("/hd_ui_uti/ui_uti_vacancies_requested_last_5_days", HDUIUTIController.ui_uti_vacancies_requested_last_5_days);
routes.get("/hd_ui_uti/ui_uti_vacant_and_occupied_beds", HDUIUTIController.ui_uti_vacant_and_occupied_beds);
routes.get("/hd_ui_uti/uti_need_for_vacancies", HDUIUTIController.uti_need_for_vacancies);
routes.get("/hd_ui_uti/vacancies_per_floor", HDUIUTIController.vacancies_per_floor);

routes.get("/snd/room_100", SNDController.room_100);
routes.get("/snd/allergy_alert", SNDController.allergy_alert);
routes.get("/snd/absence_prescription", SNDController.absence_prescription);
routes.get("/snd/diet_change", SNDController.diet_change);
routes.get("/snd/fasting_patients", SNDController.fasting_patients);
routes.get("/snd/internal_transfers", SNDController.internal_transfers);
routes.get("/snd/nutritional_evolution", SNDController.nutritional_evolution);
routes.get("/snd/anthropometric_evaluation", SNDController.anthropometric_evaluation);
routes.get("/snd/screening_not_performed", SNDController.screening_not_performed);
routes.get("/snd/hospitalization_panel", SNDController.hospitalization_panel);

module.exports = routes