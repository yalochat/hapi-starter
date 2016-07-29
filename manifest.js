'use strict'

const Confidence = require('confidence')
const Config = require('./config')

const criteria = {
  env: process.env.APP_ENV
}

const manifest = {
  $meta: 'This file defines all configuration for project.',
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
      port: Config.get('/port/web'),
      labels: ['web']
    }
  ],
  registrations: [
    {
      plugin: {
        register: './lib/plugin-loader',
        options: {
          paths: ['../routes']
        }
      }
    }
  ]
}

const store = new Confidence.Store(manifest)

module.exports = {
  get: key => store.get(key, criteria),
  meta: key => store.meta(key, criteria)
}
