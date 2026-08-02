export const promotions = [
  {
    id: "summer-50-off",
    enabled: false,
    startDate: "2026-05-01",
    endDate: "2026-08-31",
    headline: "Summer Special — 50% Off",
    message: "Get 50% off your first 2 months when you rent a LARGE unit (does not apply to small or medium units)",
    terms: "New rentals only. Limited time offer.",
    cta: { label: "Get a Quote", href: "#contact" },
  },
];

function isPromoGloballyEnabled() {
  return import.meta.env.VITE_PROMO_ENABLED !== "false";
}

function isWithinDateWindow(promo, now = new Date()) {
  if (promo.startDate) {
    const start = new Date(`${promo.startDate}T00:00:00`);
    if (now < start) return false;
  }

  if (promo.endDate) {
    const end = new Date(`${promo.endDate}T23:59:59`);
    if (now > end) return false;
  }

  return true;
}

export function getActivePromotion() {
  if (!isPromoGloballyEnabled()) return null;

  return (
    promotions.find(
      (promo) => promo.enabled && isWithinDateWindow(promo)
    ) ?? null
  );
}
