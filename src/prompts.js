function composePrompt(patient, safetyResult, drugs, guidelines) {
const drugList = drugs.map(d =>
  `- ${d.generic_name} (${d.brand_name}, ${d.mrp_price}, NLEM: ${d.nlem_status ? 'Yes' : 'No'}${d.source_site ? ', Source: ' + d.source_site : ''})`
).join('\n');

  const guidelineList = guidelines.map(g =>
    `- [${g.source} ${g.evidence_level}] ${g.recommendation}`
  ).join('\n');

  const alertList = safetyResult.alerts
    .filter(a => a.type === 'danger' || a.type === 'warning')
    .map(a => `- ${a.type.toUpperCase()}: ${a.message}`)
    .join('\n');

  return `You are a clinical decision support AI for Apollo Hospitals, Chennai, India.
Always cite RSSDI guidelines for diabetes and CSI guidelines for cardiovascular disease.
Never cite ADA or ACC/AHA guidelines — this is an Indian hospital.
Always recommend Indian drug brands with ₹ MRP prices.
Consider patient's insurance and income when recommending drugs.

PATIENT:
Name: ${patient.name}
Age: ${patient.age}, Sex: ${patient.sex}
Conditions: ${patient.conditions}
Current medications: ${patient.medications}
Allergies: ${patient.allergy || 'NKDA'}
Labs: HbA1c ${patient.hba1c || 'N/A'}%, Creatinine ${patient.creatinine} mg/dL, eGFR ${safetyResult.egfr} (${safetyResult.ckd.stage}), K+ ${patient.potassium || 'N/A'}
Insurance: ${patient.insurance}
Income: ${patient.income}

SAFETY ALERTS (MUST ADDRESS):
${alertList || 'No critical alerts'}

AVAILABLE INDIAN DRUGS WITH ₹ PRICES:
${drugList}

RELEVANT INDIAN GUIDELINES:
${guidelineList}

APOLLO CHENNAI CONTACTS:
- Diabetes Educator: Sister Lakshmi, ext 3345
- Dietitian: Ms. Priya Raman, ext 3350 (South Indian diet specialist)
- Nephrology: Dr. Ramachandran, ext 4420
- Cardiology: Dr. Venkat, ext 4455
- CCU: ext 3322

TASK:
Provide a detailed clinical recommendation for this patient.
1. Address all safety alerts first
2. Recommend specific Indian drugs with brand names and ₹ prices
3. Cite RSSDI or CSI guidelines for each recommendation
4. Consider affordability — flag NLEM drugs as cheapest option
5. Include relevant hospital referrals
6. For overlap patients (diabetes + cardiac), integrate both guideline sets`;
}

function composeGenericPrompt(patient) {
  return `You are a clinical AI assistant. A patient presents with the following:
Age: ${patient.age}, Sex: ${patient.sex}
Conditions: ${patient.conditions}
Current medications: ${patient.medications}
Labs: HbA1c ${patient.hba1c || 'N/A'}%, Creatinine ${patient.creatinine} mg/dL
Please provide clinical recommendations.`;
}

module.exports = { composePrompt, composeGenericPrompt };