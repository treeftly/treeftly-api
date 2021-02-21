const axios = require('axios')
const url = require('url')
const app = require('../src/app')

const port = app.get('port') || 8998
const getUrl = (pathname) => url.format({
  hostname: app.get('host') || 'localhost',
  protocol: 'http',
  port,
  pathname,
})

describe('Feathers application tests (with jest)', () => {
  let server

  beforeAll((done) => {
    server = app.listen(port)
    server.once('listening', () => done())
  })

  afterAll((done) => {
    server.close(done)
  })

  describe('404', () => {
    it('returns 404 status', async () => {
      expect.assertions(2)
      try {
        await axios.get(getUrl('path/to/nowhere'), {
          headers: {
            Accept: 'text/html',
          },
        })
      } catch (error) {
        const { response } = error

        expect(response.status).toBe(404)
        expect(response.data.message).toBe('Page not found')
      }
    })
  })
})
