'use strict'

const Lab = require('lab')
const Code = require('code')
const Hapi = require('hapi')
const Glue = require('glue')
const Index = require('../index')

const lab = exports.lab = Lab.script()
const describe = lab.describe
const it = lab.it
const expect = Code.expect

let configuration = null
let options = null

lab.beforeEach(done => {

  configuration = {
    server: {
      debug: {
        request: ['error']
      },
      connections: {
        routes: {
          cors: true
        }
      }
    },
    connections: [
      {
        port: 3000,
        labels: ['web']
      }
    ],
    registrations: [
      {
        plugin: {
          register: '../lib/plugin-loader',
          options: {
            paths: ['../routes'],
            pluginOptions: {
              index: {
                routes: {
                  prefix: '/'
                }
              }
            }
          }
        }
      }
    ]
  }

  options = {
    relativeTo: __dirname
  }

  done()
})

describe('Index file', () => {

  it('starts server well', done => {

    Index((err, server) => {

      expect(server).to.be.instanceOf(Hapi.Server)
      done()
    })
  })

  it('start server well and register plugin with options', done => {
    Glue.compose.bind(Glue, configuration, options)((err, server) => {
      expect(server).to.be.instanceOf(Hapi.Server)
      done()
    })
  })

  it('start server well and register plugin options of a plugin that does not exist', done => {
    configuration.registrations =  [
      {
        plugin: {
          register: '../lib/plugin-loader',
          options: {
            paths: ['../routes'],
            pluginOptions: {
              indexBad: {
                routes: {
                  prefix: '/'
                }
              }
            }
          }
        }
      }
    ]

    const options = {
      relativeTo: __dirname
    }

    Glue.compose.bind(Glue, configuration, options)((err, server) => {
      expect(server).to.be.instanceOf(Hapi.Server)
      done()
    })
  })

  it('start server well and register bad plugins', done => {
    configuration.registrations =  [
      {
        plugin: {
          register: '../lib/plugin-loader',
          options: {
            paths: [null]
          }
        }
      }
    ]

    const options = {
      relativeTo: __dirname
    }

    Glue.compose.bind(Glue, configuration, options)((err, server) => {
      expect(server).to.be.instanceOf(Hapi.Server)
      done()
    })
  })
})
