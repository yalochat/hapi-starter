const pino = require('pino')
const config = require('./config')
const Composer = require('./index')

const logger = pino(
  Object.assign(config.get('/logger/options'), { name: '/server', base: null }),
)

const startServer = async () => {
  try {
    const server = await Composer()

    await server.start()
    // logger.info(`Server started at port: ${server.settings.port}`)
  } catch (err) {
    logger.error(err)
    process.exit(1)
  }
}

startServer()
