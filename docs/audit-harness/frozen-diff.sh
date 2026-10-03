#!/usr/bin/env bash
# Reviewer helper (read-only): lists frozen files changed since <base> (default checkpoint/pre-cheap-agent),
# in commits, in the working tree and untracked. Empty list = the agent kept out of the frozen layer.
# Usage: docs/audit-harness/frozen-diff.sh [base]
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"
. .githooks/frozen-lib.sh
base="${1:-checkpoint/pre-cheap-agent}"
hits=0
while IFS= read -r f; do
  [ -z "$f" ] && continue
  if is_frozen "$f"; then echo "FROZEN CHANGED: $f"; hits=$((hits+1)); fi
done < <({ git diff --name-only "$base"..HEAD; git diff --name-only; git diff --cached --name-only; git ls-files --others --exclude-standard; } | sort -u)
echo "$hits frozen file(s) changed since $base"
[ "$hits" = 0 ]
