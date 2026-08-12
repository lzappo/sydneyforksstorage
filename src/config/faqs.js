import { units, monthly } from "./pricing.js";

const COUNT_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight"];

function countWord(count) {
  return COUNT_WORDS[count] ?? String(count);
}

// "a; b; and c" — semicolons because the clauses contain commas of their own.
function joinClauses(clauses) {
  if (clauses.length <= 2) return clauses.join(" and ");
  return `${clauses.slice(0, -1).join("; ")}; and ${clauses[clauses.length - 1]}`;
}

// Derived from the unit definitions rather than spelled out, so adding, removing,
// resizing, or repricing a unit keeps this answer — and the FAQPage structured
// data built from it — correct without a second edit.
const unitSizesAnswer = `We offer ${countWord(units.length)} sizes: ${joinClauses(
  units.map((unit) => `a ${unit.compactSize} unit (${monthly(unit.id)}) ${unit.faqPhrase}`),
)}. All units feature 9.5-foot ceilings for extra vertical space.`;

// Single source of truth for the FAQ content.
//
// Rendered by the FAQ section, and injected into the FAQPage structured data in
// index.html at build time by the inject-structured-data plugin in
// vite.config.js.
// Because search engines can surface these answers directly, keep the wording
// self-contained — avoid phrasing that only makes sense on the page itself.
export const faqs = [
  {
    id: "unit-sizes",
    question: "What storage unit sizes do you offer?",
    answer: unitSizesAnswer,
  },
  {
    id: "month-to-month",
    question: "Do you offer month-to-month rentals?",
    answer:
      "Yes. All our units are available on flexible month-to-month terms with no long-term commitment required. Longer-term arrangements are also welcome.",
  },
  {
    id: "access",
    question: "Is there 24/7 access to my unit?",
    answer:
      "Yes — access is available 24 hours a day, 7 days a week. There are no office hours or time restrictions on when you can use your unit.",
  },
  {
    id: "heated",
    question: "Are the units heated?",
    answer:
      "Yes, our units are heated, protecting your belongings from Nova Scotia's cold winters. This makes them suitable for temperature-sensitive items like electronics, wood furniture, and clothing.",
  },
  {
    id: "how-to-rent",
    question: "How do I rent a unit?",
    answer:
      "Simply call us at 902-574-2282 or fill out the quote request form on our website. We'll help you find the right unit size and get you set up quickly.",
  },
  {
    id: "location",
    question: "Where are you located?",
    answer:
      "We are located at 2627 King's Rd, Sydney Forks, Nova Scotia, B1L1A1 — conveniently accessible from Sydney, North Sydney, and surrounding Cape Breton communities.",
  },
  {
    id: "hidden-fees",
    question: "Are there any hidden fees?",
    answer:
      "No hidden fees. Our pricing is straightforward — you pay the listed monthly rate plus applicable HST. No surprise charges.",
  },
];
