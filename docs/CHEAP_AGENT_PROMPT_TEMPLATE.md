# Prompt template for the cheap agent

Copy the whole block, replace every `<…>`. One edit per session. Keep the header and footer unchanged: a new session remembers nothing, and the repeated prohibitions are what hold it in place.

```
You are making ONE small edit in a React 18 + Vite 4 website (Brynäs Bilservice). Read .agents/rules/cheap-agent-scope.md first and obey it literally. Start your reply with "SCOPE OK:" and the files you will edit.

HARD RULES (repeated on purpose)
- Edit ONLY these files: <exact path 1>, <exact path 2>. Nothing else.
- Never touch: global CSS (client/src/styles/tailwind|design-tokens|base|shared-elements.css), main.tsx, package.json or lockfile, any config, client/tests/, server/, AGENTS.md/GEMINI.md/CLAUDE.md, .githooks/, .agents/.
- No hard-coded colours or px where a --bb-* token exists. No inline style=. No Tailwind in public pages. Internal links use <Link>, not <a href>.
- Do NOT change any Swedish text. Do NOT reformat, rename, delete or tidy anything.
- No git commands except status and diff. No installs. No servers.
- If the edit needs a file outside the list above, STOP and say "needs a frozen file: <path>".

THE EDIT
<MY SPECIFIC EDIT: exact change, with the exact lines or selectors, and exact new values>

DONE WHEN
<Acceptance check: what must be visible/true, e.g. "the icon shows behind the text and nothing overflows horizontally at 1440, 768 and 390 px">

COMMANDS YOU MAY RUN
npm --prefix client run typecheck
npm --prefix client run check:css
<optional: one named Playwright spec>

REPORT (required)
Paste `git diff --stat` and `git status --short` verbatim. Never say "done" without them.
```

## Example 1: place an icon behind a section (CSS island + one class)
```
Edit ONLY: client/src/pages/landing/LandingPage.tsx and client/src/pages/landing/LandingPage.css.
1. LandingPage.tsx line 166: add the classes "bb-icon-backdrop bb-icon-backdrop--clip" to <section className="landing-v2__process-section" ...>. Change nothing else.
2. LandingPage.css, in the rule .landing-v2__process-section: add exactly these declarations:
   --bb-icon-image: url('../../assets/images/icons/pool/wrench--white.svg');
   --bb-icon-size: auto 150%; --bb-icon-x: 96%; --bb-icon-opacity: 0.12;
   --bb-icon-fade: linear-gradient(90deg, transparent 30%, #000 80%);
Do not write any other CSS for the icon. Do not edit shared-elements.css.
DONE WHEN: the wrench shows faintly behind the process section, text stays readable, no horizontal overflow at 1440/768/390.
```

## Example 2: swap one small icon for a pool icon (TSX only)
```
Edit ONLY: client/src/pages/AboutPage.tsx.
Replace <WrenchIcon /> on line <N> with <img src={wrenchTeal} alt="" aria-hidden="true" width="32" height="32" />, and add at the top with the other imports: import wrenchTeal from '../assets/images/icons/pool/wrench--teal.svg'
Remove the WrenchIcon import only if nothing else in this file uses it. Change nothing else.
DONE WHEN: typecheck is clean and the icon renders at 32 px.
```
Pool motifs and variants: `client/src/assets/images/icons/pool/MANIFEST.md`. Never use a "Needs Maher" motif on a public page.
