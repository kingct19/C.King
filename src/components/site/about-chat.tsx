"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ArrowUpIcon, ExternalLinkIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { BrailleLoader } from "@/components/ui/braille-loader";
import { CHAT_SOURCES, SUGGESTED_QUESTIONS } from "@/config/chat-knowledge";
import { cn } from "@/lib/utils";

/** Embedded "ask AI" chat that lives inside the About section. */
export function AboutChat() {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, status]);

  const ask = (text: string) => {
    if (!text.trim() || busy) return;
    sendMessage({ text });
    setInput("");
  };

  return (
    <div id="ask-ai" className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        {/* Orbit frames are 4 chars wide but only the first has dots — clip to it.
            Color goes on the wrapper because the loader styles itself with text-current. */}
        <span className="shrink-0 text-brand-blue">
          <BrailleLoader
            variant="orbit"
            label="AI assistant"
            fontSize={16}
            className="w-2.5 overflow-hidden"
          />
        </span>
        <p className="text-sm font-medium">Or just ask the AI</p>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">
        Curious about my engineering work or my D1 track &amp; field career? This assistant
        answers only from verified facts and the sources linked below.
      </p>

      <div className="overflow-hidden rounded-lg border border-line">
        <div
          ref={scrollRef}
          className="flex max-h-96 min-h-36 flex-col gap-3 overflow-y-auto p-4"
          aria-live="polite"
        >
          {messages.length === 0 && (
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_QUESTIONS.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => ask(question)}
                  className="rounded-full border border-line px-3 py-1.5 text-left text-xs transition-colors hover:bg-muted"
                >
                  {question}
                </button>
              ))}
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "max-w-[85%] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap",
                message.role === "user"
                  ? "self-end rounded-br-sm bg-brand-blue text-white"
                  : "self-start rounded-bl-sm bg-muted"
              )}
            >
              {message.parts.map((part, index) =>
                part.type === "text" ? <span key={index}>{part.text}</span> : null
              )}
            </div>
          ))}

          {status === "submitted" && (
            <div className="self-start rounded-2xl rounded-bl-sm bg-muted px-3 py-2 text-muted-foreground">
              <BrailleLoader
                variant="orbit"
                label="Thinking"
                fontSize={14}
                className="w-2.5 overflow-hidden"
              />
            </div>
          )}

          {error && (
            <p className="self-start rounded-2xl bg-destructive/10 px-3 py-2 text-xs text-destructive">
              Something went wrong — please try again in a moment.
            </p>
          )}
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            ask(input);
          }}
          className="flex items-center gap-2 border-t border-line px-3 py-2.5"
        >
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask anything about Chandler…"
            className="h-9 min-w-0 flex-1 rounded-full bg-muted px-3.5 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
          />
          <button
            type="submit"
            aria-label="Send"
            disabled={busy || !input.trim()}
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-blue text-white transition-opacity disabled:opacity-40"
          >
            <ArrowUpIcon className="size-4" />
          </button>
        </form>
      </div>

      <ul className="flex flex-wrap gap-2">
        {CHAT_SOURCES.map((source) => (
          <li key={source.href}>
            <a
              href={source.href}
              target="_blank"
              rel="noopener noreferrer"
              title={source.description}
              className="inline-flex items-center gap-1 rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {source.label}
              <ExternalLinkIcon className="size-3" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
