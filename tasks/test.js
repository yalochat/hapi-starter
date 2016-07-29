'use strict'

import gulp from 'gulp'
import nodemon from 'gulp-nodemon'
import buckerr from 'bucker'
import minimist from 'minimist'
import bucker from 'bucker'


const options = minimist(process.argv.slice(3))
const logger = bucker.createLogger({}, 'test-task')

gulp.task('test', ['watch'], () => {

  let exec = 'node_modules/lab/bin/lab -a code -t 100 -v'

  if (options.file) {
    exec += ` ${options.file}`
  }

  if (options.focus) {
    exec += ` -g ${options.focus}`
  }

  nodemon({
    exec,
    ext: 'js',
    ignore: ['test/cassettes/*']
  })
    .on('start', () => {

      logger.info(`Testing task has been started!`)
    })
})
