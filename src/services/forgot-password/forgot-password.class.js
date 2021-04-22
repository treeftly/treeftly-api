const { NotFound, BadRequest } = require('@feathersjs/errors')
const differenceInHours = require('date-fns/differenceInHours')
const crypto = require('crypto')

const HOURS_DIFF = 24

exports.ForgotPassword = class ForgotPassword {
  constructor(options, app) {
    this.options = options || {}
    this.app = app
  }

  userString(user) {
    return `${user.id}${user.email}${user.password}${user.updatedAt}`
  }

  userHash(userString) {
    return crypto
      .createHash('md5')
      .update(userString)
      .digest('hex')
  }

  // Taken from https://www.shanestillwell.com/2018/11/24/password-reset-token-expiration/
  generateResetCode(user) {
    // create ISO String
    const now = new Date()

    // Convert to Base64
    const timeHash = Buffer.from(now.toISOString()).toString('base64')

    // User string
    const userString = this.userString(user)
    const userHash = this.userHash(userString)
    const encodedUserId = Buffer.from(String(user.id), 'utf-8').toString('base64')

    return `${timeHash}-${userHash}-${encodedUserId}`
  }

  async patch(id, data, params) {
    const { password, confirmPassword } = data
    const { token } = params.query
    const userService = this.app.service('users')

    const [timeHash, reqUserHash, encodedUserId] = token.split('-')
    const userId = Buffer.from(encodedUserId, 'base64').toString('utf-8')

    const timestamp = Buffer.from(timeHash, 'base64').toString('ascii')

    const diff = differenceInHours(new Date(timestamp), new Date())

    if (Math.abs(diff) > HOURS_DIFF) {
      throw new BadRequest('Token has expired')
    }

    const user = await userService.get(userId)

    const userString = this.userString(user)
    const userHash = this.userHash(userString)

    if (reqUserHash !== userHash) {
      throw new BadRequest('Invalid token')
    }

    if (password !== confirmPassword) {
      throw new BadRequest('Passwords does not match')
    }

    return userService.patch(user.id, { password })
  }

  async create(data) {
    const { email } = data

    const userResponse = await this.app.service('users').find({ query: { email } })

    if (userResponse.total === 1) {
      const [userData] = userResponse.data

      return {
        token: this.generateResetCode(userData),
        ...userData,
      }
    }

    throw new NotFound('User not found')
  }
}
