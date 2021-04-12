const app = require('../../src/app');

describe('\'password\' service', () => {
  it('registered the service', () => {
    const service = app.service('password');
    expect(service).toBeTruthy();
  });
});
