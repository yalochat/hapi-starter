const bucker = require('bucker')
const gulp = require('gulp'); // eslint-disable-line
const nodemon = require('gulp-nodemon'); // eslint-disable-line

const logger = bucker.createLogger({ nme: '/tasks/serve' })

gulp.task(
  'serve',
  gulp.series(() => {
    nodemon({ script: 'server', ext: 'js', nodeArgs: ['--inspect'] }).on(
      'start',
      () => {
        logger.info('Serve task has been started!')
      },
    )
  }),
)
