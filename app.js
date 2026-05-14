// ===================================================================
// ESTRUCTURA DE DÍAS
//  Día 1 & 3: Cuadricera · Pecho plano · Aperturas · Dorsal ancho
//  Día 2:      Prensa · Isquios · Empuje hombros · Vuelos · Remo
// ===================================================================

const WEEKS = [
  {
    label: "Semana 1 — Acumulación",
    desc:  "Carga progresiva inicial. Foco en técnica y establecer pesos de trabajo.",
    days: [
      { type: "A", pushSets: "4×6 + 1×6", pullSets: "4×6 + 1×6", circuit: "3 VUELTAS" },
      { type: "B", pushSets: "3×6 + 2×6", pullSets: "3×6 + 2×6", circuit: "4 VUELTAS" },
      { type: "A", pushSets: "4×6 + 2×6", pullSets: "4×6 + 2×6", circuit: "3 VUELTAS" },
    ]
  },
  {
    label: "Semana 2 — Intensificación",
    desc:  "Aumentamos volumen del circuito. Mantener calidad técnica en superseries.",
    days: [
      { type: "A", pushSets: "3×6 + 2×6", pullSets: "3×6 + 2×6", circuit: "4 VUELTAS" },
      { type: "B", pushSets: "4×6 + 1×6", pullSets: "4×6 + 1×6", circuit: "5 VUELTAS" },
      { type: "A", pushSets: "3×6 + 2×6", pullSets: "3×6 + 2×6", circuit: "4 VUELTAS" },
    ]
  },
  {
    label: "Semana 3 — Choque 🔥",
    desc:  "Semana de choque. Máxima exigencia. Respetar la técnica ante todo.",
    days: [
      { type: "A", pushSets: "2×6 + 3×6", pullSets: "2×6 + 3×6", circuit: "5 VUELTAS" },
      { type: "B", pushSets: "3×6 + 2×6", pullSets: "3×6 + 2×6", circuit: "6 VUELTAS" },
      { type: "A", pushSets: "2×6 + 3×6", pullSets: "2×6 + 3×6", circuit: "5 VUELTAS" },
    ]
  },
  {
    label: "Semana 4 — Descarga ↓",
    desc:  "Semana de descarga. Reducir intensidad, consolidar adaptaciones.",
    days: [
      { type: "A", pushSets: "4×6 + 1×6", pullSets: "4×6 + 1×6", circuit: "3 VUELTAS" },
      { type: "B", pushSets: "3×6 + 2×6", pullSets: "3×6 + 2×6", circuit: "4 VUELTAS" },
      { type: "A", pushSets: "4×6 + 2×6", pullSets: "4×6 + 2×6", circuit: "3 VUELTAS" },
    ]
  }
];

// Ejercicios por tipo de día
const DAY_TYPES = {
  A: {
    badge: "🦵💪 Cuádriceps · Pecho · Dorsal",
    blocks: [
      {
        icon: "🦵", title: "Piernas",
        exercises: [
          { name: "Cuadricera", tag: "Principal", accent: "legs", key: "cuad", sets: "5×6" },
        ]
      },
      {
        icon: "💪", title: "Empuje",
        exercises: [
          { name: "Pecho plano", tag: "Principal", accent: "push", key: "pecho", setsKey: "pushSets" },
          { name: "Aperturas inclinado", tag: "Complementario", accent: "", key: "aper", sets: "—" },
        ]
      },
      {
        icon: "🔙", title: "Tracción",
        exercises: [
          { name: "Dorsal ancho", tag: "Principal", accent: "pull", key: "dorsal", setsKey: "pullSets" },
        ]
      }
    ]
  },
  B: {
    badge: "🏋️ Prensa · Hombros · Remo · Isquios",
    blocks: [
      {
        icon: "🦵", title: "Piernas",
        exercises: [
          { name: "Prensa", tag: "Principal", accent: "legs", key: "prensa", sets: "5×10" },
          { name: "Isquios máquina", tag: "Principal", accent: "", key: "isquios", sets: "5×8" },
        ]
      },
      {
        icon: "💪", title: "Empuje",
        exercises: [
          { name: "Empuje hombros máquina", tag: "Principal", accent: "push", key: "hombros", setsKey: "pushSets" },
          { name: "Vuelos frontoabd", tag: "Complementario", accent: "", key: "vuelos", sets: "—" },
        ]
      },
      {
        icon: "🔙", title: "Tracción",
        exercises: [
          { name: "Remo máquina", tag: "Principal", accent: "pull", key: "remo", setsKey: "pullSets" },
        ]
      }
    ]
  }
};

// ===== STATE =====
let currentWeek = 0;
let currentDay  = 0;

// ===== HELPERS =====
function storageKey(key) {
  return `lucas_w${currentWeek}_d${currentDay}_${key}`;
}
function notesStorageKey() {
  return `lucas_notes_w${currentWeek}_d${currentDay}`;
}

// ===== RENDER =====
function render() {
  const week    = WEEKS[currentWeek];
  const day     = week.days[currentDay];
  const dayType = DAY_TYPES[day.type];

  // Week bar
  document.getElementById('week-title').textContent = week.label;
  document.getElementById('week-desc').textContent  = week.desc;

  // Day badge
  document.getElementById('day-type-badge').textContent = dayType.badge;

  // Build main content
  const main = document.getElementById('main-content');
  main.innerHTML = '';

  // --- Exercise blocks ---
  dayType.blocks.forEach(block => {
    const section = document.createElement('section');
    section.className = 'block';

    section.innerHTML = `
      <div class="block-header">
        <span class="block-icon">${block.icon}</span>
        <span class="block-title">${block.title}</span>
      </div>
      <div class="ex-grid">
        ${block.exercises.map(ex => {
          const sets = ex.setsKey ? day[ex.setsKey] : ex.sets;
          return `
          <div class="ex-card ${ex.accent ? 'accent-' + ex.accent : ''}">
            <div class="ex-top">
              <div class="ex-name">${ex.name}</div>
              <div class="ex-tag">${ex.tag}</div>
            </div>
            <div class="ex-sets">${sets}</div>
            <div class="ex-bottom">
              <label class="weight-label">Peso (kg)</label>
              <input type="number" class="weight-input" placeholder="—"
                     data-key="${ex.key}" min="0" step="2.5" />
            </div>
          </div>`;
        }).join('')}
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
      <div class="circuit-item">
        <span class="c-num">01</span>
        <div>
          <div class="c-name">Bíceps polea // Tríceps polea</div>
          <div class="c-detail">x10 repeticiones</div>
        </div>
      </div>
      <div class="circuit-item">
        <span class="c-num">02</span>
        <div>
          <div class="c-name">Posición del Guerrero</div>
          <div class="c-detail">20" + 20"</div>
        </div>
      </div>
      <div class="circuit-item">
        <span class="c-num">03</span>
        <div>
          <div class="c-name">Bicho muerto</div>
          <div class="c-detail">x10 repeticiones</div>
        </div>
      </div>
      <div class="circuit-item">
        <span class="c-num">04</span>
        <div>
          <div class="c-name">Plancha lateral</div>
          <div class="c-detail">15" + 15"</div>
        </div>
      </div>
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
