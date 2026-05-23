# BRAHMO — India Clinical AI
## Option C: Diabetes + Cardiovascular — Apollo Hospitals Chennai

### What it does
Transforms generic AI into an India-specific clinical decision support system.
Cites RSSDI (diabetes) and CSI (cardiovascular) guidelines.
Recommends Indian drug brands with verified ₹ MRP prices.
Runs safety checks: eGFR, DDI, heart failure flags, allergy alerts.

### Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and fill in your keys
4. Run schema in Supabase SQL Editor: `supabase/schema.sql`
5. Run seed data: `supabase/seed.sql`
6. Start server: `node server.js`
7. Open: `http://localhost:3000`

### Tech Stack
- Backend: Node.js + Express
- Database: Supabase (PostgreSQL)
- AI: Groq — Llama 3.3 70B
- Frontend: HTML + CSS + JavaScript

### Architecture
One set of tables serves both diabetes AND cardiovascular conditions.
Adding a third condition = new data rows only, zero code changes.
See docs/architecture.md for full explanation.

### Data Sources
All Indian drug prices verified against 1mg.com.
Guidelines from RSSDI 2023 and CSI.
See docs/data_sources.md for complete source list.

### Demo Patients
6 patients covering diabetes, cardiovascular, and overlap scenarios.
Patient 6 (overlap) is the key demo — pulls from both guideline sets simultaneously.