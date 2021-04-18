const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication')
const { LocalStrategy } = require('@feathersjs/authentication-local')
const { expressOauth } = require('@feathersjs/authentication-oauth')
const { NotVerified } = require('./utils/errors')

class ExtendedLocalStrategy extends LocalStrategy {
  async findEntity(username, params) {
    const entity = await super.findEntity(username, params)

    if (!entity.isVerified) {
      throw new NotVerified('Account is not verified. Please verify the account and try again.')
    }

    return entity
  }
}

module.exports = (app) => {
  const authentication = new AuthenticationService(app)

  authentication.register('jwt', new JWTStrategy())
  authentication.register('local', new ExtendedLocalStrategy())

  app.use('/auth', authentication)
  app.configure(expressOauth())
}
