import cv2
import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
from scipy.spatial import distance as dist
import pygame
import random
import time

# ── Alarm setup ──────────────────────────────────
pygame.mixer.init()
pygame.mixer.music.load("alarm.wav")
pygame.mixer.music.set_volume(0.3)

# ── MediaPipe setup ───────────────────────────────
LEFT_EYE  = [362, 385, 387, 263, 373, 380]
RIGHT_EYE = [33,  160, 158, 133, 153, 144]

MODEL_PATH = "face_landmarker.task"
base_options = python.BaseOptions(model_asset_path=MODEL_PATH)
options      = vision.FaceLandmarkerOptions(
                   base_options=base_options,
                   num_faces=1)
detector     = vision.FaceLandmarker.create_from_options(options)

# ── EAR calculation ───────────────────────────────
def get_ear(landmarks, eye_indices, w, h):
    pts = [(int(landmarks[i].x * w), int(landmarks[i].y * h))
           for i in eye_indices]
    A = dist.euclidean(pts[1], pts[5])
    B = dist.euclidean(pts[2], pts[4])
    C = dist.euclidean(pts[0], pts[3])
    return (A + B) / (2.0 * C), pts

# ── JEE/NEET Questions ────────────────────────────
QUESTIONS = [
    {"q": "SI unit of force?",
     "options": ["A. Joule","B. Newton","C. Watt","D. Pascal"],
     "answer": "B"},
    {"q": "Most abundant gas in atmosphere?",
     "options": ["A. Oxygen","B. CO2","C. Nitrogen","D. Argon"],
     "answer": "C"},
    {"q": "Acceleration due to gravity?",
     "options": ["A. 8.9 m/s2","B. 9.8 m/s2","C. 10.8","D. 11.2"],
     "answer": "B"},
    {"q": "Ohm's Law: V =",
     "options": ["A. I/R","B. I+R","C. IxR","D. I-R"],
     "answer": "C"},
    {"q": "Atomic number of Carbon?",
     "options": ["A. 4","B. 6","C. 8","D. 12"],
     "answer": "B"},
    {"q": "Speed of light?",
     "options": ["A. 3x10^6","B. 3x10^8","C. 3x10^10","D. 3x10^4"],
     "answer": "B"},
    {"q": "Newton's 2nd Law: F =",
     "options": ["A. mv","B. m/a","C. ma","D. m+a"],
     "answer": "C"},
    {"q": "NOT a renewable energy?",
     "options": ["A. Solar","B. Wind","C. Coal","D. Hydro"],
     "answer": "C"},
    {"q": "pH of pure water?",
     "options": ["A. 0","B. 5","C. 7","D. 14"],
     "answer": "C"},
    {"q": "Photosynthesis produces?",
     "options": ["A. CO2","B. N2","C. H2","D. O2"],
     "answer": "D"},
    {"q": "Unit of electric current?",
     "options": ["A. Volt","B. Watt","C. Ampere","D. Ohm"],
     "answer": "C"},
    {"q": "Chemical formula of water?",
     "options": ["A. HO","B. H2O","C. H3O","D. OH2"],
     "answer": "B"},
    {"q": "Loudness of sound measured in?",
     "options": ["A. Hertz","B. Decibel","C. Metre","D. Newton"],
     "answer": "B"},
    {"q": "Planet closest to Sun?",
     "options": ["A. Venus","B. Earth","C. Mercury","D. Mars"],
     "answer": "C"},
    {"q": "Normal human body temperature?",
     "options": ["A. 35C","B. 36C","C. 37C","D. 38C"],
     "answer": "C"},
    {"q": "Which law is F = ma?",
     "options": ["A. 1st law","B. 2nd law","C. 3rd law","D. Gravity"],
     "answer": "B"},
    {"q": "Number of bones in human body?",
     "options": ["A. 196","B. 200","C. 206","D. 212"],
     "answer": "C"},
    {"q": "Hardest natural substance?",
     "options": ["A. Gold","B. Iron","C. Quartz","D. Diamond"],
     "answer": "D"},
    {"q": "Chemical symbol of Gold?",
     "options": ["A. Go","B. Gd","C. Au","D. Ag"],
     "answer": "C"},
    {"q": "Light year is unit of?",
     "options": ["A. Time","B. Speed","C. Distance","D. Light"],
     "answer": "C"},
]

FONT           = cv2.FONT_HERSHEY_SIMPLEX
REQUIRED_SCORE = 3

# ── Draw quiz overlay ─────────────────────────────
def draw_quiz(frame, question, selected,
              result, result_color, streak):
    h, w = frame.shape[:2]

    overlay = frame.copy()
    cv2.rectangle(overlay, (0, h//2 - 40), (w, h),
                  (0, 0, 0), -1)
    cv2.addWeighted(overlay, 0.78, frame, 0.22, 0, frame)

    y = h // 2

    # Streak boxes
    box_w   = 36
    box_gap = 10
    total_w = REQUIRED_SCORE * box_w + (REQUIRED_SCORE-1) * box_gap
    start_x = (w - total_w) // 2
    bar_y   = y - 30

    for i in range(REQUIRED_SCORE):
        bx  = start_x + i * (box_w + box_gap)
        col = (0, 200, 0) if i < streak else (60, 60, 60)
        cv2.rectangle(frame,
                      (bx, bar_y),
                      (bx + box_w, bar_y + 16),
                      col, -1)
        cv2.rectangle(frame,
                      (bx, bar_y),
                      (bx + box_w, bar_y + 16),
                      (255, 255, 255), 1)

    cv2.putText(frame, f"Streak: {streak}/{REQUIRED_SCORE}",
                (10, bar_y + 13),
                FONT, 0.44, (180, 180, 180), 1)

    # Question
    q = question["q"]
    cv2.putText(frame, q[:48], (10, y + 6),
                FONT, 0.52, (255, 255, 0), 1)
    if len(q) > 48:
        cv2.putText(frame, q[48:], (10, y + 26),
                    FONT, 0.52, (255, 255, 0), 1)

    # Option colours
    opt_colors = {k: (200, 200, 200) for k in "ABCD"}
    if selected:
        opt_colors[question["answer"]] = (0, 255, 0)
        if selected != question["answer"]:
            opt_colors[selected] = (0, 0, 255)

    positions = [
        (10,     y + 54),
        (10,     y + 78),
        (w // 2, y + 54),
        (w // 2, y + 78),
    ]
    for opt, pos, key in zip(question["options"],
                              positions, "ABCD"):
        cv2.putText(frame, opt, pos, FONT,
                    0.48, opt_colors[key], 1)

    # Bottom message
    if not selected:
        cv2.putText(frame,
                    "Buzzer ON  |  Press A / B / C / D",
                    (10, y + 108),
                    FONT, 0.48, (100, 200, 255), 1)
    else:
        cv2.putText(frame, result,
                    (10, y + 108),
                    FONT, 0.55, result_color, 2)
        if result_color == (0, 0, 255):
            cv2.putText(frame,
                        "Wrong! Streak reset to 0 — try next",
                        (10, y + 132),
                        FONT, 0.44, (0, 0, 255), 1)
        else:
            cv2.putText(frame,
                        "Correct!  Next question loading...",
                        (10, y + 132),
                        FONT, 0.44, (0, 200, 0), 1)

# ── State variables ───────────────────────────────
EAR_THRESH   = 0.20
FRAME_LIMIT  = 30
counter      = 0
alarm_on     = False
quiz_active  = False
current_q    = None
selected_ans = None
result_text  = ""
result_color = (255, 255, 255)
result_timer = 0
streak       = 0

# ── Main loop ─────────────────────────────────────
cap = cv2.VideoCapture(0)
print("AttentionGuardian + AdQuiz running!")
print("Answer 3 questions correctly in a row to stop buzzer.")
print("Press E (eyes open) to exit safely. Press Q to force quit.")

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    h, w = frame.shape[:2]
    rgb  = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    rgb.flags.writeable = False
    out  = detector.detect(
               mp.Image(image_format=mp.ImageFormat.SRGB,
                        data=rgb))
    rgb.flags.writeable = True

    ear_value = 0.35

    if out.face_landmarks:
        lm = out.face_landmarks[0]
        left_ear,  l_pts = get_ear(lm, LEFT_EYE,  w, h)
        right_ear, r_pts = get_ear(lm, RIGHT_EYE, w, h)
        ear_value = (left_ear + right_ear) / 2.0

        for (x, y_pt) in l_pts + r_pts:
            cv2.circle(frame, (x, y_pt), 3, (0, 255, 0), -1)

        cv2.putText(frame, f"EAR: {ear_value:.2f}",
                    (10, 30), FONT, 0.65, (255,255,255), 2)

        # Drowsiness detection
        if ear_value < EAR_THRESH:
            counter += 1
            if counter >= FRAME_LIMIT:
                if not alarm_on:
                    pygame.mixer.music.play(-1)
                    alarm_on = True

                if not quiz_active:
                    quiz_active  = True
                    streak       = 0
                    current_q    = random.choice(QUESTIONS)
                    selected_ans = None
                    result_text  = ""

                cv2.putText(frame,
                            "DROWSY! Answer 3 in a row!",
                            (10, 62), FONT, 0.65,
                            (0, 0, 255), 2)
        else:
            if not quiz_active:
                counter  = 0
                alarm_on = False
                pygame.mixer.music.stop()

    # Controls hint at bottom
    hint = "E = safe exit  |  Q = force quit"
    if quiz_active:
        hint = "Press A / B / C / D to answer"
    cv2.putText(frame, hint,
                (10, h - 12), FONT, 0.38,
                (130, 130, 130), 1)

    # Quiz overlay
    if quiz_active and current_q:
        draw_quiz(frame, current_q, selected_ans,
                  result_text, result_color, streak)

        if selected_ans and \
                (time.time() - result_timer) > 2.0:

            if selected_ans == current_q["answer"]:
                streak += 1

                if streak >= REQUIRED_SCORE:
                    # 3 correct in a row — stop everything
                    pygame.mixer.music.stop()
                    alarm_on     = False
                    quiz_active  = False
                    current_q    = None
                    selected_ans = None
                    result_text  = ""
                    streak       = 0
                    counter      = 0
                    print("3 correct in a row! Well done!")
                else:
                    current_q    = random.choice(QUESTIONS)
                    selected_ans = None
                    result_text  = ""
            else:
                # Wrong — reset streak, next question
                streak       = 0
                current_q    = random.choice(QUESTIONS)
                selected_ans = None
                result_text  = ""

    cv2.imshow("AttentionGuardian + AdQuiz", frame)
    key = cv2.waitKey(1) & 0xFF

    # Answer input
    if quiz_active and current_q and not selected_ans:
        key_map = {ord('a'): 'A', ord('b'): 'B',
                   ord('c'): 'C', ord('d'): 'D'}
        if key in key_map:
            selected_ans = key_map[key]
            result_timer = time.time()

            if selected_ans == current_q["answer"]:
                next_streak  = streak + 1
                result_text  = f"CORRECT!  {next_streak}/{REQUIRED_SCORE}"
                result_color = (0, 220, 0)
            else:
                result_text  = (f"Wrong! Answer: "
                                f"{current_q['answer']}  "
                                f"Streak reset!")
                result_color = (0, 0, 255)

    # Exit keys
    if key == ord('q'):
        break

    if key == ord('e') and not quiz_active:
        print("Student exited safely.")
        break

cap.release()
cv2.destroyAllWindows()
pygame.mixer.quit()
