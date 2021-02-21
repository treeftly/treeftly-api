#!/usr/bin/env bash
# This script initializes database for Kong and Treeftly API
set -e 

TREEFTLY_DATABASE="treeftly"
TREEFTLY_USERNAME="treeftly_user"
TREEFTLY_PASSWORD="treeftly_password"

echo "Creating user for Treeftly..."
export PGPASSWORD=$TREEFTLY_PASSWORD
createuser -wdr $TREEFTLY_USERNAME
echo "Creating database for Treeftly..."
createdb -U $TREEFTLY_USERNAME -w $TREEFTLY_DATABASE
echo "Successfully created Treeftly database with following connection:"
echo "DATABASE NAME: ${TREEFTLY_DATABASE}"
echo "DATABASE USER: ${TREEFTLY_USERNAME}"
echo "DATABASE PASSWORD: ${TREEFTLY_PASSWORD}"

echo "Creating Treeftly test database..."
createdb -U $TREEFTLY_USERNAME -w treeftly_test
echo "Successfully created Treeftly test database database with following connection:"
echo "DATABASE NAME: treeftly_test"
echo "DATABASE USER: ${TREEFTLY_USERNAME}"
