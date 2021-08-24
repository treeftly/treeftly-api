#!/usr/bin/env sh

set -e

# For Docker production use only

/app/node_modules/.bin/sequelize db:migrate && node /app/src