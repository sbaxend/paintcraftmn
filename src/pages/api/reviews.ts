import type { APIRoute } from 'astro';

export const get: APIRoute = async ({ params, request }) => {
  // Mock data until Google API credentials are available
  const mockData = {
    rating: 5.0,
    count: 11,
    reviews: [
      {
        author_name: "Deb Wingert",
        author_url: "https://example.com/review1",
        profile_photo_url: "/images/placeholder-avatar1.jpg",
        rating: 5,
        relative_time_description: "17 days ago",
        text: "Alex and the entire PaintCraft team were simply outstanding from beginning to end...",
      },
      {
        author_name: "Ami Schlamp",
        author_url: "https://example.com/review2",
        profile_photo_url: "/images/placeholder-avatar2.jpg",
        rating: 5,
        relative_time_description: "18 days ago",
        text: "The entire Paint Craft Team was incredible! From start to finish, with bidding, to painting...",
      },
    ],
  };

  return new Response(JSON.stringify(mockData), {
    headers: {
      'content-type': 'application/json',
      'cache-control': 's-maxage=43200, stale-while-revalidate=86400',
    },
  });
};