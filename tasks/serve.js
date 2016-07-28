'use strict'

import gulp from 'gulp'
import nodemon from 'gulp-nodemon'
import bucker from 'bucker'

const logger = bucker.createLogger({}, 'serve-task')

gulp.task('serve', ['watch'], () => {

  nodemon({
    script: 'server',
    ext: 'html js'
  })
    .on('start', () => {

      logger.info(`Server task has been started!`)
    })
})
