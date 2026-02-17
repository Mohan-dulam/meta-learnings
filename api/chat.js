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
      },
    });
  }

  // Only POST allowed
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ reply: "Method not allowed" }),
      {
        status: 405,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      }
    );
  }

  try {

    // read user message
    const { message } = await req.json();

    // send to OpenAI
    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a friendly digital marketing teacher. Explain Meta Ads, Pixel, CAPI, GA4, GTM, audiences, KPIs and optimization clearly from beginner to advanced level with simple examples.",
          },
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    const data = await openaiResponse.json();

    return new Response(
      JSON.stringify({
        reply: data.choices?.[0]?.message?.content || "No reply received",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

  } catch (error) {

    return new Response(
      JSON.stringify({ reply: "Server error. Check API key." }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}
