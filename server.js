'use strict'

const Composer = require('./index')
const Logger = require('bucker').createLogger({}, 'app')

Composer((err, server) => {
  if (err) {
    throw err
  }

  server.start(() => {
    Logger.info(`Project has been start, listening on port ${server.info.port}`)
  })
})
