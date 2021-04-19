const { Service } = require('feathers-sequelize')
const crypto = require('crypto-random-string')
const addDate = require('date-fns/add')
const { NotFound } = require('@feathersjs/errors')

exports.VerificationTokens = class VerificationTokens extends Service {
  constructor(options, app) {
    super(options, app)
    this.app = app
  }

  async create(data, params) {
    console.log('verification token called')
    const UserService = this.app.service('users')
    const { email } = data

    const response = await UserService.find({ query: { email } })

    if (response.total === 1) {
      const [user] = response.data
      const payload = {
        userId: user.id,
        token: crypto({ length: 20 }),
        validUntil: addDate(new Date(), { days: 7 }),
      }

      const verificationToken = await super.create(payload)

      Object.assign(params, { verificationToken })
      return user
    }

    throw NotFound
  }
}
