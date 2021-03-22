// Initializes the `expenses` service on path `/expenses`
const { Expenses } = require('./expenses.class')
const createModel = require('../../models/expenses.model')
const hooks = require('./expenses.hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  }

  // Initialize our service with any options it requires
  app.use('/expenses', new Expenses(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('expenses')

  service.hooks(hooks)
}
