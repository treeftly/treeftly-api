# Treeftly API

This repository contains code for Treeftly's API. Tech-stack for back-end:
[Feathers](http://feathersjs.com)

## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
1. Initialize database
    ```
    yarn init-db
    ```

1. Install your dependencies

    ```
    cd path/to/feather
    yarn
    ```

1. Start your app

    ```
    npm dev
    ```

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g @feathersjs/cli          # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers help                           # Show all commands
```

## Database Migration

1. Running migration to bootstrap database with all the required tables
    ```
    npx sequelize-cli db:migrate
    ```

1. Run seeder to populate data to the database
    ```
    npx sequelize-cli db:seed:all
    ```