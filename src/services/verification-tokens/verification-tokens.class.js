const { Service } = require('feathers-sequelize')
const crypto = require('crypto-random-string')
const addDate = require('date-fns/add')
const isPast = require('date-fns/isPast')
const { NotFound, BadRequest } = require('@feathersjs/errors')
const { TokenExpired } = require('../../utils/errors')

exports.VerificationTokens = class VerificationTokens extends Service {
  constructor(options, app) {
    super(options, app)
    this.app = app
  }

  async find(params) {
    const verificationTokens = await super.find(params)

    if (verificationTokens.length === 0) {
      throw new BadRequest('Invalid token')
    }

    const [tokenRes] = verificationTokens

    if (isPast(new Date(tokenRes.validUntil))) {
      throw new TokenExpired('Token has expired')
    }

    await this.app.service('users').patch(tokenRes.userId, { isVerified: true })

    return { status: 'success' }
  }

  async create(data, params) {
    const UserService = this.app.service('users')
    const { email } = data

    const response = await UserService.find({ query: { email } })

    if (response.total === 1) {
      const [user] = response.data

      if (user.isVerified) {
        throw new BadRequest('User is already verified')
      }

      const payload = {
        userId: user.id,
        token: crypto({ length: 20 }),
        validUntil: addDate(new Date(), { days: 7 }),
      }

      const verificationToken = await super.create(payload)

      Object.assign(params, { verificationToken })
      return user
    }

    throw new NotFound('Not found')
  }
}
