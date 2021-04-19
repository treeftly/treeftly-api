import { NotVerified, TokenExpired } from '../../src/utils/errors'

describe('#NotVerified', () => {
  it('throws a custom not-verified error', () => {
    const err = new NotVerified('Not a verified account')

    expect(err.toJSON()).toEqual(expect.objectContaining({
      message: 'Not a verified account',
      code: 401,
      className: 'not-verified',
      name: 'NotVerified',
    }))
  })

  it('throws a custom token-expired error', () => {
    const err = new TokenExpired('Token has expired')

    expect(err.toJSON()).toEqual(expect.objectContaining({
      message: 'Token has expired',
      code: 400,
      className: 'token-expired',
      name: 'TokenExpired',
    }))
  })
})
