/**
 * The two pieces of writing a person on this site produces: the "About me" on
 * their profile, and the pitch attached to an application.
 *
 * They are deliberately different lengths, because they are in real life. An
 * About me is two or three sentences that someone wrote once and has not
 * revisited — nobody writes an essay in that box. A pitch is longer, written
 * for a particular job, and reads like it was typed in one go.
 *
 * Both are templates rather than fixed strings: a hundred applicants sharing
 * six paragraphs of prose is worse than no prose at all, because the repetition
 * is the first thing a reader notices.
 */

/**
 * "1 year" rather than "1 years".
 *
 * Worth a helper rather than an accepted rough edge: the seeded profiles are
 * the first thing anyone sees on this site, and a grammatical error repeated
 * across a hundred of them reads as generated text, which is exactly the
 * impression the prose is here to avoid.
 */
const yearsOf = (n: number) => (n === 1 ? "1 year" : `${n} years`);

/** The possessive form, where the apostrophe moves: "1 year's", "6 years'". */
const yearsPossessive = (n: number) => (n === 1 ? "1 year's" : `${n} years'`);

export interface AboutContext {
  profession: string;
  years: number;
  city: string;
  /** Two of the person's actual skills, so the sentence is not generic. */
  skills: [string, string];
}

/**
 * Short, plain, first person. No "results-driven professional" — that is how
 * generated text gives itself away, and it is not how people write about
 * themselves when they are tired and the field is required.
 */
export const ABOUT_TEMPLATES: ((c: AboutContext) => string)[] = [
  (c) =>
    `${c.profession} with ${yearsPossessive(c.years)} experience, currently based in ${c.city}. Most of my work has been with ${c.skills[0]} and ${c.skills[1]}. Looking for a team where I can go deeper rather than wider.`,
  (c) =>
    `I've been doing ${c.profession.toLowerCase()} work for about ${yearsOf(c.years)}, mostly ${c.skills[0]} and ${c.skills[1]}. I like problems that stay solved. Open to roles in ${c.city} or remote.`,
  (c) =>
    `${yearsOf(c.years)} as a ${c.profession.toLowerCase()}. Strongest in ${c.skills[0]}; currently getting properly good at ${c.skills[1]}. Based in ${c.city}, happy to discuss hybrid or remote.`,
  (c) =>
    `Based in ${c.city}. ${yearsOf(c.years)} in ${c.profession.toLowerCase()} roles, most recently focused on ${c.skills[0]}. I work best on small teams where I can see what happens to the thing after I hand it over.`,
  (c) =>
    `${c.profession} — ${yearsOf(c.years)} in, mostly small and mid-sized companies. ${c.skills[0]} and ${c.skills[1]} are where I'm most useful. Looking for somewhere with room to grow into a senior role.`,
  (c) =>
    `I'm a ${c.profession.toLowerCase()} in ${c.city} with ${yearsOf(c.years)} behind me. I care about doing the boring parts properly — documentation, handover, the things that make the next person's job easier.`,
  (c) =>
    `${yearsPossessive(c.years)} experience, currently in ${c.city}. Comfortable with ${c.skills[0]} and ${c.skills[1]}, and used to being the person who picks up whatever nobody else has. Available at short notice.`,
  (c) =>
    `${c.profession} looking for my next role. ${yearsOf(c.years)} so far, mostly ${c.skills[0]}. I'd rather join a team that's honest about what's broken than one that says everything is fine.`,
];

/** For the applicants seeded with no work history, where years would be a lie. */
export const FRESH_GRADUATE_ABOUTS: ((
  c: Omit<AboutContext, "years">,
) => string)[] = [
  (c) =>
    `Recent graduate looking for a first role in ${c.profession.toLowerCase()}. Picked up ${c.skills[0]} and ${c.skills[1]} through coursework and my own projects. Based in ${c.city} and ready to start immediately.`,
  (c) =>
    `Fresh graduate, based in ${c.city}. My thesis and internship were both in ${c.skills[0]}, and I've been teaching myself ${c.skills[1]} since. Looking for somewhere that's willing to train.`,
  (c) =>
    `Just finished my degree and looking for an entry-level ${c.profession.toLowerCase()} position. No professional experience yet — what I have is ${c.skills[0]} from my internship and a lot of willingness. Open to anywhere in ${c.city}.`,
];

export interface PitchContext {
  jobTitle: string;
  companyName: string;
  profession: string;
  years: number;
  skills: string[];
}

/**
 * Cover letters, of deliberately differing lengths: the applicants list clamps
 * long ones behind a "read more" toggle, so a seed of uniform paragraphs would
 * never exercise either state.
 *
 * They are written the way good applications actually read — specific about one
 * thing, honest about a gap, and ending with something other than "I look
 * forward to hearing from you."
 */
export const PITCH_TEMPLATES: ((c: PitchContext) => string)[] = [
  (c) =>
    `I've spent the last ${yearsOf(c.years)} doing more or less exactly what your ${c.jobTitle.toLowerCase()} posting describes, and the part I keep coming back to is ${c.skills[0]}. In my current role I own that end to end. What drew me to ${c.companyName} specifically is that the posting says what the job actually involves rather than listing twenty things nobody does. Happy to walk through a recent example, including the one that went badly.`,
  (c) =>
    `Applying for the ${c.jobTitle.toLowerCase()} role. Short version: ${yearsOf(c.years)} in ${c.profession.toLowerCase()}, strongest in ${c.skills[0]} and ${c.skills[1]}. I'm looking to move because my current team has stopped growing and I want to be somewhere the work still gets harder.`,
  (c) =>
    `Good day. I am writing to apply for the ${c.jobTitle} position at ${c.companyName}.\n\nI have ${yearsOf(c.years)} of experience in this field, most of it in ${c.skills[0]}. In my present role I handle this independently and have trained two junior staff on it. I believe I can contribute the same here.\n\nI am available to start after thirty days' notice, and I am happy to discuss the details at your convenience. Thank you for considering my application.`,
  (c) =>
    `I'll be straight about the fit: I have ${yearsOf(c.years)} and strong ${c.skills[0]}, but I have not worked at your scale before. What I do have is a track record of getting up to speed fast — I joined my current company knowing none of their stack and was on the on-call rota within three months. If the gap is a problem, I understand, but I'd rather tell you now than have it come up in the second interview.`,
  (c) =>
    `The ${c.jobTitle.toLowerCase()} posting mentions ${c.skills[0]}, which is the thing I've spent most of the last ${yearsOf(c.years)} on. I've made most of the mistakes available in it, which I think is worth more than the successes. I'm interested in ${c.companyName} because you're small enough that I'd see the consequences of my own decisions.`,
  (c) =>
    `Hi — I'm interested in the ${c.jobTitle.toLowerCase()} role.\n\nI've been a ${c.profession.toLowerCase()} for ${yearsOf(c.years)}. My strongest areas are ${c.skills[0]} and ${c.skills[1]}; I'm competent but not expert at the rest of your requirements list.\n\nI'm applying because I'd like to work somewhere the team is small enough that I know what everyone is doing. Available for a call any afternoon this week.`,
  (c) =>
    `${yearsOf(c.years)} in ${c.profession.toLowerCase()}, and I'm looking for a role where I can do less firefighting and more building. Your posting reads like the work is planned rather than reactive, which is what caught my attention. Strongest in ${c.skills[0]}. Currently serving notice, so I could start in a month.`,
  (c) =>
    `I'd like to be considered for the ${c.jobTitle} role at ${c.companyName}. I've worked in ${c.profession.toLowerCase()} for ${yearsOf(c.years)}, and the through-line has been ${c.skills[0]} — I've built it, broken it, and been the person paged when it went down at 3am. I'm not looking for a title change, just better problems.`,
];

/** For applicants with no work history, where the templates above would lie. */
export const FRESH_GRADUATE_PITCHES: ((
  c: Omit<PitchContext, "years">,
) => string)[] = [
  (c) =>
    `I'm applying for the ${c.jobTitle.toLowerCase()} role as a recent graduate. I don't have professional experience yet — what I have is ${c.skills[0]} from my thesis and internship, and the time to put into learning the rest properly. I noticed the posting says to apply even without every requirement, so I am.`,
  (c) =>
    `Fresh graduate applying for the ${c.jobTitle.toLowerCase()} position. My internship was in ${c.skills[0]} and I've kept working on ${c.skills[1]} since graduating. I know I'd be starting from the bottom at ${c.companyName} and I'm fine with that — I'd rather learn properly somewhere good than be given a title somewhere that doesn't train.`,
];
