const users = require('./users/users.service.js')
const categories = require('./categories/categories.service.js')

module.exports = function services(app) {
  app.configure(users)
  app.configure(categories)
}
