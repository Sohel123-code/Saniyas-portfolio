# Mohamed Saniya Afreen — Dental student portfolio

A mobile-first, six-page React portfolio with a midnight blue, lavender, and apricot palette. Readable Manrope headings, DM Sans body text, and Lora accents are served locally. Desktop navigation uses 17 px text; main body text is 16 px on phones and desktops. Built with Vite, React Router, Motion, and Lucide icons.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. The development server also provides a network URL for previewing on a phone connected to the same Wi-Fi.

## Pages

- `/` — Introduction, clinical highlights, future focus, and activity previews.
- `/about` — Personal story, education timeline, skill tabs, and interests.
- `/clinical` — All 16 clinical training areas, with search, category filters, and expandable cards.
- `/focus` — Oral oncology interests and long-term aspirations.
- `/gallery` — All six supplied activity photos, category filters, and an accessible keyboard-operated photo viewer.
- `/contact` — Email and telephone links, email copying, and a form that composes an email draft.

The contact form uses `mailto:` to open the visitor’s email application. It does not store messages or send email from a server. Visitors review and send the draft themselves.

## Content and images

- Edit clinical areas, skills, interests, and gallery captions in `src/data.js`.
- Page content is in `src/App.jsx`; shared components are in `src/components.jsx`.
- Responsive styles and animation preferences are in `src/styles.css`.
- All five supplied portraits and six clinical photographs are used. The original files remain in `photos_personal/` and `activities/`.
- Optimized WebP images are included in `public/images/`. To regenerate them from the originals, run `npm run prepare:images`.
- The education dates and final-year status reflect the supplied content.

## Production build

```sh
npm run build
npm run preview
```

Deploy the `dist/` directory to a static host. React Router requires an SPA fallback to `index.html` for direct visits to interior pages. Netlify’s `public/_redirects` and a Vercel rewrite configuration are included. No deployment or external account is required to run locally.

## Verification

Start the development server on port 5173, then run:

```sh
npm run test:e2e
```

The Playwright configuration uses an installed Google Chrome. Tests cover desktop and mobile layouts, image loading, route navigation, clinical filtering and search, skill tabs, gallery controls, contact validation, reduced motion, and WCAG AA automated checks. Small-screen checks include a 320 px viewport.

To generate desktop and phone screenshots plus an accessibility report:

```sh
node scripts/visual-qa.mjs
```

Reports are written to the ignored `test-results/` directory. The portfolio respects reduced-motion preferences and includes keyboard navigation, visible focus indicators, and a skip link.

## Page animations

Every change of page plays a 2.6-second chapter transition: bowed lavender, apricot, and midnight curtains sweep across the screen, a dental emblem draws itself inside moving orbits, and a destination-specific title appears. The next page is mounted behind the curtain and revealed with a slow, staggered entrance. Backward navigation reverses the curtain direction.

The transition controller lives in `src/PageTransition.jsx`; its `timing` object sets the cover, hold, and reveal durations. It handles browser history changes during animation, locks background interaction until the reveal completes, then restores keyboard focus. Same-page navigation does not replay the sequence. Reduced-motion preferences skip the curtain and its delay entirely.
