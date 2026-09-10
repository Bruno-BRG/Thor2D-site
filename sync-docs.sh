#!/usr/bin/env bash
# Refresh docs/ from the Thor2D framework wiki.
#
# Site-owned files are NEVER overwritten: guides/ and Main_Page.md are written
# for this site (Thor2D-native voice, no porting comparisons). Everything else
# (module pages, Api_Reference, thor2d.md) syncs verbatim.
set -euo pipefail
SRC="${1:-/home/fryits/Documents/ChatGPT/Thor2D}/docs/wiki"
DST="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/docs"
mkdir -p "${DST}"
count=0
while IFS= read -r -d '' file; do
    rel="${file#"${SRC}"/}"
    case "${rel}" in
        Main_Page.md|guides/*) continue ;;
    esac
    mkdir -p "${DST}/$(dirname "${rel}")"
    cp "${file}" "${DST}/${rel}"
    count=$((count + 1))
done < <(find "${SRC}" -name '*.md' -print0)
echo "Synced ${count} pages from ${SRC} (guides/ + Main_Page.md kept site-owned)"
