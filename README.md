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

- `/` — A personal welcome and an original chapter directory, without duplicated biography, clinical cards, oncology text, or gallery previews.
- `/about` — Personal story, education timeline, skill tabs, and interests.
- `/clinical` — All 16 clinical training areas, with search, category filters, and expandable cards.
- `/focus` — Oral oncology interests and long-term aspirations.
- `/gallery` — All six supplied activity photos, with Saniya caring for her mother first, category filters, and an accessible keyboard-operated photo viewer.
- `/contact` — A large suit portrait, email and telephone links, email copying, and a form that composes an email draft to `mdsaniyaafreen@gmail.com`.

The contact form uses `mailto:` to open the visitor’s email application. It does not store messages or send email from a server. Visitors review and send the draft themselves.

## Content and images

- Edit shared biography, date of birth, education, philosophy, focus directions, and contact details in `src/profile.js`. These facts feed both the pages and the chatbot.
- Edit clinical areas, skills, interests, and gallery captions in `src/data.js`; the chatbot also receives every card summary, category, description, and gallery caption from this file.
- Page content is in `src/App.jsx`; shared components are in `src/components.jsx`.
- Responsive styles and animation preferences are in `src/styles.css`.
- The site uses supplied personal portraits and all six clinical photographs. The original files remain in `photos_personal/` and `activities/`.
- Optimized WebP images are included in `public/images/`. To regenerate them from the originals, run `npm run prepare:images`.
- The education dates and final-year status reflect the supplied content.

## Production build

```sh
npm run build
npm run preview
```

Deploy to Vercel or Netlify with the included configuration to run both the site and chatbot. Set `GROQ_API_KEY` (or the existing `API_KEY`) as a server environment variable on the host. Vercel uses `api/chat.js`; Netlify uses `netlify/functions/chat.mjs`. A static-only upload of `dist/` serves the portfolio but cannot run the chatbot API. React Router fallbacks are included. No deployment is needed to run locally.

## Saniya’s AI portfolio guide

The floating chat is available on every page, with question suggestions, follow-up context, a typing indicator, retry controls, a new-chat button, and a responsive dialog. It uses Groq’s `openai/gpt-oss-20b` by default, verified against the models available to the configured key. This is a portfolio-grounded assistant, not a fine-tuned model: `server/knowledge.js` combines the shared facts from `src/profile.js` and `src/data.js` on every request. It includes her biography, birthday (4 February 2005, supplied as DD-MM-YYYY), all education entries, 16 clinical areas with full card copy, all skills and interests, philosophy, four future-focus directions, ordered gallery captions and photo descriptions, contact details, and a guide to all six pages. Age is calculated per request using the current date in India. Updated facts take priority over older chat answers. Edit the shared content files as her story changes, then rebuild/redeploy the site and server together.

Your local `.env` may keep its existing `API_KEY` value. Alternatively, use `GROQ_API_KEY` as shown in `.env.example`; `GROQ_MODEL` is optional. Restart Vite after changing environment variables. Both `npm run dev` and `npm run preview` provide `/api/chat`. Never give the key a `VITE_` prefix: it must stay on the server.

The assistant is instructed to use supplied facts, acknowledge missing information, describe Saniya as a student, and avoid personalized medical advice. Answers are AI-generated and may contain mistakes. The site keeps conversation history only in the current tab’s React memory; closing the chat or changing pages preserves it, while New chat or reloading clears it. Up to six recent exchanges and the new question are sent to Groq with the public portfolio facts. The site does not write conversations to a database or logs; provider data handling is separate.

The API validates message roles, lengths, request origins, and body size, times out upstream calls, and returns safe errors. It limits requests to 12 per minute per client IP per running instance. For a high-traffic public deployment, add host-level rate limiting because serverless instances do not share this memory counter.

Run `npm run test:chat` for backend validation and error-handling tests. Browser chatbot tests use mocked API replies, so they do not consume provider credits. To test against a different preview port, set `PLAYWRIGHT_BASE_URL` before `npm run test:e2e`.

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
