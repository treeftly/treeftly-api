const { Service } = require('feathers-sequelize')

exports.Users = class Users extends Service {
  async find() {
    return {
      foo: 'bar',
      password: 'testing',
    }
  }
}
