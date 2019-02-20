const Bucker = require('bucker')
const Config = require('./config')
const Composer = require('./index')

const logger = Bucker.createLogger(
  Object.assign(Config.get('/logger/options'), { name: '/server' }),
)

const startServer = async () => {
  try {
    const server = await Composer()

    await server.start()
    logger.info(`Server started at port: ${server.settings.port}`)
  } catch (err) {
    logger.error(err)
    process.exit(1)
  }
}

startServer()
