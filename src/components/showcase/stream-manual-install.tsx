import { readFile } from "node:fs/promises";
import path from "node:path";

import { SourceCodeBlock } from "@/components/showcase/source-code-block";
import type { StreamComponentDocs, StreamSourceFile } from "@/config/stream-docs";
import { highlightCode } from "@/lib/highlight";

async function readProjectFile(file: StreamSourceFile): Promise<string> {
  if (file.contents) return file.contents;
  const root = path.resolve(process.cwd());
  const full = path.resolve(root, file.path);
  if (full !== root && !full.startsWith(`${root}${path.sep}`)) {
    throw new Error(`Refusing to read ${file.path}`);
  }
  return readFile(full, "utf8");
}

export async function StreamManualInstall({
  title,
  docs,
}: {
  title: string;
  docs: StreamComponentDocs;
}) {
  const files = await Promise.all(
    docs.files.map(async (file) => {
      const raw = await readProjectFile(file);
      const html = await highlightCode(raw, file.language);
      return { file, raw, html };
    }),
  );
  const dependencyCommand =
    docs.dependencies.length > 0
      ? `npm install ${docs.dependencies.join(" ")}`
      : null;
  const dependencyHtml = dependencyCommand
    ? await highlightCode(dependencyCommand, "bash")
    : null;
  const fileCount = files.length;

  return (
    <section className="prose prose-neutral dark:prose-invert max-w-none px-6 pt-2 pb-10">
      <h2>Manual installation</h2>
      <p>
        Rather than the browser source, copy {title} into a project. Install
        its dependencies, then copy {fileCount === 1 ? "the file" : `all ${fileCount} files`}{" "}
        into the matching path.
      </p>

      {dependencyCommand && dependencyHtml ? (
        <>
          <h3>Dependencies</h3>
          <div className="not-prose">
            <SourceCodeBlock
              code={dependencyCommand}
              codeHtml={dependencyHtml}
              filename="terminal"
              className="rounded-lg border border-dashed"
            />
          </div>
        </>
      ) : null}

      <h3>{fileCount === 1 ? "Source" : "Source files"}</h3>
      <div className="not-prose flex flex-col gap-4">
        {files.map(({ file, raw, html }) => (
          <SourceCodeBlock
            key={file.path}
            code={raw}
            codeHtml={html}
            filename={file.path}
            className="rounded-lg border border-dashed"
          />
        ))}
      </div>
    </section>
  );
}
