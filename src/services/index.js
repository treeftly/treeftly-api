const users = require('./users/users.service.js')

module.exports = function services(app) {
  app.configure(users)
}
