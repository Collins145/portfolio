// ============================================================
// APPROVED KNOWLEDGE BASE — the ONLY source of facts the bot may use.
// If an answer is not here (or derivable from these entries),
// the bot must say it doesn't know and guide the visitor to contact you.
// Edit this file to update what the chatbot says.
// ============================================================

export const profile = {
  name: "Collins Omondi",
  role: "UX/UI Designer & Developer",
  location: "Nairobi, Kenya",
  email: "collinsomondi825@gmail.com",
  phone: "+254743100829",
  phoneHref: "+254743100829",
  freelance: "Available",
  experience: "3+ years of professional experience",
  summary:
    "Creative and detail-oriented UI/UX Designer with 3+ years of professional experience crafting intuitive, user-centered digital experiences. Skilled in user research, wireframing, prototyping, and usability testing, with a strong ability to translate complex ideas into visually engaging and functional designs.",
  socials: {
    LinkedIn: "https://www.linkedin.com/in/collins-omondi-a88029188/",
    Behance: "https://www.behance.net/collinsomondi1",
    Credly:
      "https://www.credly.com/badges/48669098-46c4-4f4e-ab55-cb45c9baffb2/public_url",
    Twitter: "https://twitter.com/collinsomondi",
  },
};

export const services = [
  {
    id: "web-design",
    title: "Website Design",
    keywords: [
      "website",
      "web design",
      "web site",
      "landing page",
      "seo",
      "ux",
      "ui",
    ],
    description:
      "Web graphic design, interface design, authoring, user experience design, and search engine optimization.",
    bestFor:
      "Businesses or individuals who need a modern, user-friendly website or landing page.",
    process: [
      "Discovery call — understand your goals, audience and content",
      "Wireframes & UI design in Figma for your approval",
      "Build (HTML/CSS/JS or WordPress/Wix) with responsive layouts",
      "Review, SEO basics, then launch",
    ],
    timeline: "Typically 1–3 weeks depending on the number of pages",
    priceGuide:
      "Priced per project — simple landing pages cost less than multi-page sites. Exact quotes are given after a short requirements chat.",
  },
  {
    id: "collateral",
    title: "Collateral Design",
    keywords: [
      "collateral",
      "flyer",
      "banner",
      "poster",
      "business card",
      "brochure",
      "print",
    ],
    description:
      "A wide range of brand collateral ranging from banners, flyers, posters and business cards.",
    bestFor:
      "Events, promotions and businesses that need professional print or digital marketing material.",
    process: [
      "Share your content, sizes and brand colors",
      "First draft concepts for review",
      "Revisions until approved",
      "Final files delivered print-ready",
    ],
    timeline: "Usually 2–5 days per item",
    priceGuide:
      "Depends on the item and quantity — quoted per project after requirements are clear.",
  },
  {
    id: "logo",
    title: "Logo Design",
    keywords: ["logo", "logotype", "icon", "mark"],
    description:
      "Professional logos that help you communicate with your clients.",
    bestFor:
      "New businesses, rebrands, or anyone who needs a memorable visual identity mark.",
    process: [
      "Brief — your brand story, audience and style preferences",
      "Concept sketches and digital drafts",
      "Revision rounds on your chosen direction",
      "Final files in all formats you need",
    ],
    timeline: "Typically 3–7 days",
    priceGuide:
      "Fixed per-project pricing — quoted after the brief, based on concepts and revision rounds.",
  },
  {
    id: "branding",
    title: "Branding",
    keywords: ["branding", "brand", "identity", "style guide"],
    description:
      "A good and well-created brand improves recognition and creates trust.",
    bestFor:
      "Businesses that want a consistent, trustworthy identity across all touchpoints.",
    process: [
      "Brand discovery and direction",
      "Logo, colors, typography and visual language",
      "Application across key materials",
      "Brand guidelines handover",
    ],
    timeline: "Usually 1–3 weeks",
    priceGuide:
      "Packages scale with what's included (logo only vs. full identity) — quoted per project.",
  },
  {
    id: "social-media",
    title: "Social Media Marketing",
    keywords: [
      "social media",
      "marketing",
      "content",
      "instagram",
      "facebook",
      "twitter",
      "management",
    ],
    description:
      "Results-driven content creation for social media marketing as well as page management.",
    bestFor:
      "Brands that need consistent, engaging content and an active, well-managed presence.",
    process: [
      "Agree on platforms, content pillars and posting schedule",
      "Design and schedule content",
      "Publish and manage engagement",
      "Monthly review of what's working",
    ],
    timeline: "Ongoing monthly service",
    priceGuide:
      "Monthly retainer based on number of platforms and posts per week.",
  },
  {
    id: "maintenance",
    title: "Computer Maintenance & Troubleshooting",
    keywords: [
      "maintenance",
      "troubleshooting",
      "repair",
      "computer",
      "support",
      "fix",
    ],
    description:
      "Computer maintenance and troubleshooting support for hardware and software issues.",
    bestFor:
      "Individuals and small offices that need reliable machines and quick fixes.",
    process: ["Describe the issue", "Diagnosis", "Fix and preventive advice"],
    timeline: "Depends on the issue — diagnosed first, then quoted",
    priceGuide: "Per job, after diagnosis.",
  },
];

export const skills = [
  { name: "GitHub Copilot", percent: 90 },
  { name: "Claude (AI-assisted workflows)", percent: 90 },
  { name: "WordPress / CMS (Wix, WordPress)", percent: 90 },
  { name: "JavaScript", percent: 80 },
  { name: "Figma", percent: 80 },
  { name: "BurpSuite", percent: 80 },
  { name: "Kali Linux", percent: 70 },
  { name: "PHP", percent: 60 },
];

export const otherSkills =
  "HTML5, CSS3, JavaScript, CMSs like Wix and WordPress, and design tools such as Figma, Canva & Illustrator. Currently learning Photoshop, Cybersecurity & Networking, and Artificial Intelligence.";

export const projects = [
  { title: "K'omollo Travel Website", type: "Website" },
  { title: "Cyber Landing Page", type: "Landing page" },
  { title: "Maya's Clinic", type: "Website" },
  { title: "Cyber Booking Agent", type: "Web app" },
];

export const experience = [
  {
    role: "Junior UX/UI Designer @ Snobole Software",
    period: "2020 – 2023",
    location: "Nairobi, Kenya",
    highlights:
      "Led design, development and implementation of graphic, layout and production communication materials; developed marketing programs (logos, brochures, infographics, presentations, advertisements); managed up to 5 projects at a time; created 4+ design presentations and proposals a month.",
  },
  {
    role: "Technical Mentor @ Siaya Community Digital Hub",
    period: "2025 – Present",
    location: "Siaya, Kenya",
    highlights:
      "Trained 100+ students in foundational and advanced digital skills, resulting in a 75% improvement in project completion rates and 30+ functional web and mobile prototypes.",
  },
];

export const education = [
  {
    title: "Diploma in Information Technology",
    period: "2019 – 2021",
    institution: "Zetech University, Nairobi",
  },
];

export const certifications = [
  {
    title: "Introduction to Networking",
    period: "2025 – 2026",
    institution: "Cisco Networking Academy",
  },
  {
    title: "Introduction to Cybersecurity",
    period: "2025 – 2026",
    institution: "ICT Authority & Cisco Networking Academy",
  },
  {
    title: "Ethical Hacking Training",
    period: "4th Feb 2026 – 11th Apr 2026",
    institution: "Cybershujaa & Cisco Networking Academy",
  },
];

export const stats = {
  clients: "20+ Happy Clients",
  projects: "30+ Projects",
  hours: "150+ Hours of Work",
};

export const faqs = [
  {
    q: "Are you available for freelance work?",
    keywords: ["freelance", "available", "availability", "hire you", "hire"],
    a: "Yes — Collins is currently available for freelance projects. Would you like to start a project request? I can collect your requirements right here.",
  },
  {
    q: "How much does a project cost?",
    keywords: [
      "cost",
      "price",
      "pricing",
      "how much",
      "quote",
      "budget",
      "rate",
      "charge",
      "fee",
    ],
    a:
      "Every project is quoted individually after I understand your requirements — that way you only pay for what you actually need. As a rough guide: simple landing pages cost less than multi-page websites, and design items like logos or flyers are fixed per-project. Share your project details and I'll prepare an accurate quote, or contact Collins directly at " +
      profile.email +
      ".",
  },
  {
    q: "How long does a project take?",
    keywords: [
      "how long",
      "timeline",
      "deadline",
      "turnaround",
      "fast",
      "duration",
      "when",
    ],
    a: "Typical timelines: logos 3–7 days, collateral items 2–5 days each, websites 1–3 weeks depending on pages and content readiness, and branding 1–3 weeks. Social media management is an ongoing monthly service.",
  },
  {
    q: "What is your process?",
    keywords: ["process", "how do you work", "steps", "workflow", "stages"],
    a: "A typical project runs through four steps: (1) Discovery — we align on goals, audience and content; (2) Design — wireframes/UI drafts in Figma for your approval; (3) Build/Produce — the approved design is implemented; (4) Review & Launch — revisions, final checks, and delivery.",
  },
  {
    q: "Where are you located and do you work remotely?",
    keywords: ["where", "located", "location", "remote", "nairobi", "kenya"],
    a: "Collins is based in Nairobi, Kenya, and works with clients remotely as well as locally.",
  },
  {
    q: "How do I contact you directly?",
    keywords: [
      "contact",
      "email",
      "phone",
      "call",
      "whatsapp",
      "human",
      "person",
      "talk to",
    ],
    a:
      "You can reach Collins directly by email at " +
      profile.email +
      " or by phone at " +
      profile.phone +
      ". You can also use the Contact section of this site.",
  },
  {
    q: "Can I see your work?",
    keywords: ["portfolio", "work", "examples", "samples", "projects", "past"],
    a: "Yes — recent work includes the K'omollo Travel Website, a Cyber Landing Page, Maya's Clinic, and a Cyber Booking Agent. Visit the Projects section of this site to see them.",
  },
  {
    q: "What tools and technologies do you use?",
    keywords: [
      "tools",
      "technologies",
      "stack",
      "skills",
      "software",
      "figma",
      "wordpress",
    ],
    a: "Core tools: Figma, Canva, Illustrator, WordPress & Wix, HTML5, CSS3, JavaScript, PHP, plus AI-assisted workflows (GitHub Copilot, Claude) and security tooling (Kali Linux, BurpSuite). Photoshop, Networking, Cybersecurity and AI are areas currently being expanded.",
  },
];
