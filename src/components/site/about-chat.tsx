"use client";

import { Blobatar } from "@blobatar/react";
import "blobatar/motion.css";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  Citation,
  Citations,
  CitationSources,
  type CitationSource,
} from "@/components/ui/citations";
import {
  MessageActionCopy,
  MessageActionFeedback,
  MessageActionRegenerate,
  MessageActions,
} from "@/components/ui/message-actions";
import { PromptInput } from "@/components/ui/prompt-input";
import { Reasoning } from "@/components/ui/reasoning";
import { ShimmerText } from "@/components/ui/shimmer-text";
import { StreamingText, type StreamStatus } from "@/components/ui/streaming-text";
import { Suggestion, Suggestions } from "@/components/ui/suggestions";
import { CHAT_SOURCES, SUGGESTED_QUESTIONS } from "@/config/chat-knowledge";
import { Sparkle } from "@/lib/icons";

const CITATION_SOURCES: CitationSource[] = CHAT_SOURCES.map((source) => ({
  id: source.id,
  url: source.href,
  title: source.label,
  siteName: source.siteName,
  snippet: source.description,
}));

function getMessageText(message: UIMessage): string {
  return message.parts
    .map((part) => (part.type === "text" ? part.text : ""))
    .join("");
}

function getMessageReasoning(message: UIMessage): string {
  return message.parts
    .map((part) => (part.type === "reasoning" ? part.text : ""))
    .join("");
}

/** Match relevant verified sources mentioned in an assistant reply so inline <Citation /> pills link to <CitationSources />. */
function inferReferencedSourceIds(text: string): string[] {
  const lower = text.toLowerCase();
  const matched: string[] = [];

  if (
    lower.includes("sozo") ||
    lower.includes("angler") ||
    lower.includes("home ranger") ||
    lower.includes("splash") ||
    lower.includes("serene") ||
    lower.includes("crm")
  ) {
    matched.push("studio-sozo");
  }
  if (
    lower.includes("github") ||
    lower.includes("react") ||
    lower.includes("next.js") ||
    lower.includes("typescript") ||
    lower.includes("flutter") ||
    lower.includes("etamu all-in-one")
  ) {
    matched.push("github");
  }
  if (
    lower.includes("founder") ||
    lower.includes("elevate solar") ||
    lower.includes("experience") ||
    lower.includes("kansas city") ||
    lower.includes("master") ||
    lower.includes("bachelor")
  ) {
    matched.push("linkedin");
  }
  if (
    lower.includes("track") ||
    lower.includes("athlete") ||
    lower.includes("division") ||
    lower.includes("sprint") ||
    lower.includes("lion")
  ) {
    matched.push("lion-athletics");
  }
  if (
    lower.includes("7.60") ||
    lower.includes("14.21") ||
    lower.includes("long jump") ||
    lower.includes("triple jump") ||
    lower.includes("tfrrs") ||
    lower.includes("championship")
  ) {
    matched.push("tfrrs");
  }
  if (lower.includes("honor roll") || lower.includes("southland") || lower.includes("academic")) {
    matched.push("slc-honor-roll");
  }

  return matched.length > 0 ? matched : ["studio-sozo", "github", "linkedin"];
}

/** Embedded "Ask AI" chat inside the About section, built with @stealth UI components. */
export function AboutChat() {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { messages, sendMessage, status, error, stop, regenerate } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollToBottom = () => {
      el.scrollTop = el.scrollHeight;
    };
    scrollToBottom();
    const observer = new MutationObserver(scrollToBottom);
    observer.observe(el, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [messages.length, status]);

  const ask = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    sendMessage({ text: trimmed });
    setInput("");
  };

  const assistantMessages = useMemo(
    () => messages.filter((m) => m.role === "assistant"),
    [messages],
  );
  const lastAssistantId = assistantMessages[assistantMessages.length - 1]?.id;

  return (
    <Citations sources={CITATION_SOURCES} className="flex flex-col gap-3.5">
      {/* Header with Blobatar + ShimmerText status */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Blobatar
            name="silje"
            traits={{ shape: 0.11 }}
            animate="always"
            size={24}
            className="size-6 shrink-0"
          />
          <p className="text-sm font-medium text-fg">Or just ask the AI</p>
        </div>

        <ShimmerText
          active={busy}
          className="font-mono text-2xs tracking-wide text-fg-3"
        >
          {status === "submitted"
            ? "Thinking…"
            : status === "streaming"
              ? "Streaming grounded answer…"
              : "Grounded on verified sources"}
        </ShimmerText>
      </div>

      <p className="text-xs leading-relaxed text-muted-foreground">
        Curious about my engineering work, Studio Sozo platforms, or my D1 track &amp; field career? Ask below — every reply is grounded in verified sources.
      </p>

      {/* Suggestions when conversation hasn't started yet */}
      {messages.length === 0 && (
        <Suggestions
          layout="chips"
          label="Suggested questions about Chandler"
          onPick={(prompt) => ask(prompt)}
        >
          {SUGGESTED_QUESTIONS.map((question) => (
            <Suggestion key={question} prompt={question} icon={<Sparkle size={14} />}>
              {question}
            </Suggestion>
          ))}
        </Suggestions>
      )}

      {/* Conversation thread */}
      {messages.length > 0 && (
        <div
          ref={scrollRef}
          aria-live="polite"
          className="flex max-h-[26rem] flex-col gap-4 overflow-y-auto rounded-2xl border border-dashed bg-frame/60 p-4"
        >
          {messages.map((message) => {
            const text = getMessageText(message);
            const reasoning = getMessageReasoning(message);

            if (message.role === "user") {
              return (
                <div
                  key={message.id}
                  className="self-end max-w-[85%] rounded-2xl rounded-br-sm border border-line-2 bg-raised px-3.5 py-2 text-[13.5px] leading-5 text-fg shadow-soft"
                >
                  {text}
                </div>
              );
            }

            const isLatest = message.id === lastAssistantId;
            const isStreamingThis = isLatest && (status === "submitted" || status === "streaming");
            const isThinkingPhase = isLatest && status === "submitted" && text.length === 0;
            const streamStatus: StreamStatus =
              isLatest && error
                ? "error"
                : isStreamingThis
                  ? "streaming"
                  : "done";
            const citedIds = inferReferencedSourceIds(text);

            return (
              <div
                key={message.id}
                data-message=""
                className="flex min-w-0 flex-col gap-1.5 self-start w-full"
              >
                {/* Reasoning line: timed shimmer while thinking, folds to "Thought for Xs" */}
                {(isStreamingThis || reasoning.length > 0) && (
                  <Reasoning
                    streaming={isThinkingPhase || (isStreamingThis && text.length < 16)}
                    thinkingLabel="Checking verified facts & sources…"
                  >
                    {reasoning ||
                      "Cross-referencing Chandler King's verified engineering history, Studio Sozo production builds, and NCAA Division I track & field records."}
                  </Reasoning>
                )}

                {/* StreamingText markdown reply + inline Citation badges */}
                {(text.length > 0 || isStreamingThis) && (
                  <div className="min-w-0">
                    <StreamingText
                      text={text}
                      status={streamStatus}
                      onRetry={() => regenerate()}
                    />
                    {!isStreamingThis && text.length > 0 && (
                      <div className="mt-2 flex flex-wrap items-center gap-1">
                        <span className="mr-1 font-mono text-[10.5px] text-fg-3">
                          Verified in
                        </span>
                        {citedIds.map((sourceId) => (
                          <Citation key={sourceId} id={sourceId} />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* MessageActions toolbar (Copy, Regenerate, Feedback) */}
                {!isStreamingThis && text.length > 0 && (
                  <MessageActions
                    reveal={isLatest ? "always" : "hover"}
                    className="-ml-1.5 mt-0.5"
                  >
                    <MessageActionCopy value={text} />
                    {isLatest && (
                      <MessageActionRegenerate
                        busy={busy}
                        onRegenerate={() => regenerate()}
                      />
                    )}
                    <MessageActionFeedback
                      reasons={[
                        "Missing a detail",
                        "Outdated info",
                        "Too long",
                        "Other",
                      ]}
                    />
                  </MessageActions>
                )}
              </div>
            );
          })}

          {/* Fallback if status is submitted before the assistant message object is appended */}
          {status === "submitted" &&
            messages[messages.length - 1]?.role === "user" && (
              <div className="flex flex-col gap-1.5 self-start">
                <Reasoning
                  streaming
                  thinkingLabel="Checking verified facts & sources…"
                >
                  Cross-referencing Chandler King&apos;s verified engineering history, Studio Sozo production builds, and NCAA Division I track &amp; field records.
                </Reasoning>
              </div>
            )}

          {error && messages[messages.length - 1]?.role === "user" && (
            <StreamingText
              text=""
              status="error"
              errorLabel="Something went wrong — please try again."
              onRetry={() => regenerate()}
            />
          )}
        </div>
      )}

      {/* PromptInput composer */}
      <PromptInput
        value={input}
        onValueChange={setInput}
        textareaRef={textareaRef}
        generating={busy}
        onStop={() => stop()}
        allowAttachments={false}
        placeholder="Ask anything about Chandler, Studio Sozo, or his projects…"
        label="Ask about Chandler"
        onSend={({ text }) => ask(text)}
      />

      {/* Interactive numbered CitationSources list */}
      <div className="rounded-xl border border-dashed bg-background/50 p-2.5">
        <CitationSources visible={3} title="Verified Sources" />
      </div>
    </Citations>
  );
}
