const express = require('express');
const router = express.Router();

const patients = [
  {
    id: 1, name: 'Patient 1 — Failing Metformin',
    age: 48, sex: 'Male', isFemale: false,
    conditions: 'Type 2 Diabetes (3yr), Hypertension (1yr)',
    medications: ['Metformin', 'Telmisartan'],
    allergy: 'Sulfonamide (rash)',
    creatinine: 0.9, hba1c: 8.4, potassium: null,
    hasHeartFailure: false, hasHypertension: true,
    hasDiabetes: true, hasAF: false,
    insurance: 'Star Health Gold — ₹5K/month cap on meds',
    income: 'Middle-class salaried',
    scenario: 'diabetes'
  },
  {
    id: 2, name: 'Patient 2 — Complex with CKD',
    age: 62, sex: 'Female', isFemale: true,
    conditions: 'Type 2 Diabetes (12yr), CKD 3b, Hypertension, Retinopathy, Neuropathy',
    medications: ['Metformin', 'Glimepiride', 'Atorvastatin', 'Telmisartan', 'Aspirin', 'Pregabalin'],
    allergy: 'NKDA',
    creatinine: 1.8, hba1c: 9.2, potassium: 4.9,
    hasHeartFailure: false, hasHypertension: true,
    hasDiabetes: true, hasAF: false,
    insurance: 'New India Assurance — ₹3L cap, mostly exhausted',
    income: 'Limited — insurance exhausted',
    scenario: 'diabetes'
  },
  {
    id: 3, name: 'Patient 3 — Auto-Driver',
    age: 34, sex: 'Male', isFemale: false,
    conditions: 'Type 2 Diabetes (2 months, newly diagnosed), Obesity, NAFLD',
    medications: ['Metformin'],
    allergy: 'NKDA',
    creatinine: 0.8, hba1c: 8.8, potassium: null,
    hasHeartFailure: false, hasHypertension: false,
    hasDiabetes: true, hasAF: false,
    insurance: 'NONE',
    income: 'Daily wage ₹800-1000 — auto-rickshaw driver',
    scenario: 'diabetes'
  },
  {
    id: 4, name: 'Patient 4 — Acute STEMI',
    age: 52, sex: 'Male', isFemale: false,
    conditions: 'Acute STEMI (anterior, V1-V4), smoker 20 pack-years',
    medications: [],
    allergy: 'Penicillin (ANAPHYLAXIS)',
    creatinine: 1.0, hba1c: null, potassium: 4.2,
    hasHeartFailure: false, hasHypertension: false,
    hasDiabetes: false, hasAF: false,
    hasVascularDisease: true,
    insurance: 'ESI — covers emergency',
    income: 'ESI covered',
    scenario: 'cardiovascular'
  },
  {
    id: 5, name: 'Patient 5 — Post-MI + New AF',
    age: 66, sex: 'Male', isFemale: false,
    conditions: 'Anterior MI (3mo ago, DES to LAD), Type 2 Diabetes, Hypertension, Newly detected AF',
    medications: ['Aspirin', 'Ticagrelor', 'Atorvastatin', 'Ramipril', 'Metoprolol', 'Metformin'],
    allergy: 'NKDA',
    creatinine: 1.1, hba1c: 7.4, potassium: 4.4,
    hasHeartFailure: false, hasHypertension: true,
    hasDiabetes: true, hasAF: true,
    hasVascularDisease: true,
    insurance: 'CGHS — covers most drugs',
    income: 'Government employee — CGHS',
    scenario: 'cardiovascular'
  },
  {
    id: 6, name: 'Patient 6 — Diabetes + Heart Failure',
    age: 58, sex: 'Female', isFemale: true,
    conditions: 'Type 2 Diabetes (8yr), Heart Failure (EF 30%), Hypertension, CKD 3a',
    medications: ['Metformin', 'Glimepiride', 'Ramipril', 'Carvedilol', 'Furosemide', 'Spironolactone', 'Atorvastatin'],
    allergy: 'NKDA',
    creatinine: 1.4, hba1c: 8.6, potassium: 5.1,
    hasHeartFailure: true, hasHypertension: true,
    hasDiabetes: true, hasAF: false,
    insurance: 'Star Health — ₹5K/month cap',
    income: 'Middle income',
    scenario: 'overlap'
  }
];

router.get('/', (req, res) => res.json(patients));
router.get('/:id', (req, res) => {
  const p = patients.find(p => p.id === parseInt(req.params.id));
  if (!p) return res.status(404).json({ error: 'Patient not found' });
  res.json(p);
});

module.exports = { router, patients };