// Edge function (important for GitHub Pages → Vercel communication)
export const config = {
  runtime: "edge",
};

export default async function handler(req) {

  // Allow browser preflight request (CORS)
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
