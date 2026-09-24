import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";

const TransitionContext = createContext({ phase: "idle", isNavigating: false });
export const usePageTransition = () => useContext(TransitionContext);

const chapters = {
  "/": {
    number: "01",
    title: "A caring heart",
    note: "Where the journey begins",
  },
  "/about": {
    number: "02",
    title: "Meet Saniya",
    note: "The person behind the purpose",
  },
  "/clinical": {
    number: "03",
    title: "Learning to care",
    note: "A growing clinical journey",
  },
  "/focus": {
    number: "04",
    title: "Beyond the smile",
    note: "A future in oral oncology",
  },
  "/gallery": {
    number: "05",
    title: "Little moments",
    note: "A visual diary of learning",
  },
  "/contact": {
    number: "06",
    title: "A new connection",
    note: "Good things start with hello",
  },
};

const timing = { cover: 1000, hold: 450, reveal: 1150 };
const ease = [0.76, 0, 0.24, 1];

function ChapterCurtain({ phase, chapter, direction, cycle }) {
  const opening = phase === "reveal";
  return (
    <div
      className="chapter-transition"
      data-phase={phase}
      data-direction={direction === 1 ? "forward" : "backward"}
      aria-hidden="true"
      key={cycle}
    >
      {["lavender", "apricot", "midnight"].map((color, index) => (
        <motion.div
          key={color}
          className={`chapter-curtain chapter-curtain-${color}`}
          initial={{ y: `${direction * 106}%` }}
          animate={{ y: opening ? `${direction * -106}%` : "0%" }}
          transition={{
            duration: opening ? 0.94 : 0.82,
            delay: opening ? (2 - index) * 0.075 : index * 0.07,
            ease,
          }}
        />
      ))}
      <motion.div
        className="chapter-identity"
        initial={{ opacity: 0, y: direction * 28 }}
        animate={{ opacity: opening ? 0 : 1, y: opening ? direction * -40 : 0 }}
        transition={{
          duration: opening ? 0.45 : 0.65,
          delay: opening ? 0 : 0.56,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="chapter-emblem">
          <motion.span
            className="chapter-orbit chapter-orbit-outer"
            initial={{ rotate: -35, scale: 0.85 }}
            animate={{ rotate: 35, scale: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          >
            <span />
          </motion.span>
          <motion.span
            className="chapter-orbit chapter-orbit-inner"
            initial={{ rotate: 45 }}
            animate={{ rotate: -45 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
          <svg viewBox="0 0 80 80" fill="none" className="chapter-tooth">
            <motion.path
              d="M40 22C30 14 14 20 16 34c2 14 6 34 14 34 6 0 2-22 10-22s4 22 10 22c8 0 12-20 14-34 2-14-14-20-24-12Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.45, ease: "easeInOut" }}
            />
            <motion.path
              d="M30 22c4 4 8 6 14 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.55, delay: 0.85 }}
            />
          </svg>
          <span className="chapter-spark">✳</span>
        </div>
        <div className="chapter-number">
          <span /> CHAPTER {chapter.number} <span />
        </div>
        <div className="chapter-title" key={chapter.title}>
          {chapter.title}
        </div>
        <p className="chapter-note">{chapter.note}</p>
        <div className="chapter-line">
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.75, delay: 0.5, ease: "easeInOut" }}
          />
        </div>
        <span className="chapter-signature">SANIYA AFREEN</span>
      </motion.div>
    </div>
  );
}

export default function PageTransition({ children }) {
  const location = useLocation();
  const reducedMotion = useReducedMotion();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [phase, setPhase] = useState("idle");
  const [direction, setDirection] = useState(1);
  const [cycle, setCycle] = useState(0);
  const latestLocation = useRef(location);
  const chapter = chapters[location.pathname] || {
    number: "—",
    title: "A little exploration",
    note: "Finding the next chapter",
  };
  const isNavigating =
    phase !== "idle" || location.pathname !== displayLocation.pathname;

  // Keep browser back/forward and rapid navigation pointed at the latest request.
  useEffect(() => {
    latestLocation.current = location;
  }, [location]);

  useEffect(() => {
    if (reducedMotion) {
      setDisplayLocation(location);
      setPhase("idle");
      return;
    }
    if (phase !== "idle") return;
    if (location.pathname !== displayLocation.pathname) {
      const from = Number(chapters[displayLocation.pathname]?.number || 0);
      const to = Number(chapters[location.pathname]?.number || 0);
      setDirection(to < from ? -1 : 1);
      setCycle((value) => value + 1);
      setPhase("cover");
    } else if (location !== displayLocation) {
      // Same-page links and query changes do not replay the chapter sequence.
      setDisplayLocation(location);
    }
  }, [location, displayLocation, phase, reducedMotion]);

  useEffect(() => {
    if (phase === "idle" || reducedMotion) return;
    const timer = window.setTimeout(() => {
      if (phase === "cover") setPhase("hold");
      if (phase === "hold") {
        // Swap pages only once the opaque curtain has fully covered the viewport.
        setDisplayLocation(latestLocation.current);
        setPhase("reveal");
      }
      if (phase === "reveal") setPhase("idle");
    }, timing[phase]);
    return () => window.clearTimeout(timer);
  }, [phase, reducedMotion]);

  useEffect(() => {
    if (!isNavigating || reducedMotion) return;
    const previous = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const previousGutter = document.documentElement.style.scrollbarGutter;
    const scrollbarWidth = Math.max(
      0,
      window.innerWidth -
        document.documentElement.getBoundingClientRect().width,
    );
    // Keep the content width steady while letting the curtain cover the whole
    // viewport, including the space normally occupied by a desktop scrollbar.
    document.documentElement.style.scrollbarGutter = "auto";
    if (scrollbarWidth > 0) {
      const padding =
        parseFloat(getComputedStyle(document.body).paddingRight) || 0;
      document.body.style.paddingRight = `${padding + scrollbarWidth}px`;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
      document.body.style.paddingRight = previousPadding;
      document.documentElement.style.scrollbarGutter = previousGutter;
    };
  }, [isNavigating, reducedMotion]);

  return (
    <TransitionContext.Provider value={{ phase, isNavigating }}>
      <div
        className="site-shell"
        inert={isNavigating || undefined}
        aria-busy={isNavigating}
      >
        {children(displayLocation)}
      </div>
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {isNavigating ? `Opening ${chapter.title}` : ""}
      </div>
      {phase !== "idle" && !reducedMotion && (
        <ChapterCurtain
          phase={phase}
          chapter={chapter}
          direction={direction}
          cycle={cycle}
        />
      )}
    </TransitionContext.Provider>
  );
}
