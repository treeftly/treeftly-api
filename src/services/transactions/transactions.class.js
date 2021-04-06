const { Service } = require('feathers-sequelize')

exports.Transactions = class Transactions extends Service {
  async find(params) {
    const response = await super.find(params)
    const total = response.data.reduce((acc, curr) => acc + curr.amount, 0)

    return { ...response, total }
  }
}
