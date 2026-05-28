import useActivePromotion from "../../hooks/useActivePromotion";

export default function Promotion({ variant = "banner" }) {
  const promo = useActivePromotion();
  if (!promo) return null;

  if (variant === "badge") {
    return (
      <p className="promo-badge" role="region" aria-label="Current promotion">
        <span className="promo-badge__text">{promo.headline}</span>
      </p>
    );
  }

  if (variant === "inline") {
    return (
      <aside className="promo-inline" role="region" aria-label="Current promotion">
        <p className="promo-inline__headline">{promo.headline}</p>
        <p className="promo-inline__message">{promo.message}</p>
        {promo.terms && <p className="promo__terms">{promo.terms}</p>}
      </aside>
    );
  }

  return (
    <aside className="promo-banner" role="region" aria-label="Current promotion">
      <div className="promo-banner__inner container">
        <p className="promo-banner__headline">{promo.headline}</p>
        <p className="promo-banner__message">{promo.message}</p>
        {promo.cta && (
          <a href={promo.cta.href} className="promo-banner__cta">
            {promo.cta.label}
          </a>
        )}
      </div>
    </aside>
  );
}
