/* =====================================================
   BelvezetLab — Coming Soon Popup
   À inclure dans toutes tes pages HTML :
   <link rel="stylesheet" href="belvezet-popup.css">
   <script src="belvezet-popup.js" defer></script>
   ===================================================== */

const SUPABASE_URL = 'https://lhzxruclixviwsydybjw.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_wjCTaFSXtyijD6DXGGk2-w_EtmEoVjZ';

// ── Inject CSS ──────────────────────────────────────
const style = document.createElement('style');
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

  :root {
    --cream: #f5f0e8;
    --bark: #3d2e1e;
    --moss: #4a5e3a;
    --moss-light: #6b8a52;
    --soil: #7a5c3a;
    --mist: rgba(245,240,232,0.92);
    --sage: #c8d4b8;
  }

  #blv-overlay {
    position: fixed;
    inset: 0;
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(30, 22, 12, 0.75);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    animation: blvFadeIn 0.8s ease both;
  }

  @keyframes blvFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  /* Block all interactions on page behind */
  #blv-overlay ~ * { pointer-events: none; user-select: none; }

  #blv-card {
    position: relative;
    width: min(480px, 92vw);
    background: var(--cream);
    border-radius: 2px;
    padding: 52px 48px 44px;
    text-align: center;
    overflow: hidden;
    box-shadow:
      0 0 0 1px rgba(74,94,58,0.15),
      0 32px 80px rgba(20,14,6,0.45);
    animation: blvRise 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s both;
  }

  @keyframes blvRise {
    from { opacity: 0; transform: translateY(24px) scale(0.97); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* Organic texture overlay */
  #blv-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    opacity: 0.6;
  }

  /* Decorative botanical border lines */
  #blv-card::after {
    content: '';
    position: absolute;
    inset: 10px;
    border: 1px solid rgba(74,94,58,0.18);
    border-radius: 1px;
    pointer-events: none;
  }

  /* Corner botanical marks */
  .blv-corner {
    position: absolute;
    width: 28px;
    height: 28px;
    opacity: 0.35;
  }
  .blv-corner.tl { top: 18px; left: 18px; }
  .blv-corner.tr { top: 18px; right: 18px; transform: scaleX(-1); }
  .blv-corner.bl { bottom: 18px; left: 18px; transform: scaleY(-1); }
  .blv-corner.br { bottom: 18px; right: 18px; transform: scale(-1); }

  .blv-emblem {
    width: 64px;
    height: 64px;
    margin: 0 auto 20px;
    position: relative;
  }

  .blv-emblem svg {
    width: 100%;
    height: 100%;
  }

  #blv-label {
    font-family: 'Jost', sans-serif;
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--moss);
    margin-bottom: 10px;
  }

  #blv-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 38px;
    font-weight: 300;
    color: var(--bark);
    line-height: 1.1;
    margin-bottom: 6px;
    letter-spacing: 0.02em;
  }

  #blv-title em {
    font-style: italic;
    color: var(--moss);
  }

  #blv-subtitle {
    font-family: 'Cormorant Garamond', serif;
    font-size: 14px;
    font-weight: 300;
    font-style: italic;
    color: var(--soil);
    margin-bottom: 28px;
    line-height: 1.6;
  }

  .blv-divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
  }
  .blv-divider::before,
  .blv-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(74,94,58,0.3), transparent);
  }
  .blv-divider span {
    font-size: 16px;
    opacity: 0.5;
  }

  #blv-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
    z-index: 1;
  }

  #blv-email {
    width: 100%;
    padding: 13px 18px;
    background: rgba(255,255,255,0.7);
    border: 1px solid rgba(74,94,58,0.25);
    border-radius: 1px;
    font-family: 'Jost', sans-serif;
    font-size: 13px;
    font-weight: 300;
    color: var(--bark);
    outline: none;
    transition: border-color 0.2s, background 0.2s;
    letter-spacing: 0.03em;
  }

  #blv-email::placeholder { color: rgba(61,46,30,0.4); }

  #blv-email:focus {
    border-color: var(--moss-light);
    background: rgba(255,255,255,0.95);
  }

  #blv-btn {
    width: 100%;
    padding: 13px 18px;
    background: var(--moss);
    border: none;
    border-radius: 1px;
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--cream);
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
  }

  #blv-btn:hover { background: var(--moss-light); transform: translateY(-1px); }
  #blv-btn:active { transform: translateY(0); }
  #blv-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

  #blv-msg {
    font-family: 'Cormorant Garamond', serif;
    font-size: 14px;
    font-style: italic;
    min-height: 20px;
    color: var(--moss);
    transition: opacity 0.3s;
  }
  #blv-msg.error { color: #8b3a2a; }

  #blv-note {
    margin-top: 16px;
    font-family: 'Jost', sans-serif;
    font-size: 9px;
    font-weight: 300;
    letter-spacing: 0.08em;
    color: rgba(61,46,30,0.35);
    position: relative;
    z-index: 1;
  }
`;
document.head.appendChild(style);

// ── Build HTML ──────────────────────────────────────
const overlay = document.createElement('div');
overlay.id = 'blv-overlay';
overlay.setAttribute('role', 'dialog');
overlay.setAttribute('aria-modal', 'true');
overlay.setAttribute('aria-label', 'BelvezetLab — Bientôt');

overlay.innerHTML = `
  <div id="blv-card">

    <!-- Corner marks -->
    <svg class="blv-corner tl" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 26 C2 14 14 2 26 2" stroke="#4a5e3a" stroke-width="1" fill="none"/>
      <circle cx="4" cy="24" r="1.5" fill="#4a5e3a"/>
      <circle cx="24" cy="4" r="1.5" fill="#4a5e3a"/>
    </svg>
    <svg class="blv-corner tr" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 26 C2 14 14 2 26 2" stroke="#4a5e3a" stroke-width="1" fill="none"/>
      <circle cx="4" cy="24" r="1.5" fill="#4a5e3a"/>
      <circle cx="24" cy="4" r="1.5" fill="#4a5e3a"/>
    </svg>
    <svg class="blv-corner bl" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 26 C2 14 14 2 26 2" stroke="#4a5e3a" stroke-width="1" fill="none"/>
      <circle cx="4" cy="24" r="1.5" fill="#4a5e3a"/>
      <circle cx="24" cy="4" r="1.5" fill="#4a5e3a"/>
    </svg>
    <svg class="blv-corner br" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 26 C2 14 14 2 26 2" stroke="#4a5e3a" stroke-width="1" fill="none"/>
      <circle cx="4" cy="24" r="1.5" fill="#4a5e3a"/>
      <circle cx="24" cy="4" r="1.5" fill="#4a5e3a"/>
    </svg>

    <!-- Emblem -->
    <div class="blv-emblem">
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Stem -->
        <line x1="32" y1="56" x2="32" y2="20" stroke="#4a5e3a" stroke-width="1.2"/>
        <!-- Leaves -->
        <path d="M32 38 Q20 32 18 20 Q28 24 32 38Z" fill="#4a5e3a" opacity="0.7"/>
        <path d="M32 38 Q44 32 46 20 Q36 24 32 38Z" fill="#6b8a52" opacity="0.6"/>
        <path d="M32 28 Q22 22 22 12 Q30 16 32 28Z" fill="#4a5e3a" opacity="0.5"/>
        <path d="M32 28 Q42 22 42 12 Q34 16 32 28Z" fill="#6b8a52" opacity="0.45"/>
        <!-- Root hint -->
        <path d="M32 56 Q26 58 22 62" stroke="#7a5c3a" stroke-width="1" opacity="0.4"/>
        <path d="M32 56 Q38 58 42 62" stroke="#7a5c3a" stroke-width="1" opacity="0.4"/>
        <!-- Circle -->
        <circle cx="32" cy="32" r="30" stroke="#4a5e3a" stroke-width="0.5" opacity="0.2"/>
      </svg>
    </div>

    <div id="blv-label">Quelque chose pousse ici</div>
    <h1 id="blv-title">Belvezet<em>Lab</em></h1>
    <p id="blv-subtitle">Un lieu en train de naître.<br>La page arrive bientôt.</p>

    <div class="blv-divider"><span>🌿</span></div>

    <div id="blv-form">
      <input
        type="email"
        id="blv-email"
        placeholder="votre@email.com"
        autocomplete="email"
        required
      />
      <button id="blv-btn" type="button">Me prévenir du lancement</button>
      <div id="blv-msg"></div>
    </div>

    <p id="blv-note">Aucun spam · Juste un signe de vie quand le lab ouvre ses portes</p>
  </div>
`;

document.body.appendChild(overlay);

// ── Block scroll behind ─────────────────────────────
document.body.style.overflow = 'hidden';

// ── Block all links & buttons on page ──────────────
function blockPage() {
  document.querySelectorAll('a, button:not(#blv-btn), input:not(#blv-email)').forEach(el => {
    if (!overlay.contains(el)) {
      el.addEventListener('click', preventNav, true);
      el.style.pointerEvents = 'none';
    }
  });
}

function preventNav(e) {
  e.preventDefault();
  e.stopPropagation();
}

blockPage();

// ── Close ───────────────────────────────────────────
function closePopup() {
  overlay.style.animation = 'blvFadeIn 0.3s ease reverse both';
  setTimeout(() => {
    overlay.remove();
    document.body.style.overflow = '';
    document.querySelectorAll('a, button, input').forEach(el => {
      el.removeEventListener('click', preventNav, true);
      el.style.pointerEvents = '';
    });
  }, 280);
}

// Close on overlay click (outside card)
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closePopup();
});

// ── Submit ──────────────────────────────────────────
document.getElementById('blv-btn').addEventListener('click', async () => {
  const emailInput = document.getElementById('blv-email');
  const msg = document.getElementById('blv-msg');
  const btn = document.getElementById('blv-btn');
  const email = emailInput.value.trim();

  msg.className = '';
  msg.textContent = '';

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    msg.className = 'error';
    msg.textContent = 'Veuillez entrer une adresse email valide.';
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Envoi en cours…';

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ email })
    });

    if (res.status === 201 || res.ok) {
      emailInput.style.display = 'none';
      btn.style.display = 'none';
      msg.textContent = 'Merci 🌿 On vous écrira dès que les portes s\'ouvrent.';
      msg.style.fontSize = '15px';
      msg.style.marginTop = '8px';
    } else if (res.status === 409) {
      msg.className = 'error';
      msg.textContent = 'Cette adresse est déjà inscrite.';
      btn.disabled = false;
      btn.textContent = 'Me prévenir du lancement';
    } else {
      throw new Error('Erreur serveur');
    }
  } catch (err) {
    msg.className = 'error';
    msg.textContent = 'Une erreur est survenue, réessayez plus tard.';
    btn.disabled = false;
    btn.textContent = 'Me prévenir du lancement';
  }
});
