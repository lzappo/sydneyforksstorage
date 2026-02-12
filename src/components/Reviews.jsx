export default function Reviews() {
  const reviews = [
    {
      text: "Great storage facility. Clean and easy to access. Staff was very helpful when I needed to find the right size unit.",
      author: "— Local customer",
    },
    {
      text: "Convenient location and fair pricing. I've been storing here for a few months and have had no issues.",
      author: "— Satisfied customer",
    },
    {
      text: "Quick to get set up and the unit was ready when I needed it. Would recommend to anyone in the area.",
      author: "— Customer",
    },
  ];

  const mapsQuery = encodeURIComponent("Sydney Forks Self Storage 2627 King's Rd Sydney Forks NS");
  const googleReviewsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

  return (
    <section id="reviews" className="reviews">
      <div className="container">
        <h2 className="section-title">Customer Reviews</h2>
        <p className="section-subtitle">
          See what our customers say about their experience.
        </p>
        <div className="reviews__grid">
          {reviews.map((review, index) => (
            <blockquote key={index} className="review-card">
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
