const SERVER = "http://127.0.0.1:5000";

// ── ALL QUESTIONS INSIDE content.js ──────────

const PHYSICS_QUESTIONS = [
  { q: "SI unit of force?", options: ["A. Newton","B. Joule","C. Watt","D. Pascal"], answer: "A" },
  { q: "Which law states F = ma?", options: ["A. Newton's First","B. Newton's Second","C. Newton's Third","D. Hooke's Law"], answer: "B" },
  { q: "Speed of light in vacuum?", options: ["A. 3×10⁸ m/s","B. 3×10⁶ m/s","C. 3×10¹⁰ m/s","D. 3×10⁴ m/s"], answer: "A" },
  { q: "Sound wave is what type?", options: ["A. Transverse","B. Longitudinal","C. Electromagnetic","D. Surface"], answer: "B" },
  { q: "Unit of electrical resistance?", options: ["A. Ampere","B. Volt","C. Ohm","D. Watt"], answer: "C" },
  { q: "Mirror used in vehicle rear-view?", options: ["A. Concave","B. Convex","C. Plane","D. Parabolic"], answer: "B" },
  { q: "Formula for kinetic energy?", options: ["A. mgh","B. ½mv²","C. mv","D. Fd"], answer: "B" },
  { q: "SI unit of power?", options: ["A. Joule","B. Newton","C. Watt","D. Pascal"], answer: "C" },
  { q: "Blue colour of sky is due to?", options: ["A. Reflection","B. Refraction","C. Scattering","D. Diffraction"], answer: "C" },
  { q: "Unit of frequency?", options: ["A. Hertz","B. Decibel","C. Watt","D. Ampere"], answer: "A" },
  { q: "SI unit of electric current?", options: ["A. Volt","B. Ampere","C. Ohm","D. Watt"], answer: "B" },
  { q: "Which has maximum inertia?", options: ["A. Car","B. Bicycle","C. Truck","D. Bus"], answer: "C" },
  { q: "Unit of pressure?", options: ["A. Newton","B. Pascal","C. Joule","D. Watt"], answer: "B" },
  { q: "Ohm's law: V = ?", options: ["A. I/R","B. I+R","C. IR","D. I-R"], answer: "C" },
  { q: "Which wave does NOT need medium?", options: ["A. Sound","B. Water","C. Light","D. Seismic"], answer: "C" },
];

const MATHS_QUESTIONS = [
  { q: "Value of π approximately?", options: ["A. 3.14","B. 2.71","C. 1.61","D. 1.41"], answer: "A" },
  { q: "Derivative of sin(x)?", options: ["A. cos(x)","B. -cos(x)","C. tan(x)","D. -sin(x)"], answer: "A" },
  { q: "Sum of angles in triangle?", options: ["A. 90°","B. 180°","C. 270°","D. 360°"], answer: "B" },
  { q: "log(1) equals?", options: ["A. 0","B. 1","C. ∞","D. undefined"], answer: "A" },
  { q: "Integral of 1/x?", options: ["A. ln|x|+C","B. x²/2+C","C. 1/x²+C","D. e^x+C"], answer: "A" },
  { q: "How many sides in a hexagon?", options: ["A. 5","B. 6","C. 7","D. 8"], answer: "B" },
  { q: "Pythagorean theorem?", options: ["A. a²+b²=c²","B. a+b=c","C. a²-b²=c²","D. a²×b²=c²"], answer: "A" },
  { q: "0! (zero factorial) = ?", options: ["A. 0","B. 1","C. undefined","D. ∞"], answer: "B" },
  { q: "LCM stands for?", options: ["A. Least Common Multiple","B. Largest Common Multiple","C. Least Common Mean","D. Linear Common Method"], answer: "A" },
  { q: "Derivative of x²?", options: ["A. x","B. 2x","C. x²","D. 2"], answer: "B" },
  { q: "Value of sin 90°?", options: ["A. 0","B. 0.5","C. 1","D. √2"], answer: "C" },
  { q: "Area of circle with radius r?", options: ["A. 2πr","B. πr²","C. 4πr","D. πr"], answer: "B" },
  { q: "Sum of first 10 natural numbers?", options: ["A. 45","B. 50","C. 55","D. 60"], answer: "C" },
  { q: "What is √144?", options: ["A. 11","B. 12","C. 13","D. 14"], answer: "B" },
  { q: "Quadratic formula denominator?", options: ["A. a","B. 2a","C. 3a","D. 4a"], answer: "B" },
];

const BIOLOGY_QUESTIONS = [
  { q: "Powerhouse of the cell?", options: ["A. Nucleus","B. Mitochondria","C. Ribosome","D. Golgi body"], answer: "B" },
  { q: "Full form of DNA?", options: ["A. Deoxyribonucleic Acid","B. Diribonucleic Acid","C. Deoxyribose Acid","D. Double Nucleic Acid"], answer: "A" },
  { q: "Chromosomes in human cell?", options: ["A. 23","B. 44","C. 46","D. 48"], answer: "C" },
  { q: "Universal blood donor group?", options: ["A. A+","B. B+","C. O+","D. AB+"], answer: "C" },
  { q: "Which organ produces insulin?", options: ["A. Liver","B. Kidney","C. Pancreas","D. Spleen"], answer: "C" },
  { q: "Process by which plants make food?", options: ["A. Respiration","B. Photosynthesis","C. Digestion","D. Transpiration"], answer: "B" },
  { q: "Largest organ in human body?", options: ["A. Liver","B. Brain","C. Skin","D. Lungs"], answer: "C" },
  { q: "Vitamin produced by sunlight?", options: ["A. Vitamin A","B. Vitamin B","C. Vitamin C","D. Vitamin D"], answer: "D" },
  { q: "Oxygen carrier in blood?", options: ["A. Plasma","B. Haemoglobin","C. Platelets","D. Leucocytes"], answer: "B" },
  { q: "Basic unit of life?", options: ["A. Tissue","B. Organ","C. Cell","D. Atom"], answer: "C" },
  { q: "Which part of plant makes food?", options: ["A. Root","B. Stem","C. Leaf","D. Flower"], answer: "C" },
  { q: "Normal human body temperature?", options: ["A. 35°C","B. 37°C","C. 39°C","D. 41°C"], answer: "B" },
  { q: "Longest bone in human body?", options: ["A. Spine","B. Humerus","C. Femur","D. Tibia"], answer: "C" },
  { q: "Which blood cells fight infection?", options: ["A. RBC","B. Platelets","C. WBC","D. Plasma"], answer: "C" },
  { q: "Function of kidney?", options: ["A. Digestion","B. Pump blood","C. Filter blood","D. Produce insulin"], answer: "C" },
];

const YOUTUBE_QUESTIONS = [
  // ── CHEMISTRY ────────────────────────────────
  { q: "Atomic number of Carbon?", options: ["A. 4","B. 6","C. 8","D. 12"], answer: "B" },
  { q: "Chemical formula of glucose?", options: ["A. C6H12O6","B. C12H22O11","C. CH4","D. C2H5OH"], answer: "A" },
  { q: "pH of pure water?", options: ["A. 0","B. 5","C. 7","D. 14"], answer: "C" },
  { q: "Valency of Carbon?", options: ["A. 2","B. 3","C. 1","D. 4"], answer: "D" },
  { q: "Avogadro's number?", options: ["A. 6.022×10²³","B. 6.022×10²⁰","C. 3.14×10²³","D. 6.022×10²⁵"], answer: "A" },
  { q: "Chemical formula of sulfuric acid?", options: ["A. HCl","B. HNO3","C. H2SO4","D. H2O"], answer: "C" },
  { q: "Which element has symbol Na?", options: ["A. Nickel","B. Sodium","C. Nitrogen","D. Neon"], answer: "B" },
  { q: "Oxidation state of oxygen in H2O?", options: ["A. +2","B. 0","C. -1","D. -2"], answer: "D" },
  { q: "Acid + Base gives?", options: ["A. acid","B. base","C. salt + water","D. gas"], answer: "C" },
  { q: "Bond formed by sharing electrons?", options: ["A. Ionic","B. Covalent","C. Metallic","D. Hydrogen"], answer: "B" },
  { q: "Atomic mass of Carbon?", options: ["A. 6","B. 14","C. 12","D. 8"], answer: "C" },
  { q: "Lightest element?", options: ["A. Helium","B. Oxygen","C. Carbon","D. Hydrogen"], answer: "D" },
  { q: "Chemical symbol of Iron?", options: ["A. Ir","B. In","C. Fe","D. Io"], answer: "C" },
  { q: "1 mole = ?", options: ["A. 6.022×10²³ particles","B. 100 atoms","C. 1000 molecules","D. 10²⁰ atoms"], answer: "A" },
  { q: "Which is NOT organic?", options: ["A. Methane","B. Glucose","C. NaCl","D. Ethanol"], answer: "C" },
  { q: "IUPAC name of CH4?", options: ["A. Ethane","B. Propane","C. Methane","D. Butane"], answer: "C" },
  { q: "Catalyst in Haber process?", options: ["A. Platinum","B. Iron","C. Copper","D. Nickel"], answer: "B" },
  { q: "pH below 7 means solution is?", options: ["A. neutral","B. basic","C. acidic","D. salt"], answer: "C" },
  { q: "Which gas is produced in photosynthesis?", options: ["A. CO2","B. N2","C. H2","D. O2"], answer: "D" },
  { q: "Chemical formula of water?", options: ["A. HO","B. H2O","C. H3O","D. OH2"], answer: "B" },
  { q: "Atomic number of Hydrogen?", options: ["A. 2","B. 3","C. 1","D. 4"], answer: "C" },
  { q: "Chemical symbol of Gold?", options: ["A. Go","B. Gd","C. Au","D. Ag"], answer: "C" },
  { q: "Chemical symbol of Silver?", options: ["A. Si","B. Ag","C. Au","D. Sr"], answer: "B" },
  { q: "Hardest natural substance?", options: ["A. Gold","B. Iron","C. Quartz","D. Diamond"], answer: "D" },
  { q: "Which acid is present in lemon?", options: ["A. Acetic acid","B. Citric acid","C. Tartaric acid","D. Lactic acid"], answer: "B" },
  { q: "Which gas is called laughing gas?", options: ["A. NO","B. N2O","C. NO2","D. N2O4"], answer: "B" },
  { q: "Atomic number of Oxygen?", options: ["A. 6","B. 7","C. 8","D. 9"], answer: "C" },
  { q: "Which metal is liquid at room temperature?", options: ["A. Iron","B. Mercury","C. Copper","D. Lead"], answer: "B" },
  { q: "Chemical formula of ozone?", options: ["A. O","B. O2","C. O3","D. O4"], answer: "C" },
  { q: "Most abundant element in Earth crust?", options: ["A. Silicon","B. Iron","C. Aluminium","D. Oxygen"], answer: "D" },
  { q: "Number of periods in periodic table?", options: ["A. 5","B. 6","C. 7","D. 8"], answer: "C" },
  { q: "Which bond is formed by transfer of electrons?", options: ["A. Covalent","B. Metallic","C. Ionic","D. Hydrogen"], answer: "C" },
  { q: "Number of electrons in outermost shell of Sodium?", options: ["A. 1","B. 2","C. 3","D. 8"], answer: "A" },
  { q: "Electronegativity increases going?", options: ["A. down a group","B. left to right","C. right to left","D. down and left"], answer: "B" },
  { q: "Outermost electrons in noble gases except He?", options: ["A. 2","B. 6","C. 4","D. 8"], answer: "D" },

  // ── GENERAL KNOWLEDGE ────────────────────────
  { q: "Capital of India?", options: ["A. Mumbai","B. Kolkata","C. New Delhi","D. Chennai"], answer: "C" },
  { q: "Largest planet in solar system?", options: ["A. Saturn","B. Neptune","C. Jupiter","D. Uranus"], answer: "C" },
  { q: "How many states in India (2024)?", options: ["A. 28","B. 29","C. 30","D. 27"], answer: "A" },
  { q: "National animal of India?", options: ["A. Lion","B. Elephant","C. Tiger","D. Leopard"], answer: "C" },
  { q: "National bird of India?", options: ["A. Sparrow","B. Peacock","C. Parrot","D. Eagle"], answer: "B" },
  { q: "Father of the Nation of India?", options: ["A. Nehru","B. Patel","C. Bose","D. Gandhi"], answer: "D" },
  { q: "Longest river in India?", options: ["A. Yamuna","B. Godavari","C. Ganga","D. Krishna"], answer: "C" },
  { q: "Currency of Japan?", options: ["A. Yuan","B. Won","C. Yen","D. Ringgit"], answer: "C" },
  { q: "How many bones in adult human body?", options: ["A. 196","B. 200","C. 206","D. 212"], answer: "C" },
  { q: "Largest ocean in the world?", options: ["A. Atlantic","B. Indian","C. Arctic","D. Pacific"], answer: "D" },
  { q: "Who invented telephone?", options: ["A. Edison","B. Bell","C. Newton","D. Tesla"], answer: "B" },
  { q: "Capital of Australia?", options: ["A. Sydney","B. Melbourne","C. Canberra","D. Brisbane"], answer: "C" },
  { q: "Which planet is known as Red Planet?", options: ["A. Venus","B. Jupiter","C. Mars","D. Saturn"], answer: "C" },
  { q: "Largest desert in world?", options: ["A. Gobi","B. Sahara","C. Arabian","D. Antarctic"], answer: "D" },
  { q: "National flower of India?", options: ["A. Rose","B. Jasmine","C. Lotus","D. Sunflower"], answer: "C" },
  { q: "Mount Everest is in which country?", options: ["A. India","B. China","C. Tibet","D. Nepal"], answer: "D" },
  { q: "Who wrote Ramayana?", options: ["A. Valmiki","B. Tulsidas","C. Vyasa","D. Kalidasa"], answer: "A" },
  { q: "Capital of France?", options: ["A. London","B. Berlin","C. Rome","D. Paris"], answer: "D" },
  { q: "National sport of India?", options: ["A. Cricket","B. Hockey","C. Football","D. Kabaddi"], answer: "B" },
  { q: "Who invented computer?", options: ["A. Bill Gates","B. Charles Babbage","C. Alan Turing","D. Steve Jobs"], answer: "B" },
  { q: "Capital of China?", options: ["A. Shanghai","B. Hong Kong","C. Beijing","D. Guangzhou"], answer: "C" },
  { q: "Largest state in India by area?", options: ["A. Maharashtra","B. Madhya Pradesh","C. Uttar Pradesh","D. Rajasthan"], answer: "D" },
  { q: "Which country has largest population?", options: ["A. USA","B. India","C. China","D. Russia"], answer: "B" },
  { q: "How many continents are there?", options: ["A. 5","B. 6","C. 7","D. 8"], answer: "C" },
  { q: "Currency of India?", options: ["A. Dollar","B. Pound","C. Rupee","D. Euro"], answer: "C" },
  { q: "How many players in cricket team?", options: ["A. 9","B. 10","C. 11","D. 12"], answer: "C" },
  { q: "Which is smallest continent?", options: ["A. Europe","B. Australia","C. Antarctica","D. South America"], answer: "B" },
  { q: "How many teeth does an adult human have?", options: ["A. 28","B. 30","C. 32","D. 34"], answer: "C" },
  { q: "Which is longest wall in world?", options: ["A. Berlin Wall","B. Hadrian Wall","C. Great Wall of China","D. Aurelian Wall"], answer: "C" },
  { q: "Speed of light?", options: ["A. 3×10⁶ m/s","B. 3×10⁸ m/s","C. 3×10¹⁰ m/s","D. 3×10⁴ m/s"], answer: "B" },

  // ── CURRENT AFFAIRS ───────────────────────────
  { q: "First woman President of India?", options: ["A. Sonia Gandhi","B. Pratibha Patil","C. Sushma Swaraj","D. Sarojini Naidu"], answer: "B" },
  { q: "India became independent on?", options: ["A. 15 Aug 1945","B. 26 Jan 1950","C. 15 Aug 1947","D. 26 Jan 1947"], answer: "C" },
  { q: "First Prime Minister of India?", options: ["A. Sardar Patel","B. Rajendra Prasad","C. Jawaharlal Nehru","D. Lal Bahadur Shastri"], answer: "C" },
  { q: "First President of India?", options: ["A. Nehru","B. Rajendra Prasad","C. Radhakrishnan","D. Zakir Hussain"], answer: "B" },
  { q: "ISRO headquarters is located in?", options: ["A. Mumbai","B. Hyderabad","C. Bengaluru","D. Chennai"], answer: "C" },
  { q: "Which mission landed on Moon's south pole?", options: ["A. Chandrayaan 1","B. Chandrayaan 2","C. Chandrayaan 3","D. Mangalyaan"], answer: "C" },
  { q: "Capital of Andhra Pradesh?", options: ["A. Hyderabad","B. Vijayawada","C. Amaravati","D. Visakhapatnam"], answer: "C" },
  { q: "Capital of Telangana?", options: ["A. Warangal","B. Nizamabad","C. Karimnagar","D. Hyderabad"], answer: "D" },
  { q: "G20 summit 2023 was held in?", options: ["A. Mumbai","B. New Delhi","C. Bengaluru","D. Chennai"], answer: "B" },
  { q: "India's rank in population (2024)?", options: ["A. 1st","B. 2nd","C. 3rd","D. 4th"], answer: "A" },
  { q: "Digital India was launched in?", options: ["A. 2013","B. 2014","C. 2015","D. 2016"], answer: "C" },
  { q: "Make in India was launched by?", options: ["A. Manmohan Singh","B. Narendra Modi","C. Atal Bihari","D. Rajiv Gandhi"], answer: "B" },
  { q: "UPI was launched by?", options: ["A. RBI","B. SBI","C. NPCI","D. SEBI"], answer: "C" },
  { q: "Swachh Bharat Mission was launched in?", options: ["A. 2013","B. 2014","C. 2015","D. 2016"], answer: "B" },
  { q: "PM KISAN scheme provides how much per year?", options: ["A. 2000","B. 4000","C. 6000","D. 8000"], answer: "C" },
  { q: "India's first satellite was?", options: ["A. INSAT","B. Aryabhata","C. Rohini","D. Chandrayaan"], answer: "B" },
  { q: "Indian Constitution came into effect on?", options: ["A. 15 Aug 1947","B. 26 Jan 1950","C. 26 Nov 1949","D. 2 Oct 1950"], answer: "B" },
  { q: "India's first IIT was established in?", options: ["A. Mumbai","B. Delhi","C. Kharagpur","D. Chennai"], answer: "C" },
  { q: "RBI Governor as of 2024?", options: ["A. Urjit Patel","B. Raghuram Rajan","C. Shaktikanta Das","D. D Subbarao"], answer: "C" },
  { q: "Which state has most districts in India?", options: ["A. Maharashtra","B. Rajasthan","C. UP","D. MP"], answer: "C" },

  // ── INDIAN CONSTITUTION ───────────────────────
  { q: "Indian Constitution adopted on?", options: ["A. 15 Aug 1947","B. 26 Jan 1950","C. 26 Nov 1949","D. 2 Oct 1949"], answer: "C" },
  { q: "Articles in original Indian Constitution?", options: ["A. 356","B. 395","C. 400","D. 448"], answer: "B" },
  { q: "Which article abolishes untouchability?", options: ["A. Article 14","B. Article 15","C. Article 17","D. Article 21"], answer: "C" },
  { q: "Father of Indian Constitution?", options: ["A. Gandhi","B. Nehru","C. Ambedkar","D. Patel"], answer: "C" },
  { q: "Article dealing with Right to Equality?", options: ["A. Article 12","B. Article 14","C. Article 19","D. Article 21"], answer: "B" },
  { q: "Preamble starts with?", options: ["A. We the Citizens","B. We the People","C. We the Indians","D. We the Nation"], answer: "B" },
  { q: "Part of Constitution with Fundamental Rights?", options: ["A. Part II","B. Part III","C. Part IV","D. Part V"], answer: "B" },
  { q: "Right to vote age in India?", options: ["A. 16","B. 18","C. 21","D. 25"], answer: "B" },
  { q: "Article giving right to freedom of speech?", options: ["A. Article 14","B. Article 16","C. Article 19","D. Article 21"], answer: "C" },
  { q: "How many Fundamental Rights in Constitution?", options: ["A. 5","B. 6","C. 7","D. 8"], answer: "B" },
  { q: "Directive Principles are in which part?", options: ["A. Part II","B. Part III","C. Part IV","D. Part V"], answer: "C" },
  { q: "Who appoints Chief Justice of India?", options: ["A. Prime Minister","B. Parliament","C. President","D. Vice President"], answer: "C" },
  { q: "Minimum age to become President of India?", options: ["A. 25","B. 30","C. 35","D. 40"], answer: "C" },
  { q: "Indian Parliament has how many houses?", options: ["A. 1","B. 2","C. 3","D. 4"], answer: "B" },
  { q: "Rajya Sabha members serve for how many years?", options: ["A. 4","B. 5","C. 6","D. 7"], answer: "C" },
  { q: "Article dealing with Right to Life?", options: ["A. Article 19","B. Article 20","C. Article 21","D. Article 22"], answer: "C" },
  { q: "How many schedules in Indian Constitution?", options: ["A. 10","B. 12","C. 14","D. 8"], answer: "B" },
  { q: "Right to Education is under which article?", options: ["A. Article 19","B. Article 21","C. Article 21A","D. Article 22"], answer: "C" },
  { q: "India is described as what in Constitution?", options: ["A. Federal State","B. Union of States","C. Confederation","D. Republic only"], answer: "B" },
  { q: "Emergency provisions are in which article?", options: ["A. Article 352","B. Article 360","C. Article 356","D. All of these"], answer: "D" },
];

// ── STATE VARIABLES ───────────────────────────
let adPlaying           = false;
let quizActive          = false;
let currentQuestion     = null;
let shuffledList        = [];
let answered            = false;
let adEnded             = false;
let score               = 0;
let totalAsked          = 0;
let totalAttempted      = 0;
let checkInterval       = null;
let drowsyPaused        = false;
let facePaused          = false;
let lastReportedSubject = "";

const MIN_ATTEMPTS = 5;

function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function getVideo() {
  return document.querySelector('video');
}

function muteAd() {
  const v = getVideo();
  if (v) v.muted = true;
}

function pauseVideo() {
  const v = getVideo();
  if (v && !v.paused) v.pause();
}

function playVideo() {
  const v = getVideo();
  if (v) { v.muted = false; v.play(); }
}

function isAdPlaying() {
  const player = document.querySelector('.html5-video-player');
  return (
    (player && player.classList.contains('ad-showing'))      ||
    (player && player.classList.contains('ad-interrupting')) ||
    document.querySelector('.ytp-ad-badge')                  !== null ||
    document.querySelector('.ytp-ad-simple-ad-badge')        !== null ||
    document.querySelector('.ytp-ad-text')                   !== null
  );
}

// ── Subject detection ─────────────────────────
function detectSubject(title) {
  const t = title.toLowerCase();
  if (/chemistry|organic|chemical|reaction|periodic|acid|base|molecule|bond|valency|\bph\b|mole|inorganic/.test(t))
    return "Chemistry";
  if (/physics|mechanics|optics|force|motion|velocity|wave|light|electric|magnetic|thermodynamics|kinematics/.test(t))
    return "Physics";
  if (/math|maths|calculus|algebra|geometry|trigonometry|statistics|probability|integral|derivative|ellipse|hyperbola|parabola/.test(t))
    return "Maths";
  if (/biology|cell|dna|genetics|evolution|ecology|anatomy|botany|zoology|photosynthesis|organism/.test(t))
    return "Biology";
  if (/constitution|polity|civics|parliament|fundamental|rights|directive|amendment|preamble|article/.test(t))
    return "Constitution";
  if (/history|ancient|medieval|mughal|british|empire|war|independence|freedom|revolution/.test(t))
    return "History/GK";
  if (/python|java|c\+\+|programming|coding|algorithm|data structure|dbms|sql|operating system|computer science/.test(t))
    return "CS/Programming";
  if (/current affairs|scheme|isro|chandrayaan|g20|digital india|government|policy|mission/.test(t))
    return "Current Affairs";
  return "mixed";
}

function getQuestionsForSubject(subject) {
  const map = {
    "Chemistry":       YOUTUBE_QUESTIONS.slice(0, 35),
    "Physics":         PHYSICS_QUESTIONS,
    "Maths":           MATHS_QUESTIONS,
    "Biology":         BIOLOGY_QUESTIONS,
    "Constitution":    YOUTUBE_QUESTIONS.slice(95, 115),
    "History/GK":      YOUTUBE_QUESTIONS.slice(35, 65),
    "CS/Programming":  YOUTUBE_QUESTIONS.slice(35, 65),
    "Current Affairs": YOUTUBE_QUESTIONS.slice(65, 95),
  };
  const pool = map[subject];
  return (pool && pool.length >= 5) ? pool : YOUTUBE_QUESTIONS;
}

function detectCurrentSubject() {
  const selectors = [
    'h1.ytd-video-primary-info-renderer',
    '#title h1',
    'h1.style-scope.ytd-watch-metadata',
    '#above-the-fold #title h1',
    'h1'
  ];
  let title = "";
  for (const sel of selectors) {
    const el = document.querySelector(sel);
    if (el && el.textContent.trim().length > 3) {
      title = el.textContent.trim();
      break;
    }
  }
  if (!title) title = document.title;
  return detectSubject(title);
}

function reportSubjectToServer(subject) {
  if (subject !== lastReportedSubject || lastReportedSubject === "") {
    lastReportedSubject = subject;
    fetch(`${SERVER}/subject`, {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({ subject })
    }).catch(() => {});
  }
}

function removeOverlay() {
  const el = document.getElementById('adquiz-overlay');
  if (el) el.remove();
}

function resetState() {
  adPlaying       = false;
  quizActive      = false;
  currentQuestion = null;
  answered        = false;
  adEnded         = false;
  score           = 0;
  totalAsked      = 0;
  totalAttempted  = 0;
}

function createOverlay() {
  removeOverlay();
  const overlay = document.createElement('div');
  overlay.id = 'adquiz-overlay';
  overlay.style.cssText = `
    position:fixed; top:0; left:0; width:100%; height:100%;
    background:rgba(0,0,0,0.90); z-index:999999;
    display:flex; align-items:center; justify-content:center;
    font-family:Arial,sans-serif;
  `;
  overlay.innerHTML = `
    <div id="adquiz-box" style="
      background:#1a1a1a; border-radius:16px; padding:32px 36px;
      max-width:560px; width:90%; border:1px solid #333;
    ">
      <div style="display:flex;justify-content:space-between;margin-bottom:14px;">
        <div style="font-size:13px;color:#888;">EduGuard AI — Ad Break</div>
        <div id="aq-score" style="font-size:13px;color:#ffaa00;">Score: 0</div>
      </div>
      <div id="aq-attempts-bar" style="
        display:flex; gap:8px; justify-content:center; margin-bottom:16px;
      "></div>
      <div id="aq-question" style="
        font-size:20px; color:#fff; font-weight:bold;
        margin-bottom:22px; line-height:1.4; text-align:center;
      ">Loading...</div>
      <div id="aq-options" style="
        display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:18px;
      "></div>
      <div id="aq-feedback" style="
        font-size:15px; text-align:center; min-height:22px; color:#fff; margin-bottom:10px;
      "></div>
      <div id="aq-timer" style="font-size:12px;color:#555;text-align:center;">
        Ad playing — answer to learn! Must attempt 5 questions.
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

function updateAttemptsBar() {
  const bar = document.getElementById('aq-attempts-bar');
  if (!bar) return;
  bar.innerHTML = '';
  for (let i = 0; i < MIN_ATTEMPTS; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      width:36px; height:16px; border-radius:4px;
      background:${i < totalAttempted ? '#ffaa00' : '#333'};
      border:1px solid ${i < totalAttempted ? '#ffaa00' : '#555'};
      transition:background 0.3s;
    `;
    bar.appendChild(dot);
  }
  const label = document.createElement('div');
  label.style.cssText = 'font-size:11px;color:#888;margin-left:8px;align-self:center;';
  label.textContent = `${totalAttempted}/${MIN_ATTEMPTS} attempted`;
  bar.appendChild(label);
}

function showScoreScreen() {
  const box = document.getElementById('adquiz-box');
  if (!box) return;
  const pct = totalAsked > 0 ? Math.round((score / totalAsked) * 100) : 0;
  let msg = '', col = '';
  if (pct === 100)    { msg = 'Perfect! Amazing work!';              col = '#44ff44'; }
  else if (pct >= 60) { msg = 'Good job! Keep it up!';               col = '#ffaa00'; }
  else                { msg = 'Keep practising — you will improve!'; col = '#ff6666'; }

  box.innerHTML = `
    <div style="text-align:center;padding:20px 0;">
      <div style="font-size:52px;font-weight:bold;color:${col};margin-bottom:8px;">
        ${score} / ${totalAsked}
      </div>
      <div style="font-size:18px;color:#fff;margin-bottom:8px;">Questions answered correctly</div>
      <div style="font-size:15px;color:${col};margin-bottom:8px;">${msg}</div>
      <div style="font-size:13px;color:#888;margin-bottom:24px;">
        You attempted ${totalAttempted} questions this ad break!
      </div>
      <div style="font-size:13px;color:#555;">Video starts in 2 seconds...</div>
    </div>
  `;
  setTimeout(() => {
    removeOverlay();
    setTimeout(() => { playVideo(); resetState(); }, 500);
  }, 2000);
}

function canCloseQuiz() {
  return totalAttempted >= MIN_ATTEMPTS;
}

function renderQuestion() {
  if (!currentQuestion) return;
  const qEl  = document.getElementById('aq-question');
  const opEl = document.getElementById('aq-options');
  const fbEl = document.getElementById('aq-feedback');
  const scEl = document.getElementById('aq-score');
  if (!qEl) return;

  qEl.textContent  = currentQuestion.q;
  fbEl.textContent = '';
  scEl.textContent = `Score: ${score}`;
  answered         = false;
  opEl.innerHTML   = '';

  currentQuestion.options.forEach((opt, i) => {
    const keys = ['A', 'B', 'C', 'D'];
    const btn  = document.createElement('button');
    btn.textContent  = opt;
    btn.dataset.key  = keys[i];
    btn.style.cssText = `
      padding:14px 10px; border:1.5px solid #444; border-radius:10px;
      background:#2a2a2a; color:#fff; font-size:14px; cursor:pointer;
      text-align:left; width:100%;
    `;
    btn.addEventListener('click', () => handleAnswer(keys[i]));
    opEl.appendChild(btn);
  });
  updateAttemptsBar();
}

function handleAnswer(selected) {
  if (answered) return;
  answered       = true;
  totalAsked    += 1;
  totalAttempted += 1;

  const correct = currentQuestion.answer;
  const isRight = selected === correct;
  if (isRight) score += 1;

  const fbEl = document.getElementById('aq-feedback');
  const opEl = document.getElementById('aq-options');
  const scEl = document.getElementById('aq-score');

  opEl.querySelectorAll('button').forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.key === correct) {
      btn.style.background  = '#1a4a1a';
      btn.style.borderColor = '#44ff44';
      btn.style.color       = '#44ff44';
    } else if (btn.dataset.key === selected && !isRight) {
      btn.style.background  = '#4a1a1a';
      btn.style.borderColor = '#ff4444';
      btn.style.color       = '#ff4444';
    }
  });

  scEl.textContent = `Score: ${score}`;
  updateAttemptsBar();

  if (isRight) {
    fbEl.style.color = '#44ff44';
    fbEl.textContent = 'Correct!';
  } else {
    fbEl.style.color = '#ff4444';
    fbEl.textContent = `Wrong! Correct answer: ${correct}`;
  }

  const timerEl = document.getElementById('aq-timer');
  if (timerEl) {
    if (totalAttempted >= MIN_ATTEMPTS) {
      if (adEnded) {
        timerEl.style.color = '#44ff44';
        timerEl.textContent = 'Great! Loading score...';
      } else {
        timerEl.style.color = '#44ff44';
        timerEl.textContent = `${totalAttempted} questions done! Keep going until ad ends.`;
      }
    } else {
      timerEl.style.color = '#ffaa00';
      timerEl.textContent = `${MIN_ATTEMPTS - totalAttempted} more question(s) needed!`;
    }
  }

  if (adEnded && canCloseQuiz()) {
    setTimeout(showScoreScreen, 2000);
    return;
  }
  setTimeout(loadNext, 2000);
}

function loadNext() {
  if (shuffledList.length === 0) {
    shuffledList = shuffleArray(YOUTUBE_QUESTIONS);
  }
  currentQuestion = shuffledList.pop();
  answered        = false;
  renderQuestion();
}

async function onAdStarted() {
  if (quizActive || adPlaying) return;
  adPlaying = true; adEnded = false; quizActive = true;
  score = 0; totalAsked = 0; totalAttempted = 0;

  // Detect subject directly from video title
  const subject = detectCurrentSubject();
  reportSubjectToServer(subject);

  // Also check server in case student manually overrode in popup
  let activeSubject = subject;
  try {
    const res  = await fetch(`${SERVER}/subject`);
    const data = await res.json();
    if (data.subject && data.subject !== "mixed") {
      activeSubject = data.subject;
    }
  } catch (e) {}

  console.log(`EduGuard AI: Ad started — Subject: ${activeSubject}`);
  const pool = getQuestionsForSubject(activeSubject);
  shuffledList = shuffleArray(pool);

  muteAd();
  createOverlay();
  loadNext();

  fetch(`${SERVER}/ad-started`, {
    method : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body   : JSON.stringify({ subject: activeSubject })
  }).catch(() => {});
}

function onAdEnded() {
  if (!quizActive) return;
  adPlaying = false;
  adEnded   = true;

  const timerEl = document.getElementById('aq-timer');
  if (canCloseQuiz()) {
    if (timerEl) {
      timerEl.style.color = '#ffaa00';
      timerEl.textContent = 'Ad ended — answer this last question!';
    }
  } else {
    pauseVideo();
    if (timerEl) {
      timerEl.style.color = '#ff4444';
      timerEl.textContent = `Ad ended — answer ${MIN_ATTEMPTS - totalAttempted} more question(s) to continue!`;
    }
  }

  fetch(`${SERVER}/ad-ended`, {
    method : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body   : JSON.stringify({})
  }).catch(() => {});
}

// ── Main detection loop ───────────────────────
function startDetection() {
  if (checkInterval) clearInterval(checkInterval);
  checkInterval = setInterval(() => {
    const nowAd = isAdPlaying();
    if (nowAd  && !adPlaying) onAdStarted();
    if (!nowAd &&  adPlaying) onAdEnded();
    if (adPlaying) muteAd();
  }, 500);
}

// ── Face countdown overlay ────────────────────
function showFaceCountdown(remaining) {
  let box = document.getElementById('adquiz-face-countdown');
  if (!box) {
    box = document.createElement('div');
    box.id = 'adquiz-face-countdown';
    box.style.cssText = `
      position:fixed; top:50%; left:50%;
      transform:translate(-50%,-50%);
      background:rgba(0,0,0,0.85);
      border:2px solid #ff6600; border-radius:16px;
      padding:30px 50px; z-index:999998;
      text-align:center; font-family:Arial,sans-serif;
    `;
    document.body.appendChild(box);
  }
  box.innerHTML = `
    <div style="font-size:18px;color:#ff6600;margin-bottom:10px;">
      Student not detected!
    </div>
    <div style="font-size:72px;font-weight:bold;color:#ffffff;line-height:1;">
      ${remaining}
    </div>
    <div style="font-size:14px;color:#aaaaaa;margin-top:10px;">
      Come back to screen!<br>Buzzer starts if you don't return.
    </div>
  `;
}

function removeFaceCountdown() {
  const box = document.getElementById('adquiz-face-countdown');
  if (box) box.remove();
}

// ── Drowsiness + face away polling ───────────
async function checkDrowsiness() {
  if (adPlaying) return;
  try {
    const res  = await fetch(`${SERVER}/status`);
    const data = await res.json();

    if (data.drowsy_on && !drowsyPaused) {
      drowsyPaused = true;
      const video = getVideo();
      if (video) { video.pause(); video.muted = true; }
    }
    if (!data.drowsy_on && drowsyPaused) {
      drowsyPaused = false;
      const video = getVideo();
      if (video) { video.muted = false; video.play(); }
    }

    if (data.face_away && !drowsyPaused && !adPlaying) {
      const remaining = Math.max(0, 10 - data.face_away_seconds);
      if (data.face_away_seconds < 10) {
        showFaceCountdown(remaining);
      }
      if (data.face_away_seconds >= 10 && !facePaused) {
        facePaused = true;
        removeFaceCountdown();
        const video = getVideo();
        if (video) video.pause();
      }
    }

    if (!data.face_away) {
      removeFaceCountdown();
      if (facePaused) {
        facePaused = false;
        const video = getVideo();
        if (video) video.play();
      }
    }

  } catch (e) {}
}

// ── Start everything ──────────────────────────
startDetection();
setInterval(checkDrowsiness, 1000);

// Detect subject 3 seconds after page loads
setTimeout(() => {
  const subject = detectCurrentSubject();
  reportSubjectToServer(subject);
}, 3000);

// ── Handle YouTube page navigation ───────────
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    removeOverlay();
    resetState();
    lastReportedSubject = "";
    setTimeout(startDetection, 2000);
    setTimeout(() => {
      const subject = detectCurrentSubject();
      reportSubjectToServer(subject);
    }, 4000);
  }
}).observe(document, { subtree: true, childList: true });
