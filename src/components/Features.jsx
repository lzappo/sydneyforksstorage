const iconSize = 40;

const icons = {
  camera: (
    <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
  ),
  lockOpen: (
    <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
  ),
  checkCircle: (
    <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  ),
  thermometer: (
    <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0Z" />
    </svg>
  ),
  calendar: (
    <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
  ),
};

export default function Features() {
  const features = [
    {
      title: "24/7 security cameras",
      description: "Keep your belongings safe and protected with around-the-clock monitoring.",
      icon: icons.camera,
    },
    {
      title: "Always open",
      description: "Access your unit whenever you need it.",
      icon: icons.lockOpen,
    },
    {
      title: "Clean & well maintained",
      description: "Professional, well-kept storage spaces.",
      icon: icons.checkCircle,
    },
    {
      title: "Heated units",
      description: "Available upon request for temperature-sensitive items. Additional charges apply.",
      icon: icons.thermometer,
    },
    {
      title: "Month to month rentals",
      description: "No contract needed. Stay as long or as short as you need.",
      icon: icons.calendar,
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
