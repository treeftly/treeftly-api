const { protect } = require('@feathersjs/authentication-local').hooks
const { sendMail } = require('../../utils/hooks')

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [protect('password')],
    find: [],
    get: [],
    create: [sendMail],
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
