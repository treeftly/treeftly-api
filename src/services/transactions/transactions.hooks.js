const { authenticate } = require('@feathersjs/authentication').hooks
const { protect } = require('@feathersjs/authentication-local').hooks
const { appendUserId, userOwnedData } = require('../../utils/hooks')

const association = (context) => {
  const { include, ...query } = context.params.query

  if (include) {
    const UsersModel = context.app.services.users.Model
    const CategoriesModel = context.app.services.categories.Model
    context.params.sequelize = {
      include: [UsersModel, CategoriesModel],
    }

    context.params.query = query
  }

  return context
}

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [association, userOwnedData],
    get: [association],
    create: [appendUserId],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [protect('user.password')],
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
