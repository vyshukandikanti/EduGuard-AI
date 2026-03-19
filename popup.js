const SERVER = "http://127.0.0.1:5000";

let userOverrode = false;

async function checkStatus() {
  try {
    const res  = await fetch(`${SERVER}/status`);
    const data = await res.json();

    // Server badge
    document.getElementById('server-dot').className   = 'dot';
    document.getElementById('server-label').textContent = 'Online';

    // Alarm
    const alarmEl = document.getElementById('alarm-status');
    alarmEl.textContent = data.alarm_on ? 'ON 🔔' : 'OFF';
    alarmEl.className   = 'stat-value ' + (data.alarm_on ? 'val-red' : 'val-green');

    // Quiz
    const quizEl = document.getElementById('quiz-status');
    quizEl.textContent = data.quiz_active ? 'YES' : 'NO';
    quizEl.className   = 'stat-value ' + (data.quiz_active ? 'val-red' : 'val-green');

    // Streak
    document.getElementById('streak-status').textContent = `${data.streak} / 3`;

    // Trigger
    const trigEl = document.getElementById('trigger-status');
    trigEl.textContent = data.trigger || 'none';
    trigEl.className   = 'stat-value ' + (data.trigger === 'drowsy' ? 'val-red' : data.trigger === 'ad' ? 'val-orange' : 'val-dim');

    // Subject dropdown sync
    if (!userOverrode) {
      const sel = document.getElementById('subjectSelect');
      if (sel && data.current_subject) {
        sel.value = data.current_subject;
        updateDetectedPill(data.current_subject);
      }
    }

  } catch (e) {
    document.getElementById('server-dot').className    = 'dot off';
    document.getElementById('server-label').textContent = 'Offline';
    document.getElementById('alarm-status').textContent = '—';
    document.getElementById('alarm-status').className   = 'stat-value val-dim';
    document.getElementById('quiz-status').textContent  = '—';
    document.getElementById('quiz-status').className    = 'stat-value val-dim';
    document.getElementById('streak-status').textContent = '—';
    document.getElementById('trigger-status').textContent = '—';
  }
}

function updateDetectedPill(subject) {
  const pill = document.getElementById('detected-pill');
  if (!pill) return;
  const icons = {
    "Chemistry":      "🧪",
    "Physics":        "⚡",
    "Maths":          "📐",
    "Biology":        "🧬",
    "History/GK":     "🌍",
    "Constitution":   "⚖️",
    "CS/Programming": "💻",
    "Current Affairs":"📰",
    "mixed":          "🔀",
  };
  const icon = icons[subject] || "🔍";
  pill.textContent = subject === "mixed"
    ? `${icon} Auto Detecting...`
    : `${icon} Detected: ${subject}`;
}

async function testAd() {
  try {
    await fetch(`${SERVER}/ad-started`, {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({ test: true })
    });
    setTimeout(checkStatus, 500);
  } catch (e) {
    alert('Server not running! Start server.py first.');
  }
}

document.getElementById('test-btn').addEventListener('click', testAd);
document.getElementById('refresh-btn').addEventListener('click', checkStatus);

document.getElementById('subjectSelect').addEventListener('change', function () {
  userOverrode = true;
  updateDetectedPill(this.value);
  fetch(`${SERVER}/subject`, {
    method : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body   : JSON.stringify({ subject: this.value })
  }).catch(() => {});
  setTimeout(() => { userOverrode = false; }, 30000);
});

checkStatus();
setInterval(checkStatus, 2000);
