const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');
const supabase = require('../db');
const { runSafetyChecks } = require('../safety');
const { composePrompt, composeGenericPrompt } = require('../prompts');
const { patients } = require('./patients');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function askGroq(prompt) {
    const result = await groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'llama-3.3-70b-versatile',
        max_tokens: 1000
    });
    return result.choices[0].message.content;
}

router.post('/ask', async (req, res) => {
    const { patientId } = req.body;
    const patient = patients.find(p => p.id === patientId);
    if (!patient) return res.status(404).json({ error: 'Patient not found' });

    try {
        const { data: interactions } = await supabase
            .from('drug_interactions').select('*');

        const safetyResult = runSafetyChecks(patient, patient.medications, interactions);

        const conditionFilter = patient.scenario === 'overlap'
            ? ['diabetes', 'heart_failure', 'cardiovascular']
            : patient.scenario === 'diabetes'
                ? ['diabetes', 'heart_failure']
                : ['cardiovascular', 'stemi', 'acs', 'af'];

        const { data: drugs } = await supabase.from('drugs').select('*')
            .or(conditionFilter.map(t => `condition_tags.ilike.%${t}%`).join(','));

        const { data: guidelines } = await supabase.from('indian_guidelines').select('*');

        const indianPrompt = composePrompt(patient, safetyResult, drugs || [], guidelines || []);
        const genericPrompt = composeGenericPrompt(patient);

        const [indianResponse, genericResponse] = await Promise.all([
            askGroq(indianPrompt),
            askGroq(genericPrompt)
        ]);

        res.json({
            patient,
            safetyAlerts: safetyResult.alerts,
            egfr: safetyResult.egfr,
            ckdStage: safetyResult.ckd,
            indianResponse,
            genericResponse,
            drugsUsed: drugs?.length || 0,
            guidelinesUsed: guidelines?.length || 0
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;