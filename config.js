'use strict'

const _ = require('lodash')
const Confidence = require('confidence')
const ToBoolean = require('to-boolean')

const config = {
  $meta: 'This file defines all configuration for project.',
  projectName: 'hapi-starter',
  port: {
    web: process.env.APP_PORT
  },
  logger: {
    options: {
      console: ToBoolean(_.defaultTo(process.env.LOGGER_DEBUG, false))
    }
  }
}

const store = new Confidence.Store(config)
const criteria = {
  env: process.env.APP_ENV
}

module.exports = {
  get: key => store.get(key, criteria),
  meta: key => store.meta(key, criteria)
}
