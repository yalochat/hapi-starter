const hapiPino = require('hapi-pino')
const { Store } = require('confidence')
const config = require('./config')

const manifest = {
  $meta: 'This file defines all configuration for project.',
  server: {
    debug: {
      request: ['error'],
    },
    port: config.get('/port/web'),
    routes: {
      cors: true,
    },
  },
  register: {
    plugins: [
      {
        plugin: hapiPino,
        options: {
          prettyPrint: config.get('/env') !== 'production',
          redact: {
            paths: ['req.headers', 'res.headers'],
            remove: true,
          },
        },
      },
      {
        plugin: './lib/plugin-loader',
        options: {
          paths: ['../routes'],
        },
      },
    ],
  },
}

const store = new Store(manifest)

module.exports = {
  get: (key, criteria = { env: process.env.APP_ENV }) => store.get(key, criteria),
  meta: (key, criteria = { env: process.env.APP_ENV }) => store.meta(key, criteria),
}
