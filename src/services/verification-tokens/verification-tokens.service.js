// Initializes the `verification-tokens` service on path `/verification-tokens`
const { VerificationTokens } = require('./verification-tokens.class')
const createModel = require('../../models/verification-tokens.model')
const hooks = require('./verification-tokens.hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    multi: ['remove'],
  }

  // Initialize our service with any options it requires
  app.use('/verification-tokens', new VerificationTokens(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('verification-tokens')

  service.hooks(hooks)
}
