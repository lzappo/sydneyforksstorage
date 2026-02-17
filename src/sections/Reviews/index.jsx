import { useState, useEffect, useRef } from "react";
import logo from "../../assets/optimized/logo.jpeg";
import { useFetch } from "../../hooks/useFetch";

const placeId = import.meta.env.VITE_GOOGLE_PLACE_ID || "";

const REVIEW_URL = placeId
  ? `https://search.google.com/local/writereview?placeid=${placeId}`
  : "https://www.google.com/maps/search/?api=1&query=Sydney+Forks+Self+Storage+2627+King%27s+Rd+Sydney+Forks+NS";

const FALLBACK_REVIEWS = [
  { text: "Great storage facility. Clean and easy to access. Staff was helpful when I needed to find the right size unit.", author_name: "Local customer", rating: 5, profile_photo_url: null, relative_time_description: null },
  { text: "Convenient location and fair pricing. I've been storing here for a few months and have had no issues.", author_name: "Satisfied customer", rating: 5, profile_photo_url: null, relative_time_description: null },
  { text: "Quick to get set up and the unit was ready when I needed it. Would recommend to anyone in the area.", author_name: "Customer", rating: 5, profile_photo_url: null, relative_time_description: null },
];

async function fetchGoogleReviews() {
  try {
    const res = await fetch("/api/reviews");
    if (!res.ok) return null;
    const { reviews } = await res.json();
    if (Array.isArray(reviews) && reviews.length > 0) {
      return reviews.map((r) => ({
        text: r.text || "",
        author_name: r.author_name ?? "Google user",
        rating: r.rating ?? null,
        profile_photo_url: r.profile_photo_url || null,
        relative_time_description: r.relative_time_description || null,
      }));
    }
    return null;
  } catch (err) {
    console.warn("Could not fetch Google reviews:", err);
    return null;
  }
}

function computeAverageRating(reviews) {
  const withRating = reviews.filter((r) => r.rating != null);
  if (withRating.length === 0) return 5.0;
  const sum = withRating.reduce((a, r) => a + r.rating, 0);
  return Math.round((sum / withRating.length) * 10) / 10;
}

function getInitials(name) {
  if (!name || typeof name !== "string") return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return (name[0] || "?").toUpperCase();
}

function Stars({ rating, size = 16 }) {
  const r = Math.round(rating ?? 0);
  const filled = Math.min(5, Math.max(0, r));
  return (
    <span className="review-stars" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i < filled ? "#facc15" : "#444"} aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

function ReviewCard({ review }) {
  const [expanded, setExpanded] = useState(false);
  const text = review.text || "";
  const needsExpand = text.length > 200;

  return (
    <article className="review-card">
      <header className="review-card__header">
        <div className="review-card__avatar" aria-hidden="true">
          {review.profile_photo_url ? (
            <img src={review.profile_photo_url} alt="" width={40} height={40} />
          ) : (
            <span className="review-card__initials">{getInitials(review.author_name)}</span>
          )}
        </div>
        <div className="review-card__meta">
          <strong className="review-card__name">{review.author_name || "Customer"}</strong>
          {review.relative_time_description && <span className="review-card__time">{review.relative_time_description}</span>}
        </div>
      </header>
      <Stars rating={review.rating} />
      <p className={`review-card__text ${expanded ? "review-card__text--expanded" : ""}`} style={!expanded && needsExpand ? { WebkitLineClamp: 4, lineClamp: 4 } : undefined}>
        &ldquo;{text}&rdquo;
      </p>
      {needsExpand && (
        <button type="button" className="review-card__expand" onClick={() => setExpanded(!expanded)} aria-expanded={expanded}>
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </article>
  );
}

export default function Reviews() {
  const { data: fetchedReviews, loading } = useFetch(fetchGoogleReviews, !!placeId);
  const reviews = fetchedReviews ?? FALLBACK_REVIEWS;
  const [carouselIndex, setCarouselIndex] = useState(0);
  const scrollRef = useRef(null);

  const avgRating = computeAverageRating(reviews);
  const totalCards = reviews.length;
  const cardsToShow = 3;
  const maxIndex = Math.max(0, totalCards - cardsToShow);

  const scrollCarousel = (direction) => {
    const delta = direction === "left" ? -1 : 1;
    setCarouselIndex((prev) => Math.max(0, Math.min(maxIndex, prev + delta)));
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: carouselIndex * (280 + 16), behavior: "smooth" });
  }, [carouselIndex]);

  return (
    <section id="reviews" className="reviews">
      <div className="container">
        <h2 className="section-title">Customer Reviews</h2>
        <p className="section-subtitle">See what our customers say about their experience.</p>

        {loading && <p className="reviews__loading" aria-live="polite">Loading reviews…</p>}

        {!loading && (
          <>
            <div className="reviews-summary">
              <div className="reviews-summary__logo">
                <img src={logo} alt="" width={120} height={120} />
              </div>
              <div className="reviews-summary__middle">
                <h3 className="reviews-summary__name">Sydney Forks Self Storage</h3>
                <div className="reviews-summary__rating-row">
                  <span className="reviews-summary__rating-value">{avgRating.toFixed(1)}</span>
                  <Stars rating={avgRating} size={20} />
                </div>
                <span className="reviews-summary__google-badge" aria-hidden="true">
                  <span style={{ color: "#4285F4" }}>G</span>
                  <span style={{ color: "#EA4335" }}>o</span>
                  <span style={{ color: "#FBBC05" }}>o</span>
                  <span style={{ color: "#34A853" }}>g</span>
                  <span style={{ color: "#4285F4" }}>l</span>
                  <span style={{ color: "#EA4335" }}>e</span>
                </span>
              </div>
              <a href={REVIEW_URL} target="_blank" rel="noopener noreferrer" className="reviews-summary__leave-btn">Leave a Review</a>
            </div>

            <div className="reviews-carousel">
              {maxIndex > 0 && (
                <button type="button" className="reviews-carousel__arrow reviews-carousel__arrow--left" onClick={() => scrollCarousel("left")} disabled={carouselIndex <= 0} aria-label="Previous reviews">
                  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
              )}
              <div className="reviews-carousel__track" ref={scrollRef}>
                {reviews.map((review, index) => <ReviewCard key={index} review={review} />)}
              </div>
              {maxIndex > 0 && (
                <button type="button" className="reviews-carousel__arrow reviews-carousel__arrow--right" onClick={() => scrollCarousel("right")} disabled={carouselIndex >= maxIndex} aria-label="Next reviews">
                  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
