'use strict'

const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const bucker = require('bucker')
const minimist = require('minimist')

const options = minimist(process.argv.slice(3))
const logger = bucker.createLogger({}, 'test-task')

gulp.task('test', ['watch'], () => {
  let exec = 'node_modules/lab/bin/lab -a code -t 100 -v'

  if (options.file) { exec += ` ${options.file}` }
  if (options.focus) { exec += ` -g ${options.focus}` }

  nodemon({
    exec,
    ext: 'js',
    ignore: ['test/cassettes/*']
  }).on('start', () => {
    logger.info(`Testing task has been started!`)
  })
})
