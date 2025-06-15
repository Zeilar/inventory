#!/bin/sh

set -e

if [ ! -d .git ]; then
  echo "❌ Not inside a Git repository."
  exit 1
fi

HOOK_SRC="ci/hooks/pre-push"
HOOK_DEST=".git/hooks/pre-push"

if [ ! -f "$HOOK_SRC" ]; then
  echo "❌ Hook source '$HOOK_SRC' not found."
  exit 1
fi

cp "$HOOK_SRC" "$HOOK_DEST"
chmod +x "$HOOK_DEST"

echo "✅ Installed pre-push hook to $HOOK_DEST"
