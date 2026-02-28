import { useState } from "react";

const faqs = [
  {
    question: "What storage unit sizes do you offer?",
    answer: "We offer three sizes: a 9×10 ft unit ($150/month) ideal for boxes, seasonal items, or small furniture; a 10×18 ft unit ($250/month) great for furniture sets, appliances, or business inventory; and a 14×16 ft unit ($325/month) for vehicles, large furniture, or commercial storage. All units feature 9.5-foot ceilings for extra vertical space.",
  },
  {
    question: "Do you offer month-to-month rentals?",
    answer: "Yes. All our units are available on flexible month-to-month terms with no long-term commitment required. Longer-term arrangements are also welcome.",
  },
  {
    question: "Is there 24/7 access to my unit?",
    answer: "Yes — access is available 24 hours a day, 7 days a week. There are no office hours or time restrictions on when you can use your unit.",
  },
  {
    question: "Are the units heated?",
    answer: "Yes, our units are heated, protecting your belongings from Nova Scotia's cold winters. This makes them suitable for temperature-sensitive items like electronics, wood furniture, and clothing.",
  },
  {
    question: "How do I rent a unit?",
    answer: "Simply call us at 902-574-2282 or fill out the quote request form on this page. We'll help you find the right unit size and get you set up quickly.",
  },
  {
    question: "Where are you located?",
    answer: "We are located at 2627 King's Rd, Sydney Forks, Nova Scotia, B1L1A1 — conveniently accessible from Sydney, North Sydney, and surrounding Cape Breton communities.",
  },
  {
    question: "Are there any hidden fees?",
    answer: "No hidden fees. Our pricing is straightforward — you pay the listed monthly rate plus applicable HST. No surprise charges.",
  },
];

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className={`faq__item${isOpen ? " faq__item--open" : ""}`}>
      <button
        type="button"
        className="faq__question"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{faq.question}</span>
        <svg
          className="faq__icon"
          width={20}
          height={20}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d={isOpen ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
        </svg>
      </button>
      {isOpen && <p className="faq__answer">{faq.answer}</p>}
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <section id="faq" className="faq">
      <div className="container">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-subtitle">Everything you need to know before renting.</p>
        <div className="faq__list">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => toggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
