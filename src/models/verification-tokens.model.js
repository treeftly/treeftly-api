// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize')

const { DataTypes, Deferrable } = Sequelize

module.exports = (app) => {
  const sequelizeClient = app.get('sequelizeClient')
  const verificationTokens = sequelizeClient.define('verification_tokens', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: sequelizeClient.models.users,
        key: 'id',
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    validUntil: {
      type: DataTypes.DATE,
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
    const { users } = models
    verificationTokens.belongsTo(users)
  }

  return verificationTokens
}
