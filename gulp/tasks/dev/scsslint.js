var gulp = require('gulp');
var cache = require('gulp-cached');
var scsslint = require('gulp-scss-lint');
var config = require('../../config').scsslint;

// Sass
gulp.task('scsslint', function() {
  return gulp.src(config.src)
    .pipe(cache('scsslint'))
    // lint scss code
    .pipe(scsslint({
      'bundleExec': true
    }))
});
