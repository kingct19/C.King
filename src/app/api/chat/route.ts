import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

import { CHAT_SYSTEM_PROMPT } from "@/config/chat-knowledge";

export const maxDuration = 30;

const MAX_MESSAGES = 20;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) {
    return Response.json({ error: "Invalid messages" }, { status: 400 });
  }

  const result = streamText({
    model: openai("gpt-5.4-mini"),
    system: CHAT_SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
