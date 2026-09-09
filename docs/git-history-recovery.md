# Git history recovery and everyday workflow

## The simple answer

The repository to use from now on is:

`https://github.com/FM-Magnus/brynasbilservice2`

Its `main` branch contains the current, working website — including the Google Reviews section in the hero. The local checkout is configured so that normal `git pull` and `git push` use this repository and branch.

## What went wrong

At one point, the website folder was physically copied and work continued in the copy without preserving the original Git metadata or synchronising it to GitHub. That produced two independent histories:

```text
Old GitHub history                     Current working website history
FM-Magnus/brynasbilservice2            local working copy
main                                   main
e707597 (older website)                9a351ea (Google Reviews website)
          \                            /
           \-- no common commit --/     <- Git could not merge these with pull
```

This was not a normal "behind/ahead" situation. `git pull` could only retrieve the old GitHub history because it did not contain the later local work.

## What was done on 2026-09-09

1. The current local website was verified in the browser and built successfully from `client/`.
2. The old GitHub `main` was preserved without alteration at:
   `legacy/pre-live-site-2026-09-09`
3. The verified local website was first published to a safety branch:
   `recovery/live-site-2026-09-09`
4. GitHub `main` was deliberately moved to that verified website history.
5. This local checkout's `origin` remote was changed to `FM-Magnus/brynasbilservice2`, and `main` now tracks `origin/main`.

```text
FM-Magnus/brynasbilservice2
│
├── main                                  ← use this for all new website work
│   └── current Google Reviews website
│
├── recovery/live-site-2026-09-09         ← safety copy of the recovered website
│
└── legacy/pre-live-site-2026-09-09       ← preserved old GitHub history
```

Nothing was deployed to the live server during this recovery. This change only made GitHub accurately represent the current website source code.

## Daily workflow from now on

Always work from `main`:

```bash
git switch main
git pull
# make and test website changes
git add <files>
git commit -m "Describe the change"
git push
```

Use the actual frontend project, not the orphaned root scaffold:

```bash
cd client
npm run dev
npm run build
```

The development website is normally available at `http://127.0.0.1:5173/`.

## Important boundaries

- Do not use `legacy/pre-live-site-2026-09-09` for new work. It exists only as a recovery reference.
- Do not treat `FM-Johnny/brynasbilservice` as a second active source of truth. It is retained locally as the `johnny-archive` remote for reference.
- Deployment is separate from Git recovery. A deployment workflow has not been restored to `main`, so a normal push changes GitHub but does not change the live server.
- The legacy history may contain an old SSH-key path. Treat that historical key as exposed: rotate it before any future deployment work, then arrange a separate security cleanup of the public legacy history.

## Before the next production deployment

The production address is expected to change, so deployment configuration must be designed for that final address rather than copied blindly from the old repository. Magnus and Johnny should agree on the final host, public path, API routing, and server deploy directory before enabling automatic deployment.
