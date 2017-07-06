'use strict'

const Hapi = require('hapi')

const IndexPlugin = require('../../routes/index')
const Config = require('../../config')
const Package = require('../../package.json')

let server = null

beforeEach(() => {
  const plugins = [IndexPlugin]

  server = new Hapi.Server()
  server.connection({ port: Config.get('/port/web') })
  server.register(plugins, (err) => {
    if (err) {
      return done(err)
    }
  })
})

describe('Index Route', () => {
  test('returns route /status with status code 200 and version', () => {
    const request = {
      method: 'GET',
      url: '/status'
    }

    server.inject(request, (response) => {
      expect(response.result).toEqual({ version: Package.version })
      expect(response.statusCode).toEqual(200)
    })
  })
})
