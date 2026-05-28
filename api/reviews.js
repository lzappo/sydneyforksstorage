/**
 * Vercel serverless function: fetches Google Place reviews via REST API.
 * Requires GOOGLE_MAPS_API_KEY and GOOGLE_PLACE_ID in Vercel env vars.
 */
import { fetchGooglePlaceReviews } from "../lib/googleReviews.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.VITE_GOOGLE_MAPS_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID || process.env.VITE_GOOGLE_PLACE_ID;

  try {
    const { reviews, error, status } = await fetchGooglePlaceReviews(apiKey, placeId);

    if (!reviews?.length) {
      return res.status(status || 400).json({ error: error || "No reviews found" });
    }

    return res.status(200).json({ reviews });
  } catch (err) {
    console.error("Reviews API error:", err);
    return res.status(500).json({ error: "Failed to fetch reviews" });
  }
}
