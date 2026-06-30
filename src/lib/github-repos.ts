import {
  PINNED_PROJECTS,
  PROJECT_OVERRIDES,
  SITE,
  type PinnedProject,
  type ProjectItem,
} from "@/config/site";

type GitHubRepo = {
  name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  created_at: string;
  pushed_at: string;
  language: string | null;
  topics: string[];
  stargazers_count: number;
};

/** Repos pushed to within this window count as "present". */
const ACTIVE_DAYS = 90;

/**
 * Build the Projects section from PINNED_PROJECTS, enriching GitHub
 * pins with live metadata when available.
 */
export async function getGitHubProjects(): Promise<ProjectItem[]> {
  const reposByName = await fetchReposByName();
  return buildPinnedProjects(reposByName);
}

async function fetchReposByName(): Promise<Map<string, GitHubRepo> | null> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${SITE.github.username}/repos?sort=pushed&per_page=100`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const repos = (await res.json()) as GitHubRepo[];

    return new Map(repos.map((repo) => [repo.name, repo]));
  } catch {
    return null;
  }
}

function buildPinnedProjects(
  reposByName: Map<string, GitHubRepo> | null
): ProjectItem[] {
  return PINNED_PROJECTS.map((pinned, index) =>
    pinned.source === "custom"
      ? customToProject(pinned, index)
      : githubPinToProject(pinned, index, reposByName?.get(pinned.repo))
  );
}

function customToProject(
  pinned: Extract<PinnedProject, { source: "custom" }>,
  index: number
): ProjectItem {
  const { source: _, ...project } = pinned;
  return {
    ...project,
    isExpanded: project.isExpanded ?? index === 0,
  };
}

function githubPinToProject(
  pinned: Extract<PinnedProject, { source: "github" }>,
  index: number,
  repo: GitHubRepo | undefined
): ProjectItem {
  const override = PROJECT_OVERRIDES[pinned.repo];
  const base = repo ? repoToProject(repo) : offlineGitHubProject(pinned.repo, override);

  return {
    ...base,
    ...override,
    isExpanded: pinned.isExpanded ?? override?.isExpanded ?? index === 0,
  };
}

function repoToProject(repo: GitHubRepo): ProjectItem {
  const createdYear = repo.created_at.slice(0, 4);
  const pushedDate = new Date(repo.pushed_at);
  const isActive =
    Date.now() - pushedDate.getTime() < ACTIVE_DAYS * 24 * 60 * 60 * 1000;
  const endLabel = isActive ? "present" : repo.pushed_at.slice(0, 4);
  const period =
    createdYear === endLabel ? createdYear : `${createdYear} — ${endLabel}`;

  const tags = [...(repo.language ? [repo.language] : []), ...repo.topics];

  return {
    title: prettifyRepoName(repo.name),
    period,
    description: repo.description ?? undefined,
    tags: tags.length ? tags : undefined,
    href: repo.html_url,
  };
}

function offlineGitHubProject(
  repoName: string,
  override: Partial<ProjectItem> | undefined
): ProjectItem {
  return {
    title: override?.title ?? prettifyRepoName(repoName),
    period: override?.period ?? "—",
    description: override?.description,
    bullets: override?.bullets,
    tags: override?.tags,
    href:
      override?.href ??
      `https://github.com/${SITE.github.username}/${repoName}`,
  };
}

function prettifyRepoName(name: string): string {
  // Keep names that already look intentional (dots, no separators) as-is.
  if (!/[-_]/.test(name)) return name;
  return name.replace(/[-_]+/g, " ").replace(/\s+$/, "");
}
