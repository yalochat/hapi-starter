'use strict'

const gulp = require('gulp')
const bucker = require('bucker')

const logger = bucker.createLogger({}, 'watch-task')

// show what files has change
const reporter = (event) => {
  logger.info(`File ${event.path} was ${event.type}, running tasks`)
}

// this task wil watch for changes
// to js, html, and css files and call to reporter
gulp.task('watch', () => {
  gulp.watch('.', ['build']).on('change', reporter)
})
