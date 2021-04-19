const app = require('../../src/app')

const verificationTokenSvc = app.service('verification-tokens')
const userSvc = app.service('users')
const VerificationTokenModel = app.get('sequelizeClient').models.verification_tokens

describe('\'verification-tokens\' service', () => {
  it('registered the service', () => {
    const service = verificationTokenSvc
    expect(service).toBeTruthy()
  })

  describe('verify token', () => {
    const newUser = {
      id: 6,
      isVerified: false,
      firstName: 'Night',
      lastName: 'Hawk',
      email: 'nighthawk@mail.com',
      password: 'nighthawk',
    }

    beforeAll(async () => {
      await userSvc.create(newUser)
    })

    afterEach(async () => {
      try {
        await verificationTokenSvc.remove(null, { userId: newUser.id })
        await userSvc.remove(newUser.id)
      } catch (err) {
        // Ignore error
      }
    })

    it('should return success after verifying the user', async () => {
      await verificationTokenSvc.create({ email: newUser.email })

      const { dataValues } = await VerificationTokenModel.findOne({ where: { userId: newUser.id } })

      const response = await verificationTokenSvc.find({ token: dataValues.token })

      expect(response).toEqual({ status: 'success' })
    })

    it('should throw error if token is invalid', () => {
      expect(verificationTokenSvc.find({ token: 'an-invalid-token' })).rejects.toThrow('Invalid token')
    })

    it('should throw error if token has expired', async () => {
      await userSvc.create(newUser)
      await verificationTokenSvc.create({ email: newUser.email })

      const { dataValues } = await VerificationTokenModel.findOne({ where: { userId: newUser.id } })
      await verificationTokenSvc.patch(dataValues.id, { validUntil: new Date() })

      expect(verificationTokenSvc.find({ token: dataValues.token })).rejects.toThrow('Token has expired')
    })
  })

  describe('resend verification token', () => {
    const verifiedUser = {
      id: 7,
      isVerified: true,
      firstName: 'Verified',
      lastName: 'User',
      email: 'verifieduser@mail.com',
      password: 'iamverified',
    }

    const unverifiedUser = {
      id: 8,
      isVerified: false,
      firstName: 'Unverified',
      lastName: 'User',
      email: 'unverifieduser@mail.com',
      password: 'notverified',
    }

    beforeAll(async () => {
      await userSvc.create(verifiedUser)
      await userSvc.create(unverifiedUser)
    })

    afterAll(async () => {
      await verificationTokenSvc.remove(null, {
        userId: [unverifiedUser.id, verifiedUser.id],
      })
      await userSvc.remove(unverifiedUser.id)
      await userSvc.remove(verifiedUser.id)
    })

    it('should respond with user details if user is not verified', async () => {
      const response = await verificationTokenSvc.create({
        email: unverifiedUser.email,
      })

      expect(response.id).toEqual(unverifiedUser.id)
    })

    it('should throw error if user is not found', () => {
      expect(verificationTokenSvc.create({
        email: 'non-existing@mail.com',
      })).rejects.toThrow('Not found')
    })

    it('should throw error if user is already verified', () => {
      expect(verificationTokenSvc.create({
        email: verifiedUser.email,
      })).rejects.toThrow('User is already verified')
    })
  })
})
