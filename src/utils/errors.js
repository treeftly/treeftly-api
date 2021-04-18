const { FeathersError } = require('@feathersjs/errors')

class NotVerified extends FeathersError {
  constructor(message, data) {
    super(message, 'NotVerified', 401, 'not-verified', data)
  }
}

export { NotVerified }
