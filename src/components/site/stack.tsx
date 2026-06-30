import { Panel, PanelHeader } from "@/components/site/panel";
import { AnimatedPanelTitle } from "@/components/site/animated-panel-title";
import { StackGroups } from "@/components/site/stack-groups";
import { STACK } from "@/config/site";

export function Stack() {
  return (
    <Panel id="stack">
      <PanelHeader>
        <AnimatedPanelTitle>Stack</AnimatedPanelTitle>
      </PanelHeader>

      <StackGroups groups={STACK} />
    </Panel>
  );
}
