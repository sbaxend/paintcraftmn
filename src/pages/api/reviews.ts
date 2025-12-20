import type { APIRoute } from "astro";

type PlacesReview = {
  author_name?: string;
  author_url?: string;
  profile_photo_url?: string;
  rating?: number;
  relative_time_description?: string;
  text?: string;
};

export const GET: APIRoute = async () => {
  const KEY = import.meta.env.GOOGLE_MAPS_API_KEY;
  const PLACE_ID = import.meta.env.GOOGLE_PLACE_ID;

  if (!KEY || !PLACE_ID) {
    return new Response(
      JSON.stringify({
        error: "Missing env vars",
        missing: [
          !KEY ? "GOOGLE_MAPS_API_KEY" : null,
          !PLACE_ID ? "GOOGLE_PLACE_ID" : null,
        ].filter(Boolean),
      }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      }
    );
  }

  // Fields: rating, user_ratings_total, reviews
  // (Places returns up to ~5 reviews) :contentReference[oaicite:2]{index=2}
  const fields = "rating,user_ratings_total,reviews";

  const url =
    "https://maps.googleapis.com/maps/api/place/details/json" +
    `?place_id=${encodeURIComponent(PLACE_ID)}` +
    `&fields=${encodeURIComponent(fields)}` +
    `&key=${encodeURIComponent(KEY)}`;

  try {
    const resp = await fetch(url);
    const data = await resp.json();

    if (!resp.ok || data.status !== "OK") {
      return new Response(
        JSON.stringify({
          error: "Google Places error",
          status: data.status,
          message: data.error_message,
        }),
        {
          status: 502,
          headers: { "content-type": "application/json" },
        }
      );
    }

    const result = data.result ?? {};

    const rating = typeof result.rating === "number" ? result.rating : null;
    const count =
      typeof result.user_ratings_total === "number"
        ? result.user_ratings_total
        : null;

    const reviews: PlacesReview[] = Array.isArray(result.reviews)
      ? result.reviews
      : [];

    const out = {
      rating,
      count,
      reviews: reviews.map((r) => ({
        author_name: r.author_name ?? "Google User",
        author_url: r.author_url ?? null,
        profile_photo_url: r.profile_photo_url ?? null,
        rating: typeof r.rating === "number" ? r.rating : null,
        relative_time_description: r.relative_time_description ?? "",
        text: r.text ?? "",
      })),
    };

    return new Response(JSON.stringify(out), {
      headers: {
        "content-type": "application/json",
        // Cache at the edge (Vercel/Netlify CDNs honor s-maxage style directives commonly)
        "cache-control": "max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        error: "Server error fetching reviews",
        message: err?.message ?? String(err),
      }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      }
    );
  }
};
