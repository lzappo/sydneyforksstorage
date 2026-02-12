export default function WhyChooseUs() {
  const points = [
    "Local, family-owned business serving Sydney Forks and nearby communities",
    "Secure, clean, and well-maintained facility",
    "Flexible rental terms—month-to-month or longer",
    "Always open—access your unit whenever you need it",
    "Competitive rates and no hidden fees",
    "Helpful staff ready to assist with your storage needs",
  ];

  return (
    <section id="features" className="why-choose">
      <div className="container">
        <h2 className="section-title">Why Choose Us</h2>
        <ul className="why-choose__list">
          {points.map((point, index) => (
            <li key={index} className="why-choose__item">
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
