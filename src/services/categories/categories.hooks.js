const { authenticate } = require('@feathersjs/authentication').hooks
const { appendUserId, userOwnedData } = require('../../utils/hooks')

const unsetRaw = (context) => {
  Object.assign(context.service, { raw: false })
  return context
}

const trimData = (context) => {
  const trimmedData = Object.keys(context.data).reduce((acc, curr) => {
    if (typeof context.data[curr] === 'string') {
      acc[curr] = context.data[curr].trim()
    } else {
      acc[curr] = context.data[curr]
    }

    return acc
  }, {})

  Object.assign(context.data, trimmedData)

  return context
}

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [unsetRaw, userOwnedData],
    get: [],
    create: [trimData, appendUserId],
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
