const Sequelize = require('sequelize')
const app = require('../src/app')

const sequelize = app.get('sequelizeClient')
const { models } = sequelize

// The export object must be a dictionary of model names -> models
// It must also include sequelize (instance) and Sequelize (constructor) properties
module.exports = {
  Sequelize,
  sequelize,
  ...models,
}
