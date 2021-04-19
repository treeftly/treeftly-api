const users = require('./users/users.service.js')
const categories = require('./categories/categories.service.js')
const transactions = require('./transactions/transactions.service.js')

const password = require('./password/password.service.js')

const verificationTokens = require('./verification-tokens/verification-tokens.service.js')

module.exports = function services(app) {
  app.configure(users)
  app.configure(categories)
  app.configure(transactions)
  app.configure(password)
  app.configure(verificationTokens)
}
