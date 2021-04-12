// Initializes the `password` service on path `/password`
const { Password } = require('./password.class')
const hooks = require('./password.hooks')

module.exports = (app) => {
  const options = {}

  // Initialize our service with any options it requires
  app.use('/password', new Password(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('password')

  service.hooks(hooks)
}
