# 🛡️ EduGuard AI — Smart Student Attention & Learning System

> **Built by Vyshu — 2nd Year CSE(DS) Student, Andhra Pradesh**

---

## 📌 What is EduGuard AI?

EduGuard AI is an AI-powered student attention and learning system that runs silently in the background while you watch YouTube. It detects drowsiness using your webcam, monitors if you leave the screen, and converts YouTube ad breaks into active learning sessions with subject-matched quiz questions.

---

## ✨ Features

### 🔴 Feature 1 — Drowsiness Detection
- Webcam runs silently using **MediaPipe Face Mesh** (468 facial landmarks)
- Calculates **Eye Aspect Ratio (EAR)** from 6 eye points every frame
- If EAR drops below 0.20 for 30 consecutive frames → drowsiness confirmed
- Webcam window pops up automatically with buzzer alarm
- YouTube video pauses instantly
- CS/Programming quiz appears on webcam window
- Student must answer **3 correct in a row** to stop the alarm
- Wrong answer resets streak to 0

### 👁️ Feature 2 — Face Away Detection
- If no face detected for 15 stable frames → countdown timer starts
- Big orange countdown (10, 9, 8...) appears on YouTube screen
- If face returns within 10 seconds → countdown disappears, video continues
- If 10 seconds pass → buzzer starts, video pauses
- When face returns → buzzer stops, video resumes automatically

### 📺 Feature 3 — YouTube Ad Quiz
- Chrome extension detects YouTube ads every 500ms
- Ad detected → ad audio muted instantly → dark quiz overlay appears
- **Subject auto-detected from video title** — Physics video gets Physics questions!
- Student must attempt minimum **5 questions** per ad break
- Orange progress bar shows 0/5 to 5/5 attempts
- Wrong answer shows correct answer in green, wrong in red
- Next question loads after 2 seconds
- After 5 attempts + ad ends → score screen shows → video resumes

### 🎯 Feature 4 — Smart Subject Detection
- Reads YouTube video title automatically
- Detects subject from keywords in title
- Supports: **Chemistry, Physics, Maths, Biology, History/GK, Constitution, CS/Programming, Current Affairs**
- Student can manually override subject from popup dropdown
- Falls back to mixed questions if subject not detected

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Face Detection | MediaPipe Face Mesh |
| Eye Tracking | Eye Aspect Ratio (EAR) Algorithm |
| Video Processing | OpenCV |
| Backend Server | Python Flask |
| Sound | Pygame |
| Chrome Extension | JavaScript Manifest V3 |
| Communication | REST API (HTTP) |
| Concurrency | Python Threading |
| Question Bank | JavaScript Arrays (170+ questions) |

---

## 📁 Project Structure

```
AttentionGuardian/
├── AdQuizExtension/
│   ├── manifest.json       ← Chrome extension identity
│   ├── content.js          ← Runs inside YouTube (all logic + questions)
│   ├── popup.html          ← Extension popup UI
│   └── popup.js            ← Popup logic
├── venv/
├── ear.py                  ← EAR formula helper
├── main.py                 ← Standalone webcam mode
├── server.py               ← Main backend (Flask + webcam)
├── create_alarm.py         ← Alarm sound generator
├── alarm.wav               ← Buzzer sound
├── face_landmarker.task    ← MediaPipe AI model (30MB)
└── README.md
```

---

## 🚀 How to Run

### Step 1 — Install Requirements
```bash
pip install flask flask-cors opencv-python mediapipe scipy pygame
```

### Step 2 — Start the Server
```bash
cd OneDrive\Desktop\AttentionGuardian
venv\Scripts\activate
python server.py
```

### Step 3 — Load Chrome Extension
1. Open Chrome → go to `chrome://extensions`
2. Enable **Developer Mode** (top right)
3. Click **Load unpacked**
4. Select the `AdQuizExtension` folder
5. Click the EduGuard AI icon in Chrome toolbar

### Step 4 — Start Learning!
Open YouTube and start watching — EduGuard AI runs automatically!

---

## 📊 Question Bank

| Subject | Questions | Source |
|---|---|---|
| Chemistry | 35 | content.js — YOUTUBE_QUESTIONS |
| General Knowledge | 30 | content.js — YOUTUBE_QUESTIONS |
| Current Affairs | 20 | content.js — YOUTUBE_QUESTIONS |
| Indian Constitution | 20 | content.js — YOUTUBE_QUESTIONS |
| Physics | 15 | content.js — PHYSICS_QUESTIONS |
| Maths | 15 | content.js — MATHS_QUESTIONS |
| Biology | 15 | content.js — BIOLOGY_QUESTIONS |
| CS/Programming | 25 | server.py — QUESTIONS (drowsy quiz) |
| **Total** | **175+** | |

---

## 🔌 API Endpoints

| Endpoint | Method | Purpose |
|---|---|---|
| `/status` | GET | Returns full system status |
| `/subject` | GET | Returns current detected subject |
| `/subject` | POST | Sets subject (auto or manual) |
| `/ad-started` | POST | Called when YouTube ad starts |
| `/ad-ended` | POST | Called when YouTube ad ends |
| `/test-drowsy` | POST | Simulates drowsiness for testing |
| `/drowsy-detected` | POST | Returns pause signal |
| `/drowsy-cleared` | POST | Returns play signal |

---

## 💻 System Requirements

- Windows 10/11
- Python 3.10+
- Google Chrome browser
- Webcam (built-in or external)
- Internet connection (for YouTube)

---

## 🎯 How Subject Detection Works

```
Student opens YouTube video
        ↓
EduGuard reads video title
        ↓
Title contains "physics" / "wave" / "force" → Subject = Physics
Title contains "chemistry" / "organic" → Subject = Chemistry
Title contains "maths" / "ellipse" / "calculus" → Subject = Maths
        ↓
Ad plays → Questions loaded from that subject's pool
        ↓
Student answers subject-matched questions during ad!
```

---

## 👨‍💻 About the Developer

**Vyshu (V. Kandikanti)**
- 2nd Year B.Tech CSE (Data Science)
- Andhra Pradesh, India
- GitHub: [github.com/vyshukandikanti](https://github.com/vyshukandikanti)

---

## 📄 License

This project is open source and available for educational purposes.

---

> *"Don't waste your ad breaks — learn something new every time!"* 🚀
