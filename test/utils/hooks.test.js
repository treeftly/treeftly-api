const { userOwnedData, appendUserId } = require('../../src/utils/hooks')

describe('#appendUserId', () => {
  it('should append the user id to the payload when user create\'s new data', () => {
    const context = {
      data: {
        name: 'Foo',
        description: 'bar',
      },
      params: {
        user: {
          id: 1,
        },
      },
    }

    expect(appendUserId(context)).toEqual({
      data: {
        userId: 1,
        name: 'Foo',
        description: 'bar',
      },
      params: {
        user: {
          id: 1,
        },
      },
    })
  })
})

describe('#userOwnedData', () => {
  it("append's the user's id to the query when getting a list of data", () => {
    const context = {
      params: {
        user: {
          id: 1,
        },
        query: {},
      },
      foo: {
        bar: 'baz',
      },
    }

    expect(userOwnedData(context)).toEqual({
      params: {
        user: { id: 1 },
        query: {
          $or: [
            { userId: { $eq: null } },
            { userId: { $eq: 1 } },
          ],
        },
      },
      foo: {
        bar: 'baz',
      },
    })
  })

  it('should not append the query if there is no user data', () => {
    const context = {
      params: {},
      foo: 'bar',
    }

    expect(userOwnedData(context)).toEqual(context)
  })
})
