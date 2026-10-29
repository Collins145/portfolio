import {
  profile,
  services,
  faqs,
  skills,
  otherSkills,
  projects,
  experience,
  education,
  certifications,
  stats,
} from "./knowledgeBase";

// ---------------------------------------------------------------
// Response shape: { text, chips?[], leadFlow?: 'start' | false }
// chips = quick-reply suggestions shown under the message
// ---------------------------------------------------------------

const norm = (s) =>
  (s || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const has = (text, words) => words.some((w) => text.includes(w));

const greetings = [
  "hi",
  "hello",
  "hey",
  "hola",
  "jambo",
  "good morning",
  "good afternoon",
  "good evening",
  "yo",
  "habari",
];
const thanks = ["thank", "thanks", "asante", "appreciate"];
const bye = ["bye", "goodbye", "later", "kwaheri"];

function formatService(s) {
  let text = `**${s.title}** — ${s.description}`;
  text += `\n\n**Best for:** ${s.bestFor}\n**Timeline:** ${s.timeline}\n**Cost:** ${s.priceGuide}`;
  text += `\n\nTypical process:\n${s.process.map((p, i) => `${i + 1}. ${p}`).join("\n")}`;
  return text;
}

function serviceListText() {
  return (
    "Collins offers the following services:\n\n" +
    services.map((s) => `• **${s.title}** – ${s.description}`).join("\n") +
    "\n\nWhich one would you like to know more about?"
  );
}

export const START_CHIPS = [
  "What services do you offer?",
  "See your work",
  "Pricing",
  "Start a project",
];

// ---------- Intent detection ----------
export function getResponse(rawInput) {
  const input = norm(rawInput);

  if (!input) return { text: "I'm here whenever you're ready." };

  if (has(input, greetings) && input.split(" ").length <= 4) {
    return {
      text:
        `Hello! 👋 I'm Collo, ${profile.name.split(" ")[0]}'s AI assistant — available 24/7. ` +
        `I can tell you about the design & development services on offer, timelines and pricing, share past work, or help you start a project. What brings you here?`,
      chips: START_CHIPS,
    };
  }

  if (has(input, thanks)) {
    return {
      text: "You're very welcome! Anything else I can help you with?",
      chips: ["Start a project", "Pricing", "Talk to a human"],
    };
  }

  if (has(input, bye)) {
    return {
      text: `Goodbye! If anything comes up later, I'm here 24/7 — or email ${profile.email} anytime.`,
      chips: [],
    };
  }

  if (
    has(input, [
      "who are you",
      "what are you",
      "are you a bot",
      "are you human",
      "are you real",
      "about you",
      "about collins",
      "who is collins",
    ])
  ) {
    return {
      text:
        `I'm Collo, the AI assistant for ${profile.name}, a ${profile.role} based in ${profile.location} with ${profile.experience}. ` +
        `I can answer questions about services, skills, experience, projects, timelines and pricing — and I can take down your project requirements any time, day or night.`,
      chips: [
        "What services do you offer?",
        "Skills & experience",
        "Start a project",
      ],
    };
  }

  if (
    has(input, [
      "services",
      "what do you offer",
      "what do you do",
      "offer",
      "help with",
      "solutions",
      "capabilities",
    ])
  ) {
    return { text: serviceListText(), chips: services.map((s) => s.title) };
  }

  // Specific service match (scored)
  let bestService = null;
  let bestScore = 0;
  for (const s of services) {
    let score = 0;
    for (const kw of s.keywords) if (input.includes(kw)) score += kw.length;
    if (input.includes(norm(s.title))) score += 10;
    if (score > bestScore) {
      bestScore = score;
      bestService = s;
    }
  }

  const askingPrice = has(input, [
    "price",
    "cost",
    "how much",
    "pricing",
    "quote",
    "budget",
    "rate",
    "charge",
    "fee",
  ]);
  const askingTime = has(input, [
    "how long",
    "timeline",
    "deadline",
    "turnaround",
    "duration",
    "when can",
    "how fast",
  ]);

  if (bestService && bestScore > 0) {
    if (askingPrice || askingTime) {
      const s = bestService;
      return {
        text:
          `**${s.title}**\n\n**Timeline:** ${s.timeline}\n**Cost:** ${s.priceGuide}\n\n` +
          `Want me to take your project details so Collins can prepare an exact quote?`,
        chips: [
          "Yes, take my requirements",
          "Other services",
          "Talk to a human",
        ],
      };
    }
    return {
      text: formatService(bestService),
      chips: ["Start a project", "Pricing", "See your work"],
    };
  }

  if (askingPrice && !bestService) {
    return {
      text: "Pricing is quoted per project so you only pay for what you need. Rough guides: logos are fixed per-project, collateral items like flyers or banners are priced per item, websites scale with the number of pages, and social media management is a monthly retainer.\n\nTell me about your project and I'll collect the details for an accurate quote.",
      chips: ["Start a project", "What services do you offer?"],
    };
  }

  if (askingTime && !bestService) {
    return {
      text: "Typical timelines: logos 3–7 days, collateral 2–5 days per item, websites 1–3 weeks, branding 1–3 weeks. Social media management is ongoing. Timelines depend on content readiness and revision rounds.",
      chips: ["Start a project", "What services do you offer?"],
    };
  }

  if (has(input, ["process", "how do you work", "steps", "workflow"])) {
    return {
      text: "Most projects follow four steps:\n1. **Discovery** — goals, audience and content\n2. **Design** — wireframes/UI drafts for your approval\n3. **Build/Produce** — implementing the approved design\n4. **Review & Launch** — revisions, final checks, delivery",
      chips: ["Start a project", "Pricing"],
    };
  }

  if (
    has(input, [
      "portfolio",
      "examples",
      "samples",
      "past work",
      "your work",
      "projects",
      "see work",
      "case stud",
    ])
  ) {
    return {
      text:
        "Here's a selection of recent work:\n" +
        projects.map((p) => `• **${p.title}** (${p.type})`).join("\n") +
        `\n\nYou can view them in the **Projects** section of this site. Collins has delivered ${stats.projects.toLowerCase()} for ${stats.clients.toLowerCase()}.`,
      chips: ["Start a project", "What services do you offer?"],
    };
  }

  if (
    has(input, [
      "skills",
      "tools",
      "technologies",
      "stack",
      "software",
      "what can you use",
      "tech",
    ])
  ) {
    return {
      text:
        `Core skills and tools:\n` +
        skills.map((s) => `• ${s.name} (${s.percent}%)`).join("\n") +
        `\n\nAlso: ${otherSkills}`,
      chips: ["See your work", "Start a project"],
    };
  }

  if (
    has(input, [
      "experience",
      "background",
      "career",
      "worked",
      "history",
      "cv",
      "resume",
    ])
  ) {
    return {
      text:
        `${profile.name} has ${profile.experience}:\n\n` +
        experience
          .map(
            (e) =>
              `• **${e.role}** (${e.period}, ${e.location})\n  ${e.highlights}`,
          )
          .join("\n\n"),
      chips: ["Education & certifications", "Start a project"],
    };
  }

  if (
    has(input, [
      "education",
      "certification",
      "certified",
      "degree",
      "diploma",
      "school",
      "university",
      "qualification",
    ])
  ) {
    return {
      text:
        "Education & certifications:\n" +
        [...education, ...certifications]
          .map((c) => `• **${c.title}** – ${c.institution} (${c.period})`)
          .join("\n"),
      chips: ["Skills & experience", "Start a project"],
    };
  }

  if (
    has(input, [
      "contact",
      "email",
      "phone",
      "call",
      "whatsapp",
      "human",
      "person",
      "talk to",
      "speak to",
      "reach",
    ])
  ) {
    return contactResponse();
  }

  if (
    has(input, [
      "start a project",
      "start project",
      "new project",
      "hire",
      "get started",
      "requirements",
      "my project",
      "i need",
      "i want",
      "book",
      "consultation",
      "take my requirements",
    ])
  ) {
    return startLeadFlow();
  }

  // FAQ keyword matching (scored)
  let bestFaq = null;
  let faqScore = 0;
  for (const f of faqs) {
    let score = 0;
    for (const kw of f.keywords) if (input.includes(kw)) score += kw.length;
    if (score > faqScore) {
      faqScore = score;
      bestFaq = f;
    }
  }
  if (bestFaq && faqScore >= 5) {
    return {
      text: bestFaq.a,
      chips: [
        "Start a project",
        "What services do you offer?",
        "Talk to a human",
      ],
    };
  }

  if (has(input, ["available", "open now", "online"])) {
    return {
      text: `I'm available 24/7 — even when Collins is offline. Collins is currently marked as **${profile.freelance}** for freelance work. I can answer questions or collect your project requirements right now, and Collins will follow up personally.`,
      chips: ["Start a project", "Talk to a human"],
    };
  }

  // ---------- Fallback: never fabricate ----------
  return {
    text:
      "I want to give you accurate information, and I don't have that in my knowledge base. " +
      `Here's what I can definitely help with, or you can reach Collins directly at ${profile.email} / ${profile.phone}.`,
    chips: [
      "What services do you offer?",
      "Start a project",
      "Talk to a human",
    ],
  };
}

export function contactResponse() {
  return {
    text:
      `You can reach Collins directly:\n\n• **Email:** ${profile.email}\n• **Phone/WhatsApp:** ${profile.phone}\n• **Location:** ${profile.location}\n\n` +
      `Or leave your details here and Collins will get back to you — I'm available 24/7.`,
    chips: ["Start a project", "What services do you offer?"],
  };
}

export function startLeadFlow() {
  return {
    text: "Great! Let's get your project started. 🚀\n\nFirst — which service are you interested in? You can tap an option or type it:",
    chips: [...services.map((s) => s.title), "Something else"],
    leadFlow: "start",
  };
}

// ---------------------------------------------------------------
// Lead qualification flow
// ---------------------------------------------------------------
export const LEAD_STEPS = [
  {
    key: "service",
    prompt:
      "Which service is this about? (Website design, collateral, logo, branding, social media, or computer maintenance)",
    validate: () => ({ ok: true }),
  },
  {
    key: "name",
    prompt: "Thanks! What's your name?",
    validate: (v) =>
      v.trim().length >= 2
        ? { ok: true }
        : { ok: false, msg: "Please enter at least 2 characters." },
  },
  {
    key: "email",
    prompt: "Nice to meet you! What's the best email to reach you at?",
    validate: (v) =>
      /\S+@\S+\.\S+/.test(v.trim())
        ? { ok: true }
        : {
            ok: false,
            msg: "That doesn't look like a valid email — could you check it?",
          },
  },
  {
    key: "phone",
    prompt: "Got it. Optional: a phone number (or type 'skip').",
    validate: () => ({ ok: true }),
  },
  {
    key: "description",
    prompt:
      "Tell me about the project — what do you need, and for what business or purpose?",
    validate: (v) =>
      v.trim().length >= 10
        ? { ok: true }
        : {
            ok: false,
            msg: "A sentence or two helps Collins understand your needs — could you add a bit more?",
          },
  },
  {
    key: "budget",
    prompt:
      "Do you have a budget range in mind? (e.g. KES 20,000–50,000 — or type 'not sure')",
    validate: () => ({ ok: true }),
  },
  {
    key: "timeline",
    prompt: "When would you like the project completed?",
    validate: (v) =>
      v.trim()
        ? { ok: true }
        : {
            ok: false,
            msg: "Please give an idea of your timeline (or type 'flexible').",
          },
  },
];

export function leadSummaryText(lead) {
  return (
    `*New project request (via portfolio chatbot)*\n\n` +
    `Service: ${lead.service}\nName: ${lead.name}\nEmail: ${lead.email}\n` +
    (lead.phone && !/skip/i.test(lead.phone) ? `Phone: ${lead.phone}\n` : "") +
    `Project: ${lead.description}\nBudget: ${lead.budget || "Not specified"}\nTimeline: ${lead.timeline}`
  );
}

export function leadSummary(lead) {
  return {
    text:
      `Perfect — your project request is captured! ✅\n\n` +
      `**Service:** ${lead.service}\n**Name:** ${lead.name}\n**Email:** ${lead.email}\n` +
      (lead.phone && !/skip/i.test(lead.phone)
        ? `**Phone:** ${lead.phone}\n`
        : "") +
      `**Project:** ${lead.description}\n**Budget:** ${lead.budget || "Not specified"}\n**Timeline:** ${lead.timeline}\n\n` +
      `Collins has been notified on WhatsApp and follows up on every request personally. ` +
      `You can also tap the button below to send it directly right now.`,
    chips: ["What services do you offer?", "Talk to a human"],
    leadComplete: true,
  };
}

export function buildWhatsAppLink(lead) {
  return `https://wa.me/${profile.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(leadSummaryText(lead))}`;
}

export function buildMailto(lead) {
  const subject = `Project Request: ${lead.service} — ${lead.name}`;
  const body = leadSummaryText(lead).replace(/\*/g, "");
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
