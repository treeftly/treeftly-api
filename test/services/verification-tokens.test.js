const app = require('../../src/app')

describe('\'verification-tokens\' service', () => {
  const verifiedUser = {
    id: 6,
    isVerified: true,
    firstName: 'Verified',
    lastName: 'User',
    email: 'verifieduser@mail.com',
    password: 'iamverified',
  }

  const unverifiedUser = {
    id: 7,
    isVerified: false,
    firstName: 'Unverified',
    lastName: 'User',
    email: 'unverifieduser@mail.com',
    password: 'notverified',
  }

  beforeAll(async () => {
    await app.service('users').create(verifiedUser)
    await app.service('users').create(unverifiedUser)
  })

  afterAll(async () => {
    await app.service('verification-tokens').remove(null, { userId: [6, 7] })
    await app.service('users').remove(6)
    await app.service('users').remove(7)
  })

  it('registered the service', () => {
    const service = app.service('verification-tokens')
    expect(service).toBeTruthy()
  })

  it('should respond with user details if user is not verified', async () => {
    const response = await app.service('verification-tokens').create({
      email: unverifiedUser.email,
    })

    expect(response.id).toEqual(unverifiedUser.id)
  })

  it('should throw error if user is not found', () => {
    expect(app.service('verification-tokens').create({
      email: 'non-existing@mail.com',
    })).rejects.toThrow('Not found')
  })

  it('should throw error if user is already verified', () => {
    expect(app.service('verification-tokens').create({
      email: verifiedUser.email,
    })).rejects.toThrow('User is already verified')
  })
})
