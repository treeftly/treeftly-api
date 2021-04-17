const { authenticate } = require('@feathersjs/authentication').hooks
const crypto = require('crypto-random-string')
const addDate = require('date-fns/add')
const {
  hashPassword, protect,
} = require('@feathersjs/authentication-local').hooks

const { sendMail } = require('../../utils/hooks')
const logger = require('../../logger')

const createToken = async (context) => {
  if (process.env.NODE_ENV === 'test') {
    return context
  }

  const { app, result: user } = context

  const VerificationTokenSVC = app.service('verification-tokens')
  const payload = {
    userId: user.id,
    token: crypto({ length: 20 }),
    validUntil: addDate(new Date(), { days: 7 }),
  }

  try {
    const verificationToken = await VerificationTokenSVC.create(payload)
    Object.assign(context, { verificationToken })

    return context
  } catch (err) {
    logger.error(`Error creating token for userId: ${user.id}: ${err}`)
    throw err
  }
}

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [hashPassword('password')],
    update: [hashPassword('password'), authenticate('jwt')],
    patch: [hashPassword('password'), authenticate('jwt')],
    remove: [authenticate('jwt')],
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password'),
    ],
    find: [],
    get: [],
    create: [createToken, sendMail],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
}
