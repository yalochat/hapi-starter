'use strict'

const Lab = require('lab')
const Code = require('code')
const Hapi = require('hapi')

const IndexPlugin = require('../../routes/index')
const Config = require('../../config')
const Package = require('../../package.json')

const lab = exports.lab = Lab.script()
const describe = lab.describe
const it = lab.it
const expect = Code.expect

let server = null

lab.beforeEach(done => {

  const plugins = [IndexPlugin]

  server = new Hapi.Server()
  server.connection({ port: Config.get('/port/web') })
  server.register(plugins, (err) => {

    if (err) {
      return done(err)
    }

    done()
  })
})

describe('Index Route', () => {

  it('returns route /status with status code 200 and version', done => {
    const request = {
      method: 'GET',
      url: '/status'
    }

    server.inject(request, response => {
      expect(response.result).to.equal({ version: Package.version })
      expect(response.statusCode).to.equal(200)

      done()
    })
  })
})
