'use strict'

const Hapi = require('hapi')
const Glue = require('glue')
const Index = require('../index')

let configuration = null
let options = null

beforeEach((done) => {
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
            paths: ['./routes'],
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

describe('start server', () => {
  test('should able to start server well', () => {
    Index((err, server) => {
      expect(err).toBeNull()
      expect(server).toBeInstanceOf(Hapi.Server)
    })
  })

  test('should able start server well and register plugin with options', () => {
    Glue.compose.bind(Glue, configuration, options)((err, server) => {
      expect(err).toBeNull()
      expect(server).toBeInstanceOf(Hapi.Server)
    })
  })

  test('should able to start server well and register plugin options of a plugin that does not exist', () => {
    configuration.registrations = [
      {
        plugin: {
          register: '../lib/plugin-loader',
          options: {
            paths: ['./routes'],
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
      expect(err).toBeNull()
      expect(server).toBeInstanceOf(Hapi.Server)
    })
  })
})
