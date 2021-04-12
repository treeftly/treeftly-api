const { BadRequest, NotAuthenticated } = require('@feathersjs/errors')

exports.Password = class Password {
  constructor(options, app) {
    this.options = options || {}
    this.app = app
  }

  async update(id, data) {
    const [localStrategy] = this.app.service('auth').getStrategies('local')
    const UserService = this.app.service('users')

    if (!data.password || !data.currentPassword) {
      throw new BadRequest('Current password and new password are required')
    }

    try {
      const response = await UserService.get(id)

      const comparison = await localStrategy.comparePassword(
        response,
        data.currentPassword,
      )

      return UserService.update(id, { ...comparison, password: data.password })
    } catch (err) {
      if (err instanceof NotAuthenticated) {
        throw new BadRequest('Password is invalid')
      }

      throw err
    }
  }
}
