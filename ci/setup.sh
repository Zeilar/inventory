#!/bin/sh

set -e

if [ ! -d .git ]; then
  echo "❌ Not inside a Git repository."
  exit 1
fi

PRE_PUSH_HOOK_SRC="ci/hooks/pre-push"
PRE_PUSH_HOOK_DEST=".git/hooks/pre-push"

if [ ! -f "$PRE_PUSH_HOOK_SRC" ]; then
  echo "❌ Hook source '$PRE_PUSH_HOOK_SRC' not found."
  exit 1
fi

echo "[CI/CD] 🔄 Installing pre-push hook..."

cp "$PRE_PUSH_HOOK_SRC" "$PRE_PUSH_HOOK_DEST"
chmod +x "$PRE_PUSH_HOOK_DEST"

echo "✅ Installed pre-push hook to $PRE_PUSH_HOOK_DEST"

