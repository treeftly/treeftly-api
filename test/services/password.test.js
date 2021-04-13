const app = require('../../src/app')

describe('\'password\' service', () => {
  let createdUser
  beforeAll(async () => {
    const user = {
      id: 3,
      firstName: 'Melomelo',
      lastName: 'Riot',
      email: 'meloriot@mail.com',
      password: 'test',
    }

    createdUser = await app.service('users').create(user)
  })

  afterAll(async () => {
    await app.service('users').remove(3)
  })

  it('registered the service', () => {
    const service = app.service('password')
    expect(service).toBeTruthy()
  })

  it('should update the password', async () => {
    const updatedUser = await app.service('password').update(3, { password: 'testing123', currentPassword: 'test', id: 3 })

    expect(updatedUser.password).not.toEqual(createdUser.password)
  })

  it('throws error if password is not in the payload', () => {
    expect(app.service('password').update(3, {})).rejects.toThrow('Current password and new password are required')
  })

  it('throws error if passed password does not match with saved password', () => {
    const payload = {
      password: 'testtest',
      currentPassword: 'asdfasdf',
      id: 3,
    }

    expect(app.service('password').update(3, payload)).rejects.toThrow('Password is invalid')
  })
})
