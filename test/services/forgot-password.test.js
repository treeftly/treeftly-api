const app = require('../../src/app')

describe('\'forgot-password\' service', () => {
  it('registered the service', () => {
    const service = app.service('forgot-password')
    expect(service).toBeTruthy()
  })
})
