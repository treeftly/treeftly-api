const app = require('../../src/app');

describe('\'expenses\' service', () => {
  it('registered the service', () => {
    const service = app.service('expenses');
    expect(service).toBeTruthy();
  });
});
