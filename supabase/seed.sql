-- BRAHMO India Clinical AI — Complete Seed Data
-- Prices verified against 1mg.com May 2025
-- See docs/data_sources.md for full source documentation

-- =====================
-- DRUGS (30 drugs)
-- =====================
insert into drugs (generic_name,brand_name,manufacturer,drug_class,condition_tags,mrp_price,nlem_status,hf_safe,renal_warning,hypoglycemia_risk,source_site,source_reference) values
('Metformin','Glycomet 500 SR','USV Private Limited','Biguanide','diabetes','₹55',true,true,'Avoid if eGFR <30','low','1mg.com','Glycomet 500 SR Tablet'),
('Glimepiride','Amaryl 2mg','Sanofi India','Sulfonylurea','diabetes','₹210',true,true,'High hypoglycemia risk in CKD','high','1mg.com','Amaryl 2mg Tablet'),
('Teneligliptin','Zita 20','Glenmark Pharmaceuticals','DPP4 Inhibitor','diabetes','₹220',false,true,'Usually safe in CKD','low','1mg.com','Zita 20 Tablet'),
('Empagliflozin','Jardiance 10mg','Boehringer Ingelheim','SGLT2 Inhibitor','diabetes,heart_failure','₹520',false,true,'Monitor renal function','low','1mg.com','Jardiance 10mg Tablet'),
('Dapagliflozin','Forxiga 10mg','AstraZeneca','SGLT2 Inhibitor','diabetes,heart_failure','₹480',false,true,'Monitor volume depletion','low','1mg.com','Forxiga 10mg Tablet'),
('Pioglitazone','Pioz 15','USV Private Limited','Thiazolidinedione','diabetes','₹95',true,false,'Generally safe in CKD','low','1mg.com','Pioz 15 Tablet'),
('Sitagliptin','Januvia 100mg','MSD Pharmaceuticals','DPP4 Inhibitor','diabetes','₹540',false,true,'Dose reduction in CKD','low','1mg.com','Januvia 100mg Tablet'),
('Linagliptin','Trajenta 5mg','Boehringer Ingelheim','DPP4 Inhibitor','diabetes','₹450',false,true,'No dose adjustment in CKD','low','1mg.com','Trajenta 5mg Tablet'),
('Insulin Glargine','Lantus','Sanofi India','Insulin','diabetes','₹950',false,true,'Dose adjustment in CKD','high','1mg.com','Lantus Injection'),
('Human Insulin Mixtard','Mixtard 30','Novo Nordisk','Insulin','diabetes','₹180',true,true,'Monitor glucose in CKD','high','1mg.com','Mixtard 30 Injection'),
('Voglibose','Volix 0.3','Sun Pharma','Alpha-glucosidase Inhibitor','diabetes','₹160',false,true,'Caution in severe CKD','low','1mg.com','Volix 0.3 Tablet'),
('Aspirin','Ecosprin 75','USV Private Limited','Antiplatelet','cardiovascular','₹20',true,true,'Monitor bleeding in CKD','none','1mg.com','Ecosprin 75 Tablet'),
('Clopidogrel','Clopitab 75','Lupin','Antiplatelet','cardiovascular','₹85',true,true,'Caution in severe renal impairment','none','1mg.com','Clopitab 75 Tablet'),
('Ticagrelor','Brilinta 90mg','AstraZeneca','Antiplatelet','cardiovascular','₹700',false,true,'Monitor bleeding','none','1mg.com','Brilinta 90 Tablet'),
('Ramipril','Cardace 5','Sanofi India','ACE Inhibitor','cardiovascular,heart_failure','₹140',true,true,'Monitor potassium and creatinine','none','1mg.com','Cardace 5 Tablet'),
('Telmisartan','Telma 40','Glenmark Pharmaceuticals','ARB','cardiovascular,hypertension','₹120',true,true,'Monitor potassium','none','1mg.com','Telma 40 Tablet'),
('Carvedilol','Carca 6.25','Intas Pharmaceuticals','Beta Blocker','cardiovascular,heart_failure','₹110',true,true,'Caution in severe renal impairment','may mask hypoglycemia','1mg.com','Carca 6.25 Tablet'),
('Metoprolol','Metolar 50','Cipla','Beta Blocker','cardiovascular,af','₹85',true,true,'Monitor BP and HR','may mask hypoglycemia','1mg.com','Metolar 50 Tablet'),
('Furosemide','Lasix 40','Sanofi India','Loop Diuretic','heart_failure,cardiovascular','₹35',true,true,'Monitor electrolytes','none','1mg.com','Lasix 40 Tablet'),
('Spironolactone','Aldactone 25','Pfizer','Potassium-sparing Diuretic','heart_failure,cardiovascular','₹90',true,true,'Hyperkalemia risk in CKD','none','1mg.com','Aldactone 25 Tablet'),
('Atorvastatin','Atorlip 40','Cipla','Statin','cardiovascular','₹190',true,true,'Monitor liver enzymes','none','1mg.com','Atorlip 40 Tablet'),
('Streptokinase','Streptase','Cadila Healthcare','Thrombolytic','cardiovascular,stemi','₹6500',true,true,'Monitor bleeding','none','1mg.com','Streptase Injection'),
('Tenecteplase','Elaxim','Zydus Cadila','Thrombolytic','cardiovascular,stemi','₹32000',false,true,'High bleeding risk','none','1mg.com','Elaxim Injection'),
('Apixaban','Eliquis 5mg','Pfizer','DOAC','cardiovascular,af','₹1100',false,true,'Dose adjustment in CKD','none','1mg.com','Eliquis 5 Tablet'),
('Rivaroxaban','Xarelto 10mg','Bayer','DOAC','cardiovascular,af','₹950',false,true,'Avoid in severe renal impairment','none','1mg.com','Xarelto 10 Tablet'),
('Dabigatran','Pradaxa 110mg','Boehringer Ingelheim','DOAC','cardiovascular,af','₹980',false,true,'Avoid in severe CKD','none','1mg.com','Pradaxa 110 Capsule'),
('Gliclazide','Diamicron MR 60','Servier India','Sulfonylurea','diabetes','₹240',true,true,'Caution in CKD and elderly','moderate','1mg.com','Diamicron MR 60 Tablet'),
('Semaglutide','Rybelsus 7mg','Novo Nordisk','GLP-1 Receptor Agonist','diabetes,obesity','₹3200',false,true,'Monitor dehydration','low','1mg.com','Rybelsus 7 Tablet'),
('Tirzepatide','Mounjaro','Eli Lilly','Dual GIP/GLP-1 Agonist','diabetes,obesity','₹14000',false,true,'Monitor GI intolerance','low','1mg.com','Mounjaro Injection'),
('Nitroglycerin','Nitrocontin 2.6','Sun Pharma','Nitrate','cardiovascular,stemi','₹75',true,true,'Monitor blood pressure','none','1mg.com','Nitrocontin 2.6 Tablet'),
('Bisoprolol','Concor 5','Merck','Beta Blocker','cardiovascular,heart_failure','₹130',true,true,'Reduce dose in severe renal impairment','may mask hypoglycemia','1mg.com','Concor 5 Tablet');

-- =====================
-- GUIDELINES (15 nodes)
-- =====================
insert into indian_guidelines (source,condition,recommendation,evidence_level,tags,source_reference,source_url) values
('RSSDI','diabetes','Metformin remains first-line therapy for Type 2 Diabetes unless contraindicated.','A','diabetes,first_line','RSSDI Clinical Practice Recommendations 2023','https://rssdi.in'),
('RSSDI','diabetes','SGLT2 inhibitors are preferred in diabetic patients with heart failure.','A','diabetes,heart_failure','RSSDI Clinical Practice Recommendations 2023','https://rssdi.in'),
('RSSDI','diabetes','HbA1c targets may be relaxed to 7.5-8% in elderly patients with comorbidities.','B','diabetes,elderly','RSSDI Clinical Practice Recommendations 2023','https://rssdi.in'),
('RSSDI','diabetes','Sulfonylureas should be used cautiously in CKD due to hypoglycemia risk.','A','diabetes,ckd','RSSDI Clinical Practice Recommendations 2023','https://rssdi.in'),
('RSSDI','diabetes','Pioglitazone should be avoided in heart failure due to fluid retention risk.','A','diabetes,heart_failure','RSSDI Clinical Practice Recommendations 2023','https://rssdi.in'),
('RSSDI','diabetes','Teneligliptin is a commonly used cost-effective DPP4 inhibitor in India.','B','diabetes,india_specific','RSSDI Clinical Practice Recommendations 2023','https://rssdi.in'),
('RSSDI','diabetes','Insulin should be considered in uncontrolled diabetes with HbA1c above 9%.','A','diabetes,insulin','RSSDI Clinical Practice Recommendations 2023','https://rssdi.in'),
('CSI','cardiovascular','Primary PCI is preferred for STEMI if available within guideline-directed timelines.','A','cardiovascular,stemi','CSI STEMI Guidelines','https://csi.org.in'),
('CSI','cardiovascular','Streptokinase remains an important thrombolytic option in non-PCI capable centers in India.','B','cardiovascular,stemi,india_specific','CSI STEMI Guidelines','https://csi.org.in'),
('CSI','cardiovascular','Dual antiplatelet therapy is recommended after acute coronary syndrome.','A','cardiovascular,acs','CSI ACS Guidelines','https://csi.org.in'),
('CSI','cardiovascular','Anticoagulation is recommended for AF patients with CHA2DS2-VASc score of 2 or more.','A','cardiovascular,af','CSI AF Guidelines','https://csi.org.in'),
('CSI','cardiovascular','Beta blockers are recommended in all stable heart failure patients with reduced ejection fraction.','A','cardiovascular,heart_failure','CSI Heart Failure Guidelines','https://csi.org.in'),
('RSSDI','diabetes','SGLT2 inhibitors reduce hospitalisation for heart failure in diabetic patients.','A','diabetes,heart_failure,cardiovascular','RSSDI Clinical Practice Recommendations 2023','https://rssdi.in'),
('CSI','cardiovascular','ACE inhibitors or ARBs are recommended in heart failure with reduced ejection fraction.','A','cardiovascular,heart_failure','CSI Heart Failure Guidelines','https://csi.org.in'),
('CSI','cardiovascular','Spironolactone should be used with caution in CKD due to hyperkalemia risk.','A','cardiovascular,heart_failure,ckd','CSI Heart Failure Guidelines','https://csi.org.in');

-- =====================
-- DRUG INTERACTIONS (10 pairs)
-- =====================
insert into drug_interactions (drug_a,drug_b,severity,effect,management,tags) values
('Ramipril','Spironolactone','high','Hyperkalemia risk','Monitor potassium and renal function closely','heart_failure,ckd'),
('Pioglitazone','Heart Failure','high','Fluid retention and worsening heart failure','Avoid in heart failure patients','heart_failure,diabetes'),
('Glimepiride','CKD','high','Severe hypoglycemia risk','Dose reduce or avoid in advanced CKD','ckd,diabetes'),
('Ticagrelor','Apixaban','high','Major bleeding risk','Use shortest possible triple therapy duration','af,acs'),
('Aspirin','Apixaban','moderate','Increased bleeding risk','Monitor for bleeding symptoms','af,acs'),
('Empagliflozin','Furosemide','moderate','Volume depletion and dehydration','Monitor blood pressure and hydration','heart_failure,diabetes'),
('Metformin','CKD','high','Lactic acidosis risk','Avoid if eGFR below 30','ckd,diabetes'),
('Carvedilol','Glimepiride','moderate','Hypoglycemia symptoms may be masked','Monitor blood glucose carefully','diabetes,cardiovascular'),
('Spironolactone','CKD','high','Dangerous hyperkalemia risk','Frequent potassium monitoring required','ckd,heart_failure'),
('Ticagrelor','Aspirin','moderate','Increased bleeding risk','Standard DAPT monitoring required','acs,cardiovascular');

-- =====================
-- HOSPITAL FORMULARY
-- =====================
insert into hospital_formulary (drug_id, in_stock, pharmacy_notes)
select id, true, 'Available at Apollo Chennai pharmacy'
from drugs
where generic_name in (
  'Metformin','Aspirin','Clopidogrel','Ramipril','Atorvastatin',
  'Furosemide','Spironolactone','Carvedilol','Metoprolol',
  'Glimepiride','Teneligliptin','Human Insulin Mixtard',
  'Telmisartan','Bisoprolol','Gliclazide'
);

insert into hospital_formulary (drug_id, in_stock, pharmacy_notes)
select id, false, 'Not stocked — patient purchases outside'
from drugs
where generic_name in ('Tirzepatide','Semaglutide','Tenecteplase','Ticagrelor','Apixaban');