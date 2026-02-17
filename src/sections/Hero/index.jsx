import heroImage from "../../assets/optimized/IMG_3841.jpeg";

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero__bg">
        <img
          src={heroImage}
          alt="Sydney Forks Self Storage facility building"
          loading="eager"
          className="hero__bg-img"
        />
        <div className="hero__overlay" aria-hidden="true" />
      </div>
      <div className="hero__content container">
        <h1 className="hero__title">
          Secure & Affordable Self Storage in Sydney Forks
        </h1>
        <p className="hero__subtext">
          Security, convenience, and flexible rentals for your belongings. Store with confidence in Sydney Forks, Nova Scotia.
        </p>
        <div className="hero__ctas">
          <a href="tel:9025742282" className="button button--primary button--large">
            Call Now
          </a>
          <a href="#contact" className="button button--secondary button--large">
            Get a Quote
          </a>
        </div>
      </div>
    </section>
  );
}
