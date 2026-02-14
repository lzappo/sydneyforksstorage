/**
 * Vercel serverless function: fetches Google Place reviews via REST API.
 * Requires GOOGLE_MAPS_API_KEY and GOOGLE_PLACE_ID in Vercel env vars.
 */
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

  if (!apiKey || !placeId) {
    return res.status(500).json({ error: "Missing API key or Place ID" });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=reviews&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "OK") {
      return res.status(400).json({ error: data.status, message: data.error_message || "Place not found" });
    }

    const reviews = (data.result?.reviews || []).map((r) => ({
      text: r.text || "",
      author: r.author_name ? `— ${r.author_name}` : "— Google user",
      rating: r.rating ?? null,
    }));

    return res.status(200).json({ reviews });
  } catch (err) {
    console.error("Reviews API error:", err);
    return res.status(500).json({ error: "Failed to fetch reviews" });
  }
}
