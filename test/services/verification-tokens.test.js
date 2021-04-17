const app = require('../../src/app')

describe('\'verification-tokens\' service', () => {
  it('registered the service', () => {
    const service = app.service('verification-tokens')
    expect(service).toBeTruthy()
  })
})
