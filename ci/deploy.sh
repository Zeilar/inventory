#!/bin/sh

#
# Make sure to only run this after a successfull git push, and successful CI/CD.
#

echo "[CI/CD] 🔄 Copying .env to remote..."

# Assert .env exists locally.
if [ ! -f .env ]; then
  echo "[CI/CD] ❌ Local .env file not found"
  exit 1
fi

# Copy .env to the remote machine. `angelin-local` is a custom ssh agent.
scp .env angelin-local:~/inventory/.env

if [ $? -ne 0 ]; then
  echo "[CI/CD] ❌ Failed to copy .env to remote"
  exit 1
fi

echo "[CI/CD] ✅ Copied .env to remote"

echo "[CI/CD] 🔄 Connecting to remote..."

ssh angelin-local << 'EOF'
  set -e

  # Assert that inventory directory exists.
  if [ ! -d "$HOME/inventory" ]; then
    echo "[CI/CD] ❌ Directory ~/inventory does not exist. Aborting..."
    exit 1
  fi

  cd inventory

  echo "[CI/CD] 🔄 Running setup..."
  sh ci/setup.sh

  echo "[CI/CD] 🔄 Pulling latest changes..."
  git pull

  echo "[CI/CD] ✅ Pulled latest changes"

  echo "[CI/CD] 🔄 Restarting containers..."

  if ! docker compose restart; then
    echo "[CI/CD] ❌ Restart failed"
    exit 1
  fi

  echo "[CI/CD] ✅ Restarted containers"
EOF

echo "[CI/CD] ✅ Deployed. Closing..."

exit 0
