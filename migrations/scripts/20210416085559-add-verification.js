const tableName = 'users'
const columnName = 'isVerified'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const attributes = await queryInterface.describeTable(tableName)

    if (!attributes.isVerified) {
      await queryInterface.addColumn(tableName, columnName, {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      })
    }
  },

  down: async (queryInterface) => {
    const attributes = await queryInterface.describeTable(tableName)

    if (attributes.isVerified) {
      await queryInterface.removeColumn(tableName, columnName)
    }
  },
}
