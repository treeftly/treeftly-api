#!/usr/bin/env bash
# This script bootstraps KONG and sync configuration
set -e

if ! [ -x "$(command -v kong)" ]; then
  echo 'Error: kong is not installed.' >&2
  exit 1
fi

if ! [ -x "$(command -v deck)" ]; then
  echo 'Error: deck is not installed.' >&2
  exit 1
fi

echo "Bootrapping KONG database..."
kong migrations bootstrap -c kong.conf
echo "Migration successful!"

echo "Starting Kong..."
kong start -c kong.conf
sleep 5
echo "Kong is up and running with version: $(kong version)"

echo "Syncing configuration..."
deck sync --select-tag deck-sync

echo "Kong gateway is up and in-sync!"
echo -e "\nGateway URL: http://localhost:8000"
echo "Admin URL: http://localhost:8001"
