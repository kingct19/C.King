import type { Activity } from "@/components/contribution-graph";

type ApiResponse = {
  contributions: Activity[];
};

/**
 * Fetch the last year of GitHub contributions. Falls back to
 * deterministic synthetic data when the API is unreachable so the
 * section always renders.
 */
export async function getGitHubContributions(username: string): Promise<Activity[]> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as ApiResponse;
    if (!data.contributions?.length) throw new Error("Empty contributions");
    return data.contributions;
  } catch {
    return generateFallbackContributions();
  }
}

function generateFallbackContributions(): Activity[] {
  const activities: Activity[] = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    // Deterministic pseudo-random pattern seeded by day-of-year.
    const seed = (date.getDate() * 31 + date.getMonth() * 12 + date.getDay() * 7) % 17;
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const count = isWeekend ? seed % 4 : seed % 12;
    const level = count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 9 ? 3 : 4;
    activities.push({
      date: date.toISOString().slice(0, 10),
      count,
      level,
    });
  }
  return activities;
}
