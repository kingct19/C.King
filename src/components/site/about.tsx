import { Suspense } from "react";

import {
  GitHubContributions,
  GitHubContributionsFallback,
} from "@/components/github-contributions";
import { AboutBullets } from "@/components/site/about-bullets";
import { AnimatedPanelTitle } from "@/components/site/animated-panel-title";
import { Panel, PanelHeader } from "@/components/site/panel";
import { getGitHubContributions } from "@/lib/github-contributions";
import { ABOUT_BULLETS, SITE } from "@/config/site";

export function About() {
  const contributions = getGitHubContributions(SITE.github.username);

  return (
    <Panel id="about">
      <PanelHeader>
        <AnimatedPanelTitle>About</AnimatedPanelTitle>
      </PanelHeader>

      <div className="p-4">
        <AboutBullets bullets={ABOUT_BULLETS} />
      </div>

      <div className="screen-line-top p-2">
        <Suspense fallback={<GitHubContributionsFallback />}>
          <GitHubContributions
            contributions={contributions}
            githubProfileUrl={`https://github.com/${SITE.github.username}`}
          />
        </Suspense>
      </div>
    </Panel>
  );
}
