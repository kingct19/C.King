import { SourceCodeBlock } from "@/components/showcase/source-code-block";
import type { StreamComponentDocs } from "@/config/stream-docs";

export function StreamDocs({
  docs,
  usageHtml,
  browserSourceHtml,
}: {
  docs: StreamComponentDocs;
  usageHtml: string;
  browserSourceHtml: string;
}) {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none px-6 py-6">
      <h2>Usage</h2>
      <div className="not-prose">
        <SourceCodeBlock
          code={docs.usage}
          codeHtml={usageHtml}
          filename="example.tsx"
          className="rounded-lg border border-dashed"
        />
      </div>

      <h3>Browser source</h3>
      <p>
        Paste this URL into OBS or TikTok Live Studio. The query params match
        the props below.
      </p>
      <div className="not-prose">
        <SourceCodeBlock
          code={docs.browserSource}
          codeHtml={browserSourceHtml}
          filename="browser-source.tsx"
          className="rounded-lg border border-dashed"
        />
      </div>
      <p>{docs.usageNotes}</p>

      <h2>Props</h2>
      <div className="not-prose overflow-x-auto">
        <table className="w-full text-left text-[13px] leading-relaxed">
          <thead>
            <tr className="border-b border-dashed">
              <th className="py-2 pr-4 font-medium text-foreground">Prop</th>
              <th className="py-2 pr-4 font-medium text-foreground">Type</th>
              <th className="py-2 pr-4 font-medium text-foreground">Default</th>
              <th className="py-2 font-medium text-foreground">Notes</th>
            </tr>
          </thead>
          <tbody>
            {docs.props.map((prop) => (
              <tr key={prop.name} className="border-b border-dashed align-top">
                <td className="py-3 pr-4 font-medium whitespace-nowrap text-foreground">
                  {prop.name}
                </td>
                <td className="py-3 pr-4 text-muted-foreground">
                  <code className="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground">
                    {prop.type}
                  </code>
                </td>
                <td className="py-3 pr-4 text-muted-foreground">
                  <code className="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground">
                    {prop.defaultValue}
                  </code>
                </td>
                <td className="py-3 text-muted-foreground">{prop.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Notes &amp; Features</h2>
      <ul>
        {docs.notes.map((note) => (
          <li key={note.title}>
            <strong>{note.title}.</strong> {note.body}
          </li>
        ))}
      </ul>
    </div>
  );
}
