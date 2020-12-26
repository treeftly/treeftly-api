# Treeftly API

This repository contains code for Treeftly's API. Tech-stack for back-end:
- ExpressJS - API
- [Kong v2.2.x](https://docs.konghq.com/2.2.x) - API Gateway
- Postgres - Database

## Prerequisites:
- [PostgreSQL](https://www.postgresql.org/download/macosx/)
- [Kong v2.2.x](https://docs.konghq.com/2.2.x)
- [decK](https://docs.konghq.com/deck/installation/)
- NodeJS

## Setup

Steps to setup your dev environment

1. `yarn` - this command installs are the needed dependencies to your local environment
2. `yarn init-db` - this command initialize your database to be used for KONG and Treeftly API
3. `yarn init-kong` - this command will run migration against Kong database and start Kong
4. `yarn start` - this command will start the API server

