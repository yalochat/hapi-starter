'use strict'

const Package = require('../package.json')

exports.register = (server, options, next) => {
  server.route({
    method: 'GET',
    path: '/status',
    handler: (request, reply) => {
      reply({
        version: Package.version
      })
    }
  })

  next()
}

exports.register.attributes = {
  name: 'index'
}
