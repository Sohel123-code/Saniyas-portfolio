import { buildSystemPrompt } from "./knowledge.js";

export const MAX_BODY_BYTES = 32_768;
const MAX_MESSAGE_LENGTH = 8_000;
const WINDOW_MS = 60_000;

function reply(status, body, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...headers,
    },
  });
}

export function createChatService({
  getEnv = () => process.env,
  fetchImpl = fetch,
  now = Date.now,
  limit = 12,
} = {}) {
  const visitors = new Map();

  return async function chat({ method, headers, body, ip = "unknown" }) {
    if (method !== "POST")
      return reply(
        405,
        { error: "Use POST to send a chat message." },
        { Allow: "POST" },
      );
    const origin = headers.get("origin");
    if (origin) {
      try {
        if (new URL(origin).host !== headers.get("host"))
          return reply(403, {
            error: "Please use the chat on Saniya’s website.",
          });
      } catch {
        return reply(403, { error: "Invalid request origin." });
      }
    }
    if (
      !headers.get("content-type")?.toLowerCase().startsWith("application/json")
    )
      return reply(415, { error: "Send your message as JSON." });
    if (Buffer.byteLength(body || "", "utf8") > MAX_BODY_BYTES)
      return reply(413, {
        error: "This conversation is too long. Please start a new chat.",
      });

    let messages;
    try {
      ({ messages } = JSON.parse(body));
      if (!Array.isArray(messages) || !messages.length || messages.length > 13)
        throw new Error();
      messages = messages.map((message) => {
        if (
          !message ||
          !["user", "assistant"].includes(message.role) ||
          typeof message.content !== "string" ||
          !message.content.trim() ||
          message.content.length > MAX_MESSAGE_LENGTH
        )
          throw new Error();
        return { role: message.role, content: message.content.trim() };
      });
      if (
        messages[0].role !== "user" ||
        messages.at(-1).role !== "user" ||
        messages.some(
          (message, index) =>
            message.role !== (index % 2 ? "assistant" : "user"),
        )
      )
        throw new Error();
      if (messages.at(-1).content.length > 1_000) throw new Error();
    } catch {
      return reply(400, {
        error: "Please send a question of up to 1,000 characters.",
      });
    }

    const env = getEnv();
    const apiKey = env.GROQ_API_KEY || env.API_KEY;
    if (!apiKey)
      return reply(503, {
        error:
          "The assistant is not connected yet. You can reach Saniya from the Connect page.",
      });
    const time = now();
    for (const [key, value] of visitors)
      if (value.expires <= time) visitors.delete(key);
    const visitor = visitors.get(ip) || { count: 0, expires: time + WINDOW_MS };
    if (
      visitor.count >= limit ||
      (!visitors.has(ip) && visitors.size >= 5_000)
    ) {
      return reply(
        429,
        { error: "A little pause, please. Try again in a minute." },
        {
          "Retry-After": String(
            Math.max(1, Math.ceil((visitor.expires - time) / 1_000)),
          ),
        },
      );
    }
    visitor.count += 1;
    visitors.set(ip, visitor);

    try {
      const response = await fetchImpl(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: env.GROQ_MODEL || "openai/gpt-oss-20b",
            messages: [
              { role: "system", content: buildSystemPrompt(new Date(time)) },
              ...messages,
            ],
            temperature: 0.2,
            max_completion_tokens: 2_000,
            ...((env.GROQ_MODEL || "openai/gpt-oss-20b").startsWith(
              "openai/gpt-oss-",
            )
              ? { reasoning_effort: "low" }
              : {}),
          }),
          signal: AbortSignal.timeout(20_000),
        },
      );
      if (!response.ok) {
        // Never forward provider error bodies, credentials, or request headers.
        if (response.status === 429)
          return reply(
            429,
            {
              error:
                "The assistant is busy right now. Please try again in a minute.",
            },
            { "Retry-After": "60" },
          );
        return reply(503, {
          error:
            "The assistant couldn’t connect right now. Please try again shortly, or visit the Connect page.",
        });
      }
      const data = await response.json();
      const answer = data.choices?.[0]?.message?.content;
      if (typeof answer !== "string" || !answer.trim())
        throw new Error("Empty answer");
      // Keep responses within the next turn’s history limit.
      return reply(200, { answer: answer.trim().slice(0, MAX_MESSAGE_LENGTH) });
    } catch {
      return reply(503, {
        error:
          "The reply is taking longer than expected. Please try again in a moment.",
      });
    }
  };
}

export function createNodeChatHandler(options) {
  const service = createChatService(options);
  return async (req, res) => {
    let bytes = 0;
    const chunks = [];
    try {
      // Vercel may supply an already parsed body; Vite and Node supply a stream.
      let body;
      if (req.body !== undefined) {
        body =
          typeof req.body === "string" ? req.body : JSON.stringify(req.body);
      } else {
        for await (const chunk of req) {
          bytes += chunk.length;
          if (bytes > MAX_BODY_BYTES) {
            res.writeHead(413, {
              "Content-Type": "application/json",
              "Cache-Control": "no-store",
            });
            res.end(
              JSON.stringify({
                error:
                  "This conversation is too long. Please start a new chat.",
              }),
            );
            return;
          }
          chunks.push(chunk);
        }
        body = Buffer.concat(chunks).toString("utf8");
      }
      const headers = new Headers();
      for (const [key, value] of Object.entries(req.headers))
        if (value)
          headers.set(key, Array.isArray(value) ? value.join(", ") : value);
      // Only trust the IP header when the hosting platform sets it.
      const ip = process.env.VERCEL
        ? headers.get("x-vercel-forwarded-for") || "unknown"
        : req.socket?.remoteAddress;
      const response = await service({ method: req.method, headers, body, ip });
      if (!res.destroyed) {
        res.writeHead(response.status, Object.fromEntries(response.headers));
        res.end(await response.text());
      }
    } catch {
      if (!res.headersSent && !res.destroyed) {
        res.writeHead(400, {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        });
        res.end(
          JSON.stringify({
            error: "The message could not be read. Please try again.",
          }),
        );
      }
    }
  };
}
