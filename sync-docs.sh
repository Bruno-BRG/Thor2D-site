#!/usr/bin/env bash
# Refresh docs/ from the Thor2D framework wiki.
set -euo pipefail
SRC="${1:-/home/fryits/Documents/ChatGPT/Thor2D}/docs/wiki"
DST="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/docs"
rm -rf "${DST}"
mkdir -p "${DST}"
cp -r "${SRC}/." "${DST}/"
echo "Synced $(find "${DST}" -name '*.md' | wc -l) pages from ${SRC}"
