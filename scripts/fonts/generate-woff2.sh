#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_DIR="$SCRIPT_DIR/source"
OUTPUT_DIR="$SCRIPT_DIR/../../public/fonts"

UNICODES="U+0020-007E,U+00A0-00FF,U+0100-017F,U+0200-024F,U+2000-206F"

pip install --quiet -r "$SCRIPT_DIR/requirements.txt"

pyftsubset \
  "$SOURCE_DIR/SourceSerif4-VariableFont_opsz,wght.ttf" \
  --flavor=woff2 \
  --output-file="$OUTPUT_DIR/SourceSerif4Variable-Roman.woff2" \
  --unicodes="$UNICODES" \
  --layout-features="*"

pyftsubset \
  "$SOURCE_DIR/SourceSerif4-Italic-VariableFont_opsz,wght.ttf" \
  --flavor=woff2 \
  --output-file="$OUTPUT_DIR/SourceSerif4Variable-Italic.woff2" \
  --unicodes="$UNICODES" \
  --layout-features="*"

echo "Roman:  $(du -h "$OUTPUT_DIR/SourceSerif4Variable-Roman.woff2" | cut -f1)"
echo "Italic: $(du -h "$OUTPUT_DIR/SourceSerif4Variable-Italic.woff2" | cut -f1)"
