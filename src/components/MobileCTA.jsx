export default function MobileCTA() {
  return (
    <div className="mobile-cta" role="complementary" aria-label="Quick actions">
      <a href="tel:9025742282" className="mobile-cta__btn mobile-cta__btn--call">
        Call Now
      </a>
      <a href="#contact" className="mobile-cta__btn mobile-cta__btn--quote">
        Get Quote
      </a>
    </div>
  );
}
