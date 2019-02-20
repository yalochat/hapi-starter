const Hapi = require('hapi')

const IndexPlugin = require('../../routes')
const Config = require('../../config')
const Package = require('../../package.json')

let server = null

beforeEach(async (done) => {
  const plugins = [IndexPlugin]

  server = new Hapi.Server()
  await server.start({ port: Config.get('/port/web') })
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

    expect(response.result).toEqual({ version: Package.version })
    expect(response.statusCode).toEqual(200)
  })
})
