/**
 * What a Philippine CV actually carries: where people studied, what they are
 * licensed to do, and which languages they speak.
 *
 * The schools and certifications are real. That is the opposite of the choice
 * made for company names — claiming to have studied at UP Diliman or to hold a
 * PRC licence describes the person, and inventing "Pacific Institute of
 * Technology" would make the education section read as obviously fake. What
 * would be wrong is inventing an employer's job post; a candidate's alma mater
 * is not that.
 *
 * The licences matter more here than they would elsewhere: nursing, teaching,
 * engineering, accountancy and architecture are all PRC-regulated professions
 * in the Philippines, and a CV in those fields without a licence number is a CV
 * that will not be shortlisted.
 */

export interface SchoolSeed {
  name: string;
  /** Roughly where it is, so a graduate's history is geographically plausible. */
  region: string;
}

export const SCHOOLS: SchoolSeed[] = [
  { name: "University of the Philippines Diliman", region: "Metro Manila" },
  { name: "Ateneo de Manila University", region: "Metro Manila" },
  { name: "De La Salle University", region: "Metro Manila" },
  { name: "University of Santo Tomas", region: "Metro Manila" },
  { name: "Mapúa University", region: "Metro Manila" },
  { name: "Polytechnic University of the Philippines", region: "Metro Manila" },
  {
    name: "Technological Institute of the Philippines",
    region: "Metro Manila",
  },
  { name: "Far Eastern University", region: "Metro Manila" },
  { name: "Adamson University", region: "Metro Manila" },
  { name: "University of the East", region: "Metro Manila" },
  { name: "National University", region: "Metro Manila" },
  { name: "Lyceum of the Philippines University", region: "Metro Manila" },
  { name: "Pamantasan ng Lungsod ng Maynila", region: "Metro Manila" },
  { name: "University of San Carlos", region: "Central Visayas" },
  {
    name: "Cebu Institute of Technology – University",
    region: "Central Visayas",
  },
  { name: "University of San Jose–Recoletos", region: "Central Visayas" },
  { name: "Silliman University", region: "Central Visayas" },
  { name: "University of San Agustin", region: "Western Visayas" },
  { name: "Central Philippine University", region: "Western Visayas" },
  { name: "University of St. La Salle", region: "Western Visayas" },
  { name: "Ateneo de Davao University", region: "Davao Region" },
  { name: "University of Southeastern Philippines", region: "Davao Region" },
  {
    name: "Xavier University – Ateneo de Cagayan",
    region: "Northern Mindanao",
  },
  {
    name: "Mindanao State University – Iligan Institute of Technology",
    region: "Northern Mindanao",
  },
  { name: "Saint Louis University", region: "Cordillera" },
  { name: "University of Baguio", region: "Cordillera" },
  { name: "Holy Angel University", region: "Central Luzon" },
  { name: "Bulacan State University", region: "Central Luzon" },
  { name: "Batangas State University", region: "Calabarzon" },
  { name: "Bicol University", region: "Bicol Region" },
];

/** Degree and field, paired so a nurse does not graduate in Civil Engineering. */
export const DEGREES_BY_PROFESSION: Record<
  string,
  { degree: string; field: string }[]
> = {
  "Software Engineer": [
    { degree: "BS", field: "Computer Science" },
    { degree: "BS", field: "Information Technology" },
    { degree: "BS", field: "Computer Engineering" },
  ],
  "Frontend Developer": [
    { degree: "BS", field: "Information Technology" },
    { degree: "BS", field: "Computer Science" },
    { degree: "BS", field: "Multimedia Arts" },
  ],
  "QA Engineer": [
    { degree: "BS", field: "Information Technology" },
    { degree: "BS", field: "Computer Science" },
  ],
  "DevOps Engineer": [
    { degree: "BS", field: "Computer Engineering" },
    { degree: "BS", field: "Information Technology" },
  ],
  "Data Analyst": [
    { degree: "BS", field: "Statistics" },
    { degree: "BS", field: "Applied Mathematics" },
    { degree: "BS", field: "Information Systems" },
  ],
  "IT Support Specialist": [
    { degree: "BS", field: "Information Technology" },
    { degree: "Diploma", field: "Computer Systems Servicing" },
  ],
  "Customer Service Representative": [
    { degree: "BS", field: "Business Administration" },
    { degree: "AB", field: "Communication" },
    { degree: "BS", field: "Hospitality Management" },
  ],
  "Technical Support Engineer": [
    { degree: "BS", field: "Information Technology" },
    { degree: "BS", field: "Computer Engineering" },
  ],
  Accountant: [
    { degree: "BS", field: "Accountancy" },
    { degree: "BS", field: "Management Accounting" },
  ],
  "Financial Analyst": [
    { degree: "BS", field: "Accountancy" },
    { degree: "BS", field: "Financial Management" },
    { degree: "BS", field: "Economics" },
  ],
  Bookkeeper: [
    { degree: "BS", field: "Management Accounting" },
    { degree: "BS", field: "Financial Management" },
  ],
  "Credit Analyst": [
    { degree: "BS", field: "Financial Management" },
    { degree: "BS", field: "Business Administration" },
  ],
  "Registered Nurse": [{ degree: "BS", field: "Nursing" }],
  "Medical Technologist": [{ degree: "BS", field: "Medical Technology" }],
  "Medical Encoder": [
    { degree: "BS", field: "Health Information Management" },
    { degree: "BS", field: "Biology" },
  ],
  "Civil Engineer": [{ degree: "BS", field: "Civil Engineering" }],
  "Electrical Engineer": [{ degree: "BS", field: "Electrical Engineering" }],
  "Mechanical Engineer": [{ degree: "BS", field: "Mechanical Engineering" }],
  "Digital Marketing Specialist": [
    { degree: "BS", field: "Marketing Management" },
    { degree: "AB", field: "Communication" },
  ],
  "Sales Account Executive": [
    { degree: "BS", field: "Business Administration" },
    { degree: "BS", field: "Marketing Management" },
  ],
  "Graphic Designer": [
    { degree: "BA", field: "Multimedia Arts" },
    { degree: "BS", field: "Fine Arts" },
  ],
  "UI/UX Designer": [
    { degree: "BA", field: "Multimedia Arts" },
    { degree: "BS", field: "Information Design" },
  ],
  "HR Officer": [
    { degree: "BS", field: "Psychology" },
    { degree: "BS", field: "Human Resource Management" },
  ],
  "Executive Assistant": [
    { degree: "BS", field: "Office Administration" },
    { degree: "BS", field: "Business Administration" },
  ],
  "Virtual Assistant": [
    { degree: "BS", field: "Office Administration" },
    { degree: "BS", field: "Business Administration" },
  ],
  Teacher: [
    { degree: "BSEd", field: "Secondary Education" },
    { degree: "BEEd", field: "Elementary Education" },
  ],
  "Corporate Trainer": [
    { degree: "BS", field: "Psychology" },
    { degree: "AB", field: "Communication" },
  ],
  "Supply Chain Analyst": [
    { degree: "BS", field: "Industrial Engineering" },
    { degree: "BS", field: "Supply Chain Management" },
  ],
  Architect: [{ degree: "BS", field: "Architecture" }],
  "Hospitality Supervisor": [
    { degree: "BS", field: "Hotel and Restaurant Management" },
    { degree: "BS", field: "Tourism Management" },
  ],
  Agriculturist: [
    { degree: "BS", field: "Agriculture" },
    { degree: "BS", field: "Agribusiness Management" },
  ],
  "Business Analyst": [
    { degree: "BS", field: "Information Systems" },
    { degree: "BS", field: "Industrial Engineering" },
  ],
  "Property Manager": [
    { degree: "BS", field: "Real Estate Management" },
    { degree: "BS", field: "Business Administration" },
  ],
  "Safety Officer": [
    { degree: "BS", field: "Occupational Safety and Health" },
    { degree: "BS", field: "Industrial Engineering" },
  ],
  "Content Writer": [
    { degree: "AB", field: "Communication" },
    { degree: "AB", field: "Journalism" },
    { degree: "AB", field: "English" },
  ],
};

export interface CertificationTemplate {
  name: string;
  issuer: string;
  /** Whether it lapses — PRC licences and most vendor certs do. */
  expires: boolean;
}

/**
 * Certifications by profession. The PRC entries are the licences without which
 * you may not practise these professions in the Philippines at all, so nearly
 * every seeded applicant in those fields carries one.
 */
export const CERTIFICATIONS_BY_PROFESSION: Record<
  string,
  CertificationTemplate[]
> = {
  "Software Engineer": [
    {
      name: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services",
      expires: true,
    },
    {
      name: "Professional Scrum Master I",
      issuer: "Scrum.org",
      expires: false,
    },
    {
      name: "Microsoft Certified: Azure Developer Associate",
      issuer: "Microsoft",
      expires: true,
    },
  ],
  "Frontend Developer": [
    {
      name: "Meta Front-End Developer Professional Certificate",
      issuer: "Meta",
      expires: false,
    },
    {
      name: "Certified Web Accessibility Specialist",
      issuer: "IAAP",
      expires: true,
    },
  ],
  "QA Engineer": [
    {
      name: "ISTQB Certified Tester Foundation Level",
      issuer: "ISTQB",
      expires: false,
    },
  ],
  "DevOps Engineer": [
    {
      name: "Certified Kubernetes Administrator",
      issuer: "The Linux Foundation",
      expires: true,
    },
    {
      name: "AWS Certified DevOps Engineer – Professional",
      issuer: "Amazon Web Services",
      expires: true,
    },
    {
      name: "HashiCorp Certified: Terraform Associate",
      issuer: "HashiCorp",
      expires: true,
    },
  ],
  "Data Analyst": [
    {
      name: "Google Data Analytics Professional Certificate",
      issuer: "Google",
      expires: false,
    },
    {
      name: "Microsoft Certified: Power BI Data Analyst Associate",
      issuer: "Microsoft",
      expires: true,
    },
  ],
  "IT Support Specialist": [
    { name: "CompTIA A+", issuer: "CompTIA", expires: true },
    {
      name: "Cisco Certified Network Associate (CCNA)",
      issuer: "Cisco",
      expires: true,
    },
    {
      name: "National Certificate II in Computer Systems Servicing",
      issuer: "TESDA",
      expires: true,
    },
  ],
  "Customer Service Representative": [
    {
      name: "National Certificate II in Contact Center Services",
      issuer: "TESDA",
      expires: true,
    },
  ],
  "Technical Support Engineer": [
    { name: "CompTIA Network+", issuer: "CompTIA", expires: true },
    { name: "ITIL 4 Foundation", issuer: "PeopleCert", expires: false },
  ],
  Accountant: [
    {
      name: "Certified Public Accountant",
      issuer: "Professional Regulation Commission",
      expires: true,
    },
    {
      name: "Certified Bookkeeper",
      issuer: "Institute of Certified Bookkeepers",
      expires: false,
    },
  ],
  "Financial Analyst": [
    { name: "CFA Level II Candidate", issuer: "CFA Institute", expires: false },
    {
      name: "Certified Public Accountant",
      issuer: "Professional Regulation Commission",
      expires: true,
    },
  ],
  Bookkeeper: [
    {
      name: "National Certificate III in Bookkeeping",
      issuer: "TESDA",
      expires: true,
    },
  ],
  "Credit Analyst": [
    {
      name: "Certified Credit Professional",
      issuer: "Credit Management Association of the Philippines",
      expires: false,
    },
  ],
  "Registered Nurse": [
    {
      name: "Registered Nurse Licence",
      issuer: "Professional Regulation Commission",
      expires: true,
    },
    {
      name: "Basic Life Support (BLS) Provider",
      issuer: "American Heart Association",
      expires: true,
    },
    {
      name: "Advanced Cardiovascular Life Support (ACLS)",
      issuer: "American Heart Association",
      expires: true,
    },
  ],
  "Medical Technologist": [
    {
      name: "Registered Medical Technologist Licence",
      issuer: "Professional Regulation Commission",
      expires: true,
    },
  ],
  "Medical Encoder": [
    { name: "Certified Medical Coder", issuer: "AAPC", expires: true },
  ],
  "Civil Engineer": [
    {
      name: "Registered Civil Engineer Licence",
      issuer: "Professional Regulation Commission",
      expires: true,
    },
    {
      name: "Construction Occupational Safety and Health (COSH)",
      issuer: "DOLE",
      expires: true,
    },
  ],
  "Electrical Engineer": [
    {
      name: "Registered Electrical Engineer Licence",
      issuer: "Professional Regulation Commission",
      expires: true,
    },
  ],
  "Mechanical Engineer": [
    {
      name: "Registered Mechanical Engineer Licence",
      issuer: "Professional Regulation Commission",
      expires: true,
    },
  ],
  "Digital Marketing Specialist": [
    {
      name: "Google Ads Search Certification",
      issuer: "Google",
      expires: true,
    },
    {
      name: "Meta Certified Digital Marketing Associate",
      issuer: "Meta",
      expires: true,
    },
    {
      name: "HubSpot Inbound Marketing Certification",
      issuer: "HubSpot",
      expires: true,
    },
  ],
  "Sales Account Executive": [
    {
      name: "Salesforce Certified Administrator",
      issuer: "Salesforce",
      expires: true,
    },
  ],
  "Graphic Designer": [
    {
      name: "Adobe Certified Professional: Visual Design",
      issuer: "Adobe",
      expires: false,
    },
  ],
  "UI/UX Designer": [
    {
      name: "Google UX Design Professional Certificate",
      issuer: "Google",
      expires: false,
    },
    {
      name: "Nielsen Norman Group UX Certification",
      issuer: "Nielsen Norman Group",
      expires: false,
    },
  ],
  "HR Officer": [
    {
      name: "Certified Human Resource Associate",
      issuer: "People Management Association of the Philippines",
      expires: false,
    },
    {
      name: "Civil Service Professional Eligibility",
      issuer: "Civil Service Commission",
      expires: false,
    },
  ],
  "Executive Assistant": [
    {
      name: "Civil Service Professional Eligibility",
      issuer: "Civil Service Commission",
      expires: false,
    },
  ],
  "Virtual Assistant": [
    { name: "HubSpot CRM Certification", issuer: "HubSpot", expires: true },
  ],
  Teacher: [
    {
      name: "Licensed Professional Teacher",
      issuer: "Professional Regulation Commission",
      expires: true,
    },
    {
      name: "Google Certified Educator Level 1",
      issuer: "Google for Education",
      expires: true,
    },
  ],
  "Corporate Trainer": [
    {
      name: "Certified Professional in Training Management",
      issuer: "ATD",
      expires: false,
    },
    {
      name: "National TVET Trainers Certificate",
      issuer: "TESDA",
      expires: true,
    },
  ],
  "Supply Chain Analyst": [
    {
      name: "Certified Supply Chain Professional (CSCP)",
      issuer: "ASCM",
      expires: true,
    },
    { name: "Lean Six Sigma Green Belt", issuer: "ASQ", expires: false },
  ],
  Architect: [
    {
      name: "Registered and Licensed Architect",
      issuer: "Professional Regulation Commission",
      expires: true,
    },
  ],
  "Hospitality Supervisor": [
    {
      name: "National Certificate II in Front Office Services",
      issuer: "TESDA",
      expires: true,
    },
  ],
  Agriculturist: [
    {
      name: "Registered Agriculturist Licence",
      issuer: "Professional Regulation Commission",
      expires: true,
    },
  ],
  "Business Analyst": [
    {
      name: "Entry Certificate in Business Analysis (ECBA)",
      issuer: "IIBA",
      expires: false,
    },
    {
      name: "Project Management Professional (PMP)",
      issuer: "Project Management Institute",
      expires: true,
    },
  ],
  "Property Manager": [
    {
      name: "Licensed Real Estate Broker",
      issuer: "Professional Regulation Commission",
      expires: true,
    },
  ],
  "Safety Officer": [
    {
      name: "Safety Officer 2 (SO2) Accreditation",
      issuer: "DOLE",
      expires: true,
    },
    {
      name: "Construction Occupational Safety and Health (COSH)",
      issuer: "DOLE",
      expires: true,
    },
  ],
  "Content Writer": [
    {
      name: "HubSpot Content Marketing Certification",
      issuer: "HubSpot",
      expires: true,
    },
    {
      name: "IELTS Academic – Band 8.0",
      issuer: "British Council",
      expires: true,
    },
  ],
};

/**
 * Languages, weighted the way the country actually speaks.
 *
 * Filipino and English are near-universal in this workforce; the regional
 * languages depend on where someone is from, which the generator uses. The
 * foreign languages are the ones that show up on Philippine CVs because they
 * are hired for — Japanese, Mandarin and Korean in BPO and manufacturing.
 */
export const REGIONAL_LANGUAGES: Record<string, string> = {
  "Central Visayas": "Cebuano",
  "Northern Mindanao": "Cebuano",
  "Davao Region": "Cebuano",
  Caraga: "Cebuano",
  "Western Visayas": "Hiligaynon",
  "Eastern Visayas": "Waray",
  "Bicol Region": "Bikol",
  "Central Luzon": "Kapampangan",
  Cordillera: "Ilocano",
  Mimaropa: "Tagalog",
  Calabarzon: "Tagalog",
  "Zamboanga Peninsula": "Chavacano",
  Soccsksargen: "Hiligaynon",
  "Metro Manila": "Tagalog",
};

export const FOREIGN_LANGUAGES = ["Japanese", "Mandarin", "Korean", "Spanish"];
