const hapi = require('hapi')

const IndexPlugin = require('../../routes')
const config = require('../../config')
const pkg = require('../../package.json')

let server = null

beforeEach(async (done) => {
  const plugins = [IndexPlugin]

  server = new hapi.Server()
  await server.start({ port: config.get('/port/web') })
  await server.register(plugins)

  done()
})

afterEach((done) => {
  server.stop()

  done()
})

describe('Index Route', () => {
  test('returns route /status with status code 200 and version', async () => {
    const request = {
      method: 'GET',
      url: '/status',
    }

    const response = await server.inject(request)

    expect(response.result).toEqual({ version: pkg.version })
    expect(response.statusCode).toEqual(200)
  })
})
