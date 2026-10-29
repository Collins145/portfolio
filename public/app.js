// Production React App Bundle for Collins Omondi Portfolio
const h = React.createElement;
const { useState, useEffect, useRef } = React;

// --- Background Animation Component ---
function Background() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = ["/assets/Images/programmer.png", "/assets/Images/H@cker.png"];

  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return h(
    "div",
    {
      className:
        "fixed inset-0 w-full h-screen pointer-events-none z-0 overflow-hidden",
    },
    images.map((src, index) =>
      h("div", {
        key: src,
        className:
          "absolute inset-0 w-full h-full bg-cover bg-top bg-no-repeat transition-opacity duration-1000 ease-in-out",
        style: {
          backgroundImage: "url('" + src + "')",
          opacity: currentIndex === index ? 1 : 0,
        },
      }),
    ),
    h("div", { className: "absolute inset-0 bg-black/20 pointer-events-none" }),
  );
}

// --- Typewriter Component ---
function Typewriter({
  strings = ["IT Specialist !!", "Web developer !!", "UX/UI Designer !!"],
  typeSpeed = 100,
  backSpeed = 50,
  backDelay = 1500,
}) {
  const [currentText, setCurrentText] = useState("");
  const [stringIndex, setStringIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    const currentString = strings[stringIndex];

    if (!isDeleting && charIndex <= currentString.length) {
      setCurrentText(currentString.substring(0, charIndex));
      if (charIndex === currentString.length) {
        timeout = setTimeout(() => setIsDeleting(true), backDelay);
      } else {
        timeout = setTimeout(() => setCharIndex((c) => c + 1), typeSpeed);
      }
    } else if (isDeleting && charIndex >= 0) {
      setCurrentText(currentString.substring(0, charIndex));
      if (charIndex === 0) {
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setStringIndex((s) => (s + 1) % strings.length);
        }, 500);
      } else {
        timeout = setTimeout(() => setCharIndex((c) => c - 1), backSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [
    charIndex,
    isDeleting,
    stringIndex,
    strings,
    typeSpeed,
    backSpeed,
    backDelay,
  ]);

  return h(
    "span",
    { className: "text-white border-b-2 border-theme-green pb-1 font-poppins" },
    currentText,
    h(
      "span",
      { className: "animate-pulse font-normal text-theme-green ml-0.5" },
      "|",
    ),
  );
}

// --- Counter Item ---
function CounterItem({ iconClass, target, title }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 1500;
          const stepTime = 20;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, stepTime);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [hasAnimated, target]);

  return h(
    "div",
    { ref, className: "w-full" },
    h(
      "div",
      {
        className:
          "relative text-center bg-white/[0.08] px-6 pt-8 pb-6 transition-all duration-300 hover:bg-white/[0.12]",
      },
      h(
        "div",
        {
          className:
            "absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-theme-green text-2xl shadow-lg border border-white/5",
        },
        h("i", { className: iconClass }),
      ),
      h(
        "h2",
        { className: "text-4xl font-bold font-raleway text-white mt-3" },
        count,
      ),
      h("p", { className: "text-sm font-raleway text-gray-300 mt-1" }, title),
    ),
  );
}

function Counts() {
  const stats = [
    { iconClass: "bx bx-smile text-3xl", target: 10, title: "Happy Clients" },
    { iconClass: "bx bx-folder text-3xl", target: 10, title: "Projects" },
    {
      iconClass: "bx bx-headphone text-3xl",
      target: 150,
      title: "Hours of Work",
    },
    { iconClass: "bx bx-group text-3xl", target: 25, title: "Staff" },
  ];

  return h(
    "div",
    { className: "py-14" },
    h(
      "div",
      {
        className:
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6",
      },
      stats.map((s, idx) =>
        h(CounterItem, {
          key: idx,
          iconClass: s.iconClass,
          target: s.target,
          title: s.title,
        }),
      ),
    ),
  );
}

// --- Skills Component ---
function SkillBar({ name, percent, isVisible }) {
  return h(
    "div",
    { className: "mb-6" },
    h(
      "div",
      { className: "flex justify-between items-center mb-1.5" },
      h(
        "span",
        {
          className:
            "text-xs uppercase font-semibold font-poppins text-white tracking-wider",
        },
        name,
      ),
      h(
        "i",
        {
          className:
            "text-xs font-semibold font-poppins text-gray-300 not-italic",
        },
        `${percent}%`,
      ),
    ),
    h(
      "div",
      { className: "w-full bg-white/15 h-2.5 overflow-hidden" },
      h("div", {
        className:
          "bg-theme-green h-full transition-all duration-1000 ease-out",
        style: { width: isVisible ? `${percent}%` : "0%" },
      }),
    ),
  );
}

function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 },
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  const col1 = [
    { name: "Github Copilot", percent: 90 },
    { name: "Claude", percent: 90 },
    { name: "JavaScript", percent: 80 },
    { name: "Kali Linux", percent: 70 },
  ];

  const col2 = [
    { name: "PHP", percent: 60 },
    { name: "WordPress/CMS", percent: 90 },
    { name: "Figma", percent: 80 },
    { name: "BurpSuite", percent: 80 },
  ];

  return h(
    "div",
    { ref: containerRef, className: "pt-6 pb-10" },
    h(
      "div",
      { className: "section-title mb-6" },
      h("h2", null, "Skills & Tools"),
    ),
    h(
      "div",
      { className: "grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-2" },
      h(
        "div",
        null,
        col1.map((s, idx) =>
          h(SkillBar, {
            key: idx,
            name: s.name,
            percent: s.percent,
            isVisible,
          }),
        ),
      ),
      h(
        "div",
        null,
        col2.map((s, idx) =>
          h(SkillBar, {
            key: idx,
            name: s.name,
            percent: s.percent,
            isVisible,
          }),
        ),
      ),
    ),
  );
}

// --- Interests Component ---
function Interests() {
  const interests = [
    { name: "Coding", iconClass: "bx bx-code text-3xl", color: "#ffbb2c" },
    {
      name: "Computer Troubleshooting",
      iconClass: "bx bx-laptop text-3xl",
      color: "#e361ff",
    },
    {
      name: "Networking & Cybersecurity",
      iconClass: "bx bx-network-chart text-3xl",
      color: "#ffa76e",
    },
    {
      name: "Reading Tech Articles",
      iconClass: "bx bxs-book-alt text-3xl",
      color: "#11dbcf",
    },
    {
      name: "WordPress",
      iconClass: "bx bxl-wordpress text-3xl",
      color: "#4233ff",
    },
    {
      name: "STEM Documentaries",
      iconClass: "bx bxs-movie text-3xl",
      color: "#b2904f",
    },
    {
      name: "Listening to Tech & Finance podcasts",
      iconClass: "bx bx-headphone text-3xl",
      color: "#b20969",
    },
    { name: "Github", iconClass: "bx bxl-github text-3xl", color: "#ff5828" },
  ];

  return h(
    "div",
    { className: "pt-6 pb-4" },
    h("div", { className: "section-title mb-6" }, h("h2", null, "Interests")),
    h(
      "div",
      { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" },
      interests.map((item, idx) =>
        h(
          "div",
          {
            key: idx,
            className:
              "flex items-center p-5 bg-white/[0.08] transition-all duration-300 hover:bg-white/[0.12] group cursor-pointer",
          },
          h("i", {
            className: `${item.iconClass} mr-3 shrink-0 transition-transform duration-300 group-hover:scale-110`,
            style: { color: item.color },
          }),
          h(
            "h3",
            { className: "text-base font-bold font-raleway text-white" },
            item.name,
          ),
        ),
      ),
    ),
  );
}

// --- About Component ---
function About() {
  return h(
    "div",
    { className: "space-y-4" },
    h("div", { className: "section-title" }, h("h2", null, "About")),
    h(
      "div",
      { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" },
      h(
        "div",
        { className: "lg:col-span-4" },
        h("img", {
          src: "/assets/img/collo_AI.png",
          alt: "Collins Omondi",
          className: "w-full h-auto rounded-none shadow-lg object-cover",
        }),
      ),
      h(
        "div",
        { className: "lg:col-span-8" },
        h(
          "h3",
          {
            className:
              "text-2xl lg:text-[26px] font-bold font-raleway text-theme-green mb-3",
          },
          "UI/UX Designer & Developer",
        ),
        h(
          "p",
          {
            className: "text-base font-sans text-gray-200 leading-relaxed mb-6",
          },
          "I turn ideas into digital experiences people enjoy using by leveraging AI, design, technology, and problem-solving to create intuitive interfaces and functional web solutions.From understanding user needs and mapping experiences to designing interfaces and bringing them to life through code, I focus on the entire journey from idea → experience → product. My approach is driven by one question:“How can technology make this problem simpler for the user?” That mindset allows me to create solutions that go beyond aesthetics—solutions that are usable, purposeful, scalable, and aligned with business goals.",
        ),
        h(
          "div",
          { className: "grid grid-cols-1 md:grid-cols-2 gap-4" },
          h(
            "ul",
            { className: "space-y-3 list-none p-0 m-0" },
            h(
              "li",
              { className: "flex items-center text-sm font-sans text-white" },
              h("i", {
                className:
                  "bx bx-chevron-right text-theme-green text-xl mr-1 shrink-0",
              }),
              h("strong", { className: "mr-2" }, "Email:"),
              h(
                "a",
                {
                  href: "mailto:collinsomondi825@gmail.com",
                  className: "text-theme-green hover:underline",
                },
                "collinsomondi825@gmail.com",
              ),
            ),
            h(
              "li",
              { className: "flex items-center text-sm font-sans text-white" },
              h("i", {
                className:
                  "bx bx-chevron-right text-theme-green text-xl mr-1 shrink-0",
              }),
              h("strong", { className: "mr-2" }, "Phone:"),
              h("span", null, "+254743100829"),
            ),
          ),
          h(
            "ul",
            { className: "space-y-3 list-none p-0 m-0" },
            h(
              "li",
              { className: "flex items-center text-sm font-sans text-white" },
              h("i", {
                className:
                  "bx bx-chevron-right text-theme-green text-xl mr-1 shrink-0",
              }),
              h("strong", { className: "mr-2" }, "Freelance:"),
              h("span", null, "Available"),
            ),
          ),
        ),
      ),
    ),
    h(Counts),
    h(Skills),
    h(Interests),
  );
}

// --- Resume Component ---
function Resume() {
  return h(
    "div",
    null,
    h("div", { className: "section-title" }, h("h2", null, "Resume")),
    h(
      "div",
      { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 items-start" },
      // Left Column
      h(
        "div",
        null,
        h(
          "h3",
          { className: "text-2xl font-bold font-raleway text-white mb-5 mt-2" },
          "Professional Summary",
        ),
        h(
          "div",
          {
            className:
              "resume-item relative pl-6 pb-6 -mt-0.5 border-l-2 border-white/20",
          },
          h(
            "h4",
            {
              className:
                "text-lg font-semibold font-poppins uppercase text-theme-green mb-2.5 leading-tight",
            },
            "Collins Omondi",
          ),
          h(
            "p",
            {
              className:
                "text-sm font-sans text-gray-200 italic mb-4 leading-relaxed",
            },
            "Creative and detail-oriented UI/UX Designer with 3+ years of professional experience crafting intuitive, user-centered digital experiences. Skilled in user research, wireframing, prototyping, and usability testing, with a strong ability to translate complex ideas into visually engaging and functional designs. Proficient in modern design tools and responsive design principles, with a proven track record of improving user satisfaction and product performance.",
          ),
          h(
            "ul",
            {
              className:
                "list-disc pl-5 space-y-1 text-sm font-sans text-gray-300",
            },
            h("li", null, "Nairobi, Kenya."),
            h("li", null, "(254) 743-100829"),
            h("li", null, "collinsomondi825@gmail.com"),
          ),
        ),

        h(
          "h3",
          { className: "text-2xl font-bold font-raleway text-white mb-5 mt-6" },
          "Education",
        ),
        h(
          "div",
          {
            className:
              "resume-item relative pl-6 pb-6 -mt-0.5 border-l-2 border-white/20",
          },
          h(
            "h4",
            {
              className:
                "text-lg font-semibold font-poppins uppercase text-theme-green mb-2 leading-tight",
            },
            "Diploma in Information Technology",
          ),
          h(
            "h5",
            {
              className:
                "inline-block text-sm font-semibold bg-white/15 px-3.5 py-1 mb-2.5 text-white font-sans",
            },
            "2019 - 2021",
          ),
          h(
            "p",
            { className: "text-sm italic font-sans text-gray-300" },
            "Zetech University, Nairobi",
          ),
        ),

        h(
          "h3",
          { className: "text-2xl font-bold font-raleway text-white mb-5 mt-6" },
          "Certifications",
        ),
        h(
          "div",
          {
            className:
              "resume-item relative pl-6 pb-6 -mt-0.5 border-l-2 border-white/20",
          },
          h(
            "h4",
            {
              className:
                "text-lg font-semibold font-poppins uppercase text-theme-green mb-2 leading-tight",
            },
            "Introduction to Networking",
          ),
          h(
            "h5",
            {
              className:
                "inline-block text-sm font-semibold bg-white/15 px-3.5 py-1 mb-2.5 text-white font-sans",
            },
            "2025 - 2026",
          ),
          h(
            "p",
            { className: "text-sm italic font-sans text-gray-300 mb-1" },
            "Cisco Networking Academy",
          ),
          h(
            "p",
            { className: "text-sm font-sans" },
            h(
              "a",
              {
                href: "https://www.credly.com/badges/badadf86-2050-4735-bd8b-607be3a131dc/public_url",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-theme-green hover:underline",
              },
              "{www.credly.com/badges}",
            ),
          ),
        ),
        h(
          "div",
          {
            className:
              "resume-item relative pl-6 pb-6 -mt-0.5 border-l-2 border-white/20",
          },
          h(
            "h4",
            {
              className:
                "text-lg font-semibold font-poppins uppercase text-theme-green mb-2 leading-tight",
            },
            "Introduction to Cybersecurity",
          ),
          h(
            "h5",
            {
              className:
                "inline-block text-sm font-semibold bg-white/15 px-3.5 py-1 mb-2.5 text-white font-sans",
            },
            "2025 - 2026",
          ),
          h(
            "p",
            { className: "text-sm italic font-sans text-gray-300 mb-1" },
            "ICT Authority & Cisco Networking Academy",
          ),
          h(
            "p",
            { className: "text-sm font-sans" },
            h(
              "a",
              {
                href: "https://www.credly.com/badges/1be79bda-6693-41f3-8205-33f6eca686d3/public_url",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-theme-green hover:underline",
              },
              "{www.credly.com/badges}",
            ),
          ),
        ),
        h(
          "div",
          {
            className:
              "resume-item relative pl-6 pb-6 -mt-0.5 border-l-2 border-white/20",
          },
          h(
            "h4",
            {
              className:
                "text-lg font-semibold font-poppins uppercase text-theme-green mb-2 leading-tight",
            },
            "Ethical Hacking Training",
          ),
          h(
            "h5",
            {
              className:
                "inline-block text-sm font-semibold bg-white/15 px-3.5 py-1 mb-2.5 text-white font-sans",
            },
            "4th Feb 2026 - 11th Apr 2026",
          ),
          h(
            "p",
            { className: "text-sm italic font-sans text-gray-300 mb-1" },
            "Cybershujaa & Cisco Networking Academy",
          ),
          h(
            "p",
            { className: "text-sm font-sans" },
            h(
              "a",
              {
                href: "https://www.credly.com/badges/48669098-46c4-4f4e-ab55-cb45c9baffb2/public_url",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-theme-green hover:underline",
              },
              "{www.credly.com/badges}",
            ),
          ),
        ),
      ),

      // Right Column
      h(
        "div",
        null,
        h(
          "h3",
          { className: "text-2xl font-bold font-raleway text-white mb-5 mt-2" },
          "Professional Experience",
        ),
        h(
          "div",
          {
            className:
              "resume-item relative pl-6 pb-6 -mt-0.5 border-l-2 border-white/20",
          },
          h(
            "h4",
            {
              className:
                "text-lg font-semibold font-poppins uppercase text-theme-green mb-2 leading-tight",
            },
            "Junior UX/UI designer @ Snobole Software",
          ),
          h(
            "h5",
            {
              className:
                "inline-block text-sm font-semibold bg-white/15 px-3.5 py-1 mb-2.5 text-white font-sans",
            },
            "2020 - 2023",
          ),
          h(
            "p",
            { className: "text-sm italic font-sans text-gray-300 mb-3" },
            "Nairobi, Kenya",
          ),
          h(
            "ul",
            {
              className:
                "list-disc pl-5 space-y-2 text-sm font-sans text-gray-200",
            },
            h(
              "li",
              null,
              "Lead in the design, development, and implementation of the graphic, layout, and production communication materials",
            ),
            h(
              "li",
              null,
              "Developed numerous marketing programs (logos, brochures, infographics, presentations, and advertisements).",
            ),
            h(
              "li",
              null,
              "Developed low-fidelity wireframes, high-fidelity mockups, and interactive prototypes using Figma and Adobe XD, accelerating stakeholder approvals and reducing design revision cycles.",
            ),
            h(
              "li",
              null,
              "Created 4+ design presentations and proposals a month for clients and account managers",
            ),
          ),
        ),
        h(
          "div",
          {
            className:
              "resume-item relative pl-6 pb-6 -mt-0.5 border-l-2 border-white/20",
          },
          h(
            "h4",
            {
              className:
                "text-lg font-semibold font-poppins uppercase text-theme-green mb-2 leading-tight",
            },
            "Technical Mentor @ Siaya Community Digital Hub",
          ),
          h(
            "h5",
            {
              className:
                "inline-block text-sm font-semibold bg-white/15 px-3.5 py-1 mb-2.5 text-white font-sans",
            },
            "2025 - Present",
          ),
          h(
            "p",
            { className: "text-sm italic font-sans text-gray-300 mb-3" },
            "Siaya, Kenya",
          ),
          h(
            "ul",
            {
              className:
                "list-disc pl-5 space-y-2 text-sm font-sans text-gray-200",
            },
            h(
              "li",
              null,
              "Facilitating training in digital literacy, web development, graphic design, and cybersecurity, improving learner competency by 35%.",
            ),
            h(
              "li",
              null,
              "Collaborating with industry stakeholders to align training programs with market demands, improving graduate employability by 25%.",
            ),
            h(
              "li",
              null,
              "Coaching students on CV writing, LinkedIn optimization, and interview skills, improving employment outcomes by 20%.",
            ),
            h(
              "li",
              null,
              "Strengthen learning programs by introducing peer-learning models, and real-world project simulations that significantly enhanced learner engagement and self-reliance, thus elevating the technical capacity of the students and also increasing the Hub’s program enrollment and community visibility, leading to a 20% rise in participation across digital-skills cohorts.",
            ),
          ),
        ),
      ),
    ),
  );
}

// --- Projects Component ---
function Projects() {
  const projects = [
    {
      title: "K'omollo Travel Website",
      image: "/assets/img/portfolio/K'omollo Travel Website.png",
      description:
        "A modern travel booking website showcasing destinations, tours and seamless reservations for K'omollo clients.",
      link: "https://komollotravel.netlify.app",
    },
    {
      title: "Cyber Landing Page",
      image: "/assets/img/portfolio/Cyber Landing Page.png",
      description:
        "A sleek, conversion-focused landing page designed to capture leads and present cyber services clearly.",
      link: "https://hub-huduma-mashinani-cyber-cafe.vercel.app",
    },
    {
      title: "Maya's Clinic",
      image: "/assets/img/portfolio/Maya's Clinic.png",
      description:
        "A clean and friendly clinic website with service information, doctor profiles and easy appointment booking.",
      link: "https://maya-s-clinic.vercel.app",
    },
    {
      title: "Cyber Booking Agent",
      image: "/assets/img/portfolio/Cyber Booking Agent.png",
      description:
        "An AI-powered booking agent that handles reservations and customer queries automatically, saving time and effort.",
      link: "https://cyberbookingagent.netlify.app",
    },
  ];

  return h(
    "div",
    null,
    h("div", { className: "section-title" }, h("h2", null, "Projects")),
    h(
      "div",
      { className: "grid grid-cols-1 md:grid-cols-2 gap-8" },
      projects.map((p, idx) =>
        h(
          "div",
          {
            key: idx,
            className:
              "bg-black/60 border border-white/10 overflow-hidden transition-all duration-300 hover:border-theme-green/50 flex flex-col group",
          },
          h(
            "div",
            {
              className:
                "relative overflow-hidden bg-black/80 aspect-video flex items-center justify-center",
            },
            h("img", {
              src: p.image,
              alt: p.title,
              className:
                "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
              onError: (e) => {
                e.target.src = "/assets/img/portfolio/Screenshot (33).png";
              },
            }),
            h(
              "div",
              {
                className:
                  "absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center",
              },
              h(
                "a",
                {
                  href: p.link,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className:
                    "w-12 h-12 rounded-full bg-theme-green text-white flex items-center justify-center text-xl transition-transform duration-300 hover:scale-110 shadow-lg",
                },
                h("i", { className: "bx bx-link-external" }),
              ),
            ),
          ),
          h(
            "div",
            { className: "p-5 flex-1 flex flex-col justify-between" },
            h(
              "div",
              null,
              h(
                "h4",
                { className: "text-lg font-bold font-raleway text-white mb-2" },
                p.title,
              ),
              h(
                "p",
                {
                  className:
                    "text-sm font-sans text-gray-300 leading-relaxed mb-4",
                },
                p.description,
              ),
            ),
            h(
              "div",
              null,
              h(
                "a",
                {
                  href: p.link,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className:
                    "inline-flex items-center text-sm font-medium text-theme-green hover:text-theme-greenHover transition-colors",
                },
                "View Project ",
                h("i", { className: "bx bx-link-external ml-1.5" }),
              ),
            ),
          ),
        ),
      ),
    ),
  );
}

// --- Services Component ---
function Services() {
  const services = [
    {
      title: "Website Design",
      iconClass: "bx bxl-dribbble",
      description:
        "Web graphic design; interface design; authoring, user experience design; and search engine optimization.",
    },
    {
      title: "Collateral Design",
      iconClass: "bx bxs-image",
      description:
        "A wide range of brand collateral ranging from banners, flyers, posters and business cards.",
    },
    {
      title: "Logo Design",
      iconClass: "bx bx-pen",
      description:
        "We design proffessional logos that will help you communicate with your clients.",
    },
    {
      title: "Branding",
      iconClass: "bx bxs-bullseye",
      description:
        "A good and well created brand improves recognition and creates trust.",
    },
    {
      title: "Social Media marketing",
      iconClass: "bx bxl-facebook-circle",
      description:
        "We create results-driven contents for social media marketing as well as management",
    },
    {
      title: "Computer Maintenance & Troubleshooting",
      iconClass: "bx bxl-android",
      description:
        "There are over 3.5B Smartphone users in the world, yaah, you know where i'm headed with this.",
    },
  ];

  return h(
    "div",
    null,
    h("div", { className: "section-title" }, h("h2", null, "Services")),
    h(
      "div",
      { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" },
      services.map((s, idx) =>
        h(
          "div",
          {
            key: idx,
            className:
              "p-8 text-center bg-white/[0.08] transition-all duration-300 hover:bg-theme-green group flex flex-col items-center justify-center cursor-pointer",
          },
          h(
            "div",
            {
              className:
                "relative mb-5 w-16 h-16 rounded bg-theme-green text-white flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-theme-green text-3xl",
            },
            h("i", { className: s.iconClass }),
          ),
          h(
            "h4",
            {
              className:
                "text-xl font-bold font-raleway text-white mb-3 transition-colors duration-300",
            },
            s.title,
          ),
          h(
            "p",
            {
              className:
                "text-sm font-sans text-gray-300 leading-relaxed transition-colors duration-300 group-hover:text-white",
            },
            s.description,
          ),
        ),
      ),
    ),
  );
}

// --- Contact Component ---
function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 4)
      errs.name = "Please enter at least 4 chars";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      errs.email = "Please enter a valid email";
    if (!formData.subject.trim() || formData.subject.trim().length < 4)
      errs.subject = "Please enter at least 4 chars of subject";
    if (!formData.message.trim())
      errs.message = "Please write something for us";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus({ loading: true, success: false, error: "" });
    setTimeout(() => {
      setStatus({ loading: false, success: true, error: "" });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(
        () => setStatus((prev) => ({ ...prev, success: false })),
        5000,
      );
    }, 800);
  };

  return h(
    "div",
    null,
    h("div", { className: "section-title" }, h("h2", null, "Contact")),
    h(
      "div",
      { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-2" },
      // Address
      h(
        "div",
        { className: "p-5 bg-white/[0.08] flex items-center" },
        h(
          "div",
          {
            className:
              "w-12 h-12 rounded-full bg-white/10 text-theme-green flex items-center justify-center text-2xl mr-4 shrink-0",
          },
          h("i", { className: "bx bx-map" }),
        ),
        h(
          "div",
          null,
          h(
            "h3",
            {
              className:
                "text-sm font-bold font-raleway text-white/50 uppercase tracking-wider",
            },
            "My Address",
          ),
          h("p", { className: "text-sm font-sans text-white mt-1" }, "Nairobi"),
        ),
      ),
      // Social Profiles
      h(
        "div",
        { className: "p-5 bg-white/[0.08] flex items-center" },
        h(
          "div",
          {
            className:
              "w-12 h-12 rounded-full bg-white/10 text-theme-green flex items-center justify-center text-2xl mr-4 shrink-0",
          },
          h("i", { className: "bx bx-share-alt" }),
        ),
        h(
          "div",
          null,
          h(
            "h3",
            {
              className:
                "text-sm font-bold font-raleway text-white/50 uppercase tracking-wider",
            },
            "Social Profiles",
          ),
          h(
            "div",
            { className: "flex items-center space-x-3 mt-1.5" },
            h(
              "a",
              {
                href: "https://www.linkedin.com/in/collins-omondi-a88029188/",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-white hover:text-theme-green text-base",
              },
              h("i", { className: "bx bxl-linkedin" }),
            ),
            h(
              "a",
              {
                href: "https://www.behance.net/collinsomondi1",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-white hover:text-theme-green text-base",
              },
              h("i", { className: "bx bxl-behance" }),
            ),
            h(
              "a",
              {
                href: "https://www.credly.com/badges/48669098-46c4-4f4e-ab55-cb45c9baffb2/public_url",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-white hover:text-theme-green text-base",
              },
              h("i", { className: "bx bx-award" }),
            ),
            h(
              "a",
              {
                href: "https://twitter.com/collinsomondi",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-white hover:text-theme-green text-base",
              },
              h("i", { className: "bx bxl-twitter" }),
            ),
            h(
              "a",
              {
                href: "#",
                className: "text-white hover:text-theme-green text-base",
              },
              h("i", { className: "bx bxl-instagram" }),
            ),
          ),
        ),
      ),
      // Email
      h(
        "div",
        { className: "p-5 bg-white/[0.08] flex items-center" },
        h(
          "div",
          {
            className:
              "w-12 h-12 rounded-full bg-white/10 text-theme-green flex items-center justify-center text-2xl mr-4 shrink-0",
          },
          h("i", { className: "bx bx-envelope" }),
        ),
        h(
          "div",
          null,
          h(
            "h3",
            {
              className:
                "text-sm font-bold font-raleway text-white/50 uppercase tracking-wider",
            },
            "Email Me",
          ),
          h(
            "a",
            {
              href: "mailto:collinsomondi825@gmail.com",
              className:
                "text-sm font-sans text-white hover:text-theme-green mt-1 block",
            },
            "collinsomondi825@gmail.com",
          ),
        ),
      ),
      // Phone
      h(
        "div",
        { className: "p-5 bg-white/[0.08] flex items-center" },
        h(
          "div",
          {
            className:
              "w-12 h-12 rounded-full bg-white/10 text-theme-green flex items-center justify-center text-2xl mr-4 shrink-0",
          },
          h("i", { className: "bx bx-phone-call" }),
        ),
        h(
          "div",
          null,
          h(
            "h3",
            {
              className:
                "text-sm font-bold font-raleway text-white/50 uppercase tracking-wider",
            },
            "Call Me",
          ),
          h(
            "a",
            {
              href: "tel:+254743100829",
              className:
                "text-sm font-sans text-white hover:text-theme-green mt-1 block",
            },
            "+254743100829",
          ),
        ),
      ),
    ),

    // Form
    h(
      "form",
      {
        onSubmit: handleSubmit,
        className: "mt-6 p-7 bg-white/[0.08] space-y-4",
      },
      h(
        "div",
        { className: "grid grid-cols-1 md:grid-cols-2 gap-4" },
        h(
          "div",
          null,
          h("input", {
            type: "text",
            name: "name",
            placeholder: "Your Name",
            value: formData.name,
            onChange: handleChange,
            className:
              "w-full bg-white/[0.08] border-0 text-white placeholder-white/30 text-sm px-4 py-3 focus:bg-white/[0.12] focus:outline-none transition-colors",
          }),
          errors.name &&
            h("p", { className: "text-red-500 text-xs mt-1" }, errors.name),
        ),
        h(
          "div",
          null,
          h("input", {
            type: "email",
            name: "email",
            placeholder: "Your Email",
            value: formData.email,
            onChange: handleChange,
            className:
              "w-full bg-white/[0.08] border-0 text-white placeholder-white/30 text-sm px-4 py-3 focus:bg-white/[0.12] focus:outline-none transition-colors",
          }),
          errors.email &&
            h("p", { className: "text-red-500 text-xs mt-1" }, errors.email),
        ),
      ),
      h(
        "div",
        null,
        h("input", {
          type: "text",
          name: "subject",
          placeholder: "Subject",
          value: formData.subject,
          onChange: handleChange,
          className:
            "w-full bg-white/[0.08] border-0 text-white placeholder-white/30 text-sm px-4 py-3 focus:bg-white/[0.12] focus:outline-none transition-colors",
        }),
        errors.subject &&
          h("p", { className: "text-red-500 text-xs mt-1" }, errors.subject),
      ),
      h(
        "div",
        null,
        h("textarea", {
          name: "message",
          rows: 5,
          placeholder: "Message",
          value: formData.message,
          onChange: handleChange,
          className:
            "w-full bg-white/[0.08] border-0 text-white placeholder-white/30 text-sm px-4 py-3 focus:bg-white/[0.12] focus:outline-none transition-colors",
        }),
        errors.message &&
          h("p", { className: "text-red-500 text-xs mt-1" }, errors.message),
      ),

      status.loading &&
        h(
          "div",
          {
            className:
              "bg-white/[0.08] text-center p-3 text-sm text-theme-green font-semibold",
          },
          "Loading...",
        ),
      status.error &&
        h(
          "div",
          {
            className:
              "bg-red-600 text-center p-3 text-sm text-white font-semibold",
          },
          status.error,
        ),
      status.success &&
        h(
          "div",
          {
            className:
              "bg-theme-green text-center p-3 text-sm text-white font-semibold",
          },
          "Your message has been sent. Thank you!",
        ),

      h(
        "div",
        { className: "text-center pt-2" },
        h(
          "button",
          {
            type: "submit",
            className:
              "bg-theme-green hover:bg-theme-greenDark text-white font-sans text-sm font-medium px-8 py-2.5 transition-colors duration-300 rounded cursor-pointer",
          },
          "Send Message",
        ),
      ),
    ),
  );
}

// --- Credits Component ---
function Credits() {
  return h(
    "div",
    {
      className:
        "fixed right-4 bottom-4 z-10 text-[13px] text-white max-lg:left-1/2 max-lg:right-auto max-lg:-translate-x-1/2 max-lg:text-center whitespace-nowrap pointer-events-auto",
    },
    "Designed by ",
    h(
      "a",
      {
        href: "https://bootstrapmade.com/",
        target: "_blank",
        rel: "noopener noreferrer",
        className:
          "text-theme-green hover:text-white transition-colors duration-300",
      },
      "Collins Omondi",
    ),
  );
}

// --- Header Component ---
function Header({
  activeSection,
  setActiveSection,
  mobileMenuOpen,
  setMobileMenuOpen,
}) {
  const isHome = activeSection === "home" || activeSection === "header";

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "resume", label: "Resume" },
    { id: "projects", label: "Projects" },
    { id: "services", label: "Services" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return h(
    React.Fragment,
    null,
    // Mobile Nav Toggle
    h(
      "button",
      {
        type: "button",
        "aria-label": "Toggle navigation",
        onClick: () => setMobileMenuOpen(!mobileMenuOpen),
        className:
          "lg:hidden fixed top-4 right-4 z-[9999] p-2.5 rounded-lg bg-black/60 border border-white/20 text-white hover:text-theme-green transition-colors focus:outline-none cursor-pointer",
      },
      h("i", {
        className: mobileMenuOpen ? "bx bx-x text-2xl" : "bx bx-menu text-2xl",
      }),
    ),

    // Mobile Nav Drawer
    mobileMenuOpen &&
      h(
        "div",
        {
          className:
            "lg:hidden fixed inset-0 z-[9998] bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 animate-fadeIn",
          onClick: () => setMobileMenuOpen(false),
        },
        h(
          "div",
          {
            className:
              "w-full max-w-sm bg-black/90 border border-white/20 rounded-xl p-6 space-y-3",
            onClick: (e) => e.stopPropagation(),
          },
          navItems.map((item) => {
            const isActive =
              (item.id === "home" && isHome) || activeSection === item.id;
            return h(
              "button",
              {
                key: item.id,
                onClick: () => handleNavClick(item.id),
                className: `w-full text-left px-4 py-3 rounded-md font-poppins text-base font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "text-theme-green bg-white/10"
                    : "text-white/80 hover:text-white hover:bg-white/5"
                }`,
              },
              item.label,
            );
          }),
        ),
      ),

    // Header Element
    h(
      "header",
      {
        id: "header",
        className: `transition-all duration-500 z-40 ${
          isHome
            ? "relative min-h-screen flex items-center justify-center py-16"
            : "fixed top-0 left-0 right-0 h-20 bg-black/90 backdrop-blur-md border-b border-white/10 flex items-center shadow-lg"
        }`,
      },
      h(
        "div",
        {
          className: `w-full max-w-5xl mx-auto px-6 sm:px-8 transition-all duration-500 ${
            isHome
              ? "bg-black/90 p-8 sm:p-12 lg:p-16 border border-white/10 rounded-sm"
              : "flex items-center justify-between"
          }`,
        },
        // Main Title & Logo
        h(
          "div",
          null,
          h(
            "h1",
            {
              onClick: () => handleNavClick("home"),
              className: `font-black font-poppins text-white cursor-pointer tracking-tight transition-all duration-300 hover:text-white/90 ${
                isHome
                  ? "text-4xl sm:text-5xl lg:text-6xl mb-3"
                  : "text-2xl sm:text-3xl"
              }`,
            },
            "Collins Omondi",
          ),
          isHome &&
            h(
              "h2",
              {
                className:
                  "text-xl sm:text-2xl font-bold font-raleway text-white/80 mt-2",
              },
              "I am a ",
              h(Typewriter, {
                strings: [
                  "Web developer !!",
                  "UX/UI Designer !!",
                  "IT Specialist !!",
                ],
              }),
            ),
        ),

        // Desktop Navigation
        h(
          "nav",
          { className: "hidden lg:block" },
          h(
            "ul",
            {
              className: `flex items-center list-none m-0 p-0 ${isHome ? "mt-8 space-x-8" : "space-x-7"}`,
            },
            navItems.map((item) => {
              const isActive =
                (item.id === "home" && isHome) || activeSection === item.id;
              return h(
                "li",
                { key: item.id, className: "relative group" },
                h(
                  "button",
                  {
                    onClick: () => handleNavClick(item.id),
                    className: `font-poppins text-base font-normal tracking-wide transition-colors duration-300 relative py-1 cursor-pointer bg-transparent border-0 outline-none ${
                      isActive ? "text-white" : "text-white/70 hover:text-white"
                    }`,
                  },
                  item.label,
                  h("span", {
                    className: `absolute bottom-0 left-0 h-[2px] bg-theme-green transition-all duration-300 ${
                      isActive
                        ? "w-[25px] opacity-100"
                        : "w-0 group-hover:w-[25px] opacity-0 group-hover:opacity-100"
                    }`,
                  }),
                ),
              );
            }),
          ),
        ),

        // Social Links
        isHome &&
          h(
            "div",
            { className: "flex items-center space-x-3 mt-8" },
            h(
              "a",
              {
                href: "https://www.behance.net/collinsomondi1",
                target: "_blank",
                rel: "noopener noreferrer",
                "aria-label": "Behance",
                className:
                  "w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center text-base transition-all duration-300 hover:bg-theme-green hover:scale-105",
              },
              h("i", { className: "bx bxl-behance" }),
            ),
            h(
              "a",
              {
                href: "https://www.linkedin.com/in/collins-omondi-a88029188/",
                target: "_blank",
                rel: "noopener noreferrer",
                "aria-label": "LinkedIn",
                className:
                  "w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center text-base transition-all duration-300 hover:bg-theme-green hover:scale-105",
              },
              h("i", { className: "bx bxl-linkedin" }),
            ),
            h(
              "a",
              {
                href: "https://www.credly.com/users/collins-omondi.ad3357ac",
                target: "_blank",
                rel: "noopener noreferrer",
                "aria-label": "Credly",
                className:
                  "w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center text-base transition-all duration-300 hover:bg-theme-green hover:scale-105",
              },
              h("i", { className: "bx bx-award" }),
            ),
            h(
              "a",
              {
                href: "https://twitter.com/collinsomondi",
                target: "_blank",
                rel: "noopener noreferrer",
                "aria-label": "Twitter",
                className:
                  "w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center text-base transition-all duration-300 hover:bg-theme-green hover:scale-105",
              },
              h("i", { className: "bx bxl-twitter" }),
            ),
            h(
              "a",
              {
                href: "#",
                "aria-label": "Facebook",
                className:
                  "w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center text-base transition-all duration-300 hover:bg-theme-green hover:scale-105",
              },
              h("i", { className: "bx bxl-facebook" }),
            ),
          ),
      ),
    ),
  );
}

// --- Main App Component ---
function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (
        [
          "about",
          "resume",
          "projects",
          "services",
          "portfolio",
          "contact",
        ].includes(hash)
      ) {
        setActiveSection(hash === "portfolio" ? "services" : hash);
      } else if (hash === "header" || hash === "home" || !hash) {
        setActiveSection("home");
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (section === "home") {
      window.history.pushState(null, "", window.location.pathname);
    } else {
      window.location.hash = section;
    }
  };

  const isHome = activeSection === "home" || activeSection === "header";

  return h(
    "div",
    { className: "relative min-h-screen text-white font-sans" },
    h(Background, null),
    h(Header, {
      activeSection,
      setActiveSection: handleSectionChange,
      mobileMenuOpen,
      setMobileMenuOpen,
    }),

    !isHome &&
      h(
        "main",
        {
          className:
            "relative z-10 pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto transition-all duration-500 animate-fadeIn",
        },
        h(
          "div",
          {
            className:
              "bg-black/90 p-6 sm:p-10 border border-white/10 rounded-sm shadow-2xl",
          },
          activeSection === "about" && h(About),
          activeSection === "resume" && h(Resume),
          activeSection === "projects" && h(Projects),
          activeSection === "services" && h(Services),
          activeSection === "contact" && h(Contact),
        ),
      ),

    h(Credits),
  );
}

// Mount the App
const rootEl = document.getElementById("root");
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(h(App));
}
