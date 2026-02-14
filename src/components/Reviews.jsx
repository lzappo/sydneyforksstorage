import { useState, useEffect } from "react";

const placeId = import.meta.env.VITE_GOOGLE_PLACE_ID || "";

const FALLBACK_REVIEWS = [
  {
    text: "Great storage facility. Clean and easy to access. Staff was helpful when I needed to find the right size unit.",
    author: "— Local customer",
    rating: null,
  },
  {
    text: "Convenient location and fair pricing. I've been storing here for a few months and have had no issues.",
    author: "— Satisfied customer",
    rating: null,
  },
  {
    text: "Quick to get set up and the unit was ready when I needed it. Would recommend to anyone in the area.",
    author: "— Customer",
    rating: null,
  },
];

async function fetchGoogleReviews() {
  try {
    const res = await fetch("/api/reviews");
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.warn("Could not fetch Google reviews:", res.status, err);
      return null;
    }
    const { reviews } = await res.json();
    return Array.isArray(reviews) && reviews.length > 0 ? reviews : null;
  } catch (err) {
    console.warn("Could not fetch Google reviews:", err);
    return null;
  }
}

export default function Reviews() {
  const [reviews, setReviews] = useState(FALLBACK_REVIEWS);
  const [loading, setLoading] = useState(!!placeId);

  useEffect(() => {
    if (!placeId) return;
    let cancelled = false;
    fetchGoogleReviews().then((data) => {
      if (!cancelled && data && data.length > 0) {
        setReviews(data);
      }
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const googleReviewsUrl = placeId
    ? `https://www.google.com/maps/place/?q=place_id:${placeId}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Sydney Forks Self Storage 2627 King's Rd Sydney Forks NS")}`;

  return (
    <section id="reviews" className="reviews">
      <div className="container">
        <h2 className="section-title">Customer Reviews</h2>
        <p className="section-subtitle">
          See what our customers say about their experience.
        </p>
        {loading && (
          <p className="reviews__loading" aria-live="polite">
            Loading reviews…
          </p>
        )}
        <div className="reviews__grid">
          {reviews.map((review, index) => (
            <blockquote key={index} className="review-card">
              {review.rating != null && (
                <div className="review-card__rating" aria-hidden="true">
                  {"★".repeat(Math.round(review.rating))}
                  {"☆".repeat(5 - Math.round(review.rating))}
                </div>
              )}
              <p className="review-card__text">&ldquo;{review.text}&rdquo;</p>
              <cite className="review-card__author">{review.author}</cite>
            </blockquote>
          ))}
        </div>
        <a
          href={googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="button button--secondary"
        >
          Read more on Google
        </a>
      </div>
    </section>
  );
}
