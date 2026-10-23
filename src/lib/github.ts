import { getGitHubContributions } from "@/lib/github-contributions";

export type Contribution = {
  date: string;
  count: number;
};

export async function fetchGithubData(
  username: string,
): Promise<Contribution[]> {
  const activities = await getGitHubContributions(username);
  return activities.map((item) => ({
    date: item.date,
    count: item.count,
  }));
}
