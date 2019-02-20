const Index = require('../index')

let configuration = null

beforeEach((done) => {
  configuration = {
    server: {
      debug: {
        request: ['error'],
      },
      port: 3000,
      routes: {
        cors: true,
      },
    },
    register: {
      plugins: [
        {
          plugin: '../lib/plugin-loader',
          options: {
            paths: ['../routes'],
            pluginOptions: {
              indexBad: {
                routes: {
                  prefix: '/',
                },
              },
            },
          },
        },
      ],
    },
  }

  done()
})

describe('start server', () => {
  test('should able to start server well', async () => {
    const server = await Index(configuration)
    expect(server).toBeDefined()

    server.stop()
  })
})
