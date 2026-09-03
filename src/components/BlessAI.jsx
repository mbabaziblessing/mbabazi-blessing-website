import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Bot, Send, X } from "lucide-react";

const MAX_MESSAGE_LENGTH = 2000;
const MAX_CONVERSATION_MESSAGES = 20;
const API_PATH = "/api/bless-ai";

// Keep the existing Bless AI widget artwork unchanged.
const BLESS_AI_ICON = "/assets/portfolio/Bless-Ai.png";

const WHATSAPP_ACTION = {
  label: "Chat on WhatsApp",
  path: "https://wa.me/256707333422",
};

const APPROVED_EXTERNAL_ACTIONS = new Set([
  WHATSAPP_ACTION.path,
  "https://calendly.com/mbabaziblessing/",
]);

const INTERNAL_ACTION_PATHS = new Set([
  "/",
  "/about",
  "/skills",
  "/services",
  "/portfolio",
  "/experience",
  "/certifications",
  "/testimonials",
  "/contact",
  "/resume",
  "/case-studies",
  "/blog",
  "/faq",
  "/bless-fashion-house",
  "/sitemap",
  "/pricing",
  "/book-consultation",
]);

const initialMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "👋 Welcome! I'm Bless AI, your intelligent digital assistant. I can help you explore Mbabazi Blessing's portfolio, learn about services, request a quotation, book a consultation, or get in touch. What would you like help with today?",
};

const suggestions = [
  "Explore my services",
  "Show me the portfolio",
  "I want a website",
  "I want an online store",
  "Book a consultation",
  "Contact Mbabazi",
];

function isSafeAction(action) {
  if (!action || typeof action !== "object") {
    return false;
  }

  if (
    typeof action.label !== "string" ||
    typeof action.path !== "string"
  ) {
    return false;
  }

  if (
    INTERNAL_ACTION_PATHS.has(action.path) ||
    action.path.startsWith("/case-studies/") ||
    action.path.startsWith("/blog/")
  ) {
    return true;
  }

  return APPROVED_EXTERNAL_ACTIONS.has(action.path);
}

function safeActions(actions) {
  if (!Array.isArray(actions)) {
    return [];
  }

  return actions
    .filter(isSafeAction)
    .slice(0, 5)
    .map((action) => ({
      label: action.label.trim().slice(0, 100),
      path: action.path.trim().slice(0, 200),
    }))
    .filter((action) => action.label && action.path);
}

function createMessage(role, content, actions = []) {
  return {
    id: `${role}-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}`,
    role,
    content,
    actions,
  };
}

export default function BlessAI() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([initialMessage]);
  const [loading, setLoading] = useState(false);

  const launcherRef = useRef(null);
  const inputRef = useRef(null);
  const messagesRef = useRef(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    if (open) {
      wasOpenRef.current = true;

      document.addEventListener("keydown", handleEscape);

      window.dispatchEvent(
        new CustomEvent("bless-chat-toggle", {
          detail: { open: true },
        })
      );

      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  useEffect(() => {
    if (!open && wasOpenRef.current) {
      window.dispatchEvent(
        new CustomEvent("bless-chat-toggle", {
          detail: { open: false },
        })
      );

      launcherRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    const container = messagesRef.current;

    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, loading, open]);

  const closeWidget = () => {
    setOpen(false);
  };

  const sendMessage = async (messageText = input) => {
    const message = messageText.trim();

    if (
      !message ||
      loading ||
      message.length > MAX_MESSAGE_LENGTH
    ) {
      return;
    }

    const userMessage = createMessage("user", message);

    const conversation = messages
      .filter(
        (item) =>
          item.role === "user" ||
          item.role === "assistant"
      )
      .slice(-MAX_CONVERSATION_MESSAGES)
      .map(({ role, content }) => ({
        role,
        content,
      }));

    setMessages((current) => [
      ...current,
      userMessage,
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch(API_PATH, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          conversation,
        }),
      });

      const result = await response
        .json()
        .catch(() => null);

      if (
        !response.ok ||
        !result ||
        typeof result.reply !== "string"
      ) {
        throw new Error("Assistant request failed");
      }

      const assistantMessage = createMessage(
        "assistant",
        result.reply,
        safeActions(result.actions)
      );

      setMessages((current) => [
        ...current,
        assistantMessage,
      ]);

      if (result.showLeadForm === true) {
        setMessages((current) => [
          ...current,
          createMessage(
            "assistant",
            "I can help you prepare your project details. The quotation form will be available here shortly, or you can contact Mbabazi directly."
          ),
        ]);
      }
    } catch (error) {
      console.error("Bless AI request failed:", error);

      setMessages((current) => [
        ...current,
        createMessage(
          "assistant",
          "Sorry, I couldn't respond right now. Please try again shortly, or contact Mbabazi directly.",
          [
            WHATSAPP_ACTION,
            {
              label: "Contact page",
              path: "/contact",
            },
          ]
        ),
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  const handleInputKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {open && (
        <section
          id="bless-ai-dialog"
          className="fixed inset-x-3 bottom-3 z-[9999] flex max-h-[calc(100dvh-1.5rem)] flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0b0d14]/95 shadow-2xl shadow-black/50 backdrop-blur-2xl motion-safe:animate-[bless-ai-in_180ms_ease-out] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[min(400px,calc(100vw-3rem))]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="bless-ai-title"
        >
          <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-vapor/15 text-vapor ring-1 ring-vapor/30">
                <img
                  src={BLESS_AI_ICON}
                  alt=""
                  width="36"
                  height="36"
                  className="h-full w-full rounded-xl object-cover"
                  decoding="async"
                />
              </div>

              <div>
                <h2
                  id="bless-ai-title"
                  className="text-sm font-medium text-alabaster"
                >
                  Bless AI
                </h2>

                <p className="text-[11px] text-graphite">
                  Digital Assistant
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={closeWidget}
              className="rounded-lg p-2 text-graphite transition hover:bg-white/10 hover:text-alabaster focus:outline-none focus:ring-2 focus:ring-vapor"
              aria-label="Close Bless AI"
            >
              <X
                size={18}
                aria-hidden="true"
              />
            </button>
          </header>

          <div
            ref={messagesRef}
            className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-4 sm:px-4"
            aria-live="polite"
          >
            {messages.map((item) => (
              <div
                key={item.id}
                className={`flex ${
                  item.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div className="max-w-[88%]">
                  <div
                    className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      item.role === "user"
                        ? "rounded-br-md bg-vapor text-white"
                        : "rounded-bl-md border border-white/10 bg-white/[0.06] text-alabaster"
                    }`}
                  >
                    {item.content}
                  </div>

                  {item.actions?.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {item.actions.map((action) => {
                        const isInternal =
                          INTERNAL_ACTION_PATHS.has(
                            action.path
                          ) ||
                          action.path.startsWith(
                            "/case-studies/"
                          ) ||
                          action.path.startsWith(
                            "/blog/"
                          );

                        if (isInternal) {
                          return (
                            <Link
                              key={`${item.id}-${action.path}`}
                              to={action.path}
                              onClick={closeWidget}
                              className="rounded-lg border border-vapor/40 px-2.5 py-1.5 text-xs text-vapor transition hover:bg-vapor/10 focus:outline-none focus:ring-2 focus:ring-vapor"
                            >
                              {action.label}
                            </Link>
                          );
                        }

                        return (
                          <a
                            key={`${item.id}-${action.path}`}
                            href={action.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg border border-vapor/40 px-2.5 py-1.5 text-xs text-vapor transition hover:bg-vapor/10 focus:outline-none focus:ring-2 focus:ring-vapor"
                          >
                            {action.label}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {messages.length === 1 &&
              !loading && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() =>
                        sendMessage(suggestion)
                      }
                      className="rounded-full border border-white/15 px-3 py-1.5 text-left text-xs text-graphite transition hover:border-vapor/50 hover:text-alabaster focus:outline-none focus:ring-2 focus:ring-vapor"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

            {loading && (
              <div
                className="flex items-center gap-2 text-xs text-graphite"
                role="status"
                aria-label="Bless AI is typing"
              >
                <Bot
                  size={15}
                  className="text-vapor"
                  aria-hidden="true"
                />

                <span className="motion-safe:animate-pulse">
                  Bless AI is typing...
                </span>
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-white/10 p-3 sm:p-4"
          >
            <label
              htmlFor="bless-ai-message"
              className="sr-only"
            >
              Message Bless AI
            </label>

            <div className="flex items-end gap-2 rounded-xl border border-white/10 bg-white/[0.04] p-2 focus-within:border-vapor/60">
              <textarea
                ref={inputRef}
                id="bless-ai-message"
                value={input}
                onChange={(event) =>
                  setInput(
                    event.target.value.slice(
                      0,
                      MAX_MESSAGE_LENGTH
                    )
                  )
                }
                onKeyDown={handleInputKeyDown}
                placeholder="Ask Bless AI..."
                rows={1}
                maxLength={MAX_MESSAGE_LENGTH}
                disabled={loading}
                className="max-h-24 min-h-9 flex-1 resize-none bg-transparent px-1.5 py-2 text-sm text-alabaster outline-none placeholder:text-graphite disabled:cursor-not-allowed disabled:opacity-60"
              />

              <button
                type="submit"
                disabled={
                  loading || !input.trim()
                }
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-vapor text-white transition hover:bg-vapor/90 focus:outline-none focus:ring-2 focus:ring-vapor disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send message to Bless AI"
              >
                <Send
                  size={16}
                  aria-hidden="true"
                />
              </button>
            </div>

            <p className="mt-1.5 text-[10px] text-graphite/70">
              Shift+Enter for a new line
            </p>
          </form>
        </section>
      )}

      {!open && (
        <button
          ref={launcherRef}
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-4 right-4 z-[9998] flex items-center gap-2 rounded-full border border-vapor/40 bg-[#11131c]/95 px-4 py-3 text-sm font-medium text-alabaster shadow-xl shadow-vapor/10 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-vapor hover:bg-[#151722] focus:outline-none focus:ring-2 focus:ring-vapor motion-safe:animate-[bless-ai-in_220ms_ease-out] sm:bottom-6 sm:right-6"
          aria-label="Open Bless AI assistant"
          aria-expanded={open}
          aria-controls="bless-ai-dialog"
        >
          <img
            src={BLESS_AI_ICON}
            alt=""
            width="36"
            height="24"
            className="h-6 w-8 rounded-md object-cover"
            decoding="async"
          />

          <span>Bless AI</span>
        </button>
      )}
    </>
  );
}