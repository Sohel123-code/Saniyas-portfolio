import { useEffect, useRef, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Dna,
  Expand,
  GraduationCap,
  Heart,
  HeartHandshake,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Ribbon,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import {
  Header,
  Footer,
  Page,
  Reveal,
  ButtonLink,
  TextLink,
  Eyebrow,
  Portrait,
  PageIntro,
  ClinicalCard,
  ConnectBand,
  Tooth,
} from "./components";
import { clinicalAreas, skills, interests, gallery } from "./data";

function Home() {
  return (
    <Page className="home-page">
      <section className="hero container">
        <div className="hero-copy">
          <div className="student-pill">
            <span className="status-dot" /> BDS FINAL-YEAR STUDENT · GITAM
          </div>
          <h1>
            A curious mind.
            <br />A <em>caring heart.</em>
            <span className="headline-spark" aria-hidden="true">
              ✳
            </span>
          </h1>
          <p className="hero-name">Hi, I’m Mohamed Saniya Afreen.</p>
          <p className="hero-description">
            A dental student with a passion for people, a love for learning, and
            a purpose that goes beyond the smile.
          </p>
          <div className="hero-buttons">
            <ButtonLink to="/about">Get to know me</ButtonLink>
            <ButtonLink to="/clinical" secondary arrow="right">
              Explore my journey
            </ButtonLink>
          </div>
          <div className="hero-location">
            <MapPin size={15} />
            <span>Rooted in Visakhapatnam. Inspired by possibility.</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="portrait-orbit" aria-hidden="true" />
          <div className="hero-image-wrap">
            <Portrait eager className="hero-image" />
          </div>
          <div className="hero-flower" aria-hidden="true">
            ✳
          </div>
          <div className="hero-note">
            <span className="note-icon">
              <Ribbon size={23} strokeWidth={1.5} />
            </span>
            <div>
              A purpose in the making<span>Aspiring Oral Oncologist</span>
            </div>
            <ArrowUpRight size={18} />
          </div>
          <div className="portrait-label">
            <span /> Learning today. Caring for tomorrow.
          </div>
          <div className="hero-side-label" aria-hidden="true">
            SCIENCE WITH A HUMAN TOUCH
          </div>
        </div>
      </section>
      <div className="values-strip">
        <div className="container">
          <span>
            <Tooth size={24} /> Rooted in science
          </span>
          <span className="strip-star" aria-hidden="true">
            ✳
          </span>
          <span>
            <Heart size={21} /> Led by empathy
          </span>
          <span className="strip-star" aria-hidden="true">
            ✳
          </span>
          <span>
            <BookOpen size={21} /> Always learning
          </span>
          <span className="strip-star" aria-hidden="true">
            ✳
          </span>
          <span>
            <Sparkles size={21} /> Growing with purpose
          </span>
        </div>
      </div>
      <section className="home-about section container">
        <Reveal className="about-photo-stack">
          <div className="about-image-wrap">
            <Portrait
              name="saniya-campus"
              alt="Saniya studying dentistry with books and notes"
            />
          </div>
          <div className="photo-caption">
            <span>01 / A LITTLE ABOUT ME</span>
            <span>More than a white coat.</span>
          </div>
          <div className="small-note">
            <HeartHandshake size={25} />
            <span>
              People first.
              <br />
              Always.
            </span>
          </div>
        </Reveal>
        <Reveal className="home-about-copy">
          <Eyebrow>THE PERSON BEHIND THE PURPOSE</Eyebrow>
          <h2>
            Learning the science.
            <br />
            <em>Keeping the heart.</em>
          </h2>
          <p>
            I’m a final-year Bachelor of Dental Surgery student at GITAM,
            Visakhapatnam, discovering how knowledge, careful observation, and a
            little kindness can come together in dentistry.
          </p>
          <p>
            With a growing interest in oral oncology, I’m building my clinical
            foundation today for a future dedicated to meaningful patient care.
          </p>
          <TextLink to="/about">A little more about me</TextLink>
        </Reveal>
      </section>
      <section className="home-clinical section">
        <div className="container">
          <Reveal className="section-heading">
            <div>
              <Eyebrow>LEARNING THROUGH EXPERIENCE</Eyebrow>
              <h2>
                Small steps.
                <br />
                <em>A growing clinical world.</em>
              </h2>
            </div>
            <div>
              <p>
                Every subject, every observation, and every patient interaction
                adds something to the journey.
              </p>
              <TextLink to="/clinical">Explore all 16 areas</TextLink>
            </div>
          </Reveal>
          <div className="clinical-preview">
            {clinicalAreas.slice(0, 4).map((area, i) => (
              <Reveal key={area.title} delay={i * 0.06}>
                <ClinicalCard area={area} index={i} />
              </Reveal>
            ))}
          </div>
          <p className="supervision-note">
            <GraduationCap size={16} /> Clinical training & areas of exposure ·
            Learning under supervision
          </p>
        </div>
      </section>
      <section className="focus-feature section container">
        <Reveal className="focus-feature-inner">
          <div className="focus-feature-copy">
            <Eyebrow light>MY FUTURE FOCUS</Eyebrow>
            <h2>
              A bigger purpose.
              <br />
              <em>Beyond the smile.</em>
            </h2>
            <p>
              Oral oncology is where my curiosity meets my ambition. I aspire to
              deepen my understanding of early detection, prevention, and
              compassionate care.
            </p>
            <ButtonLink className="button-light" to="/focus">
              Discover my future focus
            </ButtonLink>
          </div>
          <div className="focus-art" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />
            <div className="focus-art-center">
              <Ribbon strokeWidth={1} size={90} />
            </div>
            <span className="art-label art-label-one">AWARENESS</span>
            <span className="art-label art-label-two">EMPATHY</span>
            <span className="art-label art-label-three">EARLY DETECTION</span>
            <span className="orbit-dot" />
          </div>
          <span className="focus-bottom-label">
            A LONG-TERM ASPIRATION. A DAILY MOTIVATION.
          </span>
        </Reveal>
      </section>
      <section className="home-gallery section container">
        <Reveal className="section-heading">
          <div>
            <Eyebrow>LITTLE MOMENTS, MEANINGFUL LESSONS</Eyebrow>
            <h2>
              Life in <em>the learning.</em>
            </h2>
          </div>
          <TextLink to="/gallery">View the gallery</TextLink>
        </Reveal>
        <div className="gallery-preview">
          {[gallery[0], gallery[2], gallery[4]].map((item, i) => (
            <Reveal key={item.image} delay={i * 0.08}>
              <Link to="/gallery" className="gallery-preview-card">
                <div className="gallery-image-wrap">
                  <img
                    className={item.letterbox ? "letterboxed" : ""}
                    src={`/images/${item.image}.webp`}
                    alt={item.alt}
                    loading="lazy"
                    width="570"
                    height="760"
                  />
                  <span className="gallery-arrow">
                    <ArrowUpRight size={22} />
                  </span>
                </div>
                <span className="gallery-category">{item.category}</span>
                <h3>{item.title}</h3>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <ConnectBand />
    </Page>
  );
}

function About() {
  const [activeSkill, setActiveSkill] = useState("Clinical");
  return (
    <Page>
      <PageIntro
        label="THE PERSON & THE PURPOSE"
        title="A little about"
        italic="Saniya."
        description="An evolving journey in dentistry, guided by curiosity, compassion, and a commitment to keep learning."
      />
      <section className="about-story container">
        <Reveal className="about-story-image">
          <Portrait
            name="saniya-study"
            eager
            alt="Saniya in a white coat studying at her desk"
          />
          <div className="image-footnote">
            <span>MOHAMED SANIYA AFREEN</span>
            <span>Student. Learner. Future changemaker.</span>
          </div>
        </Reveal>
        <Reveal className="about-story-copy">
          <Eyebrow>HELLO, I’M SANIYA</Eyebrow>
          <h2>
            A work in progress.
            <br />
            <em>With purpose.</em>
          </h2>
          <p>
            I’m Mohamed Saniya Afreen, a passionate final-year Bachelor of
            Dental Surgery student at GITAM, Visakhapatnam, with a growing
            interest in oral oncology and comprehensive patient care.
          </p>
          <p>
            I’m developing clinical knowledge and practical skills across
            multiple areas of dentistry, with a long-term goal of specializing
            in the diagnosis, prevention, and management of oral cancers.
          </p>
          <blockquote>
            “Learn. Diagnose. Care.
            <br />
            <em>Make a Difference.</em>”
          </blockquote>
          <p>
            Dentistry is not only about treating dental conditions—it is also
            about prevention, awareness, early diagnosis, and helping patients
            maintain better overall oral health. I aim to combine clinical
            knowledge with empathy and continuous learning throughout my
            professional journey.
          </p>
          <div className="signature">
            Saniya Afreen <Heart size={22} strokeWidth={1.3} />
          </div>
        </Reveal>
      </section>
      <section className="education-section section">
        <div className="container education-layout">
          <Reveal>
            <Eyebrow>THE BUILDING BLOCKS</Eyebrow>
            <h2>
              Every chapter
              <br />
              <em>shapes the next.</em>
            </h2>
            <p>
              My educational journey, from the foundations of science to the
              everyday discovery of dentistry.
            </p>
            <GraduationCap
              className="education-art"
              size={90}
              strokeWidth={0.8}
            />
          </Reveal>
          <div className="timeline">
            <Reveal className="timeline-item">
              <span className="timeline-dot" />
              <div className="timeline-date">
                2023 — 2028{" "}
                <span className="mini-pill">CURRENTLY PURSUING</span>
              </div>
              <h3>GITAM</h3>
              <p className="timeline-degree">
                Bachelor of Dental Surgery (BDS)
              </p>
              <p>Visakhapatnam · Final Year</p>
            </Reveal>
            <Reveal className="timeline-item">
              <span className="timeline-dot" />
              <div className="timeline-date">2020 — 2022</div>
              <h3>Aakash Institute</h3>
              <p className="timeline-degree">Intermediate — BiPC</p>
              <p>Gajuwaka</p>
            </Reveal>
            <Reveal className="timeline-item">
              <span className="timeline-dot" />
              <div className="timeline-date">WHERE IT ALL BEGAN</div>
              <h3>Siva Sivani Public School</h3>
              <p className="timeline-degree">School Education</p>
              <p>Ukkunagaram, Visakhapatnam</p>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="skills-section section container">
        <Reveal className="section-heading">
          <div>
            <Eyebrow>TOOLS FOR THE JOURNEY</Eyebrow>
            <h2>
              Building knowledge.
              <br />
              <em>Developing confidence.</em>
            </h2>
          </div>
          <p>
            A foundation that grows through clinical exposure, academic study,
            and learning alongside others.
          </p>
        </Reveal>
        <div className="skills-layout">
          <div
            className="skill-tabs"
            role="tablist"
            aria-label="Skill categories"
            aria-orientation="vertical"
          >
            {Object.keys(skills).map((category, i) => (
              <button
                key={category}
                id={`tab-${category}`}
                role="tab"
                aria-selected={activeSkill === category}
                aria-controls={`panel-${category}`}
                tabIndex={activeSkill === category ? 0 : -1}
                onKeyDown={(e) => {
                  const keys = Object.keys(skills);
                  let next;
                  if (e.key === "ArrowDown" || e.key === "ArrowRight")
                    next = (i + 1) % keys.length;
                  if (e.key === "ArrowUp" || e.key === "ArrowLeft")
                    next = (i + keys.length - 1) % keys.length;
                  if (e.key === "Home") next = 0;
                  if (e.key === "End") next = keys.length - 1;
                  if (next !== undefined) {
                    e.preventDefault();
                    setActiveSkill(keys[next]);
                    document.getElementById(`tab-${keys[next]}`).focus();
                  }
                }}
                onClick={() => setActiveSkill(category)}
              >
                <span>0{i + 1}</span>
                {category}
                <ArrowUpRight size={22} />
              </button>
            ))}
          </div>
          <div
            key={activeSkill}
            className="skill-panel"
            role="tabpanel"
            id={`panel-${activeSkill}`}
            aria-labelledby={`tab-${activeSkill}`}
            tabIndex={0}
          >
            <span className="eyebrow">{activeSkill.toUpperCase()} SKILLS</span>
            <div className="skill-list">
              {skills[activeSkill].map((skill) => (
                <div key={skill}>
                  <Check size={17} />
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="interests-section container">
        <Eyebrow>WHAT SPARKS MY CURIOSITY</Eyebrow>
        <h2>
          So much <em>to explore.</em>
        </h2>
        <div className="interest-chips">
          {interests.map(([Icon, title]) => (
            <span key={title}>
              <Icon size={18} />
              {title}
            </span>
          ))}
        </div>
      </section>
      <ConnectBand />
    </Page>
  );
}

function Clinical() {
  const [category, setCategory] = useState("All areas");
  const [query, setQuery] = useState("");
  const filtered = clinicalAreas.filter(
    (area) =>
      (category === "All areas" || area.category === category) &&
      `${area.title} ${area.summary} ${area.detail}`
        .toLowerCase()
        .includes(query.toLowerCase().trim()),
  );
  return (
    <Page>
      <PageIntro
        label="MY CLINICAL JOURNEY"
        title="Learning by doing."
        italic="Growing by caring."
        description="Clinical Training & Areas of Exposure — a window into the subjects, skills, and supervised experiences shaping my foundation in dentistry."
      />
      <section className="container clinical-page-section">
        <Reveal className="clinical-intro-note">
          <GraduationCap size={27} strokeWidth={1.5} />
          <div>
            <strong>
              A student’s journey, one learning experience at a time.
            </strong>
            <p>
              These areas reflect my BDS academic and clinical exposure.
              Practical skills are developed under supervision as part of my
              training at GITAM.
            </p>
          </div>
        </Reveal>
        <div className="clinical-controls">
          <div className="filter-pills" aria-label="Filter clinical areas">
            {["All areas", "Diagnosis", "Clinical practice", "Prevention"].map(
              (c) => (
                <button
                  key={c}
                  aria-pressed={category === c}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ),
            )}
          </div>
          <label className="search-box">
            <Search size={18} />
            <span className="sr-only">Search clinical areas</span>
            <input
              type="search"
              placeholder="Find an area…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
        <p className="result-count" role="status">
          {filtered.length} {filtered.length === 1 ? "area" : "areas"} to
          explore
        </p>
        <div className="clinical-grid">
          {filtered.map((area) => (
            <ClinicalCard
              key={area.title}
              area={area}
              index={clinicalAreas.indexOf(area)}
            />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="empty-state">
            <Search size={32} />
            <h3>No areas found</h3>
            <p>Try another word or explore all clinical areas.</p>
            <button
              className="button button-secondary"
              onClick={() => {
                setCategory("All areas");
                setQuery("");
              }}
            >
              Show all areas <ArrowRight size={18} />
            </button>
          </div>
        )}
      </section>
      <section className="clinical-principles section container">
        <Eyebrow>HOW I HOPE TO GROW</Eyebrow>
        <h2>
          Knowledge, with <em>a human touch.</em>
        </h2>
        <div className="principle-grid">
          {[
            [
              BookOpen,
              "Learn thoughtfully",
              "Connect the foundations of dentistry with everyday clinical observations.",
            ],
            [
              MessageCircle,
              "Listen with empathy",
              "Make communication and patient understanding part of every learning experience.",
            ],
            [
              HeartHandshake,
              "Care responsibly",
              "Develop practical skills with guidance, attention, and respect for every patient.",
            ],
          ].map(([Icon, title, text]) => (
            <Reveal key={title} className="principle">
              <Icon size={30} strokeWidth={1.3} />
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <ConnectBand />
    </Page>
  );
}

function Focus() {
  return (
    <Page className="focus-page">
      <PageIntro
        label="FUTURE FOCUS: ORAL ONCOLOGY"
        title="A purpose that goes"
        italic="beyond the smile."
        description="An aspiration to bring together early detection, deeper understanding, and compassionate care."
      />
      <section className="focus-story container">
        <Reveal className="focus-portrait">
          <Portrait
            name="saniya-portrait"
            eager
            alt="Portrait of Mohamed Saniya Afreen in a white coat"
          />
          <div className="focus-portrait-label">
            <Ribbon size={27} />
            <span>
              Aspiring
              <br />
              <strong>Oral Oncologist</strong>
            </span>
          </div>
        </Reveal>
        <Reveal className="focus-story-copy">
          <Eyebrow>WHERE CURIOSITY MEETS PURPOSE</Eyebrow>
          <h2>
            A field to understand.
            <br />
            <em>A future to work toward.</em>
          </h2>
          <p>
            I’m particularly interested in oral oncology, with an ambition to
            pursue advanced specialization in the field.
          </p>
          <p>
            My interest lies in understanding the early detection, diagnosis,
            prevention, and multidisciplinary management of oral cancers, while
            contributing toward greater awareness of oral health and cancer
            prevention.
          </p>
          <p className="focus-statement">
            For me, this is a long-term goal that gives meaning to what I’m
            learning today.
          </p>
          <div className="aspiration-note">
            <Sparkles size={19} />
            <span>
              A future aspiration, grounded in a growing BDS foundation.
            </span>
          </div>
        </Reveal>
      </section>
      <section className="focus-pillars section">
        <div className="container">
          <Eyebrow light>THE QUESTIONS THAT KEEP ME CURIOUS</Eyebrow>
          <h2>
            Four directions.
            <br />
            <em>One meaningful ambition.</em>
          </h2>
          <div className="focus-pillar-grid">
            {[
              [
                Search,
                "01",
                "Early detection",
                "Developing an interest in careful observation and the role of early diagnosis in oral oncology.",
              ],
              [
                ShieldCheck,
                "02",
                "Prevention & awareness",
                "Exploring how patient education and oral health awareness can contribute to prevention.",
              ],
              [
                Dna,
                "03",
                "Understanding the science",
                "Building a foundation in oral pathology, cancer biology, and dental research.",
              ],
              [
                Users,
                "04",
                "Care that connects",
                "Learning about multidisciplinary care and the importance of empathy throughout the patient journey.",
              ],
            ].map(([Icon, num, title, description]) => (
              <Reveal className="focus-pillar" key={num}>
                <div>
                  <Icon size={29} strokeWidth={1.3} />
                  <span>{num}</span>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="focus-quote section container">
        <span className="quote-mark" aria-hidden="true">
          “
        </span>
        <h2>
          Learn. Diagnose. Care.
          <br />
          <em>Make a Difference.</em>
        </h2>
        <p>The intention I carry into my journey in dentistry.</p>
        <span className="signature">Saniya Afreen</span>
      </section>
      <ConnectBand />
    </Page>
  );
}

function Gallery() {
  const [category, setCategory] = useState("All moments");
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  const items = gallery.filter(
    (item) => category === "All moments" || item.category === category,
  );
  const item = selected === null ? null : items[selected];
  useEffect(() => {
    if (item) {
      dialog.current?.showModal();
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }
  }, [item]);
  function close() {
    dialog.current?.close();
    setSelected(null);
  }
  function move(direction) {
    setSelected((value) => (value + direction + items.length) % items.length);
  }
  return (
    <Page>
      <PageIntro
        label="A VISUAL DIARY"
        title="Little moments."
        italic="Lasting lessons."
        description="Glimpses of the learning, practice, and human connections that make this journey meaningful."
      />
      <section className="gallery-page-section container">
        <div className="gallery-toolbar">
          <div className="filter-pills" aria-label="Filter gallery">
            {[
              "All moments",
              "Clinical learning",
              "Patient care",
              "Learning records",
            ].map((c) => (
              <button
                key={c}
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <span className="gallery-count" role="status">
            <Camera size={17} /> {items.length} moments
          </span>
        </div>
        <div className="gallery-grid">
          {items.map((item, i) => (
            <Reveal
              key={item.image}
              className="gallery-card"
              delay={(i % 3) * 0.04}
            >
              <button
                onClick={() => setSelected(i)}
                className="gallery-photo-button"
                aria-label={`View photo: ${item.title}`}
              >
                <div
                  className={`gallery-image-wrap ${item.image === "restoration-learning" ? "record-image" : ""}`}
                >
                  <img
                    className={item.letterbox ? "letterboxed" : ""}
                    src={`/images/${item.image}.webp`}
                    alt={item.alt}
                    loading={i < 3 ? "eager" : "lazy"}
                    width="570"
                    height="760"
                  />
                  <span className="gallery-arrow">
                    <Expand size={20} />
                  </span>
                </div>
              </button>
              <span className="gallery-category">{item.category}</span>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </Reveal>
          ))}
        </div>
        <p className="supervision-note">
          <GraduationCap size={16} /> Moments from BDS clinical training and
          supervised learning.
        </p>
      </section>
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label="Clinical activity photo viewer"
        onClose={() => setSelected(null)}
        onClick={(e) => {
          if (e.currentTarget === e.target) close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            move(-1);
          }
          if (e.key === "ArrowRight") {
            e.preventDefault();
            move(1);
          }
        }}
      >
        {item && (
          <div className="lightbox-panel">
            <div className="lightbox-top">
              <span>
                {String(selected + 1).padStart(2, "0")} /{" "}
                {String(items.length).padStart(2, "0")}
              </span>
              <button
                className="icon-button"
                onClick={close}
                aria-label="Close photo viewer"
                autoFocus
              >
                <X />
              </button>
            </div>
            <div className="lightbox-photo">
              <img src={`/images/${item.image}.webp`} alt={item.alt} />
              <button
                className="lightbox-prev icon-button"
                aria-label="Previous photo"
                onClick={() => move(-1)}
              >
                <ChevronLeft />
              </button>
              <button
                className="lightbox-next icon-button"
                aria-label="Next photo"
                onClick={() => move(1)}
              >
                <ChevronRight />
              </button>
            </div>
            <div className="lightbox-caption" aria-live="polite">
              <span className="gallery-category">{item.category}</span>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          </div>
        )}
      </dialog>
      <ConnectBand />
    </Page>
  );
}

function Contact() {
  const [prepared, setPrepared] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  function compose(e) {
    e.preventDefault();
    const values = new FormData(e.currentTarget);
    const subject = `${values.get("topic")} — ${values.get("name")}`;
    const body = `Hi Saniya,\n\n${values.get("message")}\n\nBest,\n${values.get("name")}\n${values.get("email")}`;
    window.location.href = `mailto:saniyaafreen@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setPrepared(true);
  }
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("saniyaafreen@gmail.com");
      setCopied(true);
      setCopyFailed(false);
    } catch {
      setCopyFailed(true);
    }
  }
  return (
    <Page>
      <PageIntro
        label="LET’S CONNECT"
        title="Good things start"
        italic="with a hello."
        description="A shared interest, a learning opportunity, or a thoughtful conversation. I’d love to hear from you."
      />
      <section className="contact-layout container">
        <Reveal className="contact-details">
          <div className="contact-person">
            <Portrait
              name="saniya-professional"
              eager
              alt="Professional portrait of Saniya Afreen"
              sizes="100px"
            />
            <div>
              <h2>Mohamed Saniya Afreen</h2>
              <p>BDS Final-Year Student</p>
              <span>GITAM, Visakhapatnam</span>
            </div>
          </div>
          <div className="contact-method">
            <span className="contact-method-icon">
              <Mail size={23} strokeWidth={1.5} />
            </span>
            <div>
              <span className="eyebrow">DROP ME A LINE</span>
              <a href="mailto:saniyaafreen@gmail.com">
                saniyaafreen@gmail.com <ArrowUpRight size={17} />
              </a>
              <button className="copy-email" onClick={copyEmail}>
                {copied ? (
                  <>
                    <Check size={13} /> Email copied
                  </>
                ) : (
                  <>
                    <ClipboardList size={13} /> Copy email address
                  </>
                )}
              </button>
              {copyFailed && (
                <span role="status" className="copy-fallback">
                  You can select and copy the email address above.
                </span>
              )}
            </div>
          </div>
          <div className="contact-method">
            <span className="contact-method-icon">
              <Phone size={23} strokeWidth={1.5} />
            </span>
            <div>
              <span className="eyebrow">LET’S TALK</span>
              <a href="tel:+917680042627">
                +91 76800 42627 <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
          <div className="contact-method">
            <span className="contact-method-icon">
              <MapPin size={23} strokeWidth={1.5} />
            </span>
            <div>
              <span className="eyebrow">WHERE I’M ROOTED</span>
              <p>Visakhapatnam, Andhra Pradesh</p>
              <span>India</span>
            </div>
          </div>
          <div className="contact-aside">
            <Heart size={20} />
            <p>
              Open to meaningful conversations around dentistry, oral oncology,
              research, and learning opportunities.
            </p>
          </div>
        </Reveal>
        <Reveal className="contact-form-wrap">
          <div className="form-heading">
            <span className="eyebrow">A NOTE TO SANIYA</span>
            <Sparkles size={23} strokeWidth={1.3} />
          </div>
          <h2>
            What’s on <em>your mind?</em>
          </h2>
          <form onSubmit={compose}>
            <div className="form-row">
              <label>
                Your name
                <input
                  name="name"
                  autoComplete="name"
                  placeholder="What should I call you?"
                  required
                  maxLength={100}
                />
              </label>
              <label>
                Email address
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  maxLength={200}
                />
              </label>
            </div>
            <label>
              Let’s talk about
              <select name="topic" defaultValue="Learning & collaboration">
                <option>Learning & collaboration</option>
                <option>Research opportunities</option>
                <option>Oral oncology interests</option>
                <option>A general hello</option>
              </select>
            </label>
            <label>
              Your message
              <textarea
                name="message"
                rows={5}
                placeholder="A little about you and what you have in mind…"
                required
                minLength={10}
                maxLength={3000}
              />
            </label>
            <button type="submit" className="button button-primary">
              Let’s start a conversation <Send size={17} />
            </button>
            <p className="form-note">
              This opens a draft in your email app, ready for you to review and
              send.
            </p>
            {prepared && (
              <div role="status" className="form-success">
                <Mail size={20} />
                <p>
                  Your email draft is ready to open. If your email app didn’t
                  launch, write directly to{" "}
                  <a href="mailto:saniyaafreen@gmail.com">
                    saniyaafreen@gmail.com
                  </a>
                  .
                </p>
              </div>
            )}
          </form>
        </Reveal>
      </section>
      <div className="contact-signoff container">
        <Tooth size={30} />
        <span>
          Learning with purpose. <em>Connecting with heart.</em>
        </span>
      </div>
    </Page>
  );
}

function NotFound() {
  return (
    <Page>
      <section className="not-found container">
        <span className="eyebrow">404 · A LITTLE DETOUR</span>
        <h1>
          Let’s find your
          <br />
          <em>way back.</em>
        </h1>
        <p>
          This page isn’t part of the journey, but there’s plenty to explore.
        </p>
        <ButtonLink to="/">Back to home</ButtonLink>
      </section>
    </Page>
  );
}

export default function App() {
  const location = useLocation();
  return (
    <>
      <Header />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/clinical" element={<Clinical />} />
          <Route path="/focus" element={<Focus />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}
