export default function Units() {
  const units = [
    {
      size: "9 ft × 10 ft",
      price: "$150/month + HST",
      description: "Perfect for boxes, seasonal items, or small furniture. Ideal for apartments and decluttering.",
    },
    {
      size: "10 ft × 18 ft",
      price: "$250/month + HST",
      description: "Room for furniture sets, appliances, or business inventory. Great for moving or renovations.",
    },
    {
      size: "14 ft × 16 ft",
      price: "$325/month + HST",
      description: "Spacious units for vehicles, large furniture, or commercial storage. Maximum flexibility.",
    },
  ];

  return (
    <section id="units" className="units">
      <div className="container">
        <h2 className="section-title">Unit Options</h2>
        <p className="section-subtitle">
          We offer a range of storage sizes to fit your needs.
        </p>
        <div className="units__grid">
          {units.map((unit, index) => (
            <article key={index} className="unit-card">
              <h3 className="unit-card__title">{unit.size}</h3>
              <p className="unit-card__price">{unit.price}</p>
              <p className="unit-card__desc">{unit.description}</p>
            </article>
          ))}
        </div>
        <p className="units__helper">
          Not sure what size? <a href="tel:9025742282">Call us</a> or <a href="#contact">request a quote</a>—we&apos;ll help you find the right fit.
        </p>
      </div>
    </section>
  );
}
