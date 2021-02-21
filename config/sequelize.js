const { postgres } = require('./default.json')

const [, DB_USER, DB_PW, DB_NAME] = postgres.match(/\/\/(\w+):(\w+)@localhost:5432\/(\w+)/)

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PW,
    database: DB_NAME,
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
}
