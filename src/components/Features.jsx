export default function Features() {
  const features = [
    {
      title: "24/7 security cameras",
      description: "Keep your belongings safe and protected with around-the-clock monitoring.",
      icon: "📹",
    },
    {
      title: "Always open",
      description: "Access your unit whenever you need it.",
      icon: "🚪",
    },
    {
      title: "Clean & well maintained",
      description: "Professional, well-kept storage spaces.",
      icon: "✨",
    },
    {
      title: "Heated units",
      description: "Available upon request for temperature-sensitive items. Additional charges apply.",
      icon: "🌡️",
    },
    {
      title: "Month to month rentals",
      description: "No contract needed. Stay as long or as short as you need.",
      icon: "📅",
    },
  ];

  return (
    <section className="features-strip" aria-labelledby="features-heading">
      <h2 id="features-heading" className="visually-hidden">Why choose our storage</h2>
      <div className="features-strip__grid container">
        {features.map((item, index) => (
          <article key={index} className="feature-card">
            <span className="feature-card__icon" aria-hidden="true">{item.icon}</span>
            <h3 className="feature-card__title">{item.title}</h3>
            <p className="feature-card__desc">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
