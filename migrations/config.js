const app = require('../src/app')

const env = process.env.NODE_ENV || 'development'
const dialect = 'postgres'
console.log("app.get('sslMode')", app.get('sslMode'))

module.exports = {
  [env]: {
    dialect,
    dialectOptions: {
      ssl: app.get('sslMode'),
    },
    url: app.get(dialect),
    migrationStorageTableName: '_migrations',
  },
}
