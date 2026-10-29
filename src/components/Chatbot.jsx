import React, { useState, useEffect, useRef, useCallback } from "react";
import { BiX, BiChat, BiSend, BiUser } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import {
  getResponse,
  START_CHIPS,
  LEAD_STEPS,
  leadSummary,
  leadSummaryText,
  buildWhatsAppLink,
  buildMailto,
  contactResponse,
} from "../chatbot/engine";
import { profile } from "../chatbot/knowledgeBase";
import { notifyOwnerWhatsApp, openWhatsApp } from "../chatbot/notify";

const STORAGE_KEY = "collo-chat-history";

function MsgText({ text }) {
  // Render simple **bold** markdown
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <p className="text-sm leading-relaxed whitespace-pre-wrap font-sans">
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**") ? (
          <strong key={i}>{p.slice(2, -2)}</strong>
        ) : (
          <React.Fragment key={i}>{p}</React.Fragment>
        ),
      )}
    </p>
  );
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [lead, setLead] = useState(null); // in-progress lead
  const [leadStep, setLeadStep] = useState(-1); // index into LEAD_STEPS
  const [lastLead, setLastLead] = useState(null); // completed lead
  const [messages, setMessages] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (Array.isArray(saved) && saved.length) return saved;
    } catch (e) {
      /* ignore */
    }
    return [
      {
        from: "bot",
        text:
          `Hi there! 👋 I'm Collo, ${profile.name.split(" ")[0]}'s AI assistant — available 24/7.\n\n` +
          `I can answer questions about services, timelines and pricing, show past work, or collect your project requirements so Collins can follow up. How can I help?`,
        chips: START_CHIPS,
      },
    ];
  });
  const bodyRef = useRef(null);
  const typingTimer = useRef(null);

  // Persist history
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-40)));
    } catch (e) {
      /* ignore */
    }
  }, [messages]);

  // Auto-scroll
  useEffect(() => {
    if (bodyRef.current)
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, typing, open]);

  const botReply = useCallback((text, chips = [], extra = {}) => {
    setTyping(true);
    clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(
      () => {
        setTyping(false);
        setMessages((m) => [...m, { from: "bot", text, chips, ...extra }]);
      },
      500 + Math.random() * 500,
    );
  }, []);

  const startLead = useCallback(() => {
    setLead({});
    setLeadStep(0);
    botReply(
      LEAD_STEPS[0].prompt,
      LEAD_STEPS[0].chips || [
        ...[
          "Website Design",
          "Collateral Design",
          "Logo Design",
          "Branding",
          "Social Media Marketing",
          "Computer Maintenance",
          "Something else",
        ],
      ],
    );
  }, [botReply]);

  const handleLeadAnswer = useCallback(
    (raw) => {
      const step = LEAD_STEPS[leadStep];
      const value = raw.trim();
      const check = step.validate(value);
      if (!check.ok) {
        botReply(check.msg);
        return;
      }
      const nextLead = { ...lead, [step.key]: value };
      setLead(nextLead);

      const nextIdx = leadStep + 1;
      if (nextIdx < LEAD_STEPS.length) {
        setLeadStep(nextIdx);
        let prompt = LEAD_STEPS[nextIdx].prompt;
        prompt = prompt.replace("{name}", nextLead.name || "");
        botReply(prompt);
      } else {
        // Lead complete — qualify & notify
        const summary = leadSummary(nextLead);
        setLastLead(nextLead);
        setLead(null);
        setLeadStep(-1);
        botReply(summary.text, summary.chips);
        // WhatsApp notification to owner (one-tap prefilled + optional webhook)
        notifyOwnerWhatsApp(leadSummaryText(nextLead)).then((sent) => {
          if (sent) console.info("Lead push sent via webhook.");
        });
        setTimeout(() => openWhatsApp(leadSummaryText(nextLead)), 1200);
      }
    },
    [lead, leadStep, botReply],
  );

  const send = useCallback(
    (raw) => {
      const text = (raw ?? input).trim();
      if (!text) return;
      setMessages((m) => [...m, { from: "user", text }]);
      setInput("");

      // Active lead flow captures input directly
      if (leadStep >= 0 && lead) {
        handleLeadAnswer(text);
        return;
      }

      // Chip shortcuts
      const t = text.toLowerCase();
      if (t === "talk to a human") {
        const r = contactResponse();
        botReply(r.text, r.chips);
        return;
      }
      if (t === "start a project" || t === "yes, take my requirements") {
        botReply(
          "Great! Let's get your project started. 🚀\n\nFirst — which service are you interested in? You can tap an option or type it:",
          [
            "Website Design",
            "Collateral Design",
            "Logo Design",
            "Branding",
            "Social Media Marketing",
            "Computer Maintenance",
            "Something else",
          ],
        );
        setLead({});
        setLeadStep(0);
        return;
      }

      const r = getResponse(text);
      botReply(r.text, r.chips || []);
    },
    [input, leadStep, lead, handleLeadAnswer, botReply],
  );

  const sendViaWhatsApp = () => {
    if (!lastLead) return;
    window.location.href = buildMailto(lastLead);
    openWhatsApp(leadSummaryText(lastLead));
  };

  const lastMsg = messages[messages.length - 1];

  return (
    <>
      {/* Floating toggle */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Chat with Collo"
        className="fixed bottom-5 right-5 z-[60] w-14 h-14 rounded-full bg-theme-green text-white shadow-2xl flex items-center justify-center text-3xl hover:bg-theme-greenDark hover:scale-105 transition-all duration-300"
      >
        {open ? <BiX /> : <BiChat />}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-5 z-[60] w-[calc(100vw-2.5rem)] max-w-sm h-[70vh] max-h-[560px] flex flex-col bg-black/95 border border-white/15 shadow-2xl rounded-sm overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="bg-theme-green px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-xl">
                <BiChat />
              </div>
              <div>
                <h3 className="text-white font-raleway font-bold text-sm leading-tight">
                  Collo — AI Assistant
                </h3>
                <p className="text-white/80 text-xs flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-300 animate-pulse" />
                  Online 24/7
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white text-xl"
              aria-label="Close chat"
            >
              <BiX />
            </button>
          </div>

          {/* Messages */}
          <div ref={bodyRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-sm ${
                    m.from === "user"
                      ? "bg-theme-green text-white"
                      : "bg-white/10 text-gray-100"
                  }`}
                >
                  <MsgText text={m.text} />
                </div>
              </div>
            ))}

            {/* Quick replies */}
            {lastMsg?.chips?.length > 0 && !typing && (
              <div className="flex flex-wrap gap-2 pt-1">
                {lastMsg.chips.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => send(c)}
                    className="text-xs px-3 py-1.5 border border-theme-green/60 text-theme-green hover:bg-theme-green hover:text-white transition-colors rounded-full"
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}

            {/* Post-lead action buttons */}
            {lastLead && lastMsg?.from === "bot" && !typing && (
              <div className="flex gap-2 pt-1">
                <a
                  href={buildWhatsAppLink(lastLead)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs px-3 py-2 bg-[#25D366] text-white rounded hover:opacity-90 transition-opacity"
                >
                  <FaWhatsapp /> Confirm on WhatsApp
                </a>
                <a
                  href={buildMailto(lastLead)}
                  className="flex items-center gap-1.5 text-xs px-3 py-2 bg-white/10 text-white rounded hover:bg-white/20 transition-colors"
                >
                  <BiSend /> Email it
                </a>
              </div>
            )}

            {typing && (
              <div className="flex justify-start">
                <div className="bg-white/10 px-4 py-3 rounded-sm flex gap-1">
                  <span
                    className="w-2 h-2 bg-theme-green rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="w-2 h-2 bg-theme-green rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-2 h-2 bg-theme-green rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="p-3 border-t border-white/10 flex items-center gap-2 shrink-0 bg-black"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                leadStep >= 0 ? "Type your answer…" : "Ask me anything…"
              }
              className="flex-1 bg-white/10 text-white placeholder-white/40 text-sm px-3.5 py-2.5 rounded focus:outline-none focus:bg-white/15 transition-colors"
            />
            <button
              type="submit"
              className="w-10 h-10 bg-theme-green text-white rounded flex items-center justify-center text-xl hover:bg-theme-greenDark transition-colors shrink-0"
              aria-label="Send"
            >
              <BiSend />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
