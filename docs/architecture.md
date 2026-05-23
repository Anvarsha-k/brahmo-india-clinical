# Architecture — BRAHMO India Clinical AI

## Scalability Design

The core principle is ONE set of tables serves ALL clinical conditions.
Adding a new condition requires ONLY new data rows — zero code changes.

## Database Schema

drugs              — all drugs tagged by condition
indian_guidelines  — all guidelines tagged by condition
drug_interactions  — all DDI pairs including cross-condition
hospital_formulary — Apollo Chennai stock status

## How Scaling Works

To add Respiratory Medicine tomorrow:
1. Research Indian Chest Society guidelines
2. Add drug rows with condition_tags = "respiratory"
3. Add guideline rows with tags = "respiratory"
4. Add interaction rows for respiratory drugs
5. Zero code changes required

Same safety engine, same prompt composer, same API routes serve all conditions.

## Tech Stack

| Layer    | Technology            | Reason                       |
|----------|-----------------------|------------------------------|
| Backend  | Node.js + Express     | Simple, fast API server      |
| Database | Supabase (PostgreSQL) | Free tier, real-time, SQL    |
| AI       | Groq — Llama 3.3 70B  | Free, fast, high quality     |
| Frontend | HTML + CSS + JS       | No framework needed for demo |
-------------------------------------------------------------------

## Safety Engine

Handles cross-condition safety automatically:
- eGFR computation (CKD-EPI 2021 formula)
- DDI checks across ALL medications regardless of condition
- Condition-based contraindications (CKD, Heart Failure)
- Allergy checking
- CHA2DS2-VASc scoring for AF patients

## Prompt Composer

Injects Indian context into every AI call:
- RSSDI guidelines for diabetes
- CSI guidelines for cardiovascular
- Indian drug brands with rupee prices
- NLEM status for affordability
- Apollo Chennai hospital contacts
- Insurance and income awareness

## Why This Beats Generic AI

Generic AI: "Consider empagliflozin or liraglutide"
BRAHMO: "Use Jardiance 10mg (₹520, Boehringer Ingelheim).
         Per RSSDI-A: SGLT2 inhibitors preferred in HF.
         Refer: Sister Lakshmi ext 3345, Dr. Ramachandran ext 4420"