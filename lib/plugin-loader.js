const _ = require('lodash')
const pino = require('pino')
const requireDir = require('require-dir')

const defaultOptions = {
  pluginOptions: {},
}

const getPlugins = (plugins, options, logger) => {
  const pluginFiles = Object.keys(plugins)

  return pluginFiles.reduce((acc, pluginFilename) => {
    const plugin = plugins[pluginFilename]

    // now verify if the plugin has the 'register' property, that means that is a plugin;
    // if doesn't have the register property means that is an object that contains plugins
    if (plugin.register) {
      let pluginOptions = {}
      if (options.pluginOptions[plugin.name]) {
        logger.info(`Applying specific options to plugin: ${plugin.name}`)
        pluginOptions = options.pluginOptions[plugin.name]
      }

      return acc.concat([{ plugin, options: pluginOptions }])
    }

    return acc.concat(getPlugins(plugin, options))
  }, [])
}

const getPluginsFromPaths = logger => (paths, options) => _(paths)
  .flatMap((path) => {
    try {
      const pathPlugins = requireDir(path, {
        recurse: true,
        extensions: ['.js'],
      })

      return getPlugins(pathPlugins, options, logger)
    } catch (error) {
      logger.warn(`There was an error registering plugins for path: ${path}`)
      logger.warn(`${error}`)

      return []
    }
  })
  .value()

const registerPlugin = logger => async (server, plugin, options) => {
  try {
    logger.info(`Registering plugin: ${plugin.name}`)
    await server.register({ plugin, options })
  } catch (error) {
    logger.warn(
      `An error has been ocurred trying to register the plugin: ${plugin.name}`,
    )
    throw error
  }
}

module.exports = {
  register: async (server, opts) => {
    const settings = _.defaults(opts, defaultOptions)
    const logger = opts.logger || pino({ name: '/lib/plugin-loader', base: null })

    logger.info('Starting to register plugins:')

    // build array with every plugins need to register
    const plugins = getPluginsFromPaths(logger)(opts.paths, settings)

    const registration = _(plugins)
      .map(({ plugin, options }) => registerPlugin(logger)(server, plugin, options))
      .value()

    try {
      await Promise.all(registration)
    } catch (err) {
      logger.error(err)

      throw new Error(err)
    }
  },
  name: 'plugins-loader',
}
