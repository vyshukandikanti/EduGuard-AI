from scipy.spatial import distance as dist

LEFT_EYE  = [362, 385, 387, 263, 373, 380]
RIGHT_EYE = [33,  160, 158, 133, 153, 144]

def get_ear(landmarks, eye_indices, img_w, img_h):
    pts = []
    for i in eye_indices:
        x = int(landmarks[i].x * img_w)
        y = int(landmarks[i].y * img_h)
        pts.append((x, y))

    A = dist.euclidean(pts[1], pts[5])
    B = dist.euclidean(pts[2], pts[4])
    C = dist.euclidean(pts[0], pts[3])

    ear = (A + B) / (2.0 * C)
    return ear, pts