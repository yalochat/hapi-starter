const _ = require('lodash')
const { Store } = require('confidence')
const toBoolean = require('to-boolean')

const config = {
  $meta: 'This file defines all configuration for project.',
  projectName: '<%= name %>',
  env: process.env.APP_ENV,
  port: {
    web: process.env.APP_PORT,
  },
  logger: {
    options: {
      console: toBoolean(_.defaultTo(process.env.LOGGER_DEBUG, true)),
    },
  },
}

const store = new Store(config)

module.exports = {
  get: (key, criteria = { env: process.env.APP_ENV }) => store.get(key, criteria),
  meta: (key, criteria = { env: process.env.APP_ENV }) => store.meta(key, criteria),
}
