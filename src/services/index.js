const users = require('./users/users.service')
const categories = require('./categories/categories.service')
const transactions = require('./transactions/transactions.service')

const password = require('./password/password.service')

const verificationTokens = require('./verification-tokens/verification-tokens.service')

const forgotPassword = require('./forgot-password/forgot-password.service')

module.exports = function services(app) {
  app.configure(users)
  app.configure(categories)
  app.configure(transactions)
  app.configure(password)
  app.configure(verificationTokens)
  app.configure(forgotPassword)
}
