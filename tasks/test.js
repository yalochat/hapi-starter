const gulp = require('gulp'); // eslint-disable-line
const nodemon = require('gulp-nodemon'); // eslint-disable-line
const minimist = require('minimist'); // eslint-disable-line
const bucker = require('bucker')

const options = minimist(process.argv.slice(3))
const logger = bucker.createLogger({ name: '/tasks/test' })

gulp.task(
  'test',
  gulp.series(() => {
    let exec = './node_modules/jest/bin/jest.js --coverage --verbose --runInBand'

    if (options.file) {
      exec += ` ${options.file}`
    }

    nodemon({
      exec,
      ext: 'js',
      ignore: ['test/cassettes/*'],
    }).on('start', () => {
      logger.info('Testing task has been started!')
    })
  }),
)
