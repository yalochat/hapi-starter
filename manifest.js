const Confidence = require('confidence')
const Config = require('./config')

const manifest = {
  $meta: 'This file defines all configuration for project.',
  server: {
    debug: {
      request: ['error'],
    },
    port: Config.get('/port/web'),
    routes: {
      cors: true,
    },
  },
  register: {
    plugins: [
      {
        plugin: './lib/plugin-loader',
        options: {
          paths: ['../routes'],
        },
      },
    ],
  },
}

const store = new Confidence.Store(manifest)

module.exports = {
  get: (key, criteria = { env: process.env.APP_ENV }) => store.get(key, criteria),
  meta: (key, criteria = { env: process.env.APP_ENV }) => store.meta(key, criteria),
}
