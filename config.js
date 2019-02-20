const _ = require('lodash')
const Confidence = require('confidence')
const ToBoolean = require('to-boolean')

const config = {
  $meta: 'This file defines all configuration for project.',
  projectName: 'hapi-starter',
  port: {
    web: process.env.APP_PORT,
  },
  logger: {
    options: {
      console: ToBoolean(_.defaultTo(process.env.LOGGER_DEBUG, true)),
    },
  },
}

const store = new Confidence.Store(config)

module.exports = {
  get: (key, criteria = { env: process.env.APP_ENV }) => store.get(key, criteria),
  meta: (key, criteria = { env: process.env.APP_ENV }) => store.meta(key, criteria),
}
