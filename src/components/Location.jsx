const placeId = import.meta.env.VITE_GOOGLE_PLACE_ID || "";

export default function Location() {
  const address = "2627 King's Rd, Sydney Forks, NS B1L1A1";
  const mapsQuery = encodeURIComponent("2627 King's Rd, Sydney Forks, NS B1L1A1");
  const directionsUrl = placeId
    ? `https://www.google.com/maps/place/?q=place_id:${placeId}`
    : `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

  // Basic embed - no API key required (avoids "API not activated" errors)
  const mapEmbedUrl = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;

  return (
    <section id="location" className="location">
      <div className="container">
        <h2 className="section-title">Find Us</h2>
        <p className="section-subtitle">
          Serving Sydney Forks, Nova Scotia and nearby communities. Conveniently located for local residents and businesses.
        </p>
        <div className="location__content">
          <div className="location__nap">
            <h3 className="location__business">Sydney Forks Self Storage</h3>
            <address className="location__address">
              {address}
              <br />
              Canada
            </address>
            <a href="tel:9025742282" className="location__phone">
              902-574-2282
            </a>
            <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="location__directions">
              Get directions
            </a>
          </div>
          <div className="location__map">
            <iframe
              title="Sydney Forks Self Storage location map"
              src={mapEmbedUrl}
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="location__iframe"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
