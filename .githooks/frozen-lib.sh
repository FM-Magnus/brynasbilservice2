# Sourced by protect-frozen and the frozen-* scripts. Provides is_frozen <repo-relative path>.
FROZEN_FILE="$(git rev-parse --show-toplevel)/.githooks/frozen-paths.txt"
is_frozen () {
  local p="$1" line
  while IFS= read -r line; do
    case "$line" in ''|\#*) continue ;; esac
    case "$line" in
      */) case "$p" in "$line"*) return 0 ;; esac ;;
      *)  [ "$p" = "$line" ] && return 0 ;;
    esac
  done < "$FROZEN_FILE"
  return 1
}
