const { Service } = require('feathers-sequelize')

exports.Categories = class Categories extends Service {
  async find(params) {
    if (params.user.id) {
      Object.assign(params.query, {
        $or: [
          { userId: { $eq: null } },
          { userId: { $eq: params.user.id } },
        ],
        $sort: { updatedAt: -1 },
      })
    }

    return super.find(params)
  }
}
