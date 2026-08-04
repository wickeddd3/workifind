/**
 * The seeded employers: their names, and the long-form `about` the company page
 * renders.
 *
 * The names are invented. That is deliberate rather than lazy — a seed that
 * attributes fabricated job posts, salary bands and perks to Jollibee or Globe
 * is a fabricated record about a real organisation, and this database backs a
 * portfolio site that people other than its author will open. The words are
 * Filipino and the industries are the real ones, so it reads as this market
 * without claiming to be any actual company in it.
 *
 * `about` is markdown: the company page renders it through `Markdown`, which
 * styles `ul` as a disc list. Each one runs to a couple of paragraphs and a
 * bulleted block, because the panel that shows it is a full-width card and a
 * single sentence in it looks like a page that failed to load.
 */

import type { SeedLocation } from "./locations";

/**
 * Word stems for company names — Filipino, not tied to any one industry, and
 * deliberately not to any one place.
 *
 * Island and region names were tried and removed: the location is drawn
 * separately, so the pool cheerfully produced "Mindanao Capital" headquartered
 * in Iloilo. Landmarks that read as national rather than regional — Mayon, Apo,
 * Banaue — are fine, because a company named after a mountain is not claiming
 * to be beside it.
 */
const ROOTS = [
  "Bayanihan",
  "Maharlika",
  "Sampaguita",
  "Narra",
  "Kalayaan",
  "Liwanag",
  "Balangay",
  "Katipunan",
  "Tala",
  "Sinag",
  "Alab",
  "Bagwis",
  "Anahaw",
  "Dalisay",
  "Marikit",
  "Banaue",
  "Mayon",
  "Apo",
  "Sierra",
  "Bituin",
  "Agila",
  "Haraya",
  "Adarna",
  "Lakan",
  "Diwa",
  "Sigla",
  "Tanglaw",
  "Yaman",
  "Ulap",
  "Archipelago",
  "Pearl",
  "Monsoon",
  "Habagat",
  "Amihan",
  "Tambuli",
  "Salinlahi",
  "Pandayan",
  "Gintong",
  "Bukid",
  "Dagat",
];

/**
 * The second word, chosen by industry so a construction firm is not called
 * "Labs". Several per industry, so fifty employers do not end in five suffixes.
 */
const SUFFIXES: Record<string, string[]> = {
  Accounting: ["Advisory", "Accounting Group", "Financial Services"],
  "Administration & Office Support": [
    "Business Services",
    "Support Group",
    "Corporate Services",
  ],
  "Advertising, Arts & Media": ["Studios", "Creative", "Media Group"],
  "Banking & Financial Services": [
    "Capital",
    "Financial Group",
    "Lending Corporation",
  ],
  "Call Centre & Customer Service": [
    "Outsourcing",
    "Support Solutions",
    "Contact Solutions",
  ],
  "CEO & General Management": ["Holdings", "Group", "Enterprises"],
  "Community Services & Development": [
    "Foundation",
    "Community Partners",
    "Initiative",
  ],
  Construction: ["Builders", "Construction Corporation", "Infrastructure"],
  "Consulting & Strategy": ["Consulting", "Partners", "Advisory Group"],
  "Design & Architecture": ["Design Studio", "Architects", "Design Collective"],
  "Education & Training": ["Learning", "Institute", "Education Group"],
  Engineering: ["Engineering", "Technical Services", "Industrial"],
  "Farming, Animals & Conservation": [
    "Agri Ventures",
    "Farms",
    "Conservation Trust",
  ],
  "Healthcare & Medical": ["Health", "Medical Group", "Care Network"],
  "Hospitality & Tourism": ["Hospitality", "Resorts", "Travel Group"],
  "Information & Communication Technology": [
    "Technologies",
    "Digital",
    "Software",
    "Labs",
  ],
  "Marketing & Communications": [
    "Marketing Group",
    "Communications",
    "Brand Partners",
  ],
  "Real Estate & Property": ["Properties", "Land Corporation", "Realty"],
  Sales: ["Trading", "Distribution", "Commercial Group"],
  "Science & Technology": ["Sciences", "Research Group", "Biotech"],
  "Trades & Services": ["Services", "Facilities Group", "Trade Works"],
};

export const COMPANY_ROOTS = ROOTS;

export function companySuffixes(industry: string): string[] {
  return SUFFIXES[industry] ?? ["Group", "Corporation", "Ventures"];
}

/* -------------------------------------------------------------------------- */
/*  About                                                                      */
/* -------------------------------------------------------------------------- */

export interface AboutContext {
  companyName: string;
  industry: string;
  location: SeedLocation;
  /** Roughly how long the company has been going, in years. */
  age: number;
  headcount: number;
}

/**
 * What the company does, by industry. One opening paragraph each — the part
 * that cannot be templated, because "we build software" and "we run a hospital
 * network" share no sentence.
 */
const PITCH: Record<string, (c: AboutContext) => string> = {
  Accounting: (c) =>
    `${c.companyName} keeps the books for small and mid-sized Philippine businesses — bookkeeping, payroll, BIR compliance and the annual audit. Most of our clients came to us after outgrowing a part-time bookkeeper and discovering how much of their tax exposure nobody had been watching.`,
  "Administration & Office Support": (c) =>
    `${c.companyName} runs the back office for companies that would rather not build one. Records, scheduling, procurement support and document control, handled by a team that has done it for organisations several times our clients' size.`,
  "Advertising, Arts & Media": (c) =>
    `${c.companyName} is a ${c.location.name} creative studio working across brand, film and social. We make the work that has to hold up on a phone screen at arm's length, which is where nearly all of it is actually seen.`,
  "Banking & Financial Services": (c) =>
    `${c.companyName} lends to Philippine SMEs that the big banks turn away for want of collateral rather than for want of a business. We underwrite on cash flow, decide in days rather than months, and hold the loans on our own book.`,
  "Call Centre & Customer Service": (c) =>
    `${c.companyName} runs customer support and back-office operations for clients in Australia, the US and the UK, out of sites in ${c.location.name}. Voice, chat and email, on schedules that follow our clients' business hours rather than ours.`,
  "CEO & General Management": (c) =>
    `${c.companyName} is a family-held group with interests in retail, logistics and property across ${c.location.region}. The operating companies are run independently; the centre handles capital, governance and the senior hires.`,
  "Community Services & Development": (c) =>
    `${c.companyName} works with local government units and barangay councils on livelihood, disaster preparedness and access to services. Programme design, delivery and the monitoring that tells us whether any of it worked.`,
  Construction: (c) =>
    `${c.companyName} builds mid-rise residential and light commercial projects across ${c.location.region}. We self-perform structural works rather than subcontracting them, which is the main reason our schedules hold.`,
  "Consulting & Strategy": (c) =>
    `${c.companyName} advises Philippine and regional companies on growth, operating models and market entry. Small teams, senior people on the work rather than on the pitch, and engagements measured in weeks.`,
  "Design & Architecture": (c) =>
    `${c.companyName} is an architecture and interiors practice in ${c.location.name}, working on workplaces, hospitality and mixed-use projects. We design for the climate we are actually in — shade, cross-ventilation and rain, before air conditioning.`,
  "Education & Training": (c) =>
    `${c.companyName} trains working Filipinos in the skills their employers are hiring for — technical, language and supervisory programmes, taught in the evenings and on weekends because that is when our learners are free.`,
  Engineering: (c) =>
    `${c.companyName} provides design, fabrication and maintenance engineering to manufacturers and utilities across ${c.location.region}. Mechanical, electrical and controls, under one roof, so nobody spends a week deciding whose fault a fault is.`,
  "Farming, Animals & Conservation": (c) =>
    `${c.companyName} works with smallholder farmers in ${c.location.region} on higher-value crops and better post-harvest handling. We buy, aggregate, and get produce to market before it spoils, which is where most of the value in Philippine agriculture is currently lost.`,
  "Healthcare & Medical": (c) =>
    `${c.companyName} operates clinics and diagnostic centres serving communities in ${c.location.region}. Primary care, laboratory and imaging, priced so that the people around each site can actually use them.`,
  "Hospitality & Tourism": (c) =>
    `${c.companyName} runs resorts and boutique properties in the Visayas and Palawan. We hire and train locally at every level, including the ones that usually get filled from Manila.`,
  "Information & Communication Technology": (c) =>
    `${c.companyName} builds software for companies operating in the Philippines — logistics, payments and the unglamorous internal systems that run them. We work in small product teams that own what they ship, including at two in the morning when it breaks.`,
  "Marketing & Communications": (c) =>
    `${c.companyName} handles brand, performance and communications for consumer businesses in the Philippines. We are the agency clients call when the media spend has stopped working and nobody can say why.`,
  "Real Estate & Property": (c) =>
    `${c.companyName} develops and manages residential and commercial property in ${c.location.region}. We hold what we build rather than selling out of it, which changes how carefully it gets built.`,
  Sales: (c) =>
    `${c.companyName} distributes consumer and industrial goods across ${c.location.region}, from national brands to regional lines. Warehousing, field sales and trade marketing, covering routes that go well past the provincial capitals.`,
  "Science & Technology": (c) =>
    `${c.companyName} runs applied research and laboratory services for food, water and materials testing. Accredited methods, defensible results, and turnaround measured in days because our clients' shipments are waiting on them.`,
  "Trades & Services": (c) =>
    `${c.companyName} provides facilities maintenance, electrical and mechanical services to commercial buildings and industrial sites in ${c.location.name}. Planned maintenance during the day, and a crew on call for the rest of it.`,
};

/** How the company describes itself as a place to work. Varied, then picked. */
const CULTURE = [
  (c: AboutContext) =>
    `We are about ${c.headcount} people and have been at it for ${c.age} years. Small enough that decisions are made by the people who will live with them, large enough that nobody is the only one who knows how something works.`,
  (c: AboutContext) =>
    `The team is ${c.headcount}-strong across ${c.location.region}. We have grown roughly a third every year for the last three, which is the good problem and also the reason we care so much about how people are onboarded.`,
  (c: AboutContext) =>
    `${c.headcount} of us, ${c.age} years in, and still small enough that a new hire meets everyone in their first month. We promote from within wherever we can — most of our team leads started here in an entry-level role.`,
  (c: AboutContext) =>
    `We run lean: ${c.headcount} people covering work that comparable firms staff with twice that. In practice that means real ownership early, and a hard rule that nobody carries a second person's workload for more than a month.`,
];

/** What working there is actually like, day to day. Also picked, not fixed. */
const WORKING_HERE = [
  [
    "**Hybrid by default.** Two days in the office, three wherever you work best. Teams pick their own overlap days rather than being assigned one.",
    "**Meetings have a reason.** Anything recurring gets reviewed quarterly and cancelled if it cannot justify itself.",
    "**Learning budget.** ₱25,000 a year each, for courses, certifications or conferences, with no requirement to tie it to your current role.",
    "**HMO from day one.** Coverage starts on your first day, not after regularisation, and includes one dependent.",
  ],
  [
    "**Fixed shift, real overtime.** Schedules are published a month ahead, and overtime is paid rather than absorbed.",
    "**Internal mobility.** Open roles are posted internally first for a week. Roughly half our supervisory hires this year came from inside.",
    "**HMO plus dependents.** Coverage on regularisation, extending to two dependents after a year.",
    "**Transport and meal allowance** for anyone on a shift that starts before 6am or ends after 10pm.",
  ],
  [
    "**Four-day weeks in December.** The month everyone is exhausted and half the country is on leave anyway.",
    "**No-questions leave.** Fifteen days of vacation on top of the statutory minimum, and we do not ask what it is for.",
    "**Equipment you choose.** Laptop and setup are yours to specify within a budget, replaced on a three-year cycle.",
    "**Rice and transport allowance**, paid on top of base rather than folded into it.",
  ],
  [
    "**Mentored first six months.** Every new hire is paired with someone senior who has an hour a week set aside for them.",
    "**Salary bands are published internally.** You can see the range for your role and the one above it.",
    "**Study leave.** Paid days for board exams, licensure renewals and certification sittings.",
    "**Annual health check** for everyone, on company time.",
  ],
];

/** The perks list on the profile — short tags, not sentences. */
export const PERK_POOL = [
  "HMO from day one",
  "HMO with dependents",
  "Hybrid setup",
  "Work from home",
  "Flexible hours",
  "13th month pay",
  "Performance bonus",
  "Rice allowance",
  "Transport allowance",
  "Meal allowance",
  "Night differential",
  "Learning budget",
  "Paid certifications",
  "Study leave",
  "Annual salary review",
  "Retirement plan",
  "Life insurance",
  "Paid parental leave",
  "Company laptop",
  "Internet allowance",
  "Team offsites",
  "Service incentive leave",
  "Employee referral bonus",
  "Free parking",
];

/**
 * Assemble the `about`.
 *
 * The shape is fixed — what we do, who we are, what it is like here — and only
 * the content varies, because a company page where every employer chose a
 * different structure is harder to scan, not more realistic.
 */
export function buildAbout(
  context: AboutContext,
  pick: <T>(items: T[]) => T,
): string {
  const pitch =
    PITCH[context.industry]?.(context) ??
    `${context.companyName} operates in ${context.industry.toLowerCase()} across ${context.location.region}.`;

  const culture = pick(CULTURE)(context);
  const workingHere = pick(WORKING_HERE);

  return [
    pitch,
    "",
    culture,
    "",
    "**What it's like to work here**",
    "",
    ...workingHere.map((line) => `- ${line}`),
    "",
    `We hire out of ${context.location.name} and, for most roles, anywhere in the country you can get a stable connection. If the posting says hybrid, it means the office is reachable from where you live — we would rather say so now than discover it in your second week.`,
  ].join("\n");
}
