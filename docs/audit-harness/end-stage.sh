#!/usr/bin/env bash
# Pull the cheap-agent stage tooling back out with one command. The stage tooling is exactly the commits between
# checkpoint/pre-cheap-agent and checkpoint/stage-1-ready (guard, tools, rules, docs, the AGENTS.md pointer line);
# this reverts them as one commit and leaves everything the agent or Magnus did afterwards untouched.
# Usage: docs/audit-harness/end-stage.sh [--dry-run]
# Run it from the branch that carries the stage (cheap-agent/stage-1, or main after merging it) with a clean tree.
# If a revert conflicts (STATUS.md/LOG.md were edited since), it aborts and nothing changes: resolve by hand.
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"
dry=0; [ "${1:-}" = "--dry-run" ] && dry=1
git diff --quiet && git diff --cached --quiet || { echo "working tree not clean: commit or stash first"; exit 1; }
[ -x docs/audit-harness/freeze.sh ] && docs/audit-harness/freeze.sh off || true
commits=$(git rev-list checkpoint/pre-cheap-agent..checkpoint/stage-1-ready)
[ -n "$commits" ] || { echo "no stage commits found between the checkpoint tags"; exit 1; }
if ! git revert --no-commit $commits; then
  git revert --abort 2>/dev/null || git reset -q --hard HEAD
  echo "revert conflicted: nothing changed. Resolve by hand (see docs/CHEAP_AGENT_STAGE.md, 'Ending the stage')."
  exit 1
fi
git status --short
if [ "$dry" = 1 ]; then
  git reset -q --hard HEAD
  echo "dry run: nothing changed"
  exit 0
fi
git commit -q -m "chore: end the cheap-agent stage (revert guard, tools, rules and docs)"
echo "stage tooling removed. Still yours: Antigravity deny rules and preset, branch cleanup, the LOG entry."
