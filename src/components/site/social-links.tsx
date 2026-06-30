"use client";

import { MailIcon } from "lucide-react";
import type { ComponentType } from "react";

import { ReactionDock } from "@/components/reaction-dock";
import { Panel } from "@/components/site/panel";
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
} from "@/components/site/social-icons";
import { SOCIAL_LINKS } from "@/config/site";

const ICONS: Record<(typeof SOCIAL_LINKS)[number]["name"], ComponentType<{ className?: string }>> = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  Instagram: InstagramIcon,
  Mail: MailIcon,
};

export function SocialLinks() {
  return (
    <Panel>
      <div className="flex justify-center py-3">
        <ReactionDock
          items={SOCIAL_LINKS.map((social) => {
            const Icon = ICONS[social.name];
            const isMail = social.name === "Mail";
            return {
              label: social.name,
              href: social.href,
              icon: (
                <Icon
                  className="size-5"
                  {...(isMail ? { strokeWidth: 1.75 } : {})}
                  aria-hidden
                />
              ),
            };
          })}
        />
      </div>
    </Panel>
  );
}
