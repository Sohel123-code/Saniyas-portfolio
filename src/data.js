import {
  Stethoscope,
  ShieldCheck,
  Smile,
  Microscope,
  Users,
  ScanLine,
  HeartPulse,
  BookOpen,
  ClipboardList,
  Sparkles,
  MessageCircle,
  Dna,
  Ribbon,
} from "lucide-react";

export const navigation = [
  ["/", "Home"],
  ["/about", "About"],
  ["/clinical", "Clinical Journey"],
  ["/focus", "Future Focus"],
  ["/gallery", "Gallery"],
];

export const clinicalAreas = [
  {
    title: "Oral Diagnosis & Examination",
    category: "Diagnosis",
    icon: Stethoscope,
    summary: "The first step is always understanding.",
    detail:
      "Developing skills in patient history taking, systematic oral examination, dental charting, and basic diagnosis under clinical supervision.",
  },
  {
    title: "Preventive Dentistry",
    category: "Prevention",
    icon: ShieldCheck,
    summary: "Small habits. Healthier futures.",
    detail:
      "Learning the foundations of preventive oral care, risk awareness, and patient education as part of comprehensive dentistry.",
  },
  {
    title: "Conservative Dentistry",
    category: "Clinical practice",
    icon: Sparkles,
    summary: "Learning to preserve what matters.",
    detail:
      "Building an understanding of tooth preservation, restorative materials, and the principles of conservative dental care.",
  },
  {
    title: "Periodontology",
    category: "Clinical practice",
    icon: Smile,
    summary: "Looking beyond the surface.",
    detail:
      "Studying the supporting structures of teeth, periodontal assessment, and the fundamentals of gum health and patient counselling.",
  },
  {
    title: "Prosthodontics",
    category: "Clinical practice",
    icon: Smile,
    summary: "Exploring function and confidence.",
    detail:
      "Gaining academic and clinical exposure to the principles of replacing missing teeth and understanding oral function.",
  },
  {
    title: "Oral & Maxillofacial Surgery",
    category: "Clinical practice",
    icon: HeartPulse,
    summary: "Precision, observation, and care.",
    detail:
      "Learning surgical fundamentals, patient assessment, and clinical protocols through supervised exposure in oral surgery.",
  },
  {
    title: "Pediatric Dentistry",
    category: "Clinical practice",
    icon: Users,
    summary: "A gentle approach to little smiles.",
    detail:
      "Exploring age-appropriate communication, oral health education, and the fundamentals of dental care for children.",
  },
  {
    title: "Orthodontics",
    category: "Clinical practice",
    icon: Smile,
    summary: "Understanding how smiles develop.",
    detail:
      "Studying dental alignment, occlusion, growth, and the foundational principles of orthodontic assessment.",
  },
  {
    title: "Oral Medicine & Radiology",
    category: "Diagnosis",
    icon: ScanLine,
    summary: "Connecting observation with insight.",
    detail:
      "Developing an understanding of oral conditions, diagnostic reasoning, and the role of dental imaging in patient assessment.",
  },
  {
    title: "Community Dentistry",
    category: "Prevention",
    icon: Users,
    summary: "Oral health belongs to everyone.",
    detail:
      "Learning community-oriented approaches to oral health, awareness, prevention, and patient education.",
  },
  {
    title: "Dental Anatomy & Occlusion",
    category: "Diagnosis",
    icon: BookOpen,
    summary: "Strong care starts with foundations.",
    detail:
      "Building knowledge of tooth morphology, dental structures, and the relationships that support oral function.",
  },
  {
    title: "Basic Endodontic Procedures",
    category: "Clinical practice",
    icon: Microscope,
    summary: "An introduction to care within.",
    detail:
      "Developing foundational knowledge of endodontic principles and basic procedures within supervised clinical training.",
  },
  {
    title: "Dental Restoration Techniques",
    category: "Clinical practice",
    icon: Sparkles,
    summary: "Where knowledge becomes practice.",
    detail:
      "Learning the fundamentals of restorative techniques, material handling, and clinical documentation under supervision.",
  },
  {
    title: "Oral Hygiene & Patient Education",
    category: "Prevention",
    icon: MessageCircle,
    summary: "Making understanding part of care.",
    detail:
      "Practising clear, empathetic communication about everyday oral hygiene and the importance of continued oral care.",
  },
  {
    title: "Dental Radiographic Interpretation",
    category: "Diagnosis",
    icon: ScanLine,
    summary: "Learning to see the bigger picture.",
    detail:
      "Building the ability to recognise dental anatomy and interpret basic radiographic findings with guidance.",
  },
  {
    title: "Basic Emergency & Patient Management",
    category: "Clinical practice",
    icon: ClipboardList,
    summary: "Calm thinking. Considered care.",
    detail:
      "Studying the foundations of patient management, clinical preparedness, and basic emergency protocols in dental settings.",
  },
];

export const skills = {
  Clinical: [
    "Patient history taking",
    "Oral examination",
    "Basic diagnosis",
    "Treatment planning fundamentals",
    "Dental charting",
    "Oral hygiene counselling",
    "Basic clinical procedures under supervision",
  ],
  Academic: [
    "Oral pathology",
    "Oral medicine",
    "Periodontology",
    "Conservative dentistry",
    "Prosthodontics",
    "Oral surgery",
    "Community dentistry",
  ],
  Professional: [
    "Patient communication",
    "Clinical documentation",
    "Team collaboration",
    "Presentation skills",
    "Continuous learning",
  ],
};

export const interests = [
  [Smile, "Comprehensive Dentistry"],
  [Microscope, "Oral Pathology"],
  [Ribbon, "Oral Oncology"],
  [ShieldCheck, "Early Detection & Prevention"],
  [Dna, "Cancer Biology"],
  [Users, "Patient Education"],
  [BookOpen, "Dental Research"],
];

export const gallery = [
  {
    image: "oral-examination",
    title: "Care, close to home",
    category: "Patient care",
    description:
      "A special moment in Saniya’s clinical journey: caring for her mother during supervised dental training.",
    alt: "Saniya providing dental care to her mother in the teaching clinic",
    letterbox: true,
  },
  {
    image: "patient-care",
    title: "The human side of dentistry",
    category: "Patient care",
    description:
      "A moment from Saniya’s clinical learning journey at GITAM, Visakhapatnam.",
    alt: "Saniya beside a patient in the dental teaching clinic",
    letterbox: false,
  },

  {
    image: "chairside-learning",
    title: "A closer look at chairside learning",
    category: "Clinical learning",
    description:
      "Putting classroom knowledge into practice in a clinical learning environment.",
    alt: "Saniya practising chairside skills in the teaching clinic",
    letterbox: true,
  },
  {
    image: "restoration-learning",
    title: "Restorative learning in practice",
    category: "Learning records",
    description:
      "A clinical learning photograph documenting dental restoration. Part of the supplied student activity collection.",
    alt: "A supplied before-and-after photograph of dental restorative work",
    letterbox: false,
  },
  {
    image: "clinical-practice",
    title: "Care is in the details",
    category: "Patient care",
    description:
      "Building practical skills and confidence through supervised patient care.",
    alt: "Saniya attending to a patient during clinical training",
    letterbox: true,
  },
  {
    image: "hands-on-learning",
    title: "From theory to hands-on learning",
    category: "Clinical learning",
    description:
      "A glimpse into the everyday process of developing clinical skills.",
    alt: "Saniya working carefully during a dental training session",
    letterbox: true,
  },
];

export const pageTitles = {
  "/": "A curious mind. A caring heart.",
  "/about": "About Saniya",
  "/clinical": "Clinical Training & Areas of Exposure",
  "/focus": "Future Focus: Oral Oncology",
  "/gallery": "Moments of Learning",
  "/contact": "Let’s Connect",
};
