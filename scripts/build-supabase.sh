#!/usr/bin/env bash
# Rebuild the self-hosted supabase-js bundle used by /reset-password.
#
# The reset-password page must load supabase-js from our own origin (never a
# CDN), as a single self-contained browser ESM module. esbuild bundles the npm
# package into one file with no external imports. Re-run this after bumping
# @supabase/supabase-js.
set -euo pipefail
cd "$(dirname "$0")/.."

npx --no-install esbuild node_modules/@supabase/supabase-js/dist/index.mjs \
  --bundle --format=esm --platform=browser --target=es2020 --minify \
  --outfile=public/vendor/supabase.js

echo "Wrote public/vendor/supabase.js"
