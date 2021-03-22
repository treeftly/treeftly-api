const users = require('./users/users.service.js')
const categories = require('./categories/categories.service.js')

const expenses = require('./expenses/expenses.service.js');

module.exports = function services(app) {
  app.configure(users)
  app.configure(categories)
  app.configure(expenses);
}
