/* eslint-disable max-classes-per-file */
const { FeathersError } = require('@feathersjs/errors')

class NotVerified extends FeathersError {
  constructor(message, data) {
    super(message, 'NotVerified', 401, 'not-verified', data)
  }
}

class TokenExpired extends FeathersError {
  constructor(message, data) {
    super(message, 'TokenExpired', 400, 'token-expired', data)
  }
}

module.exports = { NotVerified, TokenExpired }
