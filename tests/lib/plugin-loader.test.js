const Bucker = require('bucker')
const Hapi = require('hapi')

const config = require('../../config')
const pluginLoader = require('../../lib/plugin-loader')

let server = null

beforeEach(async (done) => {
  server = new Hapi.Server()
  await server.start({ port: config.get('/port/web') })

  done()
})

afterEach((done) => {
  server.stop()

  done()
})

describe('Plugin Loader lib', () => {
  test('should be able to register plugins from a dir', async () => {
    const logger = Bucker.createLogger({ name: '/lib/plugin-loader' })

    jest.spyOn(logger, 'info')

    await server.register({
      plugin: pluginLoader,
      options: {
        paths: ['../tests/_stubs/plugins/goods/good-1'],
        logger,
      },
    })

    expect(logger.info.mock.calls[0][0]).toEqual(
      'Starting to register plugins:',
    )
    expect(logger.info.mock.calls[1][0]).toEqual(
      'Registering plugin: good-1-plugin',
    )

    logger.info.mockRestore()
  })

  test('should be able to register plugin recursively', async () => {
    const logger = Bucker.createLogger({ name: '/lib/plugin-loader' })

    jest.spyOn(logger, 'info')

    await server.register({
      plugin: pluginLoader,
      options: {
        paths: ['../tests/_stubs/plugins/goods'],
        logger,
      },
    })

    expect(logger.info.mock.calls[0][0]).toEqual(
      'Starting to register plugins:',
    )
    expect(logger.info.mock.calls[1][0]).toEqual(
      'Registering plugin: good-1-plugin',
    )
    expect(logger.info.mock.calls[2][0]).toEqual(
      'Registering plugin: good-2-plugin',
    )

    logger.info.mockRestore()
  })

  test('should be able to manage errors if plugin load fails', async () => {
    const logger = Bucker.createLogger({ name: '/lib/plugin-loader' })

    jest.spyOn(logger, 'warn')

    try {
      await server.register({
        plugin: pluginLoader,
        options: {
          paths: ['../tests/_stubs/plugins/bad'],
          logger,
        },
      })
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toEqual('Error: bad plugin')
    }

    expect(logger.warn.mock.calls[0][0]).toEqual(
      'An error has been ocurred trying to register the plugin: bad-1-plugin',
    )

    logger.warn.mockRestore()
  })

  test('should be ale to manage errors if dir does not exists', async () => {
    const logger = Bucker.createLogger({ name: '/lib/plugin-loader' })

    jest.spyOn(logger, 'warn')

    await server.register({
      plugin: pluginLoader,
      options: {
        paths: ['../tests/_stubs/plugins/does-not-exists'],
        logger,
      },
    })

    expect(logger.warn.mock.calls[0][0]).toEqual(
      'There was an error registering plugins for path: ../tests/_stubs/plugins/does-not-exists',
    )

    logger.warn.mockRestore()
  })

  test('should be able to configure options for specific plugins', async () => {
    const logger = Bucker.createLogger({ name: '/lib/plugin-loader' })

    jest.spyOn(logger, 'info')

    await server.register({
      plugin: pluginLoader,
      options: {
        paths: ['../tests/_stubs/plugins/goods/good-1'],
        pluginOptions: {
          'good-1-plugin': {
            option: 'value',
          },
        },
        logger,
      },
    })

    expect(logger.info.mock.calls[0][0]).toEqual(
      'Starting to register plugins:',
    )
    expect(logger.info.mock.calls[1][0]).toEqual(
      'Applying specific options to plugin: good-1-plugin',
    )
    expect(logger.info.mock.calls[2][0]).toEqual(
      'Registering plugin: good-1-plugin',
    )

    logger.info.mockRestore()
  })
})
