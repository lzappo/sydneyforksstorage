// Single source of truth for unit sizes and pricing.
//
// Consumed by the Units and FAQ sections, and injected into the structured
// data in index.html at build time by the inject-structured-data plugin in
// vite.config.js. Change a price here and it updates everywhere.
export const units = [
  {
    id: "small",
    tier: "Small",
    size: "9 ft × 10 ft",
    compactSize: "9×10 ft",
    monthlyPrice: 150,
    description:
      "Perfect for boxes, seasonal items, or small furniture. Ideal for apartments and decluttering.",
    // Reads as "a 9×10 ft unit ($150/month) <faqPhrase>" in the sizes FAQ answer.
    faqPhrase: "ideal for boxes, seasonal items, or small furniture",
  },
  {
    id: "medium",
    tier: "Medium",
    size: "10 ft × 18 ft",
    compactSize: "10×18 ft",
    monthlyPrice: 250,
    description:
      "Room for furniture sets, appliances, or business inventory. Great for moving or renovations.",
    faqPhrase: "great for furniture sets, appliances, or business inventory",
  },
  {
    id: "large",
    tier: "Large",
    size: "14 ft × 16 ft",
    compactSize: "14×16 ft",
    monthlyPrice: 300,
    description:
      "Spacious units for vehicles, large furniture, or commercial storage. Maximum flexibility.",
    faqPhrase: "for vehicles, large furniture, or commercial storage",
  },
];

// Every field above ends up in visitor-facing copy or in structured data that
// Google may surface, so a typo'd or missing field would silently ship
// "undefined" into a search result. Fail at import instead.
const REQUIRED_FIELDS = ["id", "tier", "size", "compactSize", "description", "faqPhrase"];

for (const unit of units) {
  for (const field of REQUIRED_FIELDS) {
    if (!unit[field]) {
      throw new Error(`Unit "${unit.id ?? "?"}" is missing a "${field}" value`);
    }
  }
  if (typeof unit.monthlyPrice !== "number") {
    throw new Error(`Unit "${unit.id}" needs a numeric monthlyPrice`);
  }
}

function unitById(id) {
  const unit = units.find((candidate) => candidate.id === id);
  if (!unit) throw new Error(`Unknown unit id: ${id}`);
  return unit;
}

// "$150/month"
export function monthly(id) {
  return `$${unitById(id).monthlyPrice}/month`;
}

// "$150/month + HST"
export function monthlyWithTax(id) {
  return `${monthly(id)} + HST`;
}

// "$150-$300" — the priceRange in the SelfStorage structured data.
export function priceRange() {
  const prices = units.map((unit) => unit.monthlyPrice);
  return `$${Math.min(...prices)}-$${Math.max(...prices)}`;
}
