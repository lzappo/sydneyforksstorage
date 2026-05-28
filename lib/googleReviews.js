/**
 * Fetches Google Place reviews via Places API (New), with legacy fallback.
 * Requires Places API (New) and/or Places API enabled in Google Cloud Console.
 */

function normalizeReview(review) {
  return {
    text: review.text || "",
    author_name: review.author_name || "Google user",
    rating: review.rating ?? null,
    profile_photo_url: review.profile_photo_url || null,
    relative_time_description: review.relative_time_description || null,
  };
}

function mapNewApiReviews(reviews = []) {
  return reviews.map((r) =>
    normalizeReview({
      text: r.text?.text || r.originalText?.text || "",
      author_name: r.authorAttribution?.displayName,
      rating: r.rating,
      profile_photo_url: r.authorAttribution?.photoUri,
      relative_time_description: r.relativePublishTimeDescription,
    })
  );
}

function mapLegacyApiReviews(reviews = []) {
  return reviews.map((r) =>
    normalizeReview({
      text: r.text,
      author_name: r.author_name,
      rating: r.rating,
      profile_photo_url: r.profile_photo_url,
      relative_time_description: r.relative_time_description,
    })
  );
}

async function fetchFromPlacesApiNew(apiKey, placeId) {
  const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "reviews",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      reviews: null,
      error: data.error?.message || data.error?.status || "Places API (New) request failed",
    };
  }

  const reviews = mapNewApiReviews(data.reviews);
  if (reviews.length === 0) {
    return { reviews: null, error: "No reviews returned" };
  }

  return { reviews };
}

async function fetchFromPlacesApiLegacy(apiKey, placeId) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=reviews&key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.status !== "OK") {
    return {
      reviews: null,
      error: data.error_message || data.status || "Legacy Places API request failed",
    };
  }

  const reviews = mapLegacyApiReviews(data.result?.reviews);
  if (reviews.length === 0) {
    return { reviews: null, error: "No reviews returned" };
  }

  return { reviews };
}

export async function fetchGooglePlaceReviews(apiKey, placeId) {
  if (!apiKey || !placeId) {
    return { reviews: null, error: "Missing API key or Place ID", status: 500 };
  }

  const newResult = await fetchFromPlacesApiNew(apiKey, placeId);
  if (newResult.reviews?.length) {
    return { reviews: newResult.reviews };
  }

  const legacyResult = await fetchFromPlacesApiLegacy(apiKey, placeId);
  if (legacyResult.reviews?.length) {
    return { reviews: legacyResult.reviews };
  }

  return {
    reviews: null,
    error: newResult.error || legacyResult.error || "Failed to fetch reviews",
    status: 400,
  };
}
