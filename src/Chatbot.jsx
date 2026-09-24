import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowUp,
  ArrowUpRight,
  MessageCircle,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";
import "./chatbot.css";

const suggestions = [
  ["Meet Saniya", "Tell me about Saniya."],
  ["Her education", "Where has Saniya studied?"],
  ["Clinical learning", "What clinical training has she had?"],
  ["Why oral oncology?", "What interests Saniya about oral oncology?"],
  [
    "A special gallery moment",
    "Who is in the first gallery photo with Saniya?",
  ],
  ["Get in touch", "How can I contact Saniya?"],
];

function historyForRequest(messages) {
  const history = messages
    .slice(-13)
    .map(({ role, content }) => ({ role, content }));
  while (
    history.length > 1 &&
    (history[0].role !== "user" || JSON.stringify(history).length > 16_000)
  ) {
    history.shift();
  }
  return history;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const dialog = useRef(null);
  const input = useRef(null);
  const log = useRef(null);
  const request = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open && !dialog.current.open) {
      dialog.current.showModal();
      // Keep the mobile keyboard closed until the visitor chooses to type.
      if (window.matchMedia("(min-width: 601px)").matches)
        input.current.focus();
    } else if (!open && dialog.current.open) {
      dialog.current.close();
    }
  }, [open]);

  useEffect(() => {
    if (log.current)
      log.current.scrollTop = messages.length ? log.current.scrollHeight : 0;
  }, [messages, pending, error, open]);

  useEffect(() => () => request.current?.abort(), []);

  useEffect(() => {
    if (!open || !window.visualViewport) return;
    const viewport = window.visualViewport;
    const resize = () => {
      const panel = dialog.current;
      panel.style.setProperty("--chat-viewport-height", `${viewport.height}px`);
      panel.style.setProperty(
        "--chat-keyboard-offset",
        `${Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop)}px`,
      );
      panel.dataset.compact = String(viewport.height < 500);
    };
    resize();
    viewport.addEventListener("resize", resize);
    viewport.addEventListener("scroll", resize);
    return () => {
      viewport.removeEventListener("resize", resize);
      viewport.removeEventListener("scroll", resize);
    };
  }, [open]);

  async function send(question, retry = false) {
    const content = question.trim();
    if (!content || pending) return;
    const previous = error ? messages.slice(0, -1) : messages;
    const next = retry ? messages : [...previous, { role: "user", content }];
    setMessages(next);
    setDraft("");
    setError("");
    setPending(true);
    const controller = new AbortController();
    request.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 25_000);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: historyForRequest(next) }),
        signal: controller.signal,
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(
          data.error ||
            "The assistant is unavailable. Please try again shortly.",
        );
      if (typeof data.answer !== "string" || !data.answer.trim())
        throw new Error("The reply was empty. Please try again.");
      if (request.current === controller)
        setMessages(
          [...next, { role: "assistant", content: data.answer }].slice(-60),
        );
    } catch (failure) {
      if (request.current === controller) {
        setError(
          failure.name === "AbortError"
            ? "The reply took too long. Please try again."
            : failure instanceof TypeError || failure instanceof SyntaxError
              ? "Couldn’t connect to the assistant. Check your connection and try again."
              : failure.message,
        );
      }
    } finally {
      window.clearTimeout(timeout);
      if (request.current === controller) {
        request.current = null;
        setPending(false);
      }
    }
  }

  function reset() {
    request.current?.abort();
    request.current = null;
    setMessages([]);
    setDraft("");
    setPending(false);
    setError("");
    input.current.focus();
  }

  return (
    <>
      <button
        className="chat-launcher"
        onClick={() => setOpen(true)}
        aria-label="Ask about Saniya"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="saniya-chat"
      >
        <span className="chat-launcher-icon">
          <MessageCircle size={23} aria-hidden="true" />
        </span>
        <span>Ask Saniya’s AI</span>
        <Sparkles size={15} aria-hidden="true" />
      </button>

      <dialog
        ref={dialog}
        id="saniya-chat"
        className="chat-dialog"
        aria-labelledby="chat-title"
        aria-describedby="chat-description"
        onCancel={() => setOpen(false)}
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === dialog.current) setOpen(false);
        }}
      >
        <div className="chat-panel">
          <header className="chat-header">
            <div className="chat-avatar">
              <img
                src="/images/saniya-professional-480.webp"
                alt=""
                width="52"
                height="52"
              />
              <span>
                <Sparkles size={11} aria-hidden="true" />
              </span>
            </div>
            <div className="chat-heading">
              <h2 id="chat-title">A little about Saniya</h2>
              <p id="chat-description">Your AI portfolio guide</p>
            </div>
            <button
              className="chat-icon-button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              autoFocus
            >
              <X size={22} />
            </button>
          </header>

          <div className="chat-toolbar">
            <span>
              <span className="chat-knowledge-dot" /> Based on her portfolio
            </span>
            <button
              onClick={reset}
              disabled={!messages.length && !draft}
              aria-label="Start a new chat"
            >
              <RotateCcw size={14} aria-hidden="true" /> New chat
            </button>
          </div>

          <div className="chat-scroll" ref={log}>
            <div className="chat-welcome">
              <span className="chat-welcome-icon">
                <Sparkles size={23} aria-hidden="true" />
              </span>
              <p className="chat-welcome-kicker">
                A CURIOUS MIND. A CARING HEART.
              </p>
              <h3>
                What would you
                <br />
                like to <em>discover?</em>
              </h3>
              <p>
                I can introduce you to Saniya’s studies, clinical learning, and
                hopes for the future. Pick a question or ask your own.
              </p>
              {!messages.length && (
                <div className="chat-suggestions">
                  {suggestions.map(([label, question]) => (
                    <button key={label} onClick={() => send(question)}>
                      {label}
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div
              className="chat-messages"
              role="log"
              aria-label="Conversation with Saniya’s AI guide"
              aria-live="polite"
              aria-relevant="additions text"
            >
              {messages.map((message, index) => (
                <div
                  className={`chat-message chat-message-${message.role}`}
                  key={index}
                >
                  <span className="chat-speaker">
                    {message.role === "user" ? "You" : "Saniya’s AI guide"}
                  </span>
                  <p>{message.content}</p>
                </div>
              ))}
            </div>
            {pending && (
              <div className="chat-thinking" role="status">
                <span className="chat-typing" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>{" "}
                Finding a little more about Saniya…
              </div>
            )}
            {error && (
              <div className="chat-error" role="alert">
                <p>{error}</p>
                <button
                  onClick={() => send(messages.at(-1)?.content || "", true)}
                >
                  <RotateCcw size={15} aria-hidden="true" /> Try again
                </button>
              </div>
            )}
          </div>

          <footer className="chat-footer">
            <form
              className="chat-composer"
              onSubmit={(event) => {
                event.preventDefault();
                send(draft);
              }}
            >
              <label className="sr-only" htmlFor="chat-question">
                Ask a question about Saniya
              </label>
              <textarea
                ref={input}
                id="chat-question"
                rows="2"
                maxLength={1000}
                value={draft}
                readOnly={pending}
                placeholder="Ask me about Saniya…"
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" &&
                    !event.shiftKey &&
                    !event.nativeEvent.isComposing
                  ) {
                    event.preventDefault();
                    send(draft);
                  }
                }}
              />
              <button
                type="submit"
                className="chat-send"
                disabled={pending || !draft.trim()}
                aria-label="Send message"
              >
                <ArrowUp size={23} aria-hidden="true" />
              </button>
            </form>
            {draft.length > 800 && (
              <span className="chat-count">{draft.length}/1,000</span>
            )}
            <p className="chat-privacy">
              AI answers from her shared story. Details may be incomplete.
              <br />
              Messages are sent to Groq. Please avoid personal health details.
            </p>
            <Link
              className="chat-contact"
              to="/contact"
              onClick={() => setOpen(false)}
            >
              Prefer a personal conversation? Connect with Saniya{" "}
              <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          </footer>
        </div>
      </dialog>
    </>
  );
}
