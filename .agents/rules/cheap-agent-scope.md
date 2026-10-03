---
trigger: always_on
description: Hard scope limits for small directed edits on the Brynäs Bilservice website (cheap-agent stage)
---

# Scope for small directed edits (read first, obey literally)

Start every reply with `SCOPE OK:` and the list of files you will edit. If you cannot, say why and stop.

## What you may touch
1. Edit ONLY the files the prompt names. Nothing else, however small or "obviously related".
2. One edit per session. Do not continue to a second task.
3. Create a new file only if the prompt names its exact path. Never delete, rename or move a file.

## Never touch (frozen; the list is `.githooks/frozen-paths.txt`)
4. `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `.githooks/`, `.claude/`, `.agents/`, `server/`.
5. Global CSS: `client/src/styles/tailwind.css`, `design-tokens.css`, `base.css`, `shared-elements.css`.
6. `client/src/main.tsx`, `client/src/data/business.ts`, `publicNavigation.ts`, `pageMeta.ts`, `structuredData.ts`, `heroImgAttrs.ts`, `client/src/components/ui/Tip.tsx`.
7. `package.json`, `package-lock.json`, `vite.config.ts`, `tsconfig*.json`, any config, anything in `client/tests/` or `client/scripts/`. Never install or upgrade a package.
If the edit needs any of these, STOP. Say "needs a frozen file: <path>" and do nothing else. Do not work around it.

## Code rules (React 18, Vite 4, Tailwind 3 only in /admin)
8. Colours and sizes come from `--bb-*` tokens. No hard-coded hex colours; no raw px where a token exists.
9. No inline `style=`. No Tailwind utility classes in public pages.
10. Internal links use React Router `<Link to="...">`, never `<a href="/...">`.
11. Reuse shared patterns (`.bb-*`, `<Tip>`, `.bb-icon-backdrop`). Never write a page-local copy of one.
12. Do not use React 19 APIs (`useActionState`, `useFormStatus`, `ref` as a prop) or Tailwind v4 syntax.
13. Swedish copy: keep every string exactly as it is. Never translate, reword or fix wording unless the prompt gives the exact new text.
14. Do not reformat, reorder imports, rename, or "clean up" anything you were not asked to change.
15. A modifier that restyles a child must out-rank the base rule: write `.x.x--variant p`.

## Commands
16. Allowed: `git status`, `git diff`, `npm --prefix client run typecheck`, `npm --prefix client run check:css`, and a Playwright spec the prompt names.
17. Forbidden: any other git command (`commit`, `push`, `pull`, `restore`, `checkout`, `reset`, `stash`, `clean`), `rm`, `chmod`, `chflags`, `npm install`, `npx` installs, starting servers you do not stop, network calls.
18. Never use `--no-verify`. Never edit a hook or a rules file.

## Reporting
19. When done, paste the output of `git diff --stat` and `git status --short` verbatim. Never say "done" or "tests pass" without it, and never claim a command ran that you did not run.
20. If a tool call fails or prints raw text such as `:call:`, say so. An edit that is not in `git diff` did not happen.
