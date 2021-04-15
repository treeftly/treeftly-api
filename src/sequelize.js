const Sequelize = require('sequelize')

module.exports = function sequelizeApp(app) {
  const connectionString = app.get('postgres')
  const sslMode = app.get('sslMode')
  const sequelize = new Sequelize(connectionString, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: sslMode,
    },
    logging: false,
    define: {
      freezeTableName: true,
    },
  })
  const oldSetup = app.setup

  app.set('sequelizeClient', sequelize)

  // eslint-disable-next-line no-param-reassign
  app.setup = function setup(...args) {
    const result = oldSetup.apply(this, args)

    // Set up data relationships
    const { models } = sequelize
    Object.keys(models).forEach((name) => {
      if ('associate' in models[name]) {
        models[name].associate(models)
      }
    })

    // Sync to the database
    app.set('sequelizeSync', sequelize.sync())

    return result
  }
}
