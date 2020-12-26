#!/usr/bin/env bash
# This script initializes database for Kong and Treeftly API
set -e 

KONG_DATABASE="kong"
KONG_USERNAME="kong_user"
KONG_PASSWORD="kong_password"
TREEFTLY_DATABASE="treeftly"
TREEFTLY_USERNAME="treeftly_user"
TREEFTLY_PASSWORD="treeftly_password"

echo "Creating KONG user..."
export PGPASSWORD=$KONG_PASSWORD
createuser -wdr $KONG_USERNAME
echo "Creating KONG database..."
createdb -U $KONG_USERNAME -w $KONG_DATABASE
echo "Successfully created KONG database with following connection:"
echo "DATABASE NAME: ${KONG_DATABASE}"
echo "DATABASE USER: ${KONG_USERNAME}"
echo "DATABASE PASSWORD: ${KONG_PASSWORD}"

echo "Creating user for Treeftly..."
export PGPASSWORD=$TREEFTLY_PASSWORD
createuser -wdr $TREEFTLY_USERNAME
echo "Creating database for Treeftly..."
createdb -U $TREEFTLY_USERNAME -w $TREEFTLY_DATABASE
echo "Successfully created Treeftly database with following connection:"
echo "DATABASE NAME: ${TREEFTLY_DATABASE}"
echo "DATABASE USER: ${TREEFTLY_USERNAME}"
echo "DATABASE PASSWORD: ${TREEFTLY_PASSWORD}"
