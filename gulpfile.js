const gulp = require('gulp')
const wrap = require('gulp-wrap')
const sass = require('gulp-sass')
const deleted = require('gulp-deleted')
const browserSync = require('browser-sync')

const server = browserSync.create()

const views = () =>
  gulp
    .src('src/pages/**/*.html')
    .pipe(
      deleted({
        src: 'src/pages',
        dest: '.tmp',
        patterns: ['**/*.html'],
      })
    )
    .pipe(
      wrap({
        src: 'src/layouts/default.ejs',
        engine: 'ejs',
      })
    )
    .pipe(gulp.dest('.tmp'))
    .pipe(server.stream({ once: true }))

const styles = () =>
  gulp
    .src('src/**/*.{css,scss}')
    .pipe(
      deleted({
        src: 'src',
        dest: '.tmp',
        patterns: ['**/*.{css,scss}'],
      })
    )
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('.tmp'))
    .pipe(server.stream())

const serve = () => {
  server.init({
    server: '.tmp',
  })
  gulp.watch('src/**/*.{html,ejs}', views)
  gulp.watch('src/**/*.{css,scss}', styles)
}

module.exports = {
  dev: gulp.parallel(views, styles, serve),
}
