# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (Vite)
npm run build      # Production build
npm run preview    # Preview production build locally
npm run lint       # ESLint check
```

No test suite is configured.

## Architecture

React + Vite SPA with client-side routing via React Router DOM v7.

**Routing** — `src/App.jsx` is the entry point. All routes are wrapped in a `<Page>` component that applies Framer Motion enter/exit transitions. `AnimatePresence mode="wait"` drives page-level transitions.

**Routes:**
- `/` → `HomePage` (Hero + ServicesTeaser)
- `/servizi` → `Servizi`
- `/chi-siamo` → `About`
- `/contatti` → `Contact`
- `/privacy`, `/cookie`, `/accessibilita` → legal pages

**Persistent shell** (rendered outside routes in `App`): `Navbar`, `Footer`, `Cursor` (custom cursor), `ScrollProgress`, `CookieBanner`.

**Key libraries:**
- `framer-motion` — all animations, page transitions, scroll-reveal, micro-interactions
- `emailjs/browser` — contact form email sending (no backend)
- `remotion` — video/animation sequences (used in `src/remotion/`)
- `lucide-react` — icons

**Styling:** Tailwind CSS v3. Global styles in `src/index.css`.

**Context:** `src/context/ThemeContext.jsx` exists but is not wired into `App.jsx` yet.

## Role & Design Goal

World-class UI/UX designer and senior frontend engineer. Inspiration: Marcelo Design X, Awwwards-level, Apple minimalism.

**Design style:** Minimal but high-end · Strong typography · Large spacing · Dark mode preferred · No template-looking UI

**UX rules:** Mobile-first · Clear hierarchy · Easy to scan · Strong hero sections

**Animations:** Framer Motion · Smooth transitions · Reveal on scroll · Parallax when useful · Cinematic feel

**3D:** Use OGL or Three.js only when it meaningfully improves the experience — keep performance high.

**Output format when building something:**
1. Explain idea briefly
2. Describe structure
3. Generate final code

The result must feel like a premium agency website, not a basic AI-generated layout.
