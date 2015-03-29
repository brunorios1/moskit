var gulp = require('gulp');
var cache = require('gulp-cached');
var html5Lint = require('gulp-html5-lint');
var config = require('../../config').html5lint;

// Dev - html5-lint
gulp.task('html5-lint', function() {
  gulp.src(config.src)
    // cache
    .pipe(cache('html5-lint'))
    // lint
    .pipe(html5Lint());
});
