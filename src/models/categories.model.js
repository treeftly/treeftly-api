// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize')

const { DataTypes, Deferrable } = Sequelize

module.exports = (app) => {
  const sequelizeClient = app.get('sequelizeClient')
  const categories = sequelizeClient.define('categories', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Only defined when user creates a new category, otherwise category cannot be deleted
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: sequelizeClient.models.users,
        key: 'id',
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    isProtected: {
      type: DataTypes.VIRTUAL,
      get() {
        return !!this.userId
      },
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
  categories.associate = (models) => {
    const { expenses } = models
    categories.hasMany(expenses)
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  }

  return categories
}
