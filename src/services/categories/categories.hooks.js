const { authenticate } = require('@feathersjs/authentication').hooks

const unsetRaw = (context) => {
  Object.assign(context.service, { raw: false })
  return context
}

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [unsetRaw],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
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
