#!/usr/bin/env bash
# OS-level lock for the cheap-agent stage: sets/clears the macOS user-immutable flag (chflags uchg) on every
# tracked file listed in .githooks/frozen-paths.txt. Files only, not folders, so new files can still be created
# (the commit guard and the scope rules cover those) but a frozen file can't be edited, replaced or deleted.
# Usage: docs/audit-harness/freeze.sh on | off | status
# Turn it OFF before: switching branches, merging, `git pull`, regenerating snapshots, `npm install`, or any
# deliberate edit of a frozen file. An agent with a terminal can run `off` too, so this is a speed bump, not a wall.
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"
. .githooks/frozen-lib.sh
mode="${1:-status}"
n=0; locked=0
while IFS= read -r f; do
  is_frozen "$f" || continue
  [ -f "$f" ] || continue
  n=$((n+1))
  case "$mode" in
    on)  chflags uchg "$f" ;;
    off) chflags nouchg "$f" ;;
    status) ls -lO "$f" | grep -q uchg && locked=$((locked+1)) ;;
    *) echo "usage: $0 on|off|status"; exit 2 ;;
  esac
done < <(git ls-files)
[ "$mode" = status ] && echo "$locked of $n frozen files are locked" || echo "$mode: $n frozen files"
