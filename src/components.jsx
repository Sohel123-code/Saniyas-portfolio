import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, useReducedMotion, useScroll } from "motion/react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowUp,
  Menu,
  X,
  MapPin,
  Heart,
  Plus,
  Minus,
} from "lucide-react";
import { navigation, pageTitles } from "./data";
import { usePageTransition } from "./PageTransition";

export function Tooth({ size = 28, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M20 9C15 5 7 8 8 15c1 7 3 17 7 17 3 0 1-11 5-11s2 11 5 11c4 0 6-10 7-17 1-7-7-10-12-6Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M15 9c2 2 4 3 7 3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Brand({ light = false }) {
  return (
    <Link
      className={`brand ${light ? "brand-light" : ""}`}
      to="/"
      aria-label="Saniya Afreen — Home"
    >
      <span className="brand-mark">
        <Tooth />
      </span>
      <span>
        Saniya Afreen
        <span className="brand-caption">A JOURNEY IN DENTISTRY</span>
      </span>
    </Link>
  );
}

export function Header() {
  const location = useLocation();
  const dialog = useRef(null);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  useEffect(() => {
    dialog.current?.close();
    setOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);
  function openMenu() {
    dialog.current.showModal();
    setOpen(true);
  }
  function closeMenu() {
    dialog.current.close();
    setOpen(false);
  }
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner container">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map(([path, name]) => (
              <NavLink key={path} to={path} end={path === "/"}>
                {name}
              </NavLink>
            ))}
          </nav>
          <Link className="header-contact" to="/contact">
            Let’s connect <ArrowUpRight size={16} />
          </Link>
          <button
            className="menu-toggle icon-button"
            aria-label="Open navigation menu"
            aria-haspopup="dialog"
            aria-expanded={open}
            onClick={openMenu}
          >
            <Menu />
          </button>
        </div>
        <motion.div
          className="reading-progress"
          style={{ scaleX: scrollYProgress }}
        />
      </header>
      <dialog
        ref={dialog}
        className="mobile-menu"
        aria-label="Navigation menu"
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeMenu();
        }}
      >
        <div className="mobile-menu-top">
          <Brand />
          <button
            className="icon-button"
            aria-label="Close navigation menu"
            onClick={closeMenu}
          >
            <X />
          </button>
        </div>
        <p className="eyebrow">A LITTLE EXPLORATION</p>
        <nav aria-label="Mobile navigation">
          {[...navigation, ["/contact", "Let’s connect"]].map(
            ([path, name], i) => (
              <NavLink
                key={path}
                to={path}
                end={path === "/"}
                onClick={closeMenu}
              >
                <span className="menu-number">0{i + 1}</span>
                {name}
                <ArrowUpRight size={24} />
              </NavLink>
            ),
          )}
        </nav>
        <div className="mobile-menu-note">
          <MapPin size={15} /> Visakhapatnam, India
          <span>Learning with purpose. Caring with heart.</span>
        </div>
      </dialog>
    </>
  );
}

export function Reveal({ children, className = "", delay = 0, ...props }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: reduced ? 0 : 1.1,
        delay: reduced ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function Page({ children, className = "" }) {
  const { pathname } = useLocation();
  const reduced = useReducedMotion();
  const { phase, isNavigating } = usePageTransition();
  useEffect(() => {
    document.title = `${pageTitles[pathname] || "Page not found"} | Mohamed Saniya Afreen`;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  useEffect(() => {
    if (!isNavigating)
      document.getElementById("main")?.focus({ preventScroll: true });
  }, [pathname, isNavigating]);
  const leaving = phase === "cover" || phase === "hold";
  return (
    <motion.main
      id="main"
      tabIndex={-1}
      className={`page-motion ${className}`}
      initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 30 }}
      animate={{
        opacity: leaving && !reduced ? 0.15 : 1,
        y: leaving && !reduced ? -22 : 0,
      }}
      transition={{
        duration: reduced ? 0 : leaving ? 0.85 : 1.3,
        delay: !reduced && phase === "reveal" ? 0.2 : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.main>
  );
}

export function ButtonLink({
  children,
  to,
  secondary = false,
  className = "",
  arrow = "up",
  ...props
}) {
  return (
    <Link
      to={to}
      className={`button ${secondary ? "button-secondary" : "button-primary"} ${className}`}
      {...props}
    >
      {children}
      {arrow === "up" ? <ArrowUpRight size={18} /> : <ArrowRight size={18} />}
    </Link>
  );
}

export function TextLink({ children, to, className = "" }) {
  return (
    <Link to={to} className={`text-link ${className}`}>
      {children}
      <ArrowUpRight size={18} />
    </Link>
  );
}

export function Eyebrow({ children, light = false }) {
  return (
    <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}>
      <span />
      {children}
    </p>
  );
}

export function Portrait({
  name = "saniya-clinic",
  alt = "Mohamed Saniya Afreen in a white coat at GITAM dental college",
  className = "",
  eager = false,
  sizes = "(max-width: 700px) 90vw, 45vw",
}) {
  return (
    <img
      className={className}
      src={`/images/${name}-960.webp`}
      srcSet={`/images/${name}-480.webp 480w, /images/${name}-960.webp 960w`}
      sizes={sizes}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
      width="960"
      height={
        name === "saniya-professional" || name === "saniya-portrait"
          ? "1240"
          : "1440"
      }
    />
  );
}

export function PageIntro({ label, title, italic, description, children }) {
  return (
    <section className="page-intro container">
      <Eyebrow>{label}</Eyebrow>
      <h1>
        {title} <em>{italic}</em>
      </h1>
      {description && <p className="intro-description">{description}</p>}
      {children}
    </section>
  );
}

export function ClinicalCard({ area, index }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = area.icon;
  const id = `clinical-${index}`;
  return (
    <article className={`clinical-card ${expanded ? "is-expanded" : ""}`}>
      <div className="clinical-card-top">
        <span className="card-icon">
          <Icon size={25} strokeWidth={1.5} />
        </span>
        <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <h3>{area.title}</h3>
      <p>{area.summary}</p>
      <button
        className="card-toggle"
        aria-expanded={expanded}
        aria-controls={id}
        onClick={() => setExpanded(!expanded)}
      >
        <span>{expanded ? "A little less" : "Explore this area"}</span>
        {expanded ? <Minus size={18} /> : <Plus size={18} />}
      </button>
      <div id={id} hidden={!expanded} className="card-detail">
        <p>{area.detail}</p>
        <span>STUDENT CLINICAL EXPOSURE</span>
      </div>
    </article>
  );
}

export function ConnectBand() {
  return (
    <section className="connect-band container">
      <Reveal className="connect-band-inner">
        <div>
          <Eyebrow>GOOD CONVERSATIONS BEGIN WITH HELLO</Eyebrow>
          <h2>
            Let’s learn. Let’s connect.
            <br />
            <em>Let’s make a difference.</em>
          </h2>
        </div>
        <ButtonLink to="/contact">Say hello</ButtonLink>
        <span className="band-spark" aria-hidden="true">
          ✳
        </span>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Brand />
            <p>
              A curious mind. A caring heart.
              <br />A meaningful journey in dentistry.
            </p>
          </div>
          <div className="footer-links">
            <span className="eyebrow">EXPLORE</span>
            <Link to="/about">About Saniya</Link>
            <Link to="/clinical">Clinical journey</Link>
            <Link to="/focus">Future focus</Link>
            <Link to="/gallery">Gallery</Link>
          </div>
          <div className="footer-contact">
            <span className="eyebrow">LET’S CONNECT</span>
            <a href="mailto:saniyaafreen@gmail.com">
              saniyaafreen@gmail.com <ArrowUpRight size={15} />
            </a>
            <a href="tel:+917680042627">+91 76800 42627</a>
            <span className="footer-location">
              <MapPin size={14} /> Visakhapatnam, India
            </span>
          </div>
          <button
            className="back-top icon-button"
            aria-label="Back to top"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                  .matches
                  ? "instant"
                  : "smooth",
              })
            }
          >
            <ArrowUp size={21} />
          </button>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Mohamed Saniya Afreen</span>
          <span>
            BDS student portfolio · Clinical learning under supervision
          </span>
          <span>
            Made with purpose <Heart size={12} />
          </span>
        </div>
      </div>
    </footer>
  );
}
