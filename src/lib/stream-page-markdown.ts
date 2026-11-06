import type { StreamComponentDoc } from "@/config/stream-components";
import type { StreamComponentDocs } from "@/config/stream-docs";

export function formatStreamPageMarkdown(
  component: StreamComponentDoc,
  docs: StreamComponentDocs,
): string {
  const props = docs.props
    .map(
      (prop) =>
        `| \`${prop.name}\` | \`${prop.type}\` | \`${prop.defaultValue}\` | ${prop.notes} |`,
    )
    .join("\n");
  const notes = docs.notes
    .map((note) => `- **${note.title}.** ${note.body}`)
    .join("\n");
  const files = docs.files.map((file) => `- \`${file.path}\``).join("\n");
  const dependencies =
    docs.dependencies.length > 0
      ? `\n\n## Dependencies\n\n\`\`\`bash\nnpm install ${docs.dependencies.join(" ")}\n\`\`\`\n`
      : "";

  return `# ${component.title}

${component.description}

## Installation

Paste this URL into an OBS Browser source or a TikTok Live Studio Link source.

\`\`\`tsx
${docs.browserSource}
\`\`\`

## Usage

\`\`\`tsx
${docs.usage}
\`\`\`

${docs.usageNotes}

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
${props}

## Notes & Features

${notes}
${dependencies}
## Files

${files}
`;
}
