import Promotion from "../../components/Promotion";

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero__bg">
        <img
          src="/images/hero.jpeg"
          alt="Sydney Forks Self Storage facility building"
          loading="eager"
          fetchPriority="high"
          className="hero__bg-img"
        />
        <div className="hero__overlay" aria-hidden="true" />
      </div>
      <div className="hero__content container">
        <h1 className="hero__title">
          Secure &amp; Affordable Storage Units in Sydney NS
        </h1>
        <Promotion variant="badge" />
        <p className="hero__subtext">
          Security, convenience, and flexible rentals for your belongings. Convenient
          for Sydney NS and Sydney Forks, with easy access from surrounding Cape
          Breton communities.
        </p>
        <p className="hero__trust" aria-label="Key benefits">
          <span className="hero__trust-item">Easy access</span>
          <span className="hero__trust-item">Multiple unit sizes</span>
          <span className="hero__trust-item">Secure location</span>
        </p>
        <div className="hero__ctas">
          <a href="tel:9025742282" className="button button--primary button--large">
            Call for Availability
          </a>
          <a href="#contact" className="button button--secondary button--large">
            Get a Quote
          </a>
        </div>
      </div>
    </section>
  );
}
