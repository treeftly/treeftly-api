import { NotVerified } from '../../src/utils/errors'

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
})
