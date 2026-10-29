import React from "react";

export default function Resume() {
  return (
    <div>
      <div className="section-title">
        <h2>Resume</h2>
      </div>
                {/* PROFESSIONAL SUMMARY */}
{/* Professional Summary Start */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Column: Summary, Education & Certifications */}
        <div>
          <h3 className="text-2xl font-bold font-raleway text-white mb-5 mt-2">
            Professional Summary
          </h3>

          <div className="resume-item relative pl-6 pb-6 -mt-0.5 border-l-2 border-white/20">
            <h4 className="text-lg font-semibold font-poppins uppercase text-theme-green mb-2.5 leading-tight">
              Web Developer | UI/UX Designer
            </h4>
            <p className="text-sm font-sans text-gray-200 italic mb-4 leading-relaxed">
              Creative and detail-oriented Web Developer cum UI/UX Designer with 3+ years of
              professional experience crafting intuitive, user-centered digital
              experiences. Skilled in user research, wireframing, prototyping,
              and usability testing, with a strong ability to translate complex
              ideas into visually engaging and functional designs. Proficient in
              modern design tools and responsive design principles, with a
              proven track record of improving user satisfaction and product
              performance.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm font-sans text-gray-300">
              <li>Nairobi, Kenya.</li>
              <li>(254) 743-100829</li>
              <li>collinsomondi825@gmail.com</li>
              <li>linkedin.com/in/collins-omondi</li>
            </ul>
        </div>
{/* Professional Summary End */}
                      {/* EDUCATIONAL BACKGROUND */}
{/* Education Background Start */}
          <h3 className="text-2xl font-bold font-raleway text-white mb-5 mt-6">
            Education
          </h3>

          <div className="resume-item relative pl-6 pb-6 -mt-0.5 border-l-2 border-white/20">
            <h4 className="text-lg font-semibold font-poppins uppercase text-theme-green mb-2 leading-tight">
              Diploma in Information Technology
            </h4>
            <h5 className="inline-block text-sm font-semibold bg-white/15 px-3.5 py-1 mb-2.5 text-white font-sans">
              Sep 2019 - Mar 2022
            </h5>
            <p className="text-sm italic font-sans text-gray-300">
              Zetech University, Nairobi
            </p>
            <div className="flex text-sm mt-4">
              <div>
                <ul className="list-disc italic text-sm font-sans text-gray-200">
                  <li>Web Development 1&2</li>
                  <li>Software Development Life Cycle (SDLC)</li>
                </ul>
              </div>

              <div>
                <ul className="list-disc italic text-sm font-sans text-gray-200">
                  <li>Graphic Design Fundamentals</li>
                  <li>Database Design, Administration & SQL</li>
                </ul>
              </div>
            </div>
          </div>
{/* Education Background End */}

                {/* CERTIFICATIONS */}
{/* Certifications Start */}
          <h3 className="text-2xl font-bold font-raleway text-white mb-5 mt-6">
            Certifications
          </h3>

          <div className="resume-item relative pl-6 pb-6 -mt-0.5 border-l-2 border-white/20">
            <h4 className="text-lg font-semibold font-poppins uppercase text-theme-green mb-2 leading-tight">
              Introduction to Networking
            </h4>
            <h5 className="inline-block text-sm font-semibold bg-white/15 px-3.5 py-1 mb-2.5 text-white font-sans">
              2025 - 2026
            </h5>
            <p className="text-sm italic font-sans text-gray-300 mb-1">
              Cisco Networking Academy
            </p>
            <p className="text-sm font-sans">
              <a
                href="https://www.credly.com/badges/badadf86-2050-4735-bd8b-607be3a131dc/public_url"
                target="_blank"
                rel="noopener noreferrer"
                className="text-theme-green hover:underline"
              >
                &#123;www.credly.com/badges&#125;
              </a>
            </p>
          </div>

          <div className="resume-item relative pl-6 pb-6 -mt-0.5 border-l-2 border-white/20">
            <h4 className="text-lg font-semibold font-poppins uppercase text-theme-green mb-2 leading-tight">
              Introduction to Cybersecurity
            </h4>
            <h5 className="inline-block text-sm font-semibold bg-white/15 px-3.5 py-1 mb-2.5 text-white font-sans">
              2025 - 2026
            </h5>
            <p className="text-sm italic font-sans text-gray-300 mb-1">
              ICT Authority &amp; Cisco Networking Academy
            </p>
            <p className="text-sm font-sans">
              <a
                href="https://www.credly.com/badges/1be79bda-6693-41f3-8205-33f6eca686d3/public_url"
                target="_blank"
                rel="noopener noreferrer"
                className="text-theme-green hover:underline"
              >
                &#123;www.credly.com/badges&#125;
              </a>
            </p>
          </div>

          <div className="resume-item relative pl-6 pb-6 -mt-0.5 border-l-2 border-white/20">
            <h4 className="text-lg font-semibold font-poppins uppercase text-theme-green mb-2 leading-tight">
              Ethical Hacking Training
            </h4>
            <h5 className="inline-block text-sm font-semibold bg-white/15 px-3.5 py-1 mb-2.5 text-white font-sans">
              4th Feb 2026 - 11th Apr 2026
            </h5>
            <p className="text-sm italic font-sans text-gray-300 mb-1">
              Cybershujaa &amp; Cisco Networking Academy
            </p>
            <p className="text-sm font-sans">
              <a
                href="https://www.credly.com/badges/48669098-46c4-4f4e-ab55-cb45c9baffb2/public_url"
                target="_blank"
                rel="noopener noreferrer"
                className="text-theme-green hover:underline"
              >
                &#123;www.credly.com/badges&#125;
              </a>
            </p>
          </div>

          <div className="resume-item relative pl-6 pb-6 -mt-0.5 border-l-2 border-white/20">
            <h4 className="text-lg font-semibold font-poppins uppercase text-theme-green mb-2 leading-tight">
              Fullstack Web Development Training
            </h4>
            <h5 className="inline-block text-sm font-semibold bg-white/15 px-3.5 py-1 mb-2.5 text-white font-sans">
              10th Oct 2026 - 20th Dec 2026
            </h5>
            <p className="text-sm italic font-sans text-gray-300 mb-1">
              eMobilis (Technology Training Institute)
            </p>
            <p className="text-sm font-sans">
              <a
                href="https://www.credly.com/badges/48669098-46c4-4f4e-ab55-cb45c9baffb2/public_url"
                target="_blank"
                rel="noopener noreferrer"
                className="text-theme-green hover:underline"
              >
                &#123;www.credly.com/badges&#125;
              </a>
            </p>
          </div>
        </div>
{/* Certifications End */}

                    {/* WORK EXPERIENCE */}
{/* Work Experience Start */}
        {/* Right Column: Professional Experience */}
        <div>
          <h3 className="text-2xl font-bold font-raleway text-white mb-5 mt-2">
            Work Experience
          </h3>

          <div className="resume-item relative pl-6 pb-6 -mt-0.5 border-l-2 border-white/20">
            <h4 className="text-lg font-semibold font-poppins uppercase text-theme-green mb-2 leading-tight">
              Technical Mentor @ Siaya Community Digital Hub
            </h4>
            <h5 className="inline-block text-sm font-semibold bg-white/15 px-3.5 py-1 mb-2.5 text-white font-sans">
              Mar 2025 - Present
            </h5>
            <p className="text-sm italic font-sans text-gray-300 mb-3">
              Siaya, Kenya
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm font-sans text-gray-200">
              <li>
                Facilitating training on digital literacy, web development, graphic design, and
                cybersecurity, improving learner competency by 35%.
              </li>
              <li>
                Collaborating with industry stakeholders to align training programs with market
                demands, improving graduate employability by 25%.
              </li>
              <li>
                Coaching students on CV writing, LinkedIn optimization, and interview skills, improving
                employment outcomes by 20%.
              </li>
              <li>
                Successfully train over 100 students in foundational and
                advanced digital skills, resulting in a 75% improvement in
                students’ project completion rates and the successful
                development of 30+ functional web and mobile prototypes.
              </li>
              <li>
                Strengthen the Hub’s learning programs by introducing
                peer-learning models, and real-world project simulations that
                significantly enhanced learner engagement and self-reliance,
                thus elevating the technical capacity of the students and also
                increasing the Hub’s program enrollment and community
                visibility, leading to a 20% rise in participation across
                digital-skills cohorts.
              </li>
            </ul>
          </div>

          <div className="resume-item relative pl-6 pb-6 -mt-0.5 border-l-2 border-white/20">
            <h4 className="text-lg font-semibold font-poppins uppercase text-theme-green mb-2 leading-tight">
              Junior UX/UI designer @ Snobole Software
            </h4>
            <h5 className="inline-block text-sm font-semibold bg-white/15 px-3.5 py-1 mb-2.5 text-white font-sans">
              Jan 2020 - Dec 2023
            </h5>
            <p className="text-sm italic font-sans text-gray-300 mb-3">
              Nairobi, Kenya
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm font-sans text-gray-200">
              <li>
                Lead in the design, development, and implementation of the
                graphic, layout, and production communication materials
              </li>
              <li>
                Developed numerous marketing programs (logos, brochures,
                infographics, presentations, and advertisements).
              </li>
              <li>
                Managed up to 5 projects or tasks at a given time while under
                pressure. Recommended and consulted with clients on the most
                appropriate graphic design
              </li>
              <li>
                Created 4+ design presentations and proposals a month for
                clients and account managers
              </li>
            </ul>
          </div>

        </div>
{/* Work Experience End */}
      </div>
    </div>
  );
}
