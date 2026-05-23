function computeEGFR(creatinine, age, isFemale) {
  const k = isFemale ? 0.7 : 0.9;
  const a = isFemale ? -0.241 : -0.302;
  const ratio = creatinine / k;
  let egfr = 142 * Math.pow(Math.min(ratio, 1), a) *
    Math.pow(Math.max(ratio, 1), -1.200) *
    Math.pow(0.9938, age);
  if (isFemale) egfr *= 1.012;
  return Math.round(egfr);
}

function getCKDStage(egfr) {
  if (egfr >= 90) return { stage: 'G1', label: 'Normal' };
  if (egfr >= 60) return { stage: 'G2', label: 'Mildly decreased' };
  if (egfr >= 45) return { stage: 'G3a', label: 'Mild-moderate' };
  if (egfr >= 30) return { stage: 'G3b', label: 'Moderate-severe' };
  if (egfr >= 15) return { stage: 'G4', label: 'Severely decreased' };
  return { stage: 'G5', label: 'Kidney failure' };
}

function computeCHA2DS2VASc(patient) {
  let score = 0;
  if (patient.hasHeartFailure) score++;
  if (patient.hasHypertension) score++;
  if (patient.age >= 75) score += 2;
  if (patient.hasDiabetes) score++;
  if (patient.hadStroke) score += 2;
  if (patient.hasVascularDisease) score++;
  if (patient.age >= 65 && patient.age < 75) score++;
  if (patient.isFemale) score++;
  return score;
}

function runSafetyChecks(patient, medications, interactions) {
  const alerts = [];
  const egfr = computeEGFR(patient.creatinine, patient.age, patient.isFemale);
  const ckd = getCKDStage(egfr);
  const hasCKD = egfr < 60;
  const meds = medications || [];

  alerts.push({
    type: 'info',
    message: `Computed eGFR: ${egfr} mL/min — CKD Stage ${ckd.stage} (${ckd.label})`
  });

  // Run DB-driven interaction checks
  if (interactions && interactions.length > 0) {
    interactions.forEach(ix => {
      const drugAPresent = meds.some(m =>
        m.toLowerCase().includes(ix.drug_a.toLowerCase())
      );
      if (!drugAPresent) return;

      // drug_b is either a drug name or a condition
      const conditionTerms = {
        'ckd': hasCKD,
        'heart failure': patient.hasHeartFailure,
        'heart_failure': patient.hasHeartFailure,
      };

      const drugBLower = ix.drug_b.toLowerCase();
      const isCondition = Object.keys(conditionTerms).includes(drugBLower);

      if (isCondition) {
        if (conditionTerms[drugBLower]) {
          alerts.push({
            type: ix.severity === 'high' ? 'danger' : 'warning',
            message: `${ix.severity.toUpperCase()}: ${ix.drug_a} + ${ix.drug_b} — ${ix.effect}. Action: ${ix.management}`
          });
        }
      } else {
        const drugBPresent = meds.some(m =>
          m.toLowerCase().includes(drugBLower)
        );
        if (drugBPresent) {
          alerts.push({
            type: ix.severity === 'high' ? 'danger' : 'warning',
            message: `${ix.severity.toUpperCase()}: ${ix.drug_a} + ${ix.drug_b} — ${ix.effect}. Action: ${ix.management}`
          });
        }
      }
    });
  }

  // Allergy check
  if (patient.allergy && patient.allergy.toLowerCase().includes('sulfonamide')) {
    const suDrugs = meds.filter(m =>
      ['glimepiride', 'gliclazide'].includes(m.toLowerCase())
    );
    if (suDrugs.length > 0) {
      alerts.push({
        type: 'danger',
        message: `ALLERGY ALERT: Sulfonamide allergy — ${suDrugs.join(', ')} may cross-react`
      });
    }
  }

  // Penicillin allergy alert for cardiac patients
  if (patient.allergy && patient.allergy.toLowerCase().includes('penicillin')) {
    alerts.push({
      type: 'warning',
      message: 'Penicillin ANAPHYLAXIS on record — avoid all penicillin antibiotics during admission'
    });
  }

  // AF — CHA2DS2VASc
  if (patient.hasAF) {
    const score = computeCHA2DS2VASc(patient);
    alerts.push({
      type: 'info',
      message: `CHA₂DS₂-VASc Score: ${score} — ${score >= 2 ? 'Anticoagulation RECOMMENDED' : score === 1 ? 'Consider anticoagulation' : 'Low risk, monitor'}`
    });
  }

  return { egfr, ckd, alerts };
}

module.exports = { computeEGFR, getCKDStage, computeCHA2DS2VASc, runSafetyChecks };