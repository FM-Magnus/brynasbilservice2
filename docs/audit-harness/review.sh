#!/usr/bin/env bash
# One-command review of the cheap agent's work (read-only: it changes nothing in the repo).
# Usage: docs/audit-harness/review.sh [base] [--pw "spec-name another-spec"]
#   base defaults to checkpoint/stage-1-ready. Compares base..working tree (commits + uncommitted).
# FAIL lines are rule breaks (exit 1). WARN lines need a human look (token/px, visible text).
# Never trust the agent's own report: this reads the raw diff. Checklist in docs/CHEAP_AGENT_STAGE.md.
set -uo pipefail
cd "$(git rev-parse --show-toplevel)"
. .githooks/frozen-lib.sh
base="checkpoint/stage-1-ready"; pw=""
while [ $# -gt 0 ]; do case "$1" in --pw) pw="$2"; shift 2 ;; *) base="$1"; shift ;; esac; done
fail=0; F() { echo "FAIL: $*"; fail=1; }; W() { echo "WARN: $*"; }

echo "== files changed since $base"
files=$({ git diff --name-only "$base"; git ls-files --others --exclude-standard; } | sort -u)
[ -z "$files" ] && { echo "(none: if the agent claimed an edit, it did not happen)"; exit 0; }
git diff --stat "$base" | tail -25
echo "$files" | grep -v '^client/src\|^docs/\|^\.agents' | sed 's/^/outside client\/src and docs: /'

echo; echo "== frozen files"
while IFS= read -r f; do is_frozen "$f" && F "frozen file changed: $f"; done <<< "$files"

echo; echo "== deletions, renames, new global CSS, dependencies, tests"
git diff --name-status "$base" | awk '$1 ~ /^(D|R)/ {print}' | grep 'client/src/' | sed 's/^/FAIL: delete or rename: /' && fail=1
echo "$files" | grep -E '^client/src/styles/[^/]+\.css$' | while read -r f; do git cat-file -e "$base:$f" 2>/dev/null || echo "FAIL: new global stylesheet: $f"; done | grep -q FAIL && { echo "FAIL: new global stylesheet"; fail=1; }
git diff "$base" -U0 -- client/package.json client/package-lock.json | grep -q '^[+-]' && F "package.json or lockfile changed"
added=$(git diff "$base" -U0 -- 'client/src/*.tsx' 'client/src/*.ts' 'client/src/*.css' ':!client/src/assets' ':!client/src/pages/admin' ':!client/src/components/admin' | grep '^+' | grep -v '^+++')
echo "$added" | grep -nE '\.(skip|only)\(' | head -3 | sed 's/^/FAIL: test skip\/only: /' | grep -q . && { echo "FAIL: .skip/.only added"; fail=1; }

echo; echo "== code rules on added lines"
chk() { local label="$1" re="$2" hits; hits=$(echo "$added" | grep -E "$re" | head -8); [ -n "$hits" ] && { F "$label"; echo "$hits" | sed 's/^/    /'; }; }
chk 'inline style=' 'style=\{|style="'
chk '<a href to an internal route (use <Link>)' '<a [^>]*href="/'
chk 'React 19 API' 'useActionState|useFormStatus|useOptimistic|<form [^>]*action=\{'
chk 'Tailwind v4 syntax' '@theme|@tailwindcss/vite|@import "tailwindcss"'
chk 'Tailwind utility classes in public TSX' 'className="[^"]*\b(flex|grid|items-center|justify-between|p-[0-9]|px-[0-9]|py-[0-9]|m-[0-9]|mx-[0-9]|my-[0-9]|text-[a-z]+-[0-9]|bg-[a-z]+-[0-9])\b'
hex=$(echo "$added" | grep -E '#[0-9a-fA-F]{3,8}\b' | grep -viE '#(000|fff|ffffff|000000)\b' | head -12); [ -n "$hex" ] && { W "hard-coded colours (use a --bb-* token if one fits)"; echo "$hex" | sed 's/^/    /'; }
px=$(echo "$added" | grep -E '^\+[^/]*[:(] *-?[0-9.]+px' | head -12); [ -n "$px" ] && { W "raw px values (check no token covers them; page islands use px legitimately)"; echo "$px" | sed 's/^/    /'; }

echo; echo "== Swedish copy: changed visible text in TSX (must match what the prompt asked for)"
git diff "$base" -U0 -- 'client/src/*.tsx' ':!client/src/pages/admin' | grep -E '^[+-]' | grep -vE '^(\+\+\+|---)' | grep -E '>[^<{}]*[A-Za-zÅÄÖåäö]{3,}[^<{}]*<|[åäöÅÄÖ]|^[+-] *[A-ZÅÄÖ][a-zåäö ,.\-–!?]{12,}$' | head -20 | sed 's/^/WARN: /'

echo; echo "== checks"
npm --prefix client run typecheck >/tmp/review-tc.log 2>&1 && echo "typecheck: clean" || { F "typecheck"; tail -8 /tmp/review-tc.log; }
npm --prefix client run check:css >/tmp/review-css.log 2>&1 && echo "check:css: clean" || { F "check:css"; tail -8 /tmp/review-css.log; }
if [ -n "$pw" ]; then
  (cd client && npx playwright test -c ../docs/audit-harness/pw.config.ts $pw 2>&1 | tail -6) || fail=1
else
  echo "playwright: skipped (pass --pw \"spec-name ...\" for the touched pages; screenshots at 1440/768/390 are still a human step)"
fi
echo; [ "$fail" = 0 ] && echo "REVIEW: no rule breaks found (read the WARN lines above)" || echo "REVIEW: FAIL (see lines above)"
exit "$fail"
