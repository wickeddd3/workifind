/**
 * The jobs that get posted, as archetypes rather than finished ads.
 *
 * Each one carries the parts a real posting has — what the role is, what you
 * would do, what you need — and `buildJobDescription` assembles them into the
 * markdown the job page renders. Keeping them apart is what lets fifty
 * employers post three hundred jobs without three hundred hand-written essays,
 * and lets the same role read differently in Cebu and in Makati.
 *
 * Salaries are Philippine pesos, monthly, which is how this market quotes them
 * and how a candidate reads them. They also happen to land inside the 10k–150k
 * band the salary filter offers, so the filter means something on seeded data —
 * the previous USD figures pinned nearly every job to the top of it.
 *
 * `profession` ties a role to the applicants who would apply for it, so the
 * seeded applications are not random pairings of nurses and backend engineers.
 */

export type Seniority = "entry" | "mid" | "senior" | "lead";

export interface RoleArchetype {
  title: string;
  /** Industries whose employers would post this. */
  industries: string[];
  seniority: Seniority;
  /** Monthly PHP, inclusive range. */
  salary: [number, number];
  /** Matches `ApplicantSeed.profession`, so applications pair sensibly. */
  profession: string;
  /** The opening paragraph — what this job is, in plain terms. */
  summary: string;
  responsibilities: string[];
  requirements: string[];
  /** Feeds both the posting and the skills of applicants in this profession. */
  skills: string[];
}

export const ROLES: RoleArchetype[] = [
  /* ---------------------------------------------------------------- ICT --- */
  {
    title: "Junior Software Engineer",
    industries: [
      "Information & Communication Technology",
      "Science & Technology",
    ],
    seniority: "entry",
    salary: [30000, 45000],
    profession: "Software Engineer",
    summary:
      "A first or second engineering role on a team that expects to teach you. You will ship to production in your first fortnight — small things, reviewed closely — and take on more as the reviews get shorter.",
    responsibilities: [
      "Build and maintain features across the stack, with a senior engineer reviewing every pull request",
      "Write the tests that go with your changes, rather than a ticket to add them later",
      "Fix the bugs you find while working on something else, or write them down where someone will see them",
      "Take part in code review as a reader as well as an author — reading other people's work is most of how this job is learned",
    ],
    requirements: [
      "A degree in Computer Science, Information Technology or a related field, or a portfolio that makes the degree beside the point",
      "Working JavaScript or Python, and enough SQL to answer a question without asking someone",
      "Git, and the habit of small commits with messages that say why",
      "Willingness to ask early rather than lose two days to pride",
    ],
    skills: ["JavaScript", "TypeScript", "React", "SQL", "Git", "REST APIs"],
  },
  {
    title: "Software Engineer",
    industries: [
      "Information & Communication Technology",
      "Banking & Financial Services",
      "Science & Technology",
    ],
    seniority: "mid",
    salary: [55000, 85000],
    profession: "Software Engineer",
    summary:
      "You will own features end to end — from the conversation about what is actually needed, through the schema, to the thing running in production and the alert that fires when it stops.",
    responsibilities: [
      "Design and ship features across the stack, taking the ambiguity out of a request before writing code",
      "Own the schema changes your work needs, including the migration and the rollback",
      "Carry the pager for services your team owns, on a rota that comes round roughly every six weeks",
      "Review other engineers' work, and mentor whoever is newest on the team",
    ],
    requirements: [
      "Three or more years building and running production software",
      "Strong TypeScript or Python, and a relational database you know past the ORM",
      "Experience with cloud infrastructure — AWS, GCP or Azure — including what it costs",
      "The judgement to know which problems are worth solving properly and which need a note in the backlog",
    ],
    skills: [
      "TypeScript",
      "Node.js",
      "React",
      "PostgreSQL",
      "AWS",
      "Docker",
      "REST APIs",
    ],
  },
  {
    title: "Senior Software Engineer",
    industries: [
      "Information & Communication Technology",
      "Banking & Financial Services",
    ],
    seniority: "senior",
    salary: [95000, 145000],
    profession: "Software Engineer",
    summary:
      "A senior role on a small team, which means the technical decisions are genuinely yours and so are their consequences. We are looking for someone who has maintained what they built for long enough to have opinions about it.",
    responsibilities: [
      "Lead the design of systems that several teams depend on, and write the document that explains the trade-offs",
      "Set the technical direction for a product area and carry it through the quarters where it is unglamorous",
      "Raise the standard of the codebase through review, tooling and the occasional well-argued rewrite",
      "Mentor mid-level engineers deliberately, with time set aside for it rather than squeezed around delivery",
    ],
    requirements: [
      "Six or more years in production engineering, including systems you stayed with past the launch",
      "Depth in at least one stack and enough breadth to be dangerous in two more",
      "Experience designing for failure — retries, idempotency, and what happens when the third party is down",
      "The ability to disagree with a product decision in a way that moves it forward",
    ],
    skills: [
      "TypeScript",
      "Go",
      "PostgreSQL",
      "Kubernetes",
      "AWS",
      "System Design",
      "CI/CD",
    ],
  },
  {
    title: "Frontend Developer",
    industries: [
      "Information & Communication Technology",
      "Advertising, Arts & Media",
      "Marketing & Communications",
    ],
    seniority: "mid",
    salary: [50000, 80000],
    profession: "Frontend Developer",
    summary:
      "Build the parts people actually touch. Our users are on mid-range Android phones on mobile data, so performance and accessibility are requirements here rather than a later phase.",
    responsibilities: [
      "Build responsive interfaces from designs, and push back on the ones that will not survive a 360px screen",
      "Keep the component library coherent — one button, not the twelfth variant",
      "Hold the performance budget: Core Web Vitals are tracked and regressions block the release",
      "Work to WCAG 2.1 AA, including keyboard paths and screen-reader labelling",
    ],
    requirements: [
      "Three or more years with a modern framework, React or Vue",
      "Real CSS — layout, cascade and specificity, not only a utility framework",
      "Experience with accessibility beyond running an automated checker over it",
      "Comfort profiling a slow page and finding the actual cause",
    ],
    skills: [
      "React",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Accessibility",
      "Web Performance",
    ],
  },
  {
    title: "QA Engineer",
    industries: [
      "Information & Communication Technology",
      "Science & Technology",
    ],
    seniority: "mid",
    salary: [40000, 65000],
    profession: "QA Engineer",
    summary:
      "Find what is broken before a customer does, and make the finding repeatable. This is an engineering role: most of the work is written in code, not in a spreadsheet.",
    responsibilities: [
      "Build and maintain automated end-to-end suites, and keep them fast enough that people wait for them",
      "Do exploratory testing on new features, which is still where the interesting bugs come from",
      "Write bug reports precise enough that an engineer can reproduce them without a conversation",
      "Own the release checklist and say no when it is not met",
    ],
    requirements: [
      "Three or more years in software QA, including automation you wrote yourself",
      "Playwright, Cypress or Selenium, and enough JavaScript or Python to use them well",
      "An understanding of what is worth automating and what is cheaper to check by hand",
      "API testing and a working knowledge of HTTP",
    ],
    skills: [
      "Playwright",
      "Cypress",
      "TypeScript",
      "API Testing",
      "Test Automation",
      "SQL",
    ],
  },
  {
    title: "DevOps Engineer",
    industries: [
      "Information & Communication Technology",
      "Banking & Financial Services",
    ],
    seniority: "senior",
    salary: [85000, 140000],
    profession: "DevOps Engineer",
    summary:
      "Own the path from a merged pull request to a running system, and the tooling that tells us whether it is healthy. You will be the person who makes deploys boring.",
    responsibilities: [
      "Build and maintain CI/CD pipelines, and keep the feedback loop short enough to be useful",
      "Manage infrastructure as code — no console changes that nobody can reproduce",
      "Own monitoring and alerting, including the unglamorous work of deleting alerts nobody acts on",
      "Lead incident response and write the postmortem that stops it happening twice",
    ],
    requirements: [
      "Five or more years in DevOps, SRE or platform engineering",
      "Kubernetes in production, including the day it went wrong",
      "Terraform or equivalent, and a strong preference for declared over clicked",
      "Linux, networking, and enough scripting to automate anything done twice",
    ],
    skills: [
      "Kubernetes",
      "Terraform",
      "AWS",
      "Docker",
      "CI/CD",
      "Linux",
      "Prometheus",
    ],
  },
  {
    title: "Data Analyst",
    industries: [
      "Information & Communication Technology",
      "Banking & Financial Services",
      "Sales",
      "Marketing & Communications",
    ],
    seniority: "mid",
    salary: [45000, 70000],
    profession: "Data Analyst",
    summary:
      "Answer the questions the business is actually asking, and be honest when the data cannot answer them. Half this job is analysis and half is arguing about what a metric means.",
    responsibilities: [
      "Build and maintain dashboards that people use, and retire the ones they do not",
      "Write the SQL behind recurring reports, and document the definitions so two teams stop disagreeing about revenue",
      "Investigate the anomalies — most turn out to be instrumentation, and that is worth knowing",
      "Present findings to people who do not work in data, without a single word of jargon",
    ],
    requirements: [
      "Three or more years in an analytics role",
      "Strong SQL, including window functions and query plans",
      "A BI tool in anger — Looker, Power BI, Metabase or similar",
      "Enough statistics to know when a difference is not a difference",
    ],
    skills: ["SQL", "Python", "Power BI", "Data Visualisation", "Excel", "dbt"],
  },
  {
    title: "IT Support Specialist",
    industries: [
      "Information & Communication Technology",
      "Administration & Office Support",
      "Call Centre & Customer Service",
    ],
    seniority: "entry",
    salary: [22000, 35000],
    profession: "IT Support Specialist",
    summary:
      "First line of support for the people who keep the business running. Every ticket is somebody blocked, and how quickly they are unblocked is the whole job.",
    responsibilities: [
      "Resolve hardware, software and network tickets, escalating with enough detail that the escalation helps",
      "Set up and hand over equipment for new joiners, so their first day works",
      "Maintain the asset register and keep it true",
      "Write the knowledge-base article the third time you answer the same question",
    ],
    requirements: [
      "A degree or vocational qualification in IT, or equivalent hands-on experience",
      "Windows and macOS troubleshooting, plus Google Workspace or Microsoft 365 administration",
      "Basic networking — DNS, DHCP, VPN — and the patience to explain it to someone who does not care",
      "Clear written English",
    ],
    skills: [
      "Windows",
      "macOS",
      "Microsoft 365",
      "Networking",
      "Active Directory",
      "Helpdesk",
    ],
  },

  /* -------------------------------------------------------------- BPO --- */
  {
    title: "Customer Service Representative",
    industries: [
      "Call Centre & Customer Service",
      "Sales",
      "Hospitality & Tourism",
    ],
    seniority: "entry",
    salary: [18000, 28000],
    profession: "Customer Service Representative",
    summary:
      "Voice and chat support for an international account. Fixed schedules published a month ahead, and a training period that is paid and actually runs its full length.",
    responsibilities: [
      "Handle inbound calls, chats and emails, resolving on first contact wherever the account allows it",
      "Document every interaction in the CRM while it is fresh",
      "Escalate accurately — the wrong queue costs the customer another day",
      "Hit quality and CSAT targets, which are coached toward rather than sprung on you",
    ],
    requirements: [
      "At least two years of college, or a high school graduate with BPO experience",
      "Clear conversational English, assessed on a call rather than on paper",
      "Willingness to work night shifts, rest days and holidays on rotation",
      "Typing at 35wpm and comfort with several systems open at once",
    ],
    skills: [
      "Customer Service",
      "CRM",
      "Active Listening",
      "Conflict Resolution",
      "Data Entry",
    ],
  },
  {
    title: "Technical Support Engineer",
    industries: [
      "Call Centre & Customer Service",
      "Information & Communication Technology",
    ],
    seniority: "mid",
    salary: [28000, 45000],
    profession: "Technical Support Engineer",
    summary:
      "Second-line support for a software product, working with customers who have already tried the obvious. You will spend as much time reading logs as talking to people.",
    responsibilities: [
      "Diagnose product issues from logs, traces and reproduction steps",
      "Work directly with engineering on defects, carrying the customer's context into that conversation",
      "Own the escalations that come to you until they close, rather than passing them on",
      "Feed recurring issues back as documentation or product change requests",
    ],
    requirements: [
      "Three or more years in technical support for a software or SaaS product",
      "SQL, API debugging and comfort reading a stack trace",
      "The patience to explain a technical cause to a non-technical customer without condescension",
      "Amenable to shifting schedules covering US or EMEA hours",
    ],
    skills: [
      "Troubleshooting",
      "SQL",
      "REST APIs",
      "Zendesk",
      "Linux",
      "Technical Writing",
    ],
  },
  {
    title: "Team Leader, Customer Support",
    industries: ["Call Centre & Customer Service"],
    seniority: "senior",
    salary: [35000, 55000],
    profession: "Customer Service Representative",
    summary:
      "Run a team of twelve to eighteen agents on a single account. The metrics matter, and so does whether your people are still there in a year.",
    responsibilities: [
      "Coach agents individually against quality and CSAT, with documented sessions rather than a monthly scolding",
      "Manage schedules, adherence and shrinkage against the account's service levels",
      "Handle escalated customers, and take the call yourself when it needs taking",
      "Report performance to the client, including the weeks it went badly",
    ],
    requirements: [
      "Five or more years in BPO with at least two leading a team",
      "A track record on attrition, not only on average handle time",
      "Comfort presenting to a client who is unhappy",
      "Workforce management tools and real spreadsheet fluency",
    ],
    skills: [
      "Team Leadership",
      "Coaching",
      "Workforce Management",
      "Excel",
      "Client Reporting",
    ],
  },

  /* ------------------------------------------------------ Finance / Acct --- */
  {
    title: "Accountant",
    industries: [
      "Accounting",
      "Banking & Financial Services",
      "Sales",
      "Construction",
    ],
    seniority: "mid",
    salary: [28000, 45000],
    profession: "Accountant",
    summary:
      "General accounting for a growing company, closing the books monthly and keeping us compliant with the BIR. You will see the whole cycle rather than one corner of it.",
    responsibilities: [
      "Prepare journal entries, reconciliations and the monthly close",
      "File BIR returns — VAT, withholding, income tax — on time and accurately",
      "Maintain the general ledger and the supporting schedules an auditor will ask for",
      "Support the annual external audit and answer its questions from records rather than memory",
    ],
    requirements: [
      "A BS in Accountancy; CPA is an advantage and is paid for",
      "Two or more years of general accounting in the Philippines",
      "Working knowledge of BIR compliance and Philippine tax rules",
      "QuickBooks, Xero or SAP, and genuine Excel skill",
    ],
    skills: [
      "General Accounting",
      "BIR Compliance",
      "Excel",
      "QuickBooks",
      "Reconciliation",
      "Financial Reporting",
    ],
  },
  {
    title: "Senior Financial Analyst",
    industries: [
      "Banking & Financial Services",
      "Accounting",
      "Consulting & Strategy",
      "CEO & General Management",
    ],
    seniority: "senior",
    salary: [60000, 95000],
    profession: "Financial Analyst",
    summary:
      "Build the models the business plans on, and be the person who says when the assumptions have stopped being true.",
    responsibilities: [
      "Own the budgeting and forecasting cycle, and the variance analysis that follows it",
      "Build financial models for new lines and investments, with the sensitivities that matter",
      "Present to the leadership team monthly, in the terms they actually decide on",
      "Improve the reporting so that the close takes days rather than weeks",
    ],
    requirements: [
      "Five or more years in FP&A, investment banking or corporate finance",
      "Modelling skill that survives someone else opening the file",
      "A degree in Finance, Accountancy or Economics; CFA or CPA welcome",
      "The confidence to give an unwelcome number to a senior audience",
    ],
    skills: [
      "Financial Modelling",
      "FP&A",
      "Excel",
      "Power BI",
      "Forecasting",
      "Valuation",
    ],
  },
  {
    title: "Bookkeeper",
    industries: [
      "Accounting",
      "Administration & Office Support",
      "Trades & Services",
    ],
    seniority: "entry",
    salary: [18000, 28000],
    profession: "Bookkeeper",
    summary:
      "Keep the day-to-day records straight for a portfolio of small business clients. Careful, unglamorous, and the foundation everything else stands on.",
    responsibilities: [
      "Record receipts, disbursements and sales daily rather than in a monthly scramble",
      "Reconcile bank and cash accounts, and chase the differences until they close",
      "Prepare supporting schedules for the accountant's monthly close",
      "Maintain orderly files, digital and physical, that someone else could find things in",
    ],
    requirements: [
      "A degree in Accountancy, Management Accounting or Financial Management",
      "One or more years of bookkeeping, or strong internship experience",
      "Comfort with QuickBooks or Xero and with spreadsheets",
      "Accuracy under a deadline, which is the whole job in four words",
    ],
    skills: [
      "Bookkeeping",
      "QuickBooks",
      "Excel",
      "Bank Reconciliation",
      "Accounts Payable",
    ],
  },
  {
    title: "Credit and Collections Officer",
    industries: ["Banking & Financial Services", "Sales", "Accounting"],
    seniority: "mid",
    salary: [25000, 40000],
    profession: "Credit Analyst",
    summary:
      "Assess who we lend to and recover from those who fall behind. Both halves need judgement, and the second needs a great deal of tact.",
    responsibilities: [
      "Evaluate credit applications against policy and against what the numbers actually show",
      "Monitor the ageing report and act on it early, when acting still helps",
      "Negotiate restructuring with borrowers in difficulty",
      "Keep collection practice within the law and within our own standards",
    ],
    requirements: [
      "A degree in Finance, Accountancy, Business or Economics",
      "Two or more years in credit assessment or collections",
      "The ability to read a financial statement and see what it is not saying",
      "Firmness and courtesy in the same phone call",
    ],
    skills: [
      "Credit Analysis",
      "Collections",
      "Financial Statements",
      "Negotiation",
      "Excel",
    ],
  },

  /* --------------------------------------------------------- Healthcare --- */
  {
    title: "Registered Nurse",
    industries: ["Healthcare & Medical", "Community Services & Development"],
    seniority: "mid",
    salary: [22000, 35000],
    profession: "Registered Nurse",
    summary:
      "Ward and outpatient nursing at a community clinic network. Staffing ratios are published and held to, which is not something every employer here can say.",
    responsibilities: [
      "Deliver direct patient care and administer medication per physician orders",
      "Assess, monitor and document patient status accurately and on time",
      "Educate patients and their families on treatment and aftercare, in the language they speak",
      "Maintain infection-control standards without exception",
    ],
    requirements: [
      "A BS in Nursing and a current PRC licence",
      "Two or more years of clinical experience; hospital exposure preferred",
      "BLS certification, and ACLS as an advantage",
      "Willingness to rotate through day, evening and night shifts",
    ],
    skills: [
      "Patient Care",
      "Medication Administration",
      "Clinical Documentation",
      "BLS",
      "Infection Control",
    ],
  },
  {
    title: "Medical Technologist",
    industries: ["Healthcare & Medical", "Science & Technology"],
    seniority: "mid",
    salary: [22000, 34000],
    profession: "Medical Technologist",
    summary:
      "Run the laboratory that the clinicians upstairs are waiting on. Accuracy first, turnaround second, and never the other way round.",
    responsibilities: [
      "Perform clinical chemistry, haematology, microbiology and serology testing",
      "Run and document quality control on every shift, and stop the line when it fails",
      "Maintain and calibrate analysers, and log the maintenance properly",
      "Release results within turnaround targets, flagging criticals immediately",
    ],
    requirements: [
      "A BS in Medical Technology and a current PRC licence",
      "One or more years in a clinical laboratory",
      "Familiarity with laboratory information systems",
      "Meticulous documentation habits",
    ],
    skills: [
      "Clinical Chemistry",
      "Haematology",
      "Microbiology",
      "Quality Control",
      "LIS",
    ],
  },
  {
    title: "Medical Encoder",
    industries: [
      "Healthcare & Medical",
      "Call Centre & Customer Service",
      "Administration & Office Support",
    ],
    seniority: "entry",
    salary: [16000, 24000],
    profession: "Medical Encoder",
    summary:
      "Encode clinical records and claims accurately and quickly. An error here becomes a denied claim and a patient's problem three weeks later.",
    responsibilities: [
      "Encode patient records, charges and diagnoses into the hospital system",
      "Verify entries against source documents before submitting",
      "Prepare and follow up PhilHealth and HMO claims",
      "Keep patient information confidential, without exception",
    ],
    requirements: [
      "A degree in any allied health, IT or business course",
      "Typing at 40wpm with high accuracy",
      "Familiarity with medical terminology; ICD-10 exposure an advantage",
      "Attention to detail over speed when the two conflict",
    ],
    skills: [
      "Medical Terminology",
      "Data Entry",
      "ICD-10",
      "PhilHealth Claims",
      "Excel",
    ],
  },

  /* ------------------------------------------ Engineering / Construction --- */
  {
    title: "Civil Engineer",
    industries: ["Construction", "Engineering", "Real Estate & Property"],
    seniority: "mid",
    salary: [28000, 48000],
    profession: "Civil Engineer",
    summary:
      "Site engineering on mid-rise residential and commercial projects. You will be on site, not behind a desk drawing what someone else will build.",
    responsibilities: [
      "Supervise structural works and verify them against drawings and specifications",
      "Prepare and monitor the construction schedule, and raise slippage while it is still recoverable",
      "Check quantities, material deliveries and quality of work in place",
      "Enforce safety on site, including with subcontractors who would rather you did not",
    ],
    requirements: [
      "A BS in Civil Engineering and a PRC licence",
      "Three or more years of site experience on vertical construction",
      "AutoCAD and construction management software",
      "Willingness to be assigned to project sites for their duration",
    ],
    skills: [
      "AutoCAD",
      "Structural Analysis",
      "Project Scheduling",
      "Quantity Surveying",
      "Site Safety",
    ],
  },
  {
    title: "Electrical Engineer",
    industries: [
      "Engineering",
      "Construction",
      "Trades & Services",
      "Science & Technology",
    ],
    seniority: "mid",
    salary: [30000, 52000],
    profession: "Electrical Engineer",
    summary:
      "Design and commission electrical systems for industrial and commercial facilities, and be the one who signs off that they are safe.",
    responsibilities: [
      "Design power distribution, lighting and controls to the Philippine Electrical Code",
      "Size equipment, prepare load schedules and produce the drawings that get built from",
      "Supervise installation and commissioning, and test before energising",
      "Investigate faults and write up the cause rather than only the fix",
    ],
    requirements: [
      "A BS in Electrical Engineering and a PRC licence (REE)",
      "Three or more years in design or plant engineering",
      "AutoCAD and familiarity with the Philippine Electrical Code",
      "Field experience — this role does not stay in the office",
    ],
    skills: [
      "AutoCAD",
      "Power Distribution",
      "PEC Compliance",
      "Commissioning",
      "PLC",
    ],
  },
  {
    title: "Mechanical Maintenance Engineer",
    industries: ["Engineering", "Trades & Services", "Science & Technology"],
    seniority: "mid",
    salary: [28000, 46000],
    profession: "Mechanical Engineer",
    summary:
      "Keep plant equipment running and reduce the number of times it stops unexpectedly. Success here is measured in downtime that did not happen.",
    responsibilities: [
      "Plan and execute preventive maintenance, and defend the schedule against production pressure",
      "Diagnose mechanical failures and carry out root-cause analysis worth the name",
      "Manage spare parts inventory against criticality rather than against habit",
      "Maintain equipment history so the next engineer inherits knowledge, not guesswork",
    ],
    requirements: [
      "A BS in Mechanical Engineering and a PRC licence",
      "Three or more years in plant or facilities maintenance",
      "Rotating equipment, pumps and HVAC systems",
      "Availability for call-out on breakdowns",
    ],
    skills: [
      "Preventive Maintenance",
      "Root Cause Analysis",
      "HVAC",
      "AutoCAD",
      "CMMS",
    ],
  },
  {
    title: "Project Engineer",
    industries: ["Construction", "Engineering", "Real Estate & Property"],
    seniority: "senior",
    salary: [45000, 75000],
    profession: "Civil Engineer",
    summary:
      "Run a project from mobilisation to turnover — the schedule, the cost, the subcontractors and the client conversation when one of the three goes wrong.",
    responsibilities: [
      "Own the project schedule and budget, and report against both honestly",
      "Coordinate subcontractors, suppliers and consultants so they are not each other's excuse",
      "Chair site meetings and keep the minutes that settle later disputes",
      "Manage variations and claims with the documentation to support them",
    ],
    requirements: [
      "A BS in Civil or Mechanical Engineering with a PRC licence",
      "Six or more years in construction, including two running projects",
      "MS Project or Primavera, and real command of a cost report",
      "Experience with government or private turnover requirements",
    ],
    skills: [
      "Project Management",
      "Primavera",
      "Cost Control",
      "Contract Administration",
      "MS Project",
    ],
  },

  /* ---------------------------------------------------- Marketing / Sales --- */
  {
    title: "Digital Marketing Specialist",
    industries: [
      "Marketing & Communications",
      "Advertising, Arts & Media",
      "Sales",
      "Hospitality & Tourism",
    ],
    seniority: "mid",
    salary: [30000, 50000],
    profession: "Digital Marketing Specialist",
    summary:
      "Run paid and organic channels for a consumer brand, and be able to say what the spend actually returned.",
    responsibilities: [
      "Plan and run campaigns across Meta, Google and TikTok against a defined CPA",
      "Own the content calendar and the community management that follows a post",
      "Report weekly on spend, reach and conversion, with the losses shown as clearly as the wins",
      "Run tests properly — one variable, enough volume, a decision at the end",
    ],
    requirements: [
      "Three or more years in digital marketing, agency or in-house",
      "Hands-on with Meta Business Suite and Google Ads, spending real budget",
      "Google Analytics 4 and comfort building a report rather than screenshotting one",
      "Copy that reads like a person wrote it",
    ],
    skills: [
      "Meta Ads",
      "Google Ads",
      "SEO",
      "Google Analytics",
      "Content Marketing",
      "Copywriting",
    ],
  },
  {
    title: "Marketing Manager",
    industries: [
      "Marketing & Communications",
      "Sales",
      "Real Estate & Property",
      "Hospitality & Tourism",
    ],
    seniority: "senior",
    salary: [60000, 95000],
    profession: "Digital Marketing Specialist",
    summary:
      "Own the marketing function for a growing Philippine brand — the plan, the budget, the small team and the number at the end of it.",
    responsibilities: [
      "Set the annual marketing plan and hold the budget against it",
      "Lead a team of three to five specialists, and hire the next two",
      "Own brand consistency across every channel, including the ones sales runs",
      "Report on pipeline contribution to the leadership team, in their language",
    ],
    requirements: [
      "Six or more years in marketing with at least two managing people",
      "A track record you can describe in numbers rather than adjectives",
      "Agency management, and the willingness to change agencies",
      "Philippine consumer market experience",
    ],
    skills: [
      "Marketing Strategy",
      "Team Leadership",
      "Budget Management",
      "Brand Management",
      "Analytics",
    ],
  },
  {
    title: "Account Executive",
    industries: [
      "Sales",
      "Advertising, Arts & Media",
      "Information & Communication Technology",
    ],
    seniority: "mid",
    salary: [25000, 40000],
    profession: "Sales Account Executive",
    summary:
      "Own a territory or a book of accounts and grow it. Base plus commission, with the commission plan written down and not changed mid-year.",
    responsibilities: [
      "Prospect, qualify and close new business against a quarterly quota",
      "Manage existing accounts for renewal and expansion, not only for renewal",
      "Keep the CRM current enough that the forecast means something",
      "Work with marketing on what the leads actually need to be",
    ],
    requirements: [
      "Three or more years in B2B sales with a quota you can speak to",
      "Consultative selling rather than script reading",
      "CRM discipline — Salesforce, HubSpot or similar",
      "A valid driver's licence and willingness to travel within the region",
    ],
    skills: [
      "B2B Sales",
      "Salesforce",
      "Negotiation",
      "Account Management",
      "Prospecting",
    ],
  },
  {
    title: "Graphic Designer",
    industries: [
      "Advertising, Arts & Media",
      "Marketing & Communications",
      "Design & Architecture",
    ],
    seniority: "mid",
    salary: [25000, 42000],
    profession: "Graphic Designer",
    summary:
      "Design across digital and print for brands with real audiences. You will get feedback, and you will be expected to argue back when it is wrong.",
    responsibilities: [
      "Produce layouts, social assets and campaign material to brief and to deadline",
      "Keep brand guidelines coherent as they meet a dozen new formats a month",
      "Prepare artwork correctly for print, including the parts that only matter at the printer",
      "Present work with the reasoning attached",
    ],
    requirements: [
      "A portfolio that shows range and finish — this matters more than the CV",
      "Two or more years in an agency or in-house design team",
      "Adobe Creative Suite and Figma",
      "Motion or video editing is a strong advantage",
    ],
    skills: [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Figma",
      "Layout Design",
      "Branding",
      "InDesign",
    ],
  },
  {
    title: "UI/UX Designer",
    industries: [
      "Design & Architecture",
      "Information & Communication Technology",
      "Advertising, Arts & Media",
    ],
    seniority: "mid",
    salary: [45000, 75000],
    profession: "UI/UX Designer",
    summary:
      "Design product interfaces from the problem end. We would rather you spent a day with users than a day on a gradient.",
    responsibilities: [
      "Run discovery — interviews, flows and the honest version of what users do",
      "Design and prototype interfaces, and test them before they are built",
      "Own and extend the design system, including its documentation",
      "Work alongside engineers through implementation rather than handing over and leaving",
    ],
    requirements: [
      "Three or more years designing digital products",
      "A portfolio showing process, not only final screens",
      "Figma to a professional standard, including components and variants",
      "Enough understanding of front-end constraints to design within them",
    ],
    skills: [
      "Figma",
      "User Research",
      "Prototyping",
      "Design Systems",
      "Usability Testing",
      "Wireframing",
    ],
  },

  /* --------------------------------------------------- People / Admin --- */
  {
    title: "HR Officer",
    industries: [
      "Administration & Office Support",
      "CEO & General Management",
      "Call Centre & Customer Service",
    ],
    seniority: "mid",
    salary: [25000, 40000],
    profession: "HR Officer",
    summary:
      "Generalist HR for a company of a few hundred — recruitment, employee relations and the compliance that keeps all of it lawful.",
    responsibilities: [
      "Run end-to-end recruitment for assigned roles, from intake brief to offer",
      "Handle employee relations cases with due process properly followed",
      "Maintain 201 files and keep DOLE compliance current",
      "Support performance reviews and the conversations managers would rather avoid",
    ],
    requirements: [
      "A degree in Psychology, HR Management or Behavioural Science",
      "Three or more years in a generalist HR role",
      "Working knowledge of the Labor Code and DOLE requirements",
      "Discretion, which is most of this job",
    ],
    skills: [
      "Recruitment",
      "Employee Relations",
      "Labor Code",
      "HRIS",
      "Performance Management",
    ],
  },
  {
    title: "Executive Assistant",
    industries: [
      "Administration & Office Support",
      "CEO & General Management",
      "Consulting & Strategy",
    ],
    seniority: "mid",
    salary: [28000, 45000],
    profession: "Executive Assistant",
    summary:
      "Support two executives whose calendars are the constraint on everything else. This role runs on judgement about what matters, not on typing speed.",
    responsibilities: [
      "Own complex calendars across time zones, and defend the focus blocks",
      "Prepare briefing packs, agendas and minutes that get read",
      "Coordinate travel and expenses end to end",
      "Act as gatekeeper with enough tact that people do not mind being gated",
    ],
    requirements: [
      "Five or more years supporting senior executives",
      "Excellent written English — much of this role is drafting on someone's behalf",
      "Microsoft 365 or Google Workspace to an advanced level",
      "Absolute discretion with confidential information",
    ],
    skills: [
      "Calendar Management",
      "Executive Support",
      "Business Writing",
      "Microsoft 365",
      "Travel Coordination",
    ],
  },
  {
    title: "Virtual Assistant",
    industries: [
      "Administration & Office Support",
      "Call Centre & Customer Service",
      "Marketing & Communications",
    ],
    seniority: "entry",
    salary: [22000, 38000],
    profession: "Virtual Assistant",
    summary:
      "Remote support for an overseas client — admin, inbox, scheduling and whatever else keeps a small business moving. Fully work-from-home on a fixed schedule.",
    responsibilities: [
      "Manage inbox and calendar, and triage what genuinely needs the client",
      "Prepare reports, decks and documents from rough instructions",
      "Handle data entry and CRM upkeep accurately",
      "Coordinate with suppliers and contractors on the client's behalf",
    ],
    requirements: [
      "One or more years as a VA or in administrative work",
      "Strong written English and a reliable connection with a backup",
      "Google Workspace, and quick to learn whatever tool the client uses",
      "Ability to work US or AU hours",
    ],
    skills: [
      "Administrative Support",
      "Google Workspace",
      "Data Entry",
      "Email Management",
      "Canva",
    ],
  },

  /* ------------------------------------------------------------ Others --- */
  {
    title: "Licensed Teacher",
    industries: ["Education & Training", "Community Services & Development"],
    seniority: "mid",
    salary: [22000, 34000],
    profession: "Teacher",
    summary:
      "Classroom teaching with genuine preparation time built into the load, and class sizes we hold to rather than aspire to.",
    responsibilities: [
      "Plan and deliver lessons aligned to the curriculum and to the class in front of you",
      "Assess learning and give feedback students can act on",
      "Communicate with parents regularly rather than only when something is wrong",
      "Take part in curriculum development and departmental planning",
    ],
    requirements: [
      "A Bachelor's degree in Education, or a degree plus units in Education",
      "A current LET / PRC licence",
      "Two or more years of classroom teaching",
      "Patience, and the ability to explain a thing three different ways",
    ],
    skills: [
      "Lesson Planning",
      "Classroom Management",
      "Curriculum Development",
      "Assessment",
      "Google Classroom",
    ],
  },
  {
    title: "Corporate Trainer",
    industries: [
      "Education & Training",
      "Call Centre & Customer Service",
      "Consulting & Strategy",
    ],
    seniority: "mid",
    salary: [30000, 50000],
    profession: "Corporate Trainer",
    summary:
      "Design and deliver training that changes what people do afterwards, which is a much harder standard than filling a room.",
    responsibilities: [
      "Run new-hire and upskilling programmes, in person and online",
      "Design materials and assessments from a genuine needs analysis",
      "Measure outcomes past the smile sheet, against on-the-job performance",
      "Coach team leads to deliver parts of the programme themselves",
    ],
    requirements: [
      "Three or more years in corporate training or learning and development",
      "Excellent facilitation with a mixed and sometimes reluctant audience",
      "Instructional design, and the tooling to build for online delivery",
      "Willingness to travel between sites",
    ],
    skills: [
      "Facilitation",
      "Instructional Design",
      "Training Needs Analysis",
      "E-learning",
      "Public Speaking",
    ],
  },
  {
    title: "Supply Chain Analyst",
    industries: [
      "Sales",
      "Engineering",
      "Trades & Services",
      "CEO & General Management",
    ],
    seniority: "mid",
    salary: [32000, 52000],
    profession: "Supply Chain Analyst",
    summary:
      "Make the flow of goods across an archipelago predictable — which is the interesting part of doing this job in the Philippines rather than anywhere flat.",
    responsibilities: [
      "Forecast demand and set inventory levels that survive a typhoon week",
      "Analyse freight and warehousing cost, and act on what the analysis says",
      "Work with suppliers on lead times, and hold them to the agreed ones",
      "Report on service levels, stockouts and ageing inventory",
    ],
    requirements: [
      "A degree in Industrial Engineering, Supply Chain or Business",
      "Three or more years in supply chain, logistics or planning",
      "Advanced Excel, and SQL or Power BI as an advantage",
      "Familiarity with inter-island freight and its realities",
    ],
    skills: [
      "Demand Planning",
      "Inventory Management",
      "Excel",
      "SAP",
      "Logistics",
      "Power BI",
    ],
  },
  {
    title: "Architect",
    industries: [
      "Design & Architecture",
      "Construction",
      "Real Estate & Property",
    ],
    seniority: "senior",
    salary: [45000, 80000],
    profession: "Architect",
    summary:
      "Take projects from concept through documentation and into construction, in a practice small enough that you stay with your own work.",
    responsibilities: [
      "Develop designs from brief through to construction documentation",
      "Coordinate structural, mechanical and electrical consultants",
      "Prepare permit submissions and see them through the local building office",
      "Visit site through construction and resolve what the drawings did not anticipate",
    ],
    requirements: [
      "A BS in Architecture and a current PRC licence",
      "Five or more years in practice, with built projects you can point to",
      "AutoCAD, Revit and SketchUp",
      "Working knowledge of the National Building Code",
    ],
    skills: [
      "AutoCAD",
      "Revit",
      "SketchUp",
      "Construction Documentation",
      "National Building Code",
    ],
  },
  {
    title: "Hotel Operations Supervisor",
    industries: ["Hospitality & Tourism"],
    seniority: "mid",
    salary: [24000, 38000],
    profession: "Hospitality Supervisor",
    summary:
      "Run a shift across front office and guest services at a resort property. Peak season is genuinely demanding and staffed accordingly.",
    responsibilities: [
      "Supervise front office and guest services staff through the shift",
      "Resolve guest complaints on the spot, with real authority to do so",
      "Manage room inventory and coordinate with housekeeping and F&B",
      "Maintain service standards and train new staff into them",
    ],
    requirements: [
      "A degree in Hotel and Restaurant Management, Tourism or equivalent experience",
      "Three or more years in hotel operations with at least one supervising",
      "A property management system such as Opera",
      "Willingness to work shifts, weekends and peak season",
    ],
    skills: [
      "Guest Relations",
      "Opera PMS",
      "Team Supervision",
      "Front Office",
      "Complaint Handling",
    ],
  },
  {
    title: "Agricultural Field Officer",
    industries: [
      "Farming, Animals & Conservation",
      "Community Services & Development",
    ],
    seniority: "mid",
    salary: [22000, 36000],
    profession: "Agriculturist",
    summary:
      "Work directly with farmer cooperatives on production, post-harvest handling and getting produce to a buyer while it is still worth something.",
    responsibilities: [
      "Provide technical advice on crop production and pest management",
      "Run field demonstrations and farmer training sessions",
      "Coordinate aggregation, grading and delivery schedules",
      "Collect and report field data honestly, including the poor harvests",
    ],
    requirements: [
      "A BS in Agriculture or Agribusiness; PRC licence an advantage",
      "Two or more years of field or extension work",
      "Willingness to travel to rural sites regularly and stay overnight",
      "Fluency in the local language of the assigned area",
    ],
    skills: [
      "Crop Management",
      "Farmer Training",
      "Post-Harvest Handling",
      "Field Data Collection",
    ],
  },
  {
    title: "Business Analyst",
    industries: [
      "Consulting & Strategy",
      "Information & Communication Technology",
      "Banking & Financial Services",
    ],
    seniority: "mid",
    salary: [45000, 75000],
    profession: "Business Analyst",
    summary:
      "Sit between the business and the people building for it, and make sure what gets built is what was actually needed.",
    responsibilities: [
      "Elicit and document requirements that survive contact with implementation",
      "Map current and future-state processes, and name the parts that will hurt",
      "Write user stories with acceptance criteria a tester can use",
      "Support UAT and the change management that decides whether anyone adopts it",
    ],
    requirements: [
      "Three or more years as a business or systems analyst",
      "Process mapping and requirements documentation",
      "SQL and enough data literacy to check a claim yourself",
      "The ability to run a workshop where two departments disagree",
    ],
    skills: [
      "Requirements Gathering",
      "Process Mapping",
      "SQL",
      "User Stories",
      "Stakeholder Management",
      "Jira",
    ],
  },
  {
    title: "Property Management Officer",
    industries: ["Real Estate & Property", "Trades & Services"],
    seniority: "mid",
    salary: [25000, 40000],
    profession: "Property Manager",
    summary:
      "Run the day-to-day of a commercial or residential property — tenants, contractors, budget and the building itself.",
    responsibilities: [
      "Handle tenant relations, from move-in to the complaints that follow",
      "Manage maintenance contractors and hold them to their service levels",
      "Prepare and monitor the operating budget",
      "Keep permits, insurance and safety compliance current",
    ],
    requirements: [
      "A degree in Business, Engineering or Real Estate Management",
      "Three or more years in property or facilities management",
      "Familiarity with the Condominium Act and local permit requirements",
      "Composure with an angry tenant at seven in the morning",
    ],
    skills: [
      "Property Management",
      "Tenant Relations",
      "Budgeting",
      "Vendor Management",
      "Facilities Compliance",
    ],
  },
  {
    title: "Safety Officer",
    industries: [
      "Construction",
      "Engineering",
      "Trades & Services",
      "Farming, Animals & Conservation",
    ],
    seniority: "mid",
    salary: [24000, 40000],
    profession: "Safety Officer",
    summary:
      "Own occupational safety on an active site, with the authority to stop work and the expectation that you will use it.",
    responsibilities: [
      "Run toolbox talks, inductions and regular safety training",
      "Conduct inspections and close out findings rather than only logging them",
      "Investigate incidents and near-misses, and report them to DOLE where required",
      "Maintain the safety programme and its records to DOLE D.O. 198 standard",
    ],
    requirements: [
      "DOLE-accredited Safety Officer certification (SO2 or higher)",
      "Two or more years as a safety officer on construction or industrial sites",
      "First aid and basic occupational health training",
      "The willingness to be unpopular on a Friday afternoon",
    ],
    skills: [
      "Occupational Safety",
      "DOLE Compliance",
      "Incident Investigation",
      "Risk Assessment",
      "Safety Training",
    ],
  },
  {
    title: "Content Writer",
    industries: [
      "Marketing & Communications",
      "Advertising, Arts & Media",
      "Education & Training",
    ],
    seniority: "entry",
    salary: [22000, 38000],
    profession: "Content Writer",
    summary:
      "Write the articles, landing pages and email that carry a brand's voice. Clear English, researched properly, published on a schedule.",
    responsibilities: [
      "Research and write long-form articles and web copy",
      "Edit and proofread the team's output, including your own after a day away from it",
      "Apply SEO principles without letting them ruin the sentence",
      "Work to a content calendar and hit it",
    ],
    requirements: [
      "A degree in Communications, Journalism, English or equivalent evidence",
      "A portfolio of published writing",
      "SEO fundamentals and keyword research",
      "The ability to take an edit without taking it personally",
    ],
    skills: [
      "Copywriting",
      "SEO",
      "Editing",
      "Research",
      "WordPress",
      "Content Strategy",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Description assembly                                                       */
/* -------------------------------------------------------------------------- */

/** How the location line reads, given how the job is worked. */
function locationLine(locationType: string, location: string): string {
  if (locationType === "Remote") {
    return "This role is fully remote within the Philippines. You will need a stable connection and a workspace you can take calls from.";
  }

  if (locationType === "Hybrid") {
    return `This role is hybrid out of ${location} — roughly two days a week on site, the rest wherever you work best.`;
  }

  return `This role is on site in ${location}.`;
}

export interface JobDescriptionContext {
  role: RoleArchetype;
  companyName: string;
  location: string;
  locationType: string;
  employmentType: string;
}

/**
 * Assemble the posting.
 *
 * Markdown, because the job page renders it through `Markdown` — which styles
 * `ul` as a disc list and leaves `**` as bold. The order is the one candidates
 * read in: what the job is, what you would do, what you need, then the
 * practicalities they scroll to the bottom for.
 */
export function buildJobDescription(context: JobDescriptionContext): string {
  const { role, companyName, location, locationType, employmentType } = context;

  return [
    `**${companyName}** is hiring a ${role.title.toLowerCase()}.`,
    "",
    role.summary,
    "",
    "**What you'll do**",
    "",
    ...role.responsibilities.map((item) => `- ${item}`),
    "",
    "**What we're looking for**",
    "",
    ...role.requirements.map((item) => `- ${item}`),
    "",
    "**The practical details**",
    "",
    `- ${employmentType} position`,
    `- ${locationLine(locationType, location)}`,
    "- Salary is the range shown above, and we will discuss where in it you land before you interview",
    "- Government-mandated benefits, HMO and 13th month pay",
    "",
    "If you meet most of this and not all of it, apply anyway and tell us which parts you would be learning.",
  ].join("\n");
}

/** Every profession the roles hire for — the pool applicants are drawn from. */
export const PROFESSIONS = Array.from(
  new Set(ROLES.map((role) => role.profession)),
);

/** The roles that hire for a given profession, for matching applications. */
export function rolesForProfession(profession: string): RoleArchetype[] {
  return ROLES.filter((role) => role.profession === profession);
}

/** The roles an employer in this industry would plausibly post. */
export function rolesForIndustry(industry: string): RoleArchetype[] {
  const matches = ROLES.filter((role) => role.industries.includes(industry));

  // Every industry has at least a few generic support roles it could post, so
  // an employer in a thinly-covered industry still gets a varied list rather
  // than the same two jobs repeated.
  return matches.length >= 4
    ? matches
    : [
        ...matches,
        ...ROLES.filter((role) =>
          [
            "HR Officer",
            "Executive Assistant",
            "Accountant",
            "IT Support Specialist",
          ].includes(role.title),
        ),
      ];
}
