export const departments = [
  {
    id: "cardiology",
    name: "Cardiology",
    icon: "Heart",
    description: "Comprehensive cardiac care from diagnosis to complex interventions and cardiac surgery.",
    treatments: ["Angioplasty", "Bypass Surgery", "Pacemaker Implantation", "Heart Failure Management", "Arrhythmia Treatment", "Structural Heart Disease"],
    procedures: ["Echocardiography", "Cardiac CT & MRI", "Stress Testing", "Holter Monitoring", "Cardiac Catheterization", "Electrophysiology Study"],
    technology: ["Hybrid Cath Lab", "3D Echocardiography", "Robotic-Assisted Surgery", "TAVI System"],
    faqs: [
      { question: "When should I see a cardiologist?", answer: "If you experience chest pain, shortness of breath, irregular heartbeat, or have risk factors like hypertension or diabetes, a cardiologist consultation is recommended." },
      { question: "What is an ECG?", answer: "An electrocardiogram (ECG) records the electrical signals in your heart to detect various heart conditions." }
    ]
  },
  {
    id: "oncology",
    name: "Oncology",
    icon: "Ribbon",
    description: "Integrated cancer care combining surgery, radiation, medical oncology and cutting-edge immunotherapy.",
    treatments: ["Chemotherapy", "Immunotherapy", "Targeted Therapy", "Hormone Therapy", "Bone Marrow Transplant", "Palliative Care"],
    procedures: ["PET Scan", "Biopsy", "Radiation Therapy", "Surgical Oncology", "HIFU", "Cryotherapy"],
    technology: ["Linear Accelerator (LINAC)", "CyberKnife", "PET-CT Scanner", "Infusion Therapy Suite"],
    faqs: [
      { question: "What is the first step after a cancer diagnosis?", answer: "Our multidisciplinary tumor board reviews every case to create a personalized treatment plan before any therapy begins." },
      { question: "Is chemotherapy always necessary?", answer: "Not always. Treatment depends on cancer type, stage, and individual factors. Many cancers are now treated with targeted therapies." }
    ]
  },
  {
    id: "neurology",
    name: "Neurology",
    icon: "Brain",
    description: "Advanced neurological care for brain, spine, and peripheral nervous system disorders.",
    treatments: ["Stroke Management", "Epilepsy Treatment", "Parkinson's Disease", "Multiple Sclerosis", "Dementia Care", "Headache Clinic"],
    procedures: ["MRI & CT Neuroimaging", "EEG", "Nerve Conduction Study", "Lumbar Puncture", "Deep Brain Stimulation"],
    technology: ["3T MRI Scanner", "Intraoperative Neuromonitoring", "Gamma Knife", "Neuro-Navigation System"],
    faqs: [
      { question: "What are stroke warning signs?", answer: "Remember FAST: Face drooping, Arm weakness, Speech difficulty, Time to call emergency. Immediate treatment is critical." }
    ]
  },
  {
    id: "orthopedics",
    name: "Orthopedics",
    icon: "Bone",
    description: "Specialized care for bones, joints, muscles, and the entire musculoskeletal system.",
    treatments: ["Joint Replacement", "Spine Surgery", "Sports Injury", "Fracture Management", "Arthritis Treatment", "Pediatric Orthopedics"],
    procedures: ["Arthroscopy", "Hip Replacement", "Knee Replacement", "Spinal Fusion", "Limb Lengthening"],
    technology: ["Robotic Joint Replacement", "Navigation-Assisted Surgery", "Computer-Aided Design Implants"],
    faqs: [
      { question: "What is robotic knee replacement?", answer: "Robotic assistance allows for more precise implant placement, resulting in better outcomes and faster recovery times." }
    ]
  },
  {
    id: "gastroenterology",
    name: "Gastroenterology",
    icon: "Stethoscope",
    description: "Expert diagnosis and treatment of digestive system disorders from esophagus to colon.",
    treatments: ["GERD Treatment", "IBD Management", "Liver Disease", "Pancreatic Disorders", "Colorectal Conditions", "Hepatology"],
    procedures: ["Colonoscopy", "Upper Endoscopy", "ERCP", "Capsule Endoscopy", "Liver Biopsy", "pH Monitoring"],
    technology: ["HD Video Endoscopy", "Confocal Laser Endomicroscopy", "FibroScan"],
    faqs: [
      { question: "How often should I get a colonoscopy?", answer: "Adults 45+ with average risk should get a colonoscopy every 10 years. High-risk individuals may need more frequent screening." }
    ]
  },
  {
    id: "nephrology",
    name: "Nephrology",
    icon: "Droplets",
    description: "Comprehensive kidney care including dialysis, transplant evaluation, and chronic kidney disease management.",
    treatments: ["CKD Management", "Dialysis", "Kidney Transplant", "Hypertension Management", "Glomerulonephritis"],
    procedures: ["Kidney Biopsy", "Hemodialysis", "Peritoneal Dialysis", "CAPD", "Renal Ultrasound"],
    technology: ["High-Flux Dialysis Machines", "Online Hemodiafiltration", "APD System"],
    faqs: [
      { question: "What are signs of kidney disease?", answer: "Watch for swelling in legs/ankles, fatigue, decreased urination, foamy urine, and persistent itching." }
    ]
  },
  {
    id: "urology",
    name: "Urology",
    icon: "Shield",
    description: "Advanced urological care using minimally invasive and robotic surgical techniques.",
    treatments: ["Kidney Stone Treatment", "Prostate Conditions", "Bladder Cancer", "Urinary Incontinence", "Male Infertility", "Pediatric Urology"],
    procedures: ["RIRS", "PCNL", "Robotic Prostatectomy", "TURP", "Cystoscopy", "Vasectomy"],
    technology: ["da Vinci Surgical System", "Holmium Laser", "Urodynamics Suite"],
    faqs: [
      { question: "What is robotic prostate surgery?", answer: "Robotic surgery offers smaller incisions, less blood loss, and faster recovery compared to traditional open surgery." }
    ]
  },
  {
    id: "pediatrics",
    name: "Pediatrics",
    icon: "Baby",
    description: "Specialized healthcare for infants, children, and adolescents in a child-friendly environment.",
    treatments: ["Neonatology", "Pediatric Cardiology", "Pediatric Neurology", "Growth Disorders", "Childhood Cancers", "Immunization"],
    procedures: ["Well-Baby Checkups", "Developmental Assessment", "Pediatric Endoscopy", "NICU Care"],
    technology: ["Level III NICU", "Pediatric Ventilators", "Phototherapy Units", "Infusion Pumps"],
    faqs: [
      { question: "At what age should I start bringing my child for regular checkups?", answer: "Well-baby visits are recommended at 1, 2, 4, 6, 9, 12, 15, 18, 24, and 30 months, then annually." }
    ]
  },
  {
    id: "dermatology",
    name: "Dermatology",
    icon: "Sun",
    description: "Medical and cosmetic dermatology for skin, hair, and nail conditions.",
    treatments: ["Acne Treatment", "Psoriasis", "Eczema", "Skin Cancer", "Vitiligo", "Hair Loss"],
    procedures: ["Skin Biopsy", "PUVA Therapy", "Laser Treatment", "Chemical Peel", "Botox & Fillers"],
    technology: ["Q-Switched Laser", "Excimer Laser", "Dermatoscopy", "Wood's Lamp"],
    faqs: [
      { question: "When should I see a dermatologist for a mole?", answer: "Use the ABCDE rule: Asymmetry, Border irregularity, Color variation, Diameter >6mm, Evolution/change. Any concern warrants evaluation." }
    ]
  },
  {
    id: "ent",
    name: "ENT",
    icon: "Ear",
    description: "Expert care for ear, nose, throat, head, and neck conditions for all ages.",
    treatments: ["Hearing Loss", "Sinusitis", "Tonsillitis", "Sleep Apnea", "Head & Neck Cancer", "Vertigo"],
    procedures: ["Tonsillectomy", "Septoplasty", "FESS", "Cochlear Implant", "Myringotomy", "Laryngoscopy"],
    technology: ["Powered Instrumentation", "Nerve Monitoring", "Navigation System", "Robotic Surgery"],
    faqs: [
      { question: "What causes chronic sinusitis?", answer: "Chronic sinusitis may be caused by nasal polyps, deviated septum, allergies, or infections. Medical management is first-line; surgery may be needed." }
    ]
  },
  {
    id: "pulmonology",
    name: "Pulmonology",
    icon: "Wind",
    description: "Comprehensive respiratory care for acute and chronic lung diseases.",
    treatments: ["Asthma Management", "COPD", "Interstitial Lung Disease", "Sleep Disorders", "Lung Cancer", "Pleural Disease"],
    procedures: ["Bronchoscopy", "EBUS", "Pulmonary Function Test", "Sleep Study", "Thoracentesis", "Pleuroscopy"],
    technology: ["Endobronchial Ultrasound", "Navigational Bronchoscopy", "High-Resolution CT", "BiPAP/CPAP"],
    faqs: [
      { question: "What is COPD?", answer: "Chronic Obstructive Pulmonary Disease is a progressive lung disease causing airflow obstruction. It's primarily caused by smoking but can also result from pollution exposure." }
    ]
  }
];
