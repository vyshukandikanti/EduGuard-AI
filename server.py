from flask import Flask, jsonify, request
from flask_cors import CORS
import cv2
import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
from scipy.spatial import distance as dist
import pygame
import random
import time
import threading


app = Flask(__name__)
CORS(app, origins="*", supports_credentials=True)

pygame.mixer.init()
pygame.mixer.music.load("alarm.wav")
pygame.mixer.music.set_volume(0.3)


LEFT_EYE  = [362, 385, 387, 263, 373, 380]
RIGHT_EYE = [33,  160, 158, 133, 153, 144]
MODEL_PATH = "face_landmarker.task"

base_options = python.BaseOptions(model_asset_path=MODEL_PATH)
options      = vision.FaceLandmarkerOptions(
                   base_options=base_options, num_faces=1)
detector     = vision.FaceLandmarker.create_from_options(options)

def get_ear(landmarks, eye_indices, w, h):
    pts = [(int(landmarks[i].x*w), int(landmarks[i].y*h))
           for i in eye_indices]
    A = dist.euclidean(pts[1], pts[5])
    B = dist.euclidean(pts[2], pts[4])
    C = dist.euclidean(pts[0], pts[3])
    return (A + B) / (2.0 * C), pts

QUESTIONS = [
    {"q":"Mutable type in Python?","options":["A. tuple","B. string","C. list","D. int"],"answer":"C"},
    {"q":"Binary search time complexity?","options":["A. O(n)","B. O(n²)","C. O(log n)","D. O(1)"],"answer":"C"},
    {"q":"LIFO data structure?","options":["A. Queue","B. Array","C. Tree","D. Stack"],"answer":"D"},
    {"q":"JVM stands for?","options":["A. Java Virtual Machine","B. Java Visual Model","C. Java Variable Method","D. Java Version Manager"],"answer":"A"},
    {"q":"Primary key cannot be?","options":["A. unique","B. NULL","C. integer","D. index"],"answer":"B"},
    {"q":"Size of int in C (32-bit)?","options":["A. 1 byte","B. 2 bytes","C. 4 bytes","D. 8 bytes"],"answer":"C"},
    {"q":"SQL command to retrieve data?","options":["A. INSERT","B. UPDATE","C. SELECT","D. DELETE"],"answer":"C"},
    {"q":"Python function keyword?","options":["A. function","B. define","C. func","D. def"],"answer":"D"},
    {"q":"DFS uses which structure?","options":["A. Queue","B. Stack","C. Heap","D. Array"],"answer":"B"},
    {"q":"String in Java is?","options":["A. mutable","B. primitive","C. immutable","D. array"],"answer":"C"},
    {"q":"malloc() return type in C?","options":["A. int","B. void*","C. char*","D. NULL always"],"answer":"B"},
    {"q":"BST inorder gives?","options":["A. random","B. reverse","C. level","D. sorted order"],"answer":"D"},
    {"q":"NOT stable sort?","options":["A. Merge sort","B. Bubble sort","C. Quick sort","D. Insertion sort"],"answer":"C"},
    {"q":"ACID full form?","options":["A. Atomicity Consistency Isolation Durability","B. Array Class Instance Data","C. Async Commit Index Delete","D. Access Control Integrity Data"],"answer":"A"},
    {"q":"Abstract class in Java?","options":["A. only abstract","B. only concrete","C. both abstract and concrete","D. no methods"],"answer":"C"},
    {"q":"Lambda in Python?","options":["A. loop","B. class","C. anonymous function","D. module"],"answer":"C"},
    {"q":"FULL OUTER JOIN returns?","options":["A. left rows","B. right rows","C. matching rows","D. all rows from both"],"answer":"D"},
    {"q":"Array index in C starts from?","options":["A. 1","B. -1","C. 0","D. depends"],"answer":"C"},
    {"q":"BFS uses which structure?","options":["A. Stack","B. Tree","C. Queue","D. Graph"],"answer":"C"},
    {"q":"Python key-value store?","options":["A. list","B. tuple","C. set","D. dictionary"],"answer":"D"},
    {"q":"'continue' in C loop?","options":["A. exits loop","B. skips current iteration","C. pauses","D. restarts"],"answer":"B"},
    {"q":"do-while loop guarantee?","options":["A. runs 0 times","B. runs once minimum","C. runs twice","D. infinite"],"answer":"B"},
    {"q":"Java entry point method?","options":["A. start()","B. main()","C. run()","D. begin()"],"answer":"B"},
    {"q":"Dijkstra's algorithm finds?","options":["A. min spanning tree","B. shortest path","C. longest path","D. topological sort"],"answer":"B"},
    {"q":"COMMIT in SQL?","options":["A. saves permanently","B. undoes","C. deletes","D. creates table"],"answer":"A"},
]

FONT           = cv2.FONT_HERSHEY_SIMPLEX
REQUIRED_SCORE = 3

state = {
    "alarm_on"           : False,
    "quiz_active"        : False,
    "current_q"          : None,
    "selected_ans"       : None,
    "result_text"        : "",
    "result_color"       : (255, 255, 255),
    "result_timer"       : 0,
    "streak"             : 0,
    "counter"            : 0,
    "trigger"            : "none",
    "ad_playing"         : False,
    "webcam_active"      : False,
    "drowsy_on"          : False,
    "close_webcam"       : False,
    "face_away"          : False,
    "face_away_timer"    : 0,
    "face_alarm_on"      : False,
    "no_face_counter"    : 0,
    "face_buzzer_started": False,
    "current_subject"    : "mixed",   # ← ADDED
}

def start_quiz(trigger="drowsy"):
    if not state["quiz_active"]:
        state["quiz_active"]  = True
        state["streak"]       = 0
        state["current_q"]    = random.choice(QUESTIONS)
        state["selected_ans"] = None
        state["result_text"]  = ""
        state["trigger"]      = trigger
        if trigger == "drowsy" and not state["alarm_on"]:
            pygame.mixer.music.play(-1)
            state["alarm_on"]  = True
        if trigger == "drowsy":
            state["drowsy_on"] = True
        print(f"Quiz started — trigger: {trigger}")

def stop_quiz():
    pygame.mixer.music.stop()
    state["alarm_on"]     = False
    state["quiz_active"]  = False
    state["current_q"]    = None
    state["selected_ans"] = None
    state["result_text"]  = ""
    state["streak"]       = 0
    state["counter"]      = 0
    state["ad_playing"]   = False
    state["drowsy_on"]    = False
    state["close_webcam"] = True
    print("Quiz stopped — closing webcam!")

@app.route("/status", methods=["GET"])
def status():
    elapsed = int(time.time() - state["face_away_timer"]) \
              if state["face_away"] else 0
    return jsonify({
        "running"            : True,
        "quiz_active"        : state["quiz_active"],
        "alarm_on"           : state["alarm_on"],
        "streak"             : state["streak"],
        "trigger"            : state["trigger"],
        "webcam"             : state["webcam_active"],
        "drowsy_on"          : state["drowsy_on"],
        "face_away"          : state["face_away"],
        "face_alarm_on"      : state["face_alarm_on"],
        "face_away_seconds"  : elapsed,
        "face_buzzer_started": state["face_buzzer_started"],
        "current_subject"    : state["current_subject"],   # ← ADDED
    })

@app.route("/test-drowsy", methods=["POST"])
def test_drowsy():
    start_quiz(trigger="drowsy")
    return jsonify({"message": "Drowsy quiz triggered!"})

@app.route("/test-ad", methods=["POST"])
def test_ad():
    state["ad_playing"] = True
    return jsonify({"message": "Ad quiz triggered!"})

@app.route("/drowsy-detected", methods=["POST"])
def drowsy_detected():
    return jsonify({"pause": True})

@app.route("/drowsy-cleared", methods=["POST"])
def drowsy_cleared():
    return jsonify({"play": True})

@app.route("/ad-started", methods=["POST"])
def ad_started():
    print("AD STARTED — EduGuard AI Chrome handles quiz")
    state["ad_playing"] = True
    return jsonify({"message": "Ad noted"})

@app.route("/ad-ended", methods=["POST"])
def ad_ended():
    print("AD ENDED")
    state["ad_playing"] = False
    return jsonify({"message": "Ad ended noted"})

@app.route("/question", methods=["GET"])
def get_question():
    if not state["current_q"]:
        return jsonify({"active": False})
    return jsonify({
        "active"   : True,
        "question" : state["current_q"]["q"],
        "options"  : state["current_q"]["options"],
        "streak"   : state["streak"],
        "trigger"  : state["trigger"],
    })

# ── ADDED: Subject routes ─────────────────────
@app.route("/subject", methods=["GET"])
def get_subject():
    return jsonify({"subject": state["current_subject"]})

@app.route("/subject", methods=["POST"])
def set_subject():
    data = request.get_json()
    if data and "subject" in data:
        state["current_subject"] = data["subject"]
        print(f"Subject set to: {data['subject']}")
    return jsonify({"ok": True})
# ─────────────────────────────────────────────

def draw_quiz(frame, question, selected, result, result_color, streak):
    h, w = frame.shape[:2]
    overlay = frame.copy()
    cv2.rectangle(overlay, (0, h//2-40), (w, h), (0,0,0), -1)
    cv2.addWeighted(overlay, 0.78, frame, 0.22, 0, frame)
    y = h // 2
    box_w, box_gap = 36, 10
    total_w = REQUIRED_SCORE * box_w + (REQUIRED_SCORE-1) * box_gap
    start_x = (w - total_w) // 2
    bar_y   = y - 30
    for i in range(REQUIRED_SCORE):
        bx  = start_x + i * (box_w + box_gap)
        col = (0, 200, 0) if i < streak else (60, 60, 60)
        cv2.rectangle(frame, (bx, bar_y), (bx+box_w, bar_y+16), col, -1)
        cv2.rectangle(frame, (bx, bar_y), (bx+box_w, bar_y+16), (255,255,255), 1)
    cv2.putText(frame, f"Streak: {streak}/{REQUIRED_SCORE}",
                (10, bar_y+13), FONT, 0.44, (180,180,180), 1)
    q = question["q"]
    cv2.putText(frame, q[:48], (10, y+6), FONT, 0.52, (255,255,0), 1)
    if len(q) > 48:
        cv2.putText(frame, q[48:], (10, y+26), FONT, 0.52, (255,255,0), 1)
    opt_colors = {k: (200,200,200) for k in "ABCD"}
    if selected:
        opt_colors[question["answer"]] = (0,255,0)
        if selected != question["answer"]:
            opt_colors[selected] = (0,0,255)
    positions = [(10,y+54),(10,y+78),(w//2,y+54),(w//2,y+78)]
    for opt, pos, key in zip(question["options"], positions, "ABCD"):
        cv2.putText(frame, opt, pos, FONT, 0.48, opt_colors[key], 1)
    if not selected:
        cv2.putText(frame, "Buzzer ON | Press A/B/C/D",
                    (10, y+108), FONT, 0.48, (100,200,255), 1)
    else:
        cv2.putText(frame, result, (10, y+108), FONT, 0.55, result_color, 2)
        msg = "Correct! Next question..." if result_color == (0,220,0) \
              else "Wrong! Streak reset — next question"
        cv2.putText(frame, msg, (10, y+132), FONT, 0.44, result_color, 1)

def webcam_loop():
    EAR_THRESH        = 0.20
    FRAME_LIMIT       = 30
    FACE_AWAY_SECONDS = 10

    cap = cv2.VideoCapture(0)
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
    state["webcam_active"] = True
    print("EduGuard AI — Webcam started!")

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            time.sleep(0.1)
            continue

        h, w = frame.shape[:2]
        rgb  = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        rgb.flags.writeable = False
        out  = detector.detect(
                   mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb))
        rgb.flags.writeable = True

        if out.face_landmarks:
            lm = out.face_landmarks[0]
            left_ear,  l_pts = get_ear(lm, LEFT_EYE,  w, h)
            right_ear, r_pts = get_ear(lm, RIGHT_EYE, w, h)
            ear_value = (left_ear + right_ear) / 2.0

            for (x, y_pt) in l_pts + r_pts:
                cv2.circle(frame, (x, y_pt), 3, (0,255,0), -1)

            cv2.putText(frame, f"EAR: {ear_value:.2f}",
                        (10, 30), FONT, 0.65, (255,255,255), 2)

            state["no_face_counter"] = 0
            if state["face_away"] or state["face_buzzer_started"]:
                state["face_away"]           = False
                state["face_away_timer"]     = 0
                state["face_buzzer_started"] = False
                if state["face_alarm_on"]:
                    pygame.mixer.music.stop()
                    state["face_alarm_on"] = False
                    print("Face back — buzzer stopped!")

            if ear_value < EAR_THRESH:
                state["counter"] += 1
                if state["counter"] >= FRAME_LIMIT:
                    if not state["quiz_active"]:
                        start_quiz(trigger="drowsy")
                    cv2.putText(frame, "DROWSY! Answer 3 in a row!",
                                (10, 62), FONT, 0.65, (0,0,255), 2)
            else:
                if not state["quiz_active"]:
                    state["counter"] = 0
                    if state["alarm_on"]:
                        pygame.mixer.music.stop()
                        state["alarm_on"] = False

        else:
            if not state["quiz_active"]:
                state["no_face_counter"] += 1
                if state["no_face_counter"] >= 15:
                    if not state["face_away"]:
                        state["face_away"]       = True
                        state["face_away_timer"] = time.time()
                        print("No face — 10 sec countdown started!")

                if state["face_away"]:
                    elapsed   = time.time() - state["face_away_timer"]
                    remaining = max(0, FACE_AWAY_SECONDS - int(elapsed))
                    if remaining > 0:
                        cv2.putText(frame,
                                    f"Come back! Buzzer in {remaining}s",
                                    (10, 62), FONT, 0.65, (0,165,255), 2)
                    else:
                        cv2.putText(frame,
                                    "STUDENT AWAY! Come back!",
                                    (10, 62), FONT, 0.65, (0,0,255), 2)

                    if elapsed >= FACE_AWAY_SECONDS \
                            and not state["face_buzzer_started"]:
                        state["face_buzzer_started"] = True
                        state["face_alarm_on"]       = True
                        pygame.mixer.music.play(-1)
                        print("10 sec passed — buzzer started!")

        if state["quiz_active"]:
            hint = "Press A/B/C/D — cannot exit during quiz"
        else:
            hint = ""
        cv2.putText(frame, hint, (10, h-12), FONT, 0.38, (130,130,130), 1)

        if state["quiz_active"] and state["current_q"]:
            draw_quiz(frame, state["current_q"], state["selected_ans"],
                      state["result_text"], state["result_color"],
                      state["streak"])
            if state["selected_ans"] and \
                    (time.time() - state["result_timer"]) > 2.0:
                if state["selected_ans"] == state["current_q"]["answer"]:
                    state["streak"] += 1
                    if state["streak"] >= REQUIRED_SCORE:
                        stop_quiz()
                    else:
                        state["current_q"]    = random.choice(QUESTIONS)
                        state["selected_ans"] = None
                        state["result_text"]  = ""
                else:
                    state["streak"]       = 0
                    state["current_q"]    = random.choice(QUESTIONS)
                    state["selected_ans"] = None
                    state["result_text"]  = ""

        if state["quiz_active"] and state["trigger"] == "drowsy":
            cv2.imshow("EduGuard AI — Drowsiness Detected!", frame)
        elif state["close_webcam"]:
            try:
                cv2.destroyWindow("EduGuard AI — Drowsiness Detected!")
            except:
                pass
            state["close_webcam"] = False

        key = cv2.waitKey(1) & 0xFF

        if state["quiz_active"] and state["current_q"] \
                and not state["selected_ans"]:
            key_map = {ord('a'):'A', ord('b'):'B',
                       ord('c'):'C', ord('d'):'D'}
            if key in key_map:
                ans = key_map[key]
                state["selected_ans"] = ans
                state["result_timer"] = time.time()
                if ans == state["current_q"]["answer"]:
                    ns = state["streak"] + 1
                    state["result_text"]  = f"CORRECT! {ns}/{REQUIRED_SCORE}"
                    state["result_color"] = (0, 220, 0)
                else:
                    state["result_text"]  = (
                        f"Wrong! Answer: "
                        f"{state['current_q']['answer']} Streak reset!")
                    state["result_color"] = (0, 0, 255)

        if key == ord('q') and not state["quiz_active"]:
            break
        if key == ord('e') and not state["quiz_active"]:
            print("Exited safely.")
            break

    cap.release()
    cv2.destroyAllWindows()
    pygame.mixer.quit()
    state["webcam_active"] = False

if __name__ == "__main__":
    print("="*50)
    print("EduGuard AI — Server starting!")
    print("Webcam: drowsiness detection — CS questions")
    print("Chrome: YouTube ad — Gemini AI questions")
    print("Server: http://localhost:5000")
    print("="*50)
    t = threading.Thread(target=webcam_loop, daemon=True)
    t.start()
    app.run(host="0.0.0.0", port=5000,
            debug=False, use_reloader=False)
