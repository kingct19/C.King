import { AnimatedPanelTitle } from "@/components/site/animated-panel-title";
import { Panel, PanelHeader } from "@/components/site/panel";
import { WorkExperience } from "@/components/work-experience";
import { EXPERIENCES } from "@/config/site";

export function ExperienceSection() {
  return (
    <Panel id="experience">
      <PanelHeader>
        <AnimatedPanelTitle>Experience</AnimatedPanelTitle>
      </PanelHeader>
      <WorkExperience experiences={EXPERIENCES} />
    </Panel>
  );
}
