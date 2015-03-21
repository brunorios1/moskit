var gulp = require('gulp');
var eslint = require('gulp-eslint');
var config = require('../../config').scripts;

// Dev - ESLint
gulp.task('eslint', function() {
  // Note: To have the process exit with an error code (1) on
  //  lint error, return the stream and pipe to failOnError last.
  gulp.src(config.src)
    .pipe(eslint())
    .pipe(eslint.format())
    // .pipe(eslint.failOnError())
});
