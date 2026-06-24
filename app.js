// ===================================================================
// LUCAS SANCHEZ — Fuerza de Base · Meso 2
// ===================================================================

// Entrada en calor (igual para todos los días)
// plancha a 1 pie 15" x lado
// lumbars con nado 8 x4
// Vitalizaciones cruzadas x6

const WEEKS = [
  {
    label: "Semana 1 — Acumulación",
    desc:  "Carga progresiva inicial. Foco en técnica y establecer pesos de trabajo.",
    days: [
      { circuit: "3 VUELTAS" },
      { circuit: "4 VUELTAS" },
      { circuit: "3 VUELTAS" },
    ]
  },
  {
    label: "Semana 2 — Intensificación",
    desc:  "Aumentamos volumen del circuito. Mantener calidad técnica en superseries.",
    days: [
      { circuit: "4 VUELTAS" },
      { circuit: "5 VUELTAS" },
      { circuit: "4 VUELTAS" },
    ]
  },
  {
    label: "Semana 3 — Choque 🔥",
    desc:  "Semana de choque. Máxima exigencia. Respetar la técnica ante todo.",
    days: [
      { circuit: "5 VUELTAS" },
      { circuit: "6 VUELTAS" },
      { circuit: "5 VUELTAS" },
    ]
  },
  {
    label: "Semana 4 — Descarga ↓",
    desc:  "Semana de descarga. Reducir intensidad, consolidar adaptaciones.",
    days: [
      { circuit: "3 VUELTAS" },
      { circuit: "4 VUELTAS" },
      { circuit: "3 VUELTAS" },
    ]
  }
];

// Todos los días tienen los mismos ejercicios (mismo esquema de series)
const BLOCKS = [
  {
    icon: "🦵", title: "Piernas",
    exercises: [
      { name: "Subidas al cajón // Prensa",               tag: "Superserie", accent: "legs", key: "cajon_prensa",   sets: "5×6+6 // 5×10" },
      { name: "Sentadilla sumo suelo // Patada isquio polea", tag: "Superserie", accent: "legs", key: "sumo_isquio",    sets: "5×6 // 5×8+8"  },
    ]
  },
  {
    icon: "💪", title: "Empuje",
    exercises: [
      { name: "Pecho convergente // Landmine bimanual",   tag: "Superserie", accent: "push", key: "pecho_land",    sets: "5×6 // 5×8"    },
      { name: "Pecho mancuerna inclinado // Arnold",       tag: "Superserie", accent: "push", key: "pecho_arnold",  sets: "4×10"           },
    ]
  },
  {
    icon: "🔙", title: "Tracción",
    exercises: [
      { name: "Remo sentado // Remo T",                   tag: "Superserie", accent: "pull", key: "remo",          sets: "5×8 // 5×6"    },
    ]
  }
];

const CIRCUIT_ITEMS = [
  { num: "01", name: "Bíceps + Press // Pull + Press", detail: "x8 repeticiones" },
  { num: "02", name: "Bisagras alternas",               detail: "x8+8 repeticiones" },
  { num: "03", name: "Tríceps sobre cabeza",            detail: "x8 repeticiones" },
  { num: "04", name: "Vuelos frontales // Vuelos laterales", detail: "x8 repeticiones" },
];

// ===== STATE =====
let currentWeek = 0;
let currentDay  = 0;

// ===== HELPERS =====
function storageKey(key) {
  return `lucas_m2_w${currentWeek}_d${currentDay}_${key}`;
}
function notesStorageKey() {
  return `lucas_m2_notes_w${currentWeek}_d${currentDay}`;
}

// ===== RENDER =====
function render() {
  const week = WEEKS[currentWeek];
  const day  = week.days[currentDay];

  document.getElementById('week-title').textContent = week.label;
  document.getElementById('week-desc').textContent  = week.desc;
  document.getElementById('day-type-badge').textContent = "🏋️ Piernas · Pecho · Dorsal — Todos los días";

  const main = document.getElementById('main-content');
  main.innerHTML = '';

  // --- Exercise blocks ---
  BLOCKS.forEach(block => {
    const section = document.createElement('section');
    section.className = 'block';

    section.innerHTML = `
      <div class="block-header">
        <span class="block-icon">${block.icon}</span>
        <span class="block-title">${block.title}</span>
      </div>
      <div class="ex-grid">
        ${block.exercises.map(ex => `
          <div class="ex-card ${ex.accent ? 'accent-' + ex.accent : ''}">
            <div class="ex-top">
              <div class="ex-name">${ex.name}</div>
              <div class="ex-tag">${ex.tag}</div>
            </div>
            <div class="ex-sets">${ex.sets}</div>
            <div class="ex-bottom">
              <label class="weight-label">Peso (kg)</label>
              <input type="number" class="weight-input" placeholder="—"
                     data-key="${ex.key}" min="0" step="2.5" />
            </div>
          </div>`).join('')}
      </div>`;

    main.appendChild(section);
  });

  // --- Circuit block ---
  const circuitSection = document.createElement('section');
  circuitSection.className = 'block circuit-block';
  circuitSection.innerHTML = `
    <div class="block-header">
      <span class="block-icon">🔁</span>
      <span class="block-title">Circuito Final</span>
      <span class="vueltas-badge">${day.circuit}</span>
    </div>
    <div class="circuit-grid">
      ${CIRCUIT_ITEMS.map(item => `
        <div class="circuit-item">
          <span class="c-num">${item.num}</span>
          <div>
            <div class="c-name">${item.name}</div>
            <div class="c-detail">${item.detail}</div>
          </div>
        </div>`).join('')}
    </div>`;
  main.appendChild(circuitSection);

  // --- Notes section ---
  const notesSection = document.createElement('section');
  notesSection.className = 'notes-section';
  notesSection.innerHTML = `
    <div class="section-label">📝 Notas del día</div>
    <textarea class="notes-input" id="notes-input"
      placeholder="Anotá sensaciones, pesos usados, observaciones..."></textarea>
    <div class="notes-footer">
      <button class="save-btn" id="save-btn">Guardar notas</button>
      <span class="save-msg" id="save-msg"></span>
    </div>`;
  main.appendChild(notesSection);

  // Bind weights
  main.querySelectorAll('.weight-input').forEach(input => {
    const saved = localStorage.getItem(storageKey(input.dataset.key));
    if (saved) input.value = saved;
    input.addEventListener('change', () => {
      if (input.value) localStorage.setItem(storageKey(input.dataset.key), input.value);
      else localStorage.removeItem(storageKey(input.dataset.key));
    });
  });

  // Bind notes
  const notesInput = document.getElementById('notes-input');
  notesInput.value = localStorage.getItem(notesStorageKey()) || '';
  document.getElementById('save-btn').addEventListener('click', () => {
    const val = notesInput.value.trim();
    if (val) localStorage.setItem(notesStorageKey(), val);
    else localStorage.removeItem(notesStorageKey());
    const msg = document.getElementById('save-msg');
    msg.textContent = '✓ Guardado';
    setTimeout(() => { msg.textContent = ''; }, 2000);
  });
}

// ===== TABS =====
document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    currentWeek = parseInt(btn.dataset.week);
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    render();
  });
});

document.querySelectorAll('.day-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    currentDay = parseInt(btn.dataset.day);
    document.querySelectorAll('.day-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    render();
  });
});

// ===== INIT =====
render();
