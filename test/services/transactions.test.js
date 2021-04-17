const app = require('../../src/app')

describe('\'transactions\' service', () => {
  beforeAll(async () => {
    const user = {
      id: 5,
      email: 'janedoe@mail.com',
      password: 'test',
      firstName: 'Jane',
      lastName: 'Doe',
      isVerified: true,
    }
    const category = {
      id: 1,
      name: 'Sample category',
      label: '#000000',
    }
    const transaction = {
      id: 1,
      date: '2021-04-13',
      description: 'test transaction',
      amount: 50,
      categoryId: 1,
    }
    const params = { user: { id: 5 } }

    try {
      await app.service('users').create(user)
      await app.service('categories').create(category, params)
      await app.service('transactions').create(transaction, params)
    } catch (err) {
      // Do nothing
    }
  })

  afterAll(async () => {
    await app.service('transactions').remove(1)
    await app.service('categories').remove(1)
    await app.service('users').remove(5)
  })

  it('registered the service', () => {
    const service = app.service('transactions')
    expect(service).toBeTruthy()
  })

  it('should include total to the response', async () => {
    const transactions = await app.service('transactions').find({ query: {} })

    expect(transactions.total).toEqual(50)
  })
})
