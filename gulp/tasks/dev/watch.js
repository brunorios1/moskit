var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var config = require('../../config').watch;

// Watch
gulp.task('watch', ['browser-sync'], function() {
  gulp.watch(config.styles, ['scsslint', 'sass']);
  gulp.watch(config.scripts, ['eslint', reload]);
  gulp.watch(config.html, reload);
});
