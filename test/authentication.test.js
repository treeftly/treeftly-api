const app = require('../src/app')

describe('authentication', () => {
  it('registered the authentication service', () => {
    expect(app.service('auth')).toBeTruthy()
  })

  describe('local strategy', () => {
    const userInfo = {
      id: 2,
      email: 'someone@example.com',
      password: 'supersecret',
      firstName: 'John',
      lastName: 'Doe',
      isVerified: true,
    }

    beforeAll(async () => {
      try {
        await app.service('users').create(userInfo)
      } catch (error) {
        // Do nothing, it just means the user already exists and can be tested
      }
    })

    it('authenticates user and creates accessToken', async () => {
      const { user, accessToken } = await app.service('auth').create({
        strategy: 'local',
        ...userInfo,
      })

      expect(accessToken).toBeTruthy()
      expect(user).toBeTruthy()
    })

    describe('not verified', () => {
      let unverifiedUser
      beforeAll(async () => {
        unverifiedUser = {
          id: 4,
          email: 'notverified@mail.com',
          password: 'password',
          firstName: 'Johnny',
          lastName: 'Cash',
          isVerified: false,
        }

        try {
          await app.service('users').create(unverifiedUser)
        } catch (err) {
          // Ignore error
        }
      })

      afterAll(async () => {
        let user

        try {
          await app.service('users').get(4)
        } catch (err) {
          // Ignore error
        }

        if (user) {
          await app.service('users').remove(4)
        }
      })

      it('should throw error when user is not verified', () => {
        expect(app.service('auth').create({
          strategy: 'local',
          ...unverifiedUser,
        })).rejects.toThrow('Account is not verified. Please verify the account and try again.')
      })
    })
  })
})
