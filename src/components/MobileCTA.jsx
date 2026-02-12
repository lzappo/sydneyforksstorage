import { useState, useEffect } from "react";

export default function MobileCTA() {
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const footer = document.getElementById("footer");
    if (!hero || !footer) return;

    let heroInView = true;
    let footerInView = false;

    const updateVisibility = () => {
      setShowBar(!heroInView && !footerInView);
    };

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        heroInView = entry.isIntersecting;
        updateVisibility();
      },
      { threshold: 0, rootMargin: "0px" }
    );

    const footerObserver = new IntersectionObserver(
      ([entry]) => {
        footerInView = entry.isIntersecting;
        updateVisibility();
      },
      { threshold: 0, rootMargin: "0px" }
    );

    heroObserver.observe(hero);
    footerObserver.observe(footer);

    return () => {
      heroObserver.disconnect();
      footerObserver.disconnect();
    };
  }, []);

  return (
    <div
      className={`mobile-cta ${showBar ? "mobile-cta--visible" : ""}`}
      role="complementary"
      aria-label="Quick actions"
    >
      <a href="tel:9025742282" className="mobile-cta__btn mobile-cta__btn--call">
        Call Now
      </a>
      <a href="#contact" className="mobile-cta__btn mobile-cta__btn--quote">
        Get Quote
      </a>
    </div>
  );
}
