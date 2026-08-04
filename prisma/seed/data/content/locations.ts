/**
 * Where the seeded market is: the Philippines.
 *
 * Real places, because the app filters and searches on this string and a made-up
 * city makes the location filter meaningless to look at. They are written the
 * way a job ad writes them — "Bonifacio Global City, Taguig" rather than the
 * bare municipality — since that is what an employer types and what a candidate
 * searches for.
 *
 * `hub` marks the districts that carry most white-collar hiring. Employers are
 * weighted toward them so the map of the seeded market looks like the real one:
 * concentrated in Metro Manila and Cebu, with a real but thinner spread across
 * the rest of the country.
 */

export interface SeedLocation {
  name: string;
  region: string;
  hub: boolean;
}

export const LOCATIONS: SeedLocation[] = [
  // Metro Manila — the business districts, named as ads name them.
  { name: "Makati City", region: "Metro Manila", hub: true },
  { name: "Bonifacio Global City, Taguig", region: "Metro Manila", hub: true },
  { name: "Ortigas Center, Pasig", region: "Metro Manila", hub: true },
  { name: "Quezon City", region: "Metro Manila", hub: true },
  { name: "Alabang, Muntinlupa", region: "Metro Manila", hub: true },
  { name: "Manila", region: "Metro Manila", hub: true },
  { name: "Mandaluyong City", region: "Metro Manila", hub: true },
  { name: "Pasay City", region: "Metro Manila", hub: false },
  { name: "Parañaque City", region: "Metro Manila", hub: false },
  { name: "Marikina City", region: "Metro Manila", hub: false },

  // Cebu — the second hub, and the biggest outside Luzon.
  { name: "Cebu City", region: "Central Visayas", hub: true },
  { name: "Mandaue City", region: "Central Visayas", hub: false },
  { name: "Lapu-Lapu City", region: "Central Visayas", hub: false },

  // The other regional centres, in rough order of how much hiring they carry.
  { name: "Davao City", region: "Davao Region", hub: true },
  { name: "Iloilo City", region: "Western Visayas", hub: true },
  { name: "Clark Freeport, Pampanga", region: "Central Luzon", hub: true },
  { name: "Sta. Rosa, Laguna", region: "Calabarzon", hub: true },
  { name: "Bacolod City", region: "Western Visayas", hub: false },
  { name: "Cagayan de Oro City", region: "Northern Mindanao", hub: false },
  { name: "Baguio City", region: "Cordillera", hub: false },
  { name: "Angeles City, Pampanga", region: "Central Luzon", hub: false },
  { name: "General Santos City", region: "Soccsksargen", hub: false },
  { name: "Naga City, Camarines Sur", region: "Bicol Region", hub: false },
  { name: "Batangas City", region: "Calabarzon", hub: false },
  { name: "Dumaguete City", region: "Central Visayas", hub: false },
  { name: "Zamboanga City", region: "Zamboanga Peninsula", hub: false },
  { name: "Tacloban City", region: "Eastern Visayas", hub: false },
  { name: "Legazpi City, Albay", region: "Bicol Region", hub: false },
  { name: "Puerto Princesa, Palawan", region: "Mimaropa", hub: false },
  { name: "Butuan City", region: "Caraga", hub: false },
];

export const HUB_LOCATIONS = LOCATIONS.filter((location) => location.hub);
