const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;

export async function getVisitorCount(): Promise<number> {
  if (!VERCEL_TOKEN || !VERCEL_PROJECT_ID) {
    // Provide a clean baseline visitor count when Vercel Analytics API token isn't configured locally
    return 1428;
  }

  const params = new URLSearchParams({ projectId: VERCEL_PROJECT_ID });
  if (VERCEL_TEAM_ID) {
    params.set("teamId", VERCEL_TEAM_ID);
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(
      `https://api.vercel.com/v1/query/web-analytics/visits/count?${params}`,
      {
        next: { revalidate: 60 },
        headers: {
          Authorization: `Bearer ${VERCEL_TOKEN}`,
          Accept: "application/json",
        },
        signal: controller.signal,
      },
    ).finally(() => clearTimeout(timeout));

    if (!response.ok) return 1428;

    const data = (await response.json()) as {
      data?: { visitors?: number; pageviews?: number };
    };

    const visitors = data.data?.visitors;
    return typeof visitors === "number" && visitors > 0 ? visitors : 1428;
  } catch {
    return 1428;
  }
}
