'use strict'

const _ = require('lodash')
const RequireDir = require('require-dir')

const internals = {}
const defaultOptions = {}

internals.runThroughPlugins = (pluginsPaths, options, server) => {

  if (pluginsPaths.register) {
    const name = pluginsPaths.register.attributes.name
    let pluginOptions = {}

    if (options.pluginOptions) {
      if (options.pluginOptions[name]) {
        pluginOptions = options.pluginOptions[name]
      }
    }

    internals.registerPlugin(pluginsPaths, pluginOptions, server)
  } else {
    _(pluginsPaths)
      .keys()
      .each(key => {
        const nextPlugin = pluginsPaths[key]
        internals.runThroughPlugins(nextPlugin, options, server)
      })
  }
}

internals.registerPlugin = (plugin, options, server) => {

  server.register({
    register: plugin,
    options
  }, err => {

  })
}

exports.register = (server, options, next) => {

  const settings = _.defaults(options, defaultOptions)

  _.each(options.paths, path => {

    let plugins = RequireDir(path, { recurse: true })

    if (_.keys(plugins).length > 0) {
      internals.runThroughPlugins(plugins, settings, server)
    }
  })

  next()
}

exports.register.attributes = {
  name: 'plugins-loader'
}