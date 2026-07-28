/**
 * Cross-import API for `entities/employer`.
 *
 * Entities are siblings and must not import each other, so this is the narrow,
 * declared exception the lint rule describes. It exists because the employer
 * slice counts a company's open roles, and "open" is a fact the job slice owns
 * — duplicating the condition there is what let the two definitions drift in
 * the first place.
 *
 * Keep this surface minimal: a policy constant, no queries and no UI.
 */
export { LISTABLE_JOB } from "../model/listable";
