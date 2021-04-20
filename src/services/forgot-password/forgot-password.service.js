// Initializes the `forgot-password` service on path `/forgot-password`
const { ForgotPassword } = require('./forgot-password.class')
const hooks = require('./forgot-password.hooks')

module.exports = (app) => {
  const options = {
    paginate: app.get('paginate'),
  }

  // Initialize our service with any options it requires
  app.use('/forgot-password', new ForgotPassword(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('forgot-password')

  service.hooks(hooks)
}
