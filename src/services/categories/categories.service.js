// Initializes the `categories` service on path `/categories`
const { Categories } = require('./categories.class')
const createModel = require('../../models/categories.model')
const hooks = require('./categories.hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  }

  // Initialize our service with any options it requires
  app.use('/categories', new Categories(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('categories')

  service.hooks(hooks)
}
