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

cp "$PRE_PUSH_HOOK_SRC" "$PRE_PUSH_HOOK_DEST"
chmod +x "$PRE_PUSH_HOOK_DEST"

echo "✅ Installed pre-push hook to $PRE_PUSH_HOOK_DEST"

POST_MERGE_HOOK_SRC="ci/hooks/pre-push"
POST_MERGE_HOOK_DEST=".git/hooks/pre-push"

if [ ! -f "$POST_MERGE_HOOK_SRC" ]; then
  echo "❌ Hook source '$POST_MERGE_HOOK_SRC' not found."
  exit 1
fi

cp "$POST_MERGE_HOOK_SRC" "$POST_MERGE_HOOK_DEST"
chmod +x "$POST_MERGE_HOOK_DEST"

echo "✅ Installed post-merge hook to $POST_MERGE_HOOK_DEST"
