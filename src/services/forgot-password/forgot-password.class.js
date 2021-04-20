const { NotFound } = require('@feathersjs/errors')
const crypto = require('crypto')

const generateResetCode = (user) => {
  // create ISO String
  const now = new Date()

  // Convert to Base64
  const timeHash = Buffer.from(now.toISOString()).toString('base64')

  // User string
  const userString = `${user.id}${user.email}${user.password}${user.updatedAt}`
  const userHash = crypto
    .createHash('md5')
    .update(userString)
    .digest('hex')

  return `${timeHash}-${userHash}`
}

exports.ForgotPassword = class ForgotPassword {
  constructor(options, app) {
    this.options = options || {}
    this.app = app
  }

  async create(data) {
    const { email } = data

    const userResponse = await this.app.service('users').find({ query: { email } })

    if (userResponse.total === 1) {
      const [userData] = userResponse.data

      return {
        token: generateResetCode(userData),
        ...userData,
      }
    }

    throw new NotFound('User not found')
  }
}
