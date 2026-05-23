let selectedPatient = null;
let patients = [];

async function loadPatients() {
  const res = await fetch('/api/patients');
  patients = await res.json();
  renderPatients();
}

function renderPatients() {
  const grid = document.getElementById('patientList');
  grid.innerHTML = patients.map(p => `
    <div class="patient-card" onclick="selectPatient(${p.id})" id="pc-${p.id}">
      <div class="patient-card-top">
        <div class="patient-avatar avatar-${p.scenario}">
          ${p.age}
        </div>
        <span class="patient-name">${p.name.split('—')[1]?.trim() || p.name}</span>
        <span class="badge badge-${p.scenario}">${p.scenario}</span>
      </div>
      <div class="patient-meta">${p.conditions.split(',')[0].trim()}</div>
    </div>
  `).join('');
}

function selectPatient(id) {
  selectedPatient = id;
  document.querySelectorAll('.patient-card').forEach(c => c.classList.remove('active'));
  document.getElementById('pc-' + id).classList.add('active');

  const p = patients.find(p => p.id === id);
  document.getElementById('selectedInfo').innerHTML =
    `<strong>${p.name}</strong> — ${p.age}yr ${p.sex} · ${p.conditions.split(',')[0].trim()}`;

  const btn = document.getElementById('askBtn');
  btn.disabled = false;
  btn.textContent = 'Get Clinical Recommendation →';

  document.getElementById('emptyState').style.display = 'none';
  document.getElementById('resultsArea').style.display = 'none';
}

async function askAI() {
  if (!selectedPatient) return;

  const btn = document.getElementById('askBtn');
  btn.disabled = true;
  btn.textContent = 'Analysing...';

  document.getElementById('emptyState').style.display = 'none';
  document.getElementById('resultsArea').style.display = 'flex';
  document.getElementById('resultsArea').innerHTML = `
    <div class="loading-indicator">
      <div class="spinner"></div>
      Running safety checks and fetching Indian guidelines...
    </div>
  `;

  try {
    const res = await fetch('/api/ai/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patientId: selectedPatient })
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error);

    const alertsHtml = data.safetyAlerts.map(a => `
      <div class="alert-item alert-${a.type}">
        <div class="alert-dot dot-${a.type}"></div>
        <span>${a.message}</span>
      </div>
    `).join('');

    document.getElementById('resultsArea').innerHTML = `
      <div class="alerts-panel">
        <div class="panel-header">
          <span class="panel-title">⚠ Safety Alerts</span>
          <div class="stats-row">
            <span class="stat-pill">eGFR ${data.egfr} · ${data.ckdStage.stage}</span>
            <span class="stat-pill">${data.drugsUsed} drugs</span>
            <span class="stat-pill">${data.guidelinesUsed} guidelines</span>
            <span class="stat-pill">Prices: 1mg.com</span>
          </div>
        </div>
        <div class="alerts-list">${alertsHtml || '<div class="alert-item alert-info"><div class="alert-dot dot-info"></div><span>No critical safety alerts</span></div>'}</div>
      </div>

      <div class="comparison">
        <div class="response-panel">
          <div class="response-header">
            <div class="response-indicator"></div>
            <span class="response-label">Generic AI Response</span>
          </div>
          <div class="response-body">${formatResponse(data.genericResponse)}</div>
        </div>
        <div class="response-panel india-panel">
          <div class="response-header">
            <div class="response-indicator india-indicator"></div>
            <span class="response-label india-label">🇮🇳 BRAHMO India Response</span>
          </div>
          <div class="response-body">${formatResponse(data.indianResponse)}</div>
        </div>
      </div>
    `;

  } catch (err) {
    document.getElementById('resultsArea').innerHTML = `
      <div class="alerts-panel">
        <div class="alerts-list">
          <div class="alert-item alert-danger">
            <div class="alert-dot dot-danger"></div>
            <span>Error: ${err.message}</span>
          </div>
        </div>
      </div>
    `;
  }

  btn.disabled = false;
  btn.textContent = 'Get Clinical Recommendation →';
}

function formatResponse(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}

loadPatients();