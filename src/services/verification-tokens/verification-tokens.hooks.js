const { protect } = require('@feathersjs/authentication-local').hooks
const { sendVerification } = require('../../utils/hooks')

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
    create: [sendVerification],
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
