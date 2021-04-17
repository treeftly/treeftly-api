// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize')

const { DataTypes } = Sequelize

module.exports = (app) => {
  const sequelizeClient = app.get('sequelizeClient')
  const verificationTokens = sequelizeClient.define('verification_tokens', {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    hooks: {
      beforeCount(options) {
        // eslint-disable-next-line no-param-reassign
        options.raw = true
      },
    },
  })

  // eslint-disable-next-line no-unused-vars
  verificationTokens.associate = (models) => {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  }

  return verificationTokens
}
